import React from 'react';
import { createRoot } from 'react-dom/client';
import { getFullnodeUrl } from '@mysten/sui/client';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
// Fix: Use namespace import for @tanstack/react-query to resolve potential module resolution issues.
import * as tanstackQuery from '@tanstack/react-query';
import '@mysten/dapp-kit/dist/index.css';
// Import our custom CSS
import './dist/output.css';

import App from './App';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new tanstackQuery.QueryClient();
// Simplified network configuration to focus on devnet
const networks = {
  devnet: { url: getFullnodeUrl('devnet') },
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <tanstackQuery.QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="devnet">
        {/* Added autoConnect prop which might help with connection issues */}
        <WalletProvider autoConnect={true}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </WalletProvider>
      </SuiClientProvider>
    </tanstackQuery.QueryClientProvider>
  </React.StrictMode>
);