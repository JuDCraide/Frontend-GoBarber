import React from 'react';
import GlobalStyle from './styles/global';
import SignIn from './pages/SingIn';
// import SignUp from './pages/SingUp';

import { AuthProvider } from './hooks/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SignIn />
    </AuthProvider>
    <GlobalStyle />
  </>
);

export default App;
