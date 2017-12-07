import React from 'react';
import $ from 'jquery';
import Columns from './Columns';
import InfoTableFooter from './InfoTableFooter';
import InfoTableHeader from './InfoTableHeader';
import Rows from './Rows';

const SYMBOLS = {
    PERCENTAGE: '%',
    PIXEL: 'px'
};
class InfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [],
            rowWidth: window.innerWidth
        }

        this.containerResized = (e) => {
            const panelHeight = this.props.showHeader ? this.panelHeader.clientHeight : 0;
            const footerHeight = this.props.showFooter ? this.footer.clientHeight : 0;
            const height = window.innerHeight - (this.header.clientHeight + panelHeight + footerHeight + 20);

            if (this.props.tableHeight && this.props.tableHeight < height) {
                $(this.body).height(this.props.tableHeight);
            } else {
                $(this.body).height(height);
            }
        };

        window.addEventListener('resize', this.containerResized);
    }

    componentDidMount() {
        this.containerResized();
        const columns = this.redraw(this.props.columns.slice());
        const rowWidth = columns.reduce((total, column) => {
            total += parseInt(column.columnWidth.replace(SYMBOLS.PIXEL, '').replace(SYMBOLS.PERCENTAGE, ''), 0);
            return total;
        }, 0)
        this.setState({ columns, rowWidth, bodyHeight: this.props.tableHeight });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.columns && nextProps.columns.length > 0) {
            const columns = this.redraw(nextProps.columns.slice());
            const rowWidth = columns.reduce((total, column) => {
                total += parseInt(column.columnWidth.replace(SYMBOLS.PIXEL, '').replace(SYMBOLS.PERCENTAGE, ''), 0);
                return total;
            }, 0)
            this.setState({ columns, rowWidth });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize);
    }

    sortDataByColumn(data) {
        const { sortColumn, sortDirection } = this.props;
        if (!sortColumn || sortColumn === "") {
            return data;
        }
        const dataSorting = data.sort((a, b) => {
            if (sortDirection === "ASC") {
                let num = a[sortColumn]
                    .toString()
                    .localeCompare(b[sortColumn].toString());

                if (num > 0) return 1;
                if (num < 0) return -1;
            }
            
            let num = b[sortColumn]
                .toString()
                .localeCompare(a[sortColumn].toString());

            if (num > 0) return 1;
            if (num < 0) return -1;
            return -1
        });
        return dataSorting;
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

    getResponseData() {
        let data = this.sortDataByColumn(this.props.data);
        data = this.patternMatch(this.props.search, data);
        if (this.props.showPagination) {
            const startIndex = (this.props.currentPage - 1) * this.props.itemsPerPage;
            const endIndex = startIndex + this.props.itemsPerPage;
            data = data.slice(startIndex, endIndex);
        }
        return data;
    }

    redraw(columns) {
        const filterColumns = columns.filter(column => column.isVisible !== false);
        const sw = $(this.tableRef).find('table>tbody').prevObject.prop('clientWidth') || window.innerWidth;
        let k = 1;
        let symbol = SYMBOLS.PIXEL;
        let width = filterColumns.reduce((totalWidth, column) => {
            const columnWidth = column.columnWidth ? column.columnWidth : 120;
            totalWidth += columnWidth;
            return totalWidth;
        }, 0);

        if (width < sw) {
            k = 100 / width;
            width = 100;
            symbol = SYMBOLS.PERCENTAGE;
        }

        const newColumns = filterColumns.map(column => ({...column, columnWidth: (column.columnWidth || 120) * k + symbol }));
        return newColumns;
    }

    getHeaderHeight() {
        return this.header.clientHeight;
    }

    render() {
        const {
            tableClassName,
            isHeaderFixed,
            showHeader,
            showFooter,
        } = this.props;

        if (this.props.data.length < this.props.itemsPerPage && this.props.currentPage > 1) {
            this.props.onChangeGrid(null, { currentPage: 1 });
        }

        const { columns, rowWidth } = this.state;
        const data = this.props.data ? this.getResponseData() : null;
        const resultsOnPage = data && data.length <= this.props.itemsPerPage ? data.length : this.props.itemsPerPage;
        const tableClassFixedHeader = isHeaderFixed ? 'InfoTable-fixed' : '';

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
                        style={{ width: rowWidth + 'px'}}
                    >
                        <Columns
                            {...this.props}
                            columns={columns}
                            rowWidth={rowWidth + 'px'}
                        />
                    </thead>
                    <tbody
                        ref={(node) => { this.body = node; }}
                        style={{ width: rowWidth + 'px'}}
                    >
                        <Rows 
                            {...this.props}
                            data={data}
                            columns={columns}
                            rowWidth={rowWidth + 'px'}
                        />
                    </tbody>
                    {
                        showFooter ? 
                            <tfoot ref={node => this.footer = node }>
                                <InfoTableFooter
                                    {...this.props}
                                    totalCount={this.props.data.length}
                                    currentPage={parseInt(this.props.currentPage, 0)}
                                    resultsOnPage={resultsOnPage}
                                />
                            </tfoot>
                        : null
                    }
                </table>
            </div>
        );
    }
}

InfoTable.defaultProps = {
    columns: [],
    customBulkActions: null,
    customHeader: null,
    customFilterComponent: null,
    customPaginationComponent: null,
    customRow: null,
    data: [],
    filterPlaceholder: 'Filtrar datos',
    isHeaderFixed: true,
    onChangeGrid: () => {},
    onCustomClearFilter: null,
    onCustomFilter: null,
    onCustomSort: null,
    onExportClick: () => {},
    onRowClick: () => {},
    currentPage: 1, 
    itemsPerPage: 10,
    modalColumnsTitle: "Seleccione columnas",
    rowSelected: {},
    rowSelectedClassName: 'rowSelected',
    showFilter: false,
    showHeader: false,
    showBulkActions: false,
    showListColumns: false,
    showPagination: false,
    tableBodyClassName: '',
    tableClassName: '',
    tableHeaderClassName: '',
    tableHeight: null,
}

export default InfoTable;
