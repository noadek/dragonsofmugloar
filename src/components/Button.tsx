import React from 'react';

interface IProps {
  text: string;
  disabled?: boolean;
  handleClick(...arg: any): any;
}

function Button({ text, handleClick, disabled }: IProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}

export default Button;
