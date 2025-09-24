
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4 font-sans">
      <header className="absolute top-0 left-0 w-full p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-sui-blue">Sui Auth Integrator</h1>
      </header>
      <main className="w-full max-w-2xl">
        {children}
      </main>
      <footer className="absolute bottom-0 w-full text-center p-4 text-gray-500 text-sm">
        Powered by Sui Dapp Kit & Gemini
      </footer>
    </div>
  );
};

export default Layout;
