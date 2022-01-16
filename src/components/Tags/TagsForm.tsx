import React, { useState } from 'react';
import styled from 'styled-components';

export type TagsFormProps = {
  addTag: any;
};

function TagsForm(props: TagsFormProps) {
  const [value, setValue] = useState('');

  const checkKeyDown = e => {
    if (e.code === 'Enter') e.preventDefault();
  };

  const handleSubmit = e => {
    e.preventDefault();
    e.stopPropagation();
    if (!value) return;
    props.addTag(value);
    setValue('');
  };
  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter after Writing tag"
        />
      </form>
    </>
  );
}

export default TagsForm;
