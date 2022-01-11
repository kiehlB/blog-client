import React from 'react';
import { CompositeDecorator } from 'draft-js';

const Link = ({ entityKey, contentState, children }) => {
  const { url } = contentState.getEntity(entityKey).getData();

  return (
    <a href={url} style={{ color: '#2996da' }}>
      {children}
    </a>
  );
};

const Img = ({ entityKey, contentState }) => {
  const { src } = contentState.getEntity(entityKey).getData();
  const resizeData = entityKey ? contentState.getEntity(entityKey).data.width : {};
  const resizeData2 = resizeData * 7;
  return (
    <div
      style={{
        width: '100%',
      }}>
      <img
        src={src}
        style={{
          border: '1px solid red',
          width: '100%',
        }}
        alt="img"
      />
    </div>
  );
};

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();

    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

const findLinkEntitiesImg = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();

    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'IMAGE';
  }, callback);
};

const createLinkDecorator = () =>
  new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
    {
      strategy: findLinkEntitiesImg,
      component: Img,
    },
  ]);

export default createLinkDecorator;
