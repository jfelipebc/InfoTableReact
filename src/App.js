import React, { Component } from 'react';
import './App.css';
import * as data from './data/MOCK_DATA';
import InfoTable from './components/InfoTableReact';

const columns = [
    {
        columnName: 'id',
        displayName: 'Identificador',
        type: 'string'
    },
    {
        columnName: 'firstName',
        displayName: 'Nombre',
        type: 'string',
        isSorting: true,
        render: (props, column, indexColumn, value) => {
            return (<a onClick={(e => console.log(e, value))}>{value}</a>);
        }
    },
    {
        columnName: 'lastName',
        displayName: 'Apellido',
        type: 'string'
    },
    {
        columnName: 'email',
        displayName: 'Correo electrónico',
        type: 'string'
    },
    {
        columnName: 'gender',
        displayName: 'Sexo',
        type: 'string'
    },
    {
        columnName: 'creditCard',
        displayName: 'Tarjeta de crédito',
        type: 'string'
    },
    {
        columnName: 'country',
        displayName: 'País',
        type: 'string'
    },
    {
        columnName: 'random',
        displayName: 'Number Aleatorio',
        type: 'number'
    },
    {
        columnName: 'active',
        displayName: 'Activo',
        isSorting: true,
        type: 'string',
        render: (props, column, indexColumn, value) => {
            return value ? 'Sí' : 'No';
        }
    },
    {
        columnName: 'isbn',
        displayName: 'ISBN',
        type: 'string'
    },
    {
        columnName: 'title',
        displayName: 'Título',
        type: 'string'
    },
    {
        columnName: 'lat',
        displayName: 'Latitud',
        isSorting: true,
        type: 'number'
    },
    {
        columnName: 'lon',
        displayName: 'Longitud',
        type: 'number'
    },
    {
        columnName: 'token',
        displayName: 'Token',
        type: 'string',
    },
    {
        columnName: 'id',
        displayName: 'Identificador Externo',
        type: 'string'
    },
    {
        columnName: 'id',
        displayName: 'Identificador Externo 2',
        type: 'string'
    },
    {
        columnName: 'id',
        displayName: 'Identificador Externo',
        type: 'string'
    },
    {
        columnName: 'id',
        displayName: 'Identificador Externo 2',
        type: 'string'
    }

]

class App extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            containerHeight: window.innerHeight,
            tableConfig: {
                data: data,
                columns: columns,
                tableClassName: "table table-condensed table-striped table-hover InfoTableReact",
                onChangeGrid: this.onChangeGrid.bind(this),
                selectedRows: []
            }
        };

        this.containerResized = (e) => {
            const panelHeight = this.infotable.getPanelHeaderHeight();
            const footerHeight = this.infotable.getTableFooterHeight()
            const height = window.innerHeight - (this.infotable.getTableHeaderHeight() + panelHeight + footerHeight + 20);
            this.setState({ containerHeight: height });
        };

        window.addEventListener('resize', this.containerResized);
    }

    componentDidMount = () => {
        this.containerResized();
    }

    componentWillUnmount = () => {
        window.removeEventListener('resize', this.containerResized);
    }
    
    handleRowClick(e, row) {
        this.setState({
            tableConfig: Object.assign({}, { ...this.state.tableConfig }, { rowSelected: row })
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
            <div id="TableContainer" ref={node => this.container = node }>
                <InfoTable 
                    {...this.state.tableConfig}
                    ref={node => this.infotable = node }
                    container="#TableContainer"
                    showFooter
                    showPagination
                    onRowClick={(e, row) => this.handleRowClick(e, row)}
                    itemsPerPage={100}
                    tableHeight={this.state.containerHeight}
                />
            </div>
        );
    }
}

export default App;

/* Column properties
align: type: string default: 'center',
columnWidth: type number default: 120
displayName: type: string default: '',
columnName: type: string default: '',
isVisible: type: bool default: true,
isSorting: type: bool default: false
render: type: function([props, column, indexColumn, value]), default: null,
formatter: type: function([props, column, indexColumn, value]), default: null,
isKey: type: bool default: false */



