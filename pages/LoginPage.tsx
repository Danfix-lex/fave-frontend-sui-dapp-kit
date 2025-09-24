
import React, { useState, useEffect, useCallback } from 'react';
// Fix: 'useWallet' is deprecated. Replaced with 'useCurrentWallet'.
import { useCurrentWallet } from '@mysten/dapp-kit';
import { ConnectButton } from '@mysten/dapp-kit';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(Role.User);
  const { login, isLoading, error: authError } = useAuth();
  // Fix: 'useWallet' is deprecated. Replaced with 'useCurrentWallet'.
  // Fix: Destructure connectionStatus and currentWallet from useCurrentWallet hook. The 'error' property is no longer available.
  const { connectionStatus, currentWallet } = useCurrentWallet();

  const handleLoginAttempt = useCallback(async () => {
    // Fix: Access the user's account from the `accounts` array, as `currentWallet.account` is deprecated.
    const account = currentWallet?.accounts[0];
    // Fix: Use connectionStatus instead of status and derive account from currentWallet.
    if (connectionStatus === 'connected' && account && 'zkLogin' in account && account.zkLogin) {
      console.log('Wallet connected, attempting backend login...');
      const payload = {
        idToken: account.zkLogin.jwt,
        suiAddress: account.address,
        role: selectedRole,
      };
      await login(payload);
    }
  }, [connectionStatus, currentWallet, selectedRole, login]);

  useEffect(() => {
    // This effect triggers the backend login ONLY when the wallet connects.
    // The `isLoading` check prevents re-triggering if the component re-renders during login.
    // Fix: Use connectionStatus instead of status.
    if (connectionStatus === 'connected' && !isLoading) {
      handleLoginAttempt();
    }
    // Fix: Add handleLoginAttempt to dependency array and remove eslint-disable comment.
  }, [connectionStatus, isLoading, handleLoginAttempt]);


  const RoleSelector = () => (
    <div className="flex items-center space-x-4">
      <label className="text-lg font-medium text-gray-300">Select Role:</label>
      <div className="flex rounded-lg bg-gray-800 p-1">
        {(Object.keys(Role) as Array<keyof typeof Role>).map((roleKey) => (
          <button
            key={Role[roleKey]}
            onClick={() => setSelectedRole(Role[roleKey])}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 ${
              selectedRole === Role[roleKey]
                ? 'bg-sui-blue text-white'
                : 'bg-transparent text-gray-400 hover:bg-gray-700'
            }`}
          >
            {roleKey}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
      <h2 className="text-4xl font-extrabold mb-4 text-white">Welcome</h2>
      <p className="text-lg text-gray-400 mb-8 max-w-md">
        Please select your role and sign in with your Google account to access the application.
      </p>

      <div className="w-full flex flex-col items-center space-y-6">
        <RoleSelector />
        
        <div className="h-12 flex items-center justify-center">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <Spinner />
              <p className="mt-2 text-sm text-gray-400">Authenticating with server...</p>
            </div>
          ) : (
            <ConnectButton 
              connectText="Sign In with Google" 
              className="!bg-sui-blue hover:!bg-blue-500 !text-white !font-bold !py-3 !px-8 !rounded-lg !transition-transform !transform hover:!scale-105"
            />
          )}
        </div>

        {/* fix: Removed walletError as it is no longer provided by useCurrentWallet. */}
        {authError && (
          <div className="mt-4 w-full max-w-sm">
            <Alert message={authError} />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;