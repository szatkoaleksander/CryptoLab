import React, { useState } from 'react';
import { signInAction } from '../../redux/actions/auth';
import { useDispatch } from 'react-redux';
import styles from './Login.module.scss';
import cx from 'classnames';

const Login = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async e => {
    e.preventDefault();
    setIsLoading(true);
    dispatch(signInAction(email, password, history));
  };

  return (
    <form onSubmit={handleLogin} className={styles.wrapper}>
      <div className="field">
        <div className="control">
          <input
            className={cx('input', styles.input)}
            value={email}
            onChange={e => setEmail(e.target.value)}
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div className="field m-t-md">
        <div className="control">
          <input
            className={cx('input', styles.input)}
            value={password}
            onChange={e => setPassword(e.target.value)}
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div className="field t m-t-xs">
        <p className={cx("control", styles.button__right)}>
          <button className={cx('button', styles.button, isLoading && 'is-loading')}>Login</button>
        </p>
      </div>
    </form>
  );
};

export default Login;
