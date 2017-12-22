import React from 'react';
import $ from 'jquery';
import _ from 'underscore';
import Columns from './Columns';
import InfoTableFooter from './InfoTableFooter';
import InfoTableHeader from './InfoTableHeader';
import Rows from './Rows';
import { SYMBOLS, ORDER, TYPE } from './helpers/constants';
import uuid from 'uuid';

const sortBy = (key, order = ORDER.ASCENDING, type = TYPE.STRING) => (a, b) => {
    if (!{}.hasOwnProperty.call(a, key) || !{}.hasOwnProperty.call(b, key)) {
        return 0;
    }
    let comparison = 0;
    if (type === TYPE.STRING) {
        comparison = byString(a, b, key);
    } else if (type === TYPE.NUMBER) {
        comparison = byNumber(a, b, key);
    } else if (type === TYPE.DATE) {
        comparison = byDate(a, b, key);
    }
    return order === ORDER.ASCENDING ? comparison : (comparison * -1);
}
const byString = (a, b, key, order) => {
    const valueA = a[key].toString().localeCompare(b[key].toString());
    const valueB = b[key].toString().localeCompare(a[key].toString());
    if (valueA > valueB) {
        return 1;
    } else if (valueA < valueB) {
        return -1;
    }

    return 0;
};
const byNumber = (a, b, key) => a[key] - b[key];
const byDate = (a, b, key) => new Date(a[key]) - new Date(b[key]);

class InfoTableReact extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            rowWidth: window.innerWidth,
            data: [],
        }

        if (this.props.tableHeight) {
            $(this.body).height(this.props.tableHeight);
        }

        this.handleSelectAll = this.handleSelectAll.bind(this);
        this.handleSelectRow = this.handleSelectRow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.columns && nextProps.columns.length > 0) {
            if (!_.isEqual(this.props.columns, nextProps.columns) || nextProps.tableHeight !== this.props.tableHeight) {
                const { newColumns, width } = this.redraw(nextProps.columns.slice());
                this.setState({ columns: newColumns, rowWidth: width });
            }
        }

        if (nextProps.tableHeight !== this.props.tableHeight) {
            $(this.body).height(nextProps.tableHeight);
        }

        const data = nextProps.data && this.generateIndexToData(this.state.data || [], nextProps.data);
        this.setState({ data });
    }

    render() {
        const {
            tableClassName,
            isHeaderFixed,
            showHeader,
            showFooter,
            itemsPerPage, 
            currentPage,
            search,
            showPagination,
            showCheckbox,
            isSelectAll,
            selectedRows,
            expandComponent,
            expandableRow
        } = this.props;
        const { columns, rowWidth } = this.state;

        if (this.state.data.length < itemsPerPage && currentPage > 1) {
            this.props.onChangeGrid(null, { currentPage: 1 });
        }

        const filterData = this.state.data ? this.filterData(search, this.sortData(this.state.data)) : null;
        const totalItems = filterData ? filterData.length : 0; 
        const paginationData = filterData && showPagination ? this.paginationData(currentPage, itemsPerPage, filterData) : filterData;
        const resultsOnPage = paginationData && paginationData.length <= itemsPerPage ? paginationData.length : itemsPerPage;
        const tableClassFixedHeader = isHeaderFixed ? 'InfoTableReact-fixed' : '';

        return (
            <div>
                <div ref={node => this.panelHeader = node }>
                    { showHeader ? <InfoTableHeader {...this.props} /> : '' }
                </div>
                <table
                    ref={table => {this.tableRef = table;}}
                    className={`${tableClassName} ${tableClassFixedHeader}`}
                >
                    <thead
                        ref={node => {this.header = node;}}
                        style={{ width: rowWidth}}
                    >
                        <Columns
                            columns={columns || [] }
                            rowWidth={rowWidth}
                            sortColumn={this.props.sortColumn}
                            sortDirection={this.props.sortDirection}
                            sortColumnType={this.props.sortColumnType}
                            onChangeGrid={this.props.onChangeGrid}
                            showCheckbox={showCheckbox}
                            isSelectAll={isSelectAll}
                            data={paginationData}
                            onSelectAll={this.handleSelectAll}
                        />
                    </thead>
                    <tbody
                        ref={(node) => { this.body = node; }}
                        style={{ width: rowWidth}}
                    >
                        <Rows 
                            {...this.props}
                            data={paginationData}
                            columns={columns || []}
                            rowWidth={rowWidth}
                            isSelectAll={isSelectAll}
                            selectedRows={selectedRows}
                            onRowClick={this.handleSelectRow}
                            rowSelected={this.props.rowSelected}
                            expandComponent={expandComponent}
                            expandableRow={expandableRow}
                        />
                    </tbody>
                    {
                        showFooter ? 
                            <tfoot ref={node => this.footer = node }>
                                <InfoTableFooter
                                    {...this.props}
                                    totalCount={totalItems}
                                    currentPage={parseInt(currentPage, 0)}
                                    resultsOnPage={resultsOnPage}
                                />
                            </tfoot>
                        : null
                    }
                </table>
            </div>
        );
    }

    sortDataByColumn(data) {
        const { sortColumn, sortDirection, sortColumnType } = this.props;
        if (!sortColumn || sortColumn === "") {
            return data;
        }
        return data.sort(sortBy(sortColumn, sortDirection, sortColumnType));
    }

    patternMatch(text, data){
        if (!text) { 
            return data
        }

        var columnsMetadata = this.props.columns;

        const filteredData = [];
        data.forEach((row) => {
            var rowMatched = false;
            let columns = Object.keys(row);
            for(let i=0;i<columns.length;i++){
                if (columns[i] === '_index') continue;
                let columnValue = row[columns[i]];
                let formattedValue = columnsMetadata[i].formatter?columnsMetadata[i].formatter(columnValue).toString():columnValue.toString();
                if(typeof formattedValue === 'string' && formattedValue.toLowerCase().indexOf(text.trim().toLowerCase()) !== -1){
                    rowMatched = true;
                    break;
                }
            }
            if (rowMatched===true) filteredData.push(row);
        })
        return filteredData;
    }

    sortData(data) {
        return this.sortDataByColumn(data);
    }

    filterData(search, data) {
        return this.patternMatch(search, data);
    }

    paginationData(currentPage, itemsPerPage, data) {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex);
    }

    redraw(columns) {
        const filterColumns = columns.filter(column => column.isVisible !== false);
        const sw = $(this.tableRef).find('table>tbody').prevObject.prop('clientWidth') || window.innerWidth;
        let k = 1;
        let symbol = SYMBOLS.PIXEL;
        let widthCheckbox = this.props.showCheckbox ? 120 : 0;
        let width = filterColumns.reduce((totalWidth, column) => {
            const columnWidth = column.columnWidth ? column.columnWidth : 120;
            totalWidth += columnWidth;
            return totalWidth;
        }, 0);
        width = width + widthCheckbox;
        if (width < sw) {
            k = 100 / width;
            width = 100;
            symbol = SYMBOLS.PERCENTAGE;
        }

        const newColumns = filterColumns.map(column => ({...column, columnWidth: (column.columnWidth || 120) * k + symbol }));
        return { newColumns, width: `${width + symbol}` };
    }

    getPanelHeaderHeight() {
        return this.props.showHeader && this.panelHeader ? this.panelHeader.clientHeight : 0;
    }

    getTableHeaderHeight() {
        return this.header.clientHeight || 0;
    }

    getTableFooterHeight() {
        return this.props.showFooter && this.footer ? this.footer.clientHeight : 0;
    }
    
    generateIndexToData(currentData, nextData) {
        const filterData = currentData.filter(item => ('_index' in item));
        if (filterData.length > 0) {
            return currentData;
        } else {
            return nextData.map(item => ({...item, _index: uuid.v4()}));
        }
    }

    handleSelectAll(e) {
        const selectedRows = e.target.checked ? this.state.data : [];
        this.props.onChangeGrid(e, { isSelectAll: e.target.checked, selectedRows, data: this.state.data })
    }

    handleSelectRow(e, row) {
        if (this.props.showCheckbox && e.target.type === 'checkbox') {
            const selectedRows = this.props.selectedRows.slice();
            if (e.target.checked) {
                selectedRows.push(row);
                const isSelectAll = selectedRows.length === this.state.data.length ? true : 'indeterminate';
                this.props.onChangeGrid(e, { isSelectAll, selectedRows });
            } else {
                const rowIndex = selectedRows.findIndex(rowItem => rowItem._index === row._index);
                if (rowIndex !== -1) {
                    selectedRows.splice(rowIndex, 1);
                    const isSelectAll = selectedRows.length === 0 ? false : 'indeterminate';
                    this.props.onChangeGrid(e, { isSelectAll, selectedRows });
                }
            }
        } else {
            this.props.onRowClick && this.props.onRowClick(e, row);
        }
    }
}


InfoTableReact.defaultProps = {
    columns: [],
    customBulkActions: null,
    customHeader: null,
    customFilterComponent: null,
    customPaginationComponent: null,
    customRow: null,
    data: [],
    expandComponent: null,
    expandableRow: null,
    filterPlaceholder: '',
    isHeaderFixed: true,
    onChangeGrid: () => {},
    onCustomClearFilter: null,
    onCustomFilter: null,
    onCustomSort: null,
    onRowClick: () => {},
    currentPage: 1, 
    itemsPerPage: 10,
    modalColumnsTitle: '',
    rowSelected: {},
    rowSelectedClassName: 'InfoTableReact-rowSelected',
    selectedRows: [],
    showCheckbox: false,
    showFilter: false,
    showHeader: false,
    showBulkActions: false,
    showListColumns: false,
    showPagination: false,
    tableBodyClassName: '',
    tableClassName: '',
    tableHeaderClassName: '',
    tableHeight: null,
    isSelectAll: false
}

export default InfoTableReact;
