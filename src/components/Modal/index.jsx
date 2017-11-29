import React from 'react';
import PropTypes from 'prop-types';
import $ from 'jquery';
class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.reference = (node) => {
      this.node = node;
      if (this.props.reference) this.props.reference(node);
    };
  }
  componentDidMount() {
    if (this.props.onShowModal) {
      $(this.node).on('shown.bs.modal', this.props.onShowModal);
    }
    if (this.props.onHideModal) {
      $(this.node).on('hidden.bs.modal', this.props.onHideModal);
    }
  }
  render() {
    const modalSize = this.props.modalSize ? this.props.modalSize : '';
    const style = this.props.width ? { width: this.props.width } : {};
    return (<div
      className="modal fade"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
      id={this.props.id}
      ref={this.reference}
      style={{ fontSize: '14px', textAlign: 'start' }}
    >
      <div className={'modal-dialog '.concat(modalSize)} style={style}>
        <div className="modal-content" style={{ paddingTop: '10px' }}>
          {this.props.children}
        </div>
      </div>
    </div>);
  }
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.element]),
  id: PropTypes.string.isRequired,
  width: PropTypes.string,
  modalSize: PropTypes.string,
  onShowModal: PropTypes.func,
  onHideModal: PropTypes.func,
  reference: PropTypes.func,
};

Modal.defaultProps = {
  children: '',
  width: null,
  modalSize: null,
  reference: null,
  onShowModal: null,
  onHideModal: null,
};

const ModalHeader = props => (
  <div className="modal-header">
    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
    <div className={props.className}>{props.children}</div>
  </div>
);

ModalHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.element]),
  className: PropTypes.string,
};

ModalHeader.defaultProps = {
  children: '',
  className: '',
};

const ModalBody = props => (<div className={'modal-body '.concat(props.additionalClass)}>{props.children}</div>);

ModalBody.propTypes = {
  additionalClass: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.element]),
};

ModalBody.defaultProps = { children: '', additionalClass: '' };

const ModalFooter = props => (<div className="modal-footer">{props.children}</div>);

ModalFooter.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.array, PropTypes.element]),
};

ModalFooter.defaultProps = { children: '' };

export { Modal, ModalHeader, ModalBody, ModalFooter };