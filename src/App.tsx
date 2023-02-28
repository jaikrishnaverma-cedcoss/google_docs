

import React from 'react';
import { Provider } from 'react-redux';
import './App.css';
import { Store } from './components/features/store';
import { Home } from './components/Home';

function App() {

  return (
    <>
    <Provider store={Store}>
    <Home/>
    </Provider>
    </>
  );
}

export default App;
