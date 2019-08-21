import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import CreateJarModal from '../components/CreateJarModal';

import { WithFirebase } from '../contexts/firebase/context';

const NavbarBase = props => {
  const logout = () => props.firebase.signOut();
  const isSignedIn = props.firebase.auth.currentUser;

  console.log(props, ' from Navbar');

  const [createNewJarModalIsOpen, setCreateNewJarModalIsOpen] = useState(false);

  const openNewJarModal = () => setCreateNewJarModalIsOpen(true);

  return (
    <div>
      {isSignedIn && (
        <div className='navbar'>
          {' '}
          <label for='select-jar-menu'>Your Jars:</label>
          <select id='select-jar-menu' onChange={props.changeJar}>
            {props.jars && props.jars.length > 0 ? (
              props.jars.map(jar => {
                return <option value={jar.jarName}>{jar.jarName}'s Jar</option>;
              })
            ) : (
              <option value=''>No jars</option>
            )}
          </select>
          <Link to='#' onClick={openNewJarModal}>
            Create New Jar
          </Link>
          <Link to='#' onClick={logout}>
            Log Out
          </Link>
          <Modal isOpen={createNewJarModalIsOpen}>
            <CreateJarModal
              setCreateNewJarModalIsOpen={setCreateNewJarModalIsOpen}
              createJar={props.createJar}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

const Navbar = WithFirebase(NavbarBase);

export default Navbar;
