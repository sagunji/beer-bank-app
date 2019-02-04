import React from 'react';
import { PropTypes } from 'prop-types';

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none';

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <button className="btn" onClick={handleClose}>
          <i className="fa fa-close">close</i>
        </button>
        {children}
      </section>
    </div>
  );
};

Modal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.object
};

export default Modal;
