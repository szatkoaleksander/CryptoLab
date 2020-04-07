import React, { useState } from 'react';
import styles from './Root.module.scss';
import cx from 'classnames';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

const Root = ({history}) => {
  const [isLoginTab, setIsLoginTab] = useState(true);

  return (
    <div className={styles.wrapper}>
      <section className="hero is-fullheight">
        <h1 className={cx('title has-text-white', styles.logo)}>CryptoLab.</h1>
        <p className={cx('subtitle', styles.sub)}>
          Bitcoin is a technological tour de force. – Bill Gates
        </p>
        <div className={cx('hero-body p-t-none', styles.hero_mod)}>
          <div className="container">
            <div className="columns is-centered">
              <div
                className={cx(
                  'column is-5-tablet is-4-desktop is-3-widescreen has-background-white',
                  styles.panel,
                )}
              >
                <div className="tabs is-centered is-boxed is-fullwidth">
                  <ul>
                    <li
                      className={cx(isLoginTab && 'is-active')}
                      onClick={() => setIsLoginTab(!isLoginTab)}
                    >
                      <a>Login</a>
                    </li>
                    <li
                      className={cx(!isLoginTab && 'is-active')}
                      onClick={() => setIsLoginTab(!isLoginTab)}
                    >
                      <a>Register</a>
                    </li>
                  </ul>
                </div>
                {isLoginTab ? <Login history={history} /> : <Register />}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Root;
