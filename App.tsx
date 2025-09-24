
import React from 'react';
import Layout from './components/Layout';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  const { sessionToken } = useAuth();

  return (
    <Layout>
      {sessionToken ? <DashboardPage /> : <LoginPage />}
    </Layout>
  );
}

export default App;
