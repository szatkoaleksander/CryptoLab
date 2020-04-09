import React, { useState } from 'react';
import cx from 'classnames';

const Settings = ({ isModalVisible, modalRef }) => {
    return (
      <div className={cx('modal', { 'is-active': isModalVisible })}>
        <div className="modal-background"></div>
        <div ref={modalRef} className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Modal title</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
            <div className="tabs">
              <ul>
                <li className="is-active">
                  <a>Wallets</a>
                </li>
                <li>
                  <a>Account</a>
                </li>
      
              </ul>
            </div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-success">Save changes</button>
            <button className="button">Cancel</button>
          </footer>
        </div>
      </div>
    );
};

export default Settings;
