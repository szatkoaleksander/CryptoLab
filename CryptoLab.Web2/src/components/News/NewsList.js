import React from 'react';
import News from './News';

const NewsList = ({ news }) =>
  news.map(item => (
    <News
      id={item.id}
      key={item.id}
      imageurl={item.imageurl}
      url={item.url}
      title={item.title}
      body={item.body}
      published_on={item.published_on}
      categories={item.categories}
      source_info={item.source_info}
    />
  ));

export default NewsList;
