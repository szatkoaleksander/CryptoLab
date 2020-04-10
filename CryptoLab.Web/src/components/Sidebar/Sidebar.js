import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import cx from 'classnames';
import { routes } from '../../common/routes';
import { FaHeart, FaChevronDown } from 'react-icons/fa';

import { useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [coins, setCoins] = useState([]);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  const wallets = useSelector(state => state.walletsReducer.wallets);
  const isExpand = useSelector(state => state.sidebarReducer.isExpand);
  const st = isExpand ? styles.unvisible : cx(styles.visible, styles.scroll_block);

  const location = useLocation();

  useEffect(() => {
    if (wallets) {
      const result = wallets
        .map(item => item.currency.toUpperCase())
        .filter(item => item !== 'USD');

      setCoins(result);
    }
  }, [wallets]);

  return (
    <div className={cx(styles.wrapper, st)}>
      <div>
        <h1 className={cx('title has-text-white', styles.title)}>CryptoLab.</h1>
        <aside className="menu">
          <ul className="menu-list">
            <li>
              <NavLink
                className={cx(
                  location.pathname === routes.dashboard ? 'is-active' : '',
                  styles.link,
                )}
                to={routes.dashboard}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <a className={styles.link} onClick={() => setIsSubmenuOpen(!isSubmenuOpen)}>
                Market
                {/* <FaChevronDown
                  className={(styles.ic, isSubmenuOpen ? styles.not : styles.ic_active)}
                /> */}
              </a>
              <ul className={cx(isSubmenuOpen ? styles.show_submenu : styles.not_submenu)}>
                {coins.map(item => {
                  const route = `${routes.market}/${item}`;
                  return (
                    <li key={item}>
                      <NavLink
                        className={cx(location.pathname === route ? 'is-active' : '', styles.link)}
                        to={route}
                      >
                        {item}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li>
              <NavLink
                className={cx(location.pathname === routes.history ? 'is-active' : '', styles.link)}
                to={routes.history}
              >
                History
              </NavLink>
            </li>
            <li>
              <NavLink
                className={cx(location.pathname === routes.about ? 'is-active' : '', styles.link)}
                to={routes.about}
              >
                About
              </NavLink>
            </li>
          </ul>
        </aside>
        <div className={styles.about}>
          <p>
            Created with <FaHeart className={styles.about__icon} /> by
          </p>{' '}
          <a href="https://www.aleksanderszatko.com/">Alekander Szatko</a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
