import {User, UserAddress} from '@modules/onboard/types';

import apiService from '@modules/config/api/service';
import {authActions} from '@modules/onboard/store';
import {useAppDispatch} from '@store/hooks';
import {useState} from 'react';

export function useUpdateUser() {
  const appDispatch = useAppDispatch();
  const [updateUserLoading, setUpdateUserLoading] = useState(false);

  async function updateUser(variables: {
    phone: User['phone'];
    address: UserAddress[];
  }) {
    try {
      setUpdateUserLoading(true);
      appDispatch(authActions.updateUser(variables));

      const response = await apiService.request<{success: boolean}>({
        method: 'POST',
        url: '/user/updateUser',
        data: variables,
      });

      if (!response.success) {
        throw new Error('Something went wrong');
      }
    } catch (error: any) {
      const oldUser = {};
      Object.keys(variables).forEach(key => {
        (oldUser as any)[key] = undefined;
      });
      appDispatch(authActions.updateUser(oldUser));
    } finally {
      setUpdateUserLoading(false);
    }
  }

  return {updateUser, updateUserLoading};
}
