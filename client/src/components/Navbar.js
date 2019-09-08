import React, { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import CreateJarModal from './CreateJarModal';
import DeleteJarModal from './DeleteJarModal';
import { WithFirebase } from '../contexts/firebase/context';
import { history } from '../AppRouter';

const NavbarBase = props => {
  const logout = () => {
    props.firebase.signOut();
    history.push('/');
  };
  const isSignedIn = props.firebase.auth.currentUser;
  const location = history.location.pathname;

  const [isOpenCreateNewJarModal, setIsOpenCreateNewJarModal] = useState(false);
  const [isOpenDeleteJarModal, setIsOpenDeleteJarModal] = useState(false);

  const [showMainDropdownMenu, setShowMainDropdownMenu] = useState(false);
  const [showJarDropdownMenu, setShowJarDropdownMenu] = useState(false);

  const openNewJarModal = () => {
    props.setIsOpenFirstJarModal(false);
    setIsOpenCreateNewJarModal(true);
    setShowJarDropdownMenu(false);
  };

  const openDeleteJarModal = () => {
    setIsOpenDeleteJarModal(true);
    setShowJarDropdownMenu(false);
  };

  const toggleShowJars = () => {
    setShowJarDropdownMenu(showJarDropdownMenu === true ? false : true);
  };

  const toggleMainMenu = () => {
    setShowMainDropdownMenu(showMainDropdownMenu === true ? false : true);
  };

  return (
    <div className='navbar'>
      {isSignedIn && (
        <div className='navbar-headers'>
          <ul>
            <li className='main-menu-icon'>
              <button
                className='main-menu-dropdown-button'
                onClick={toggleMainMenu}
              >
                <i class='fa fa-bars bars' />
              </button>
              {showMainDropdownMenu && (
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
              )}
            </li>
          </ul>

          {(location === '/' || location === '/myjars') && (
            <div>
              <ul id='select-jar-menu'>
                <li>
                  <button
                    className='jar-dropdown-button'
                    onClick={toggleShowJars}
                  >
                    Jars
                    {showJarDropdownMenu ? (
                      <i class='fa fa-angle-up arrow' />
                    ) : (
                      <i class='fa fa-angle-down arrow' />
                    )}
                  </button>
                  {showJarDropdownMenu && (
                    <ul>
                      {props.jars &&
                        props.jars.length > 0 &&
                        props.jars.map(jar => (
                          <li>
                            <Link
                              to='#'
                              onClick={() => {
                                props.changeJar(jar.jarName);
                                setShowJarDropdownMenu(false);
                              }}
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
                          + Add A Jar
                        </Link>
                      </li>
                      <li>
                        <Link
                          to='#'
                          onClick={openDeleteJarModal}
                          className='navbar-link'
                        >
                          - Delete A Jar
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </div>
          )}
          <button onClick={logout} className='logout-button'>
            Log Out
          </button>
          <Modal
            isOpen={isOpenCreateNewJarModal}
            className='new-jar-modal modal'
          >
            <CreateJarModal
              setIsOpenCreateNewJarModal={setIsOpenCreateNewJarModal}
              createJar={props.createJar}
            />
          </Modal>
          <Modal
            className='delete-jar-modal modal'
            isOpen={isOpenDeleteJarModal}
          >
            <DeleteJarModal
              setIsOpenDeleteJarModal={setIsOpenDeleteJarModal}
              jars={props.jars}
              deleteJar={props.deleteJar}
            />
          </Modal>
        </div>
      )}
    </div>
  );
};

const Navbar = WithFirebase(NavbarBase);

export default Navbar;
