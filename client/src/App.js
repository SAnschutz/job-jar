import React from 'react';
import Logo from './components/Logo';
import Navbar from './components/Navbar';
import Jar from './components/Jar';

import '../src/styles/styles.scss';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Logo />
      <Jar />
    </div>
  );
}

export default App;
