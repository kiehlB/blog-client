import React, { useCallback, useState } from 'react';

import styled, { css } from 'styled-components';
import { colors } from '../../lib/styles/colors';

export type LabelInputProps = {
  label?: string;
  placeholder?: string;
  name?: string;
  value?: any;
  onChange?: React.ChangeEventHandler;
  type?: string;
  className?: string;
};

function LabelInput(props: LabelInputProps) {
  const [focus, setFocus] = useState(false);

  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setFocus(false);
  }, []);

  return (
    <>
      <input
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        value={props.value}
        placeholder={props.placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        {...props}
      />
    </>
  );
}

export default LabelInput;
