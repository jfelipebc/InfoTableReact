import React, { Component } from 'react';
import './App.css';
import * as data from './data/MOCK_DATA';
import { Modal, ModalBody } from './components/Modal';
import InfoTable from './components/InfoTable';

const FormModal = () => (
    <Modal
        id='formModal'
        modalSize="modal-sm"
        width="40%"
        reference={(node) => { this.modal = node; }}
    >
        <ModalBody>
            <form>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Email" />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputFile">File input</label>
                    <input type="file" id="exampleInputFile" />
                    <p className="help-block">Example block-level help text here.</p>
                </div>
                <div className="checkbox">
                    <label>
                        <input type="checkbox"/> Check me out
                    </label>
                </div>
                <button type="submit" className="btn btn-default">Submit</button>
            </form>
        </ModalBody>
    </Modal>
)


const columns = [
    {
        displayName: 'Acciones',
        render: () => {
            return (<div>
                <button
                    type="button"
                    className="btn btn-default btn-xs"
                    data-target="#formModal"
                    data-toggle="modal"
                >
                    <span className="fa fa-pencil" />
                </button>
            </div>)
        }
    },
    {
        columnName: 'id',
        displayName: 'Identificador'
    },
    {
        columnName: 'firstName',
        displayName: 'Nombre'
    },
    {
        columnName: 'lastName',
        displayName: 'Apellido'
    },
    {
        columnName: 'email',
        displayName: 'Correo electrónico'
    },
    {
        columnName: 'gender',
        displayName: 'Sexo'
    },
    {
        columnName: 'creditCard',
        displayName: 'Tarjeta de crédito'
    },
    {
        columnName: 'country',
        displayName: 'País'
    },
    {
        columnName: 'random',
        displayName: 'Number Aleatorio'
    },
    {
        columnName: 'status',
        displayName: 'Estado',
        render: (props, column, indexColumn, value) => {
            return (<span className='fa fa-warning' style={{ color: value }} />)
        }
    },
    {
        columnName: 'active',
        displayName: 'Activo',
        render: (props, column, indexColumn, value) => {
            return value ? 'Sí' : 'No';
        }
    },
    {
        columnName: 'photo',
        displayName: 'Icono',
        render: (props, column, indexColumn, value) => {
            return (<img src={value} alt="Icons" width='18px' height='18px' />)
        }
    },
    {
        columnName: 'isbn',
        displayName: 'ISBN'
    },
    {
        columnName: 'title',
        displayName: 'Título'
    },
    {
        columnName: 'lat',
        displayName: 'Latitud',
    },
    {
        columnName: 'lon',
        displayName: 'Longitud',
    },
    {
        columnName: 'token',
        displayName: 'Token',
    }
]
class App extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            tableConfig: {
                data: data,
                columns: columns,
                tableClassName: "table table-condensed table-striped table-hover InfoTable",
                tableHeight: 400,
                onChangeGrid: this.onChangeGrid.bind(this),
                itemsPerPage: 100
            }
        };
    }

    onRowClick(e, row, rowId) {
        const rowSelected = { ...row, rowId };
        this.setState({
            tableConfig: Object.assign({}, { ...this.state.tableConfig }, { rowSelected })
        });
    }

    onChangeGrid(event, data) {
        const tableConfig = this.state.tableConfig;
        this.setState({
            tableConfig: Object.assign({}, { ...tableConfig }, { ...data })
        });
    }

    render() {
        return (
            <div id="TableContainer">
                <FormModal />
                <InfoTable 
                    {...this.state.tableConfig}
                    ref={node => this.infotable = node }
                    container="#TableContainer"
                    showHeader
                    showFilter
                    showListColumns
                    showFooter
                    showPagination
                />
            </div>
        );
    }
}

export default App;


/*Column properties
align: type: string default: 'center',
columnWidth: type number default: 120
displayName: type: string default: '',
columnName: type: string default: '',
isVisible: type: bool default: true,
isSorting: type: bool default: false
render: type: function([props, column, indexColumn, value]), default: null,
formatter: type: function([props, column, indexColumn, value]), default: null,
isKey: type: bool default: false */


