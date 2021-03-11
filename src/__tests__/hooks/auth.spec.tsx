import { renderHook } from '@testing-library/react-hooks';
import MockAdapter from 'axios-mock-adapter';

import { AuthProvider, useAuth } from '../../hooks/auth';
import api from '../../services/api';

const apiMock = new MockAdapter(api);

describe('AuthHook', () => {
  it('Should be able to sign in', async () => {
    const apiRes = {
      user: {
        id: 'user-123',
        name: 'Julia DC',
        email: 'juliadc@hotmail.com',
      },
      token: 'token-123',
    };

    apiMock.onPost('sessions').reply(200, apiRes);

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'juliadc@hotmail.com',
      password: '123456',
    });

    await waitForNextUpdate();

    expect(result.current.user.email).toEqual('juliadc@hotmail.com');
    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:token', apiRes.token);
    expect(setItemSpy).toHaveBeenCalledWith(
      '@GoBarber:user',
      JSON.stringify(apiRes.user),
    );
  });
});
