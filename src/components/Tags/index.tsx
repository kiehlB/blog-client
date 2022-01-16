import React from 'react';
import styled from 'styled-components';

const TagsTap = styled.div`
  background: none repeat scroll 0 0 #1fb6ff;
  border-radius: 2px;
  color: #fff;
  padding: 0.3em;
  float: left;

  margin-right: 1rem;

  .tag-delete-button {
    cursor: pointer;
    display: inline-block;
    padding-left: 0.5rem;
    &:hover {
      color: #222222;
    }
  }
`;

export type TagsProps = {
  tags: any;
  deleteTag: (e: string) => void;
  index: any;
};

function Tags(props: TagsProps) {
  return (
    <>
      <TagsTap>
        {props.tags?.text}
        <span className="tag-delete-button" onClick={() => props.deleteTag(props.index)}>
          x
        </span>
      </TagsTap>
    </>
  );
}

export default Tags;
