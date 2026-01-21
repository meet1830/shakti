import {Constants, LoginUserParams, LoginUserResponse} from '../types';

import apiService from '@modules/config/api/service';
import {authActions} from '../store';
import {useAppDispatch} from '@store/hooks';

export function useLoginUser() {
  const appDispatch = useAppDispatch();

  async function loginUser(params: LoginUserParams) {
    try {
      const response = await apiService.request<LoginUserResponse>({
        method: 'POST',
        url: '/user/login',
        data: params,
      });
      if (response?.user) {
        appDispatch(authActions.setUser(response.user));
        apiService.saveTokens(response.accessToken, response.refreshToken);
      }
    } catch (err: any) {
      return err;
    }
  }

  return {loginUser};
}

export function useGetConstants() {
  const appDispatch = useAppDispatch();

  async function getConstants() {
    try {
      const response = await apiService.request<{
        success: boolean;
        constants: Constants;
      }>({
        method: 'GET',
        url: '/constants',
      });
      if (response.constants) {
        appDispatch(authActions.setConstants(response.constants));
      }
    } catch (error: any) {
      //
    }
  }

  return {getConstants};
}
