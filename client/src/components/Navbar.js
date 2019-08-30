import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import CreateJarModal from '../components/CreateJarModal';

import { WithFirebase } from '../contexts/firebase/context';

const NavbarBase = props => {
  const logout = () => props.firebase.signOut();
  const isSignedIn = props.firebase.auth.currentUser;
  console.log(isSignedIn, 'from navbar');

  const [createNewJarModalIsOpen, setCreateNewJarModalIsOpen] = useState(false);

  const openNewJarModal = () => {
    props.setIsOpenFirstJarModal(false);
    setCreateNewJarModalIsOpen(true);
  };
  return (
    <div>
      {isSignedIn && (
        <div className='navbar'>
          <label className='change-jar-label'>Change Jar:</label>
          <select id='select-jar-menu' onChange={props.changeJar}>
            <option disabled selected value=''>
              Choose Jar
            </option>
            {props.jars && props.jars.length > 0 ? (
              props.jars.map(jar => {
                return (
                  <option value={jar.jarName} key={jar.jarName}>
                    {jar.jarName}'s Jar
                  </option>
                );
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
          <Modal
            isOpen={createNewJarModalIsOpen}
            className='new-jar-modal modal'
          >
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
