import React, { useState } from 'react';
import cx from 'classnames';

const Settings = ({ isModalVisible, modalRef }) => {
    return (
      <div class={cx('modal', { 'is-active': isModalVisible })}>
        <div class="modal-background"></div>
        <div ref={modalRef} class="modal-card">
          <header class="modal-card-head">
            <p class="modal-card-title">Modal title</p>
            <button class="delete" aria-label="close"></button>
          </header>
          <section class="modal-card-body">
            <div class="tabs">
              <ul>
                <li class="is-active">
                  <a>Wallets</a>
                </li>
                <li>
                  <a>Account</a>
                </li>
      
              </ul>
            </div>
          </section>
          <footer class="modal-card-foot">
            <button class="button is-success">Save changes</button>
            <button class="button">Cancel</button>
          </footer>
        </div>
      </div>

      // <div class={cx('modal', { 'is-active': isModalVisible })}>
      //   <div class="modal-background">
      //     <div ref={modalRef} class="modal-content">
      //       TEST
      //     </div>
      //   </div>

      //   <button class="modal-close is-large" aria-label="close"></button>
      // </div>
    );
};

export default Settings;
