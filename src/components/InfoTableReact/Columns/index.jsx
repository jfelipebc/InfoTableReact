import React from 'react';
import { ORDER, TYPE } from '../helpers/constants';

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

const Column = ({ column, columnIndex, sortColumn, sortDirection, id}) => {
    const SortIcon = column.columnName === sortColumn ? getSortIcon(sortDirection) : null;
    return (
        <th
            style={{ width: column.columnWidth }}
            key={id}
            data-sort-column={sortColumn || ""}
            data-sort={column.isSorting || false}
        >
            {column.displayName} {SortIcon}
        </th>
    )
}

class Columns extends React.PureComponent {
    constructor(...args) {
        super(...args);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    handleSortChange = (e) => {
        e.preventDefault();
        const cellIndex = e.target.cellIndex;
        const { onCustomSort, onChangeGrid, columns, sortColumn, sortDirection } = this.props;
        const column = columns[cellIndex];
        if (column && !column.isSorting) return;

        const direction = (column.columnName === sortColumn)
            ?   (sortDirection === ORDER.ASCENDING) ? ORDER.DESCENDING : ORDER.ASCENDING 
            :   ORDER.ASCENDING;

        if (onCustomSort && typeof onCustomSort === 'function') {
            onCustomSort(e, direction, column, cellIndex);
        } else {
            onChangeGrid(e, {
                sortColumn: column.columnName,
                sortColumnType: column.type || TYPE.STRING, 
                sortDirection: direction
            });
        }
    }

    render() {
        const { sortColumn, sortDirection } = this.props;
        const columns = this.props.columns.slice();
        if (columns && columns.length === 0) return null;

        return (
            <tr 
                style={{ width: this.props.rowWidth }}
                onClick={this.handleSortChange}>
                {
                    columns.map((columnItem, columnIndex) =>
                        <Column
                            column={columnItem}
                            columnIndex={columnIndex}
                            key={columnIndex}
                            sortColumn={sortColumn}
                            sortDirection={sortDirection}
                        />
                    )
                }
            </tr>);
    }
}

export default Columns