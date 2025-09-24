
import React from 'react';
// Fix: 'useWallet' is deprecated. Replaced with 'useCurrentWallet'. ConnectButton is replaced with a standard button for logout.
// Fix: Use the 'useDisconnectWallet' hook to handle wallet disconnection.
import { useDisconnectWallet } from '@mysten/dapp-kit';
import { useAuth } from '../hooks/useAuth';

const DashboardPage: React.FC = () => {
  const { user, logout: appLogout } = useAuth();
  // Fix: 'useWallet' is deprecated. Replaced with 'useCurrentWallet'.
  // Fix: Get the disconnect function from the 'useDisconnectWallet' hook.
  const { mutate: disconnect } = useDisconnectWallet();

  const handleLogout = () => {
    appLogout();
    disconnect();
  };

  const InfoCard = ({ label, value, isAddress = false }: { label: string, value: string | undefined | null, isAddress?: boolean }) => (
    <div className="bg-gray-800 p-4 rounded-lg">
      <p className="text-sm text-gray-400 mb-1">{label}</p>
      {isAddress ? (
         <p className="text-lg font-mono break-all text-sui-blue">{value || 'N/A'}</p>
      ) : (
         <p className="text-lg font-semibold text-white">{value || 'N/A'}</p>
      )}
    </div>
  );

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-gray-800/50 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm">
      <h2 className="text-4xl font-extrabold text-white mb-6">Dashboard</h2>
      <p className="text-lg text-gray-300 mb-8">You have successfully authenticated.</p>

      <div className="space-y-4 mb-8">
        <InfoCard label="Sui Address" value={user?.suiAddress} isAddress={true} />
        <InfoCard label="Assigned Role" value={user?.role} />
      </div>
      
      <div className="flex justify-center">
        {/* Fix: Replaced ConnectButton with a standard button for logout to handle custom logic. */}
        {/* The 'onDisconnect' prop is not supported on the new ConnectButton component. */}
        <button
          onClick={handleLogout}
          className="!bg-red-600 hover:!bg-red-700 !text-white !font-bold !py-3 !px-8 !rounded-lg !transition-transform !transform hover:!scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;
