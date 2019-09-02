import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import CreateJarModal from '../components/CreateJarModal';
import { WithFirebase } from '../contexts/firebase/context';
import { history } from '../AppRouter';

const NavbarBase = props => {
  const logout = () => props.firebase.signOut();
  const isSignedIn = props.firebase.auth.currentUser;
  const location = history.location.pathname;

  const [createNewJarModalIsOpen, setCreateNewJarModalIsOpen] = useState(false);

  const openNewJarModal = () => {
    props.setIsOpenFirstJarModal(false);
    setCreateNewJarModalIsOpen(true);
  };

  // const openDeleteJarModal = () => {
  // };
  return (
    <div className='navbar'>
      {isSignedIn && (
        <div className='navbar-headers'>
          <ul>
            <li className='main-menu-icon'>
              <i class='fa fa-bars bars' />
              <ul>
                <li>
                  <Link to='/about' className='navbar-link'>
                    About
                  </Link>
                </li>
                <li>
                  <Link to='/contact' className='navbar-link'>
                    Contact
                  </Link>
                </li>
              </ul>
            </li>
          </ul>

          {(location === '/' || location === '/myjars') && (
            <div>
              <ul id='select-jar-menu'>
                <li>
                  Jars
                  <i class='fa fa-angle-down arrow' />
                  <ul>
                    {props.jars &&
                      props.jars.length > 0 &&
                      props.jars.map(jar => (
                        <li>
                          <Link
                            to='#'
                            onClick={() => props.changeJar(jar.jarName)}
                            className='jar-select-link navbar-link'
                          >
                            {jar.jarName}'s Jar
                          </Link>
                        </li>
                      ))}
                    <li>
                      <Link
                        to='#'
                        onClick={openNewJarModal}
                        className='navbar-link'
                      >
                        Add A Jar
                      </Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
          <button onClick={logout} className='logout-button'>
            Log Out
          </button>

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

// <li>
// <Link
//   to='#'
//   onClick={openDeleteJarModal}
//   className='navbar-link'
// >
//   Delete A Jar
// </Link>
// </li>
