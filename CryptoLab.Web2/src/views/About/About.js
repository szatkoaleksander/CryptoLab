import React from 'react';

const About = () => {
  return (
    <section className="section p-t-md">
      <div className="container box">
        <div className="columns">
          <div className="column">
            <h1 className="title">Created by Aleksander Szatko</h1>
            <p>
              My website: <a href="https://www.aleksanderszatko.com/">Alekander Szatko</a>
            </p>
            <p>
              My linkedin:
              <a href="https://www.linkedin.com/in/aleksander-szatko-256382159/">linkedin</a>
            </p>
            <p>
              My github: <a href="https://github.com/szatkoaleksander">szatkoaleksander</a>
            </p>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <h1 className="title">Application created with:</h1>
            <ul>
              <li>https://min-api.cryptocompare.com/</li>
              <li>https://min-api.cryptocompare.com/</li>
              <li>https://min-api.cryptocompare.com/</li>
              <li>https://min-api.cryptocompare.com/</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
