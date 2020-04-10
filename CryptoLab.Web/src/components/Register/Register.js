import React, { useState } from 'react';
import axios from 'axios';
import cx from 'classnames';
import styles from './Register.module.scss';
import { toast } from 'react-toastify';

const Register = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleRegister = async e => {
    e.preventDefault();
    setIsLoading(false);
    setIsError(false);

    try {
      setIsLoading(true);
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/users/register`, {
        email: email,
        username: username,
        password: password,
        confirmPassword: confirmPassword,
      });

      toast.info('Account has been created! Now you can try to login.');
    } catch (e) {
      setIsError(true);
      console.error(e);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleRegister} className={styles.wrapper}>
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
            value={username}
            onChange={e => setUsername(e.target.value)}
            name="username"
            type="text"
            placeholder="Username"
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
      <div className="field m-t-md">
        <div className="control">
          <input
            className={cx('input', styles.input)}
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
          />
        </div>
      </div>
      <div className="field m-t-xs">
        <p className={cx('control', styles.button__right)}>
          <button className={cx('button', styles.button, isLoading && 'is-loading')}>
            Register
          </button>
        </p>
      </div>
      {isError && <p className="has-text-danger">Problem with create new account</p>}
    </form>
  );
};

export default Register;
