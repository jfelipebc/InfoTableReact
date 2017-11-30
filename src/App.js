import React, { Component } from 'react';
import './App.css';

import * as columns from './data/columns';
import * as data from './data/fakedata';
import InfoTable from './components/InfoTable';

class App extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            tableConfig: {
                data: data,
                columns: columns,
                tableClassName: "table table-condensed table-striped table-hover InfoTable",
                tableHeaderClassName: "",
                onRowClick: this.onRowClick.bind(this),
                onChangeGrid: this.onChangeGrid.bind(this),
                currentPage: 1,
                itemsPerPage: 10,
                rowSelected: {},
                rowSelectedClassName: 'rowSelected',
                showFilter: true,
                showFooter: true,
                showPagination: true,
                tableHeight: '',
                isHeaderFixed: true,
                filterPlaceholder: 'Filtrar datos',
                showListColumns: true,
                modalColumnsTitle: 'Por favor seleccione las columnas que desea visualizar en la tabla actual.'
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
            <div>
                <InfoTable {...this.state.tableConfig} />
            </div>
        );
    }
}

export default App;

/*
// Column properties
displayName: type: string default: '',
columnName: type: string default: '',
visible: type: bool default: true,
isSorting: type: bool default: false
render: type: func params: [props, column, indexColumn] default: null,
formatter: type: func default: null,
isKey: type: bool default: false
*/
/* 
* Fields required.
// Table configuration
        columns: [columns], *
        customBulkActions: null,
        customHeader: null,
        customFilterComponent: null,
        customPaginationComponent: null,
        customRow: null,
        data: [data], *
        filterPlaceholder: ''
        isHeaderFixed: false, default true
        onChangeGrid: [function()] *
        onCustomClearFilter: null,
        onCustomFilter: null,
        onCustomSort: null,
        onExportClick: null,
        onRowClick: null,
        currentPage: 1, default: 1
        itemsPerPage: 10, default: 10,
        rowSelected: {},
        rowSelectedClassName: 'rowSelected',
        showFilter: false / true,
        showHeader: true / false  default: true,
        showBulkActions: true / false,  default: true
        showListColumns: true / false, default: true
        showPagination: false / true, default: false
        tableBodyClassName: ""
        tableClassName: "",
        tableHeaderClassName: ""
        tableHeight: '',
*/