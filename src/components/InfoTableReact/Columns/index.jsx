import React from 'react';

const getSortIcon = direction => {
    switch (direction) {
        case "ASC":
            return <i className="fa fa-caret-up" aria-hidden="true" />;
        case "DESC":
            return <i className="fa fa-caret-down" aria-hidden="true" />;
        default:
            return null;
    }
};

class Columns extends React.PureComponent {
    constructor(...args) {
        super(...args);
        this.onHandleSortClick = this.onHandleSortClick.bind(this);
    }

    getColumns(columns) {
        if (columns && columns.length === 0) return null;
    
        return columns.map((column, indexColumn) => {
            let sortIcon = null;
            if (column.isSorting && column.columnName === this.props.sortColumn) {
            sortIcon = getSortIcon(this.props.sortDirection);
            }
            return (
            <th
                style={{ width: column.columnWidth }}
                key={`${column}$$${indexColumn}`}
                data-sort-column={this.props.sortColumn || ""}
                data-sort={column.isSorting || false}
                ref={column}
                onClick={event =>
                column.isSorting
                    ? this.onHandleSortClick(event, column, indexColumn)
                    : null}
            >
                {column.displayName} {sortIcon}
            </th>
            );
        });
    }

    onHandleSortClick(event, column, indexColumn) {
        let sortDirection = null;
        if (column.columnName === this.props.sortColumn) {
            if (this.props.sortDirection === "ASC") {
                sortDirection = "DESC";
            } else {
                sortDirection = "ASC";
            }
        } else {
            sortDirection = "ASC";
        }

        if (this.props.onCustomSort) {
            this.props.onCustomSort(event, sortDirection, column.columnName, indexColumn);
        } else {
            this.props.onChangeGrid(event, {
                sortColumn: column.columnName,
                sortDirection
            });
        }
    
    }

    render() {
        const columns = this.getColumns(this.props.columns);
        return (<tr style={{ width: this.props.rowWidth }}>{columns}</tr>);
    }
}

export default Columns