import React, { useState, useEffect, useCallback } from 'react';
import { useCurrentWallet } from '@mysten/dapp-kit';
import { ConnectButton } from '@mysten/dapp-kit';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';
import Spinner from '../components/ui/Spinner';
import Alert from '../components/ui/Alert';

const LoginPage: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(Role.Fan);
  const { login, isLoading, error: authError } = useAuth();
  const { connectionStatus, currentWallet, isConnected, isConnecting, isDisconnected } = useCurrentWallet();
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const handleLoginAttempt = useCallback(async () => {
    // Reset connection error when attempting to login
    setConnectionError(null);
    
    const account = currentWallet?.accounts[0];
    
    // Check if account has zkLogin property with proper typing
    if (connectionStatus === 'connected' && account && 'zkLogin' in account && account.zkLogin) {
      // Type assertion for zkLogin object
      const zkLoginData = account.zkLogin as { jwt: string };
      
      console.log('Wallet connected, attempting backend login...');
      const payload = {
        idToken: zkLoginData.jwt,
        suiAddress: account.address,
        // For zkLogin, we don't need the private key as authentication is handled via JWT
        // If your backend specifically requires a private key, you'll need to generate an ephemeral one
        // But typically for zkLogin, the JWT is sufficient for authentication
        suiPrivateKey: '', // Placeholder to satisfy type requirements
        role: selectedRole,
      };
      await login(payload);
    } else if (connectionStatus === 'disconnected') {
      setConnectionError('Wallet is not connected. Please connect your wallet.');
    }
  }, [connectionStatus, currentWallet, selectedRole, login]);

  useEffect(() => {
    if (connectionStatus === 'connected' && !isLoading) {
      handleLoginAttempt();
    }
  }, [connectionStatus, isLoading, handleLoginAttempt]);

  const RoleSelector = () => (
    <div className="w-full max-w-md">
      <label className="block text-lg font-medium text-gray-200 mb-3 text-left">Select Your Role</label>
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setSelectedRole(Role.Fan)}
          className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
            selectedRole === Role.Fan
              ? 'border-sui-blue bg-sui-blue/10 text-white shadow-lg shadow-sui-blue/20'
              : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800'
          }`}
        >
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="text-xl font-bold">Fan</span>
            <p className="mt-2 text-sm text-gray-400 text-center">
              Discover and support your favorite artists
            </p>
          </div>
        </button>
        
        <button
          onClick={() => setSelectedRole(Role.Artist)}
          className={`p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
            selectedRole === Role.Artist
              ? 'border-sui-blue bg-sui-blue/10 text-white shadow-lg shadow-sui-blue/20'
              : 'border-gray-700 bg-gray-800/50 text-gray-300 hover:border-gray-600 hover:bg-gray-800'
          }`}
        >
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
            <span className="text-xl font-bold">Artist</span>
            <p className="mt-2 text-sm text-gray-400 text-center">
              Share your work and connect with fans
            </p>
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="mx-auto bg-gray-800 p-4 rounded-2xl w-24 h-24 flex items-center justify-center mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-sui-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
            </svg>
          </div>
          <h1 className="text-4xl font-extrabold text-white mb-3">Welcome to FAVE</h1>
          <p className="text-lg text-gray-400">
            Connect with your favorite artists and fans
          </p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-700 p-8">
          <RoleSelector />
          
          <div className="mt-10">
            <div className="h-16 flex items-center justify-center">
              {isLoading ? (
                <div className="flex flex-col items-center">
                  <Spinner />
                  <p className="mt-3 text-sm text-gray-400">Authenticating with server...</p>
                </div>
              ) : isConnecting ? (
                <div className="flex flex-col items-center">
                  <Spinner />
                  <p className="mt-3 text-sm text-gray-400">Connecting to wallet...</p>
                </div>
              ) : (
                <ConnectButton
                  onOpenChange={setIsConnectModalOpen}
                  connectText="Continue with Google"
                  className="w-full !bg-gradient-to-r !from-sui-blue !to-blue-600 hover:!from-blue-600 hover:!to-sui-blue !text-white !font-bold !py-4 !px-6 !rounded-xl !transition-all !transform hover:!scale-[1.02] !shadow-lg !shadow-sui-blue/30"
                />
              )}
            </div>

            {(authError || connectionError || isDisconnected) && (
              <div className="mt-6">
                <Alert 
                  message={authError || connectionError || "Wallet is disconnected. Please connect your wallet to continue."} 
                />
              </div>
            )}
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                By continuing, you agree to our{' '}
                <a href="#" className="text-sui-blue hover:underline">Terms of Service</a> and{' '}
                <a href="#" className="text-sui-blue hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;