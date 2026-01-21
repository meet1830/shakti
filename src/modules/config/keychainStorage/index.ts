import * as Keychain from 'react-native-keychain';

import {SecureStorageKey} from './types';

class KeychainStorage {
  setItem(username: SecureStorageKey, password: string) {
    Keychain.setInternetCredentials(username, username, password);
  }

  getItem = async (server: SecureStorageKey) => {
    const result = await Keychain.getInternetCredentials(server);
    if (result) {
      return result.password;
    }
    return false;
  };

  delete(server: SecureStorageKey) {
    Keychain.resetInternetCredentials({server});
  }
}

export const secureStore = new KeychainStorage();
