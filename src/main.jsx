import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Provider, store, PersistGate, persistStore } from "./core/redux/store/index.js";
const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <PersistGate loading={null} persistor={persistor}>
    <GoogleOAuthProvider clientId={"805811684044-j94lfgcgqoto23qkgr4nfb96i65m5qph.apps.googleusercontent.com"}>
    <App />
    </GoogleOAuthProvider>
    </PersistGate>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
