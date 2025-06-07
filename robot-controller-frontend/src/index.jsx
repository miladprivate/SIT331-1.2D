import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain="dev-ejf04bdyn7zq4fwi.us.auth0.com"
    clientId="pbGWL6fY5cIvPPc7wn7aqb5d5jxjhiUZ"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
);
