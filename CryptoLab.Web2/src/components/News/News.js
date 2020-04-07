import React from 'react';
import moment from 'moment';

const News = ({ id, imageurl, url, title, body, published_on, categories, source_info }) => (
  <div className="box" key={id}>
    <article className="media">
      <div className="media-left">
        <figure className="image is-64x64">
          <img src={imageurl} alt="Image" />
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <strong>
            <a href={url} target="_blank">
              {title}
            </a>
          </strong>
          <p>{body}</p>
        </div>
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <p>Source: {source_info.name}</p>
            </div>
          </div>
          <div className="level-right">
            <p>Added at: {moment.unix(published_on).format('DD-MM-YYYY')}</p>
          </div>
        </div>
      </div>
    </article>
  </div>
);

export default News;
