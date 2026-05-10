import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';

import {BASE_URL} from '@store/config';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {SecureStorageKey} from '../keychainStorage/types';
import {authActions} from '@modules/onboard/store';
import {secureStore} from '../keychainStorage';
import {store} from '@store/store';

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

class ApiService {
  private api: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: any[] = [];

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'source': 'app',
      },
    });

    this.initializeInterceptors();
  }

  /**
   * INITIALIZE INTERCEPTORS
   * Handles adding tokens to headers and catching 401s for refresh logic.
   */
  private initializeInterceptors() {
    // Request Interceptor: Attach Access Token
    this.api.interceptors.request.use(
      async config => {
        try {
          const accessToken = await secureStore.getItem(
            SecureStorageKey.accessToken,
          );
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          }
        } catch (error) {
          //
        }
        return config;
      },
      error => Promise.reject(error),
    );

    // Response Interceptor: Handle Token Expiration
    this.api.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 403) {
          this.failedQueue = [];
          await this.logout(); // Wipe storage and force login
          return Promise.reject(error);
        }
        // If 401 error and not already retrying
        else if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // EDGE CASE: If a refresh is already in progress, queue this request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({resolve, reject});
            })
              .then(token => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                return this.api(originalRequest);
              })
              .catch(err => Promise.reject(err));
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const userId = store.getState().auth.user?._id;
            const refreshToken = await secureStore.getItem(
              SecureStorageKey.refreshToken,
            );

            if (!refreshToken) {
              throw new Error('No refresh token available');
            }

            // Attempt to get new tokens
            const {data} = await axios.post<TokenResponse>(
              `${BASE_URL}/user/refresh`,
              {refreshToken, userId},
            );
            console.log('test refresh data', data);

            // Save new tokens
            await this.saveTokens(data.accessToken, data.refreshToken);

            // Process the queue of waiting requests
            this.processQueue(null, data.accessToken);

            // Retry the original request
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return this.api(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError, null);
            await this.logout(); // Wipe storage and force login
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        return Promise.reject(error);
      },
    );
  }

  /**
   * QUEUE HANDLING
   * Prevents multiple concurrent refresh calls.
   */
  private processQueue(error: any, token: string | null = null) {
    this.failedQueue.forEach(prom => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    this.failedQueue = [];
  }

  /**
   * PUBLIC METHODS
   */
  public async saveTokens(access: string, refresh: string) {
    secureStore.setItem(SecureStorageKey.accessToken, access);
    secureStore.setItem(SecureStorageKey.refreshToken, refresh);
  }

  public async logout() {
    store.dispatch(authActions.logout());
    secureStore.delete(SecureStorageKey.accessToken);
    secureStore.delete(SecureStorageKey.refreshToken);
    GoogleSignin.signOut();
  }

  // Generic Request Wrapper
  public async request<T>(config: AxiosRequestConfig): Promise<T> {
    const response = await this.api.request<T>(config);
    return response.data;
  }
}

const apiService = new ApiService();

export default apiService;
