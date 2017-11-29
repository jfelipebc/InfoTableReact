import React from 'react';
import $ from 'jquery';
import { Modal, ModalBody, ModalHeader } from '../../Modal';
import Checkbox from '../../Checkbox';

class ShowListColumnsModal extends React.Component {
    constructor(props) { 
        super(props);

        this.onShowModal = () => {
            $(this.modal).data('bs.modal').isShown = false;
        };
    }

    handleChangeCheckbox(event, column) {
        const columns = this.props.columns.slice();
        const cloneColumn = {...column, isVisible: event.target.checked };
        const columnIndex = columns.indexOf(column)
        columns.splice(columnIndex, 1, cloneColumn);
        this.props.onChangeGrid(event, { columns });
    }

    

    render() {
        const { columns, modalColumnsTitle } = this.props;
        return (
            <Modal
                id={this.props.id}
                modalSize="modal-sm"
                width="40%"
                reference={(node) => { this.modal = node; }}
                onShowModal={this.onShowModal}
            >
                <ModalHeader>
                    <h5 className="modal-title">
                        {modalColumnsTitle}
                    </h5>
                </ModalHeader>
                <ModalBody>
                    <div className='table-responsive'>
                        <ul>
                            {
                                columns.map((column, index) =>
                                    <li
                                        key={`${column.columnName}$$${index}`}
                                        className="list-group-item col-md-4"
                                        style={{ float: 'left', listStyleType: 'none' }}
                                    >
                                        <Checkbox
                                            label={column.displayName}
                                            value={column.isVisible}
                                            onChange={e => this.handleChangeCheckbox(e, column)}
                                        />
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </ModalBody>
            </Modal>
        );
    }
}

export default ShowListColumnsModal;
