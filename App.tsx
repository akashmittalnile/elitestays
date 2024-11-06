import React from 'react';
import SignIn from './src/screens/Auth/SignIn';
import Splash from 'screens/Auth/Splash';
import Signup from 'screens/Auth/Signup';
import UserSetupCompleteScreen from 'screens/Auth/UserSetupCompleteScreen';
function App(): React.JSX.Element {
  return (
    <>
      <UserSetupCompleteScreen />
    </>
  );
}

export default App;
