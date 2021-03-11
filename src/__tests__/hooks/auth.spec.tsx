import { renderHook } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/auth';

describe('AuthHook', () => {
  it('Should be able to sign in', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider,
    });

    result.current.signIn({
      email: 'juliadc@hotmail.com',
      password: '123456',
    });

    expect(result.current.user.email).toEqual('juliadc@hotmail.com');
  });
});
