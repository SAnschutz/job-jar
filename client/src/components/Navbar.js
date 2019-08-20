import React from 'react';
import { Link } from 'react-router-dom';

import { WithFirebase } from '../contexts/firebase/context';

const NavbarBase = props => {
  const logout = () => props.firebase.signOut();
  const selectJar = () => console.log('select different jar');
  const createJar = () => console.log('create new jar');
  return (
    <div className='navbar'>
      <Link to='#' onClick={logout}>
        Log Out
      </Link>
      <Link to='#' onClick={selectJar}>
        Switch Jars
      </Link>
      <select>
        <option value='Shela'>Shela's Jar</option>
        <option value='Kelly'>Kelly's Jar</option>
      </select>
      <Link to='#' onClick={createJar}>
        Create New Jar
      </Link>
    </div>
  );
};

const Navbar = WithFirebase(NavbarBase);

export default Navbar;
