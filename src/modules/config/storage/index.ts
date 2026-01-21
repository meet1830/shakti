import {MMKV} from 'react-native-mmkv';

class StorageService {
  private static instance: StorageService;
  private storage: MMKV;

  private constructor() {
    this.storage = new MMKV();
  }

  public static getInstance(): StorageService {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }
    return StorageService.instance;
  }

  set(key: string, value: string | number | boolean) {
    this.storage.set(key, value);
  }

  getString(key: string): string | undefined {
    return this.storage.getString(key);
  }

  setObject<T>(key: string, value: T) {
    try {
      this.storage.set(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting object ${key}`, e);
    }
  }

  getObject<T>(key: string): T | null {
    try {
      const json = this.storage.getString(key);
      return json ? JSON.parse(json) : null;
    } catch (e) {
      console.error(`Error getting object ${key}`, e);
      return null;
    }
  }

  delete(key: string) {
    this.storage.delete(key);
  }

  clearAll() {
    this.storage.clearAll();
  }
}

export const storage = StorageService.getInstance();
