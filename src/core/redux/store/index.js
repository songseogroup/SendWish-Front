import { configureStore } from '@reduxjs/toolkit';
import { Provider,  useDispatch, useSelector } from 'react-redux';

import {  persistReducer, persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import storage from 'redux-persist/lib/storage';

import { rootReducers } from '../slices/index';

const persistConfig = {
    key: 'store',
    storage,
  };

const persistedReducer = persistReducer(persistConfig, rootReducers);

// Configure Redux store
const store = configureStore({
    reducer: persistedReducer,
   
  });
// Use `useDispatch` and `useSelector` hooks throughout the app
const usedispatch = useDispatch;
const useselector = useSelector;
// Export Redux store, Provider, useDispatch, useSelector, persistStore, and PersistGate
export { store, Provider, usedispatch, useselector, persistStore, PersistGate };
