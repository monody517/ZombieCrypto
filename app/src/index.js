import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Profile from './App';
import { WagmiConfig } from 'wagmi';
import config from './wagmiConfig.ts';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
      <WagmiConfig config={config}>
        <Profile />
      </WagmiConfig>
  </React.StrictMode>


);
