import React from 'react';
import $ from 'jquery';
import InfoTableRows from './InfoTableRows';
import InfoTableHeaderColumn from './InfoTableHeaderColumn';
import InfoTableHeader from './InfoTableHeader';
import InfoTableFooter from './InfoTableFooter';

class InfoTable extends React.Component {
    constructor(props) {
        super(props);
        this.onResize = this.onResize.bind(this);
    }

    componentWillMount() {
        window.addEventListener("resize", this.onResize);
    }

    componentDidMount() {
        this.redraw();
    }

    componentDidUpdate() {
        this.redraw();
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

    onResize() {
        this.redraw();
    }

    redraw() {
        const cells = $(this.tableRef)
            .find("tbody tr:first")
            .children();

        const colsWidth = cells
            .map(function() { return $(this).width()})
            .get();
    
        $(this.tableRef)
            .find("thead tr")
            .children()
            .each(function(i, v) {
                $(v).width(colsWidth[i]);
            });
    }

    render() {
        const {
            columns,
            tableClassName,
            isHeaderFixed,
        } = this.props;

        if (this.props.data.length < this.props.itemsPerPage && this.props.currentPage > 1) {
            this.props.onChangeGrid(null, { currentPage: 1 });
        }

        const data = this.props.data ? this.getResponseData() : null;
        const resultsOnPage = data && data.length <= this.props.itemsPerPage ? data.length : this.props.itemsPerPage;
        const columnsVisible = columns.filter(column => column.isVisible);
        let tableClassFixedHeader =  '';
        let tableHeight = this.props.tableHeight;
        if (isHeaderFixed) {
            tableClassFixedHeader = 'InfoTable-fixed';
            tableHeight = this.props.tableHeight || 250;
        }
        return (
            <div className="InfoTable">
                
                <InfoTableHeader {...this.props} />
                <table
                    ref={table => {this.tableRef = table;}}
                    className={`${tableClassName} ${tableClassFixedHeader}`}
                >
                    <InfoTableHeaderColumn
                        {...this.props}
                        columns={columnsVisible}
                    />
                    <InfoTableRows
                        {...this.props}
                        data={data}
                        tableHeight={tableHeight}
                    />
                    <InfoTableFooter
                        {...this.props}
                        totalCount={this.props.data.length}
                        currentPage={parseInt(this.props.currentPage, 0)}
                        resultsOnPage={resultsOnPage}
                    />
                </table>
            </div>
        );
    }
}

export default InfoTable;
