import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import { MdMenu } from 'react-icons/md';
import styles from './Navbar.module.scss';
import userIcon from '../../assets/user.png';
import { useDispatch } from 'react-redux';
import { signOutAction } from '../../redux/actions/auth';
import { Link } from 'react-router-dom';
import { useDetectOutsideClick } from '../../hooks/useDetectOutsideClick';
import Settings from '../Settings/Settings';

const Navbar = () => {
  const [isModalVisible, setModalVisibility] = useState(false);
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  useDetectOutsideClick(modalRef, setModalVisibility);

  return (
    <nav
      className={cx('navbar is-light', styles.wrapper)}
      role="navigation"
      aria-label="main navigation"
    >
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <MdMenu className="is-hidden-tablet" onClick={() => dispatch({ type: 'EXPAND' })} />
          </div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="navbar-item has-dropdown is-hoverable">
              <img src={userIcon} alt="user" />

              <div className="navbar-dropdown is-boxed is-right">
                <div className="navbar-item" onClick={() => setModalVisibility(true)}>
                  Settings
                </div>
                <hr className="navbar-divider" />
                <Link className="navbar-item" to="/login" onClick={() => dispatch(signOutAction())}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Settings isModalVisible={isModalVisible} modalRef={modalRef}/>
    </nav>
  );
};

export default Navbar;
