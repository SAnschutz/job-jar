import React from 'react';
import { Link } from 'react-router-dom';

import { WithFirebase } from '../contexts/firebase/context';

const NavbarBase = props => {
  const logout = () => props.firebase.signOut();
  const isSignedIn = props.firebase.auth.currentUser;

  const createJar = () => {
    console.log('create new jar');
  };

  // const changeJar = e => {

  // };

  return (
    <div>
      {isSignedIn && (
        <div className='navbar'>
          {' '}
          <label for='select-jar-menu'>Your Jars:</label>
          <select id='select-jar-menu' onChange={props.changeJar}>
            {props.jars.length > 0 ? (
              props.jars.map(jar => {
                return <option value={jar.jarName}>{jar.jarName}'s Jar</option>;
              })
            ) : (
              <option value=''>No jars</option>
            )}
          </select>
          <Link to='#' onClick={createJar}>
            Create New Jar
          </Link>
          <Link to='#' onClick={logout}>
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
};

const Navbar = WithFirebase(NavbarBase);

export default Navbar;
