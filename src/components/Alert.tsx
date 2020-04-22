import React from 'react';

interface IProp {
  show: boolean;
  message: string;
  type: string;
  close: any;
}

function Alert({
  show, type, message, close,
}: IProp): JSX.Element {
  return (
    <div className={`alert-top ${show ? '' : 'hidden'}`}>
      <div
        id="alert"
        className={`alert dismissible ${type === 'danger'
          ? 'alert-danger' : 'alert-primary'}`}
        role="alert"
      >
        {message}
        <span className="btn-close" onClick={close} role="button">X</span>
      </div>
    </div>
  );
}

export default Alert;
