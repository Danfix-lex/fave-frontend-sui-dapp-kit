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
    <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      {isAddress ? (
         <p className="text-lg font-mono break-all text-sui-blue">{value || 'N/A'}</p>
      ) : (
         <p className="text-lg font-semibold text-white">{value || 'N/A'}</p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center py-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-2">Welcome back to your FAVE account</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors border border-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>

        {/* User Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <InfoCard 
            label="Account Address" 
            value={user?.suiAddress} 
            isAddress={true} 
          />
          <InfoCard 
            label="User Role" 
            value={user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'N/A'} 
          />
        </div>

        {/* Main Content Area */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700 p-8 mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gray-700 p-3 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sui-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Get Started</h2>
              <p className="text-gray-400">Explore features based on your role</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
              <div className="bg-gray-700 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sui-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Discover</h3>
              <p className="text-gray-400 text-sm">
                {user?.role === 'artist' 
                  ? 'Share your latest work with fans' 
                  : 'Find and support your favorite artists'}
              </p>
            </div>
            
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
              <div className="bg-gray-700 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sui-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
              <p className="text-gray-400 text-sm">
                {user?.role === 'artist' 
                  ? 'Engage with your fanbase' 
                  : 'Connect with other fans and artists'}
              </p>
            </div>
            
            <div className="bg-gray-800/30 p-6 rounded-xl border border-gray-700 hover:border-gray-600 transition-all">
              <div className="bg-gray-700 p-3 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sui-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Analytics</h3>
              <p className="text-gray-400 text-sm">
                {user?.role === 'artist' 
                  ? 'Track your performance and growth' 
                  : 'See your engagement and activity'}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="bg-gray-800/30 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm">Connections</p>
            <p className="text-2xl font-bold text-white mt-1">12</p>
          </div>
          <div className="bg-gray-800/30 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm">Activity</p>
            <p className="text-2xl font-bold text-white mt-1">42</p>
          </div>
          <div className="bg-gray-800/30 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm">Notifications</p>
            <p className="text-2xl font-bold text-white mt-1">3</p>
          </div>
          <div className="bg-gray-800/30 p-5 rounded-xl border border-gray-700">
            <p className="text-gray-400 text-sm">Messages</p>
            <p className="text-2xl font-bold text-white mt-1">7</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;