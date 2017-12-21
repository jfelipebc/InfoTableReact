import React from 'react';
import { ORDER, TYPE } from '../helpers/constants';
import Checkbox from '../Checkbox';

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
        this.handleColumnClicked = this.handleColumnClicked.bind(this);
    }

    handleColumnClicked = (e) => {
        if (e.target.tagName === 'TH') {
            const { onCustomSort, onChangeGrid, columns, sortColumn, sortDirection, showCheckbox } = this.props;
            const cellIndex = showCheckbox ? e.target.cellIndex + 1: e.target.cellIndex;
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
        } else if(e.target.type === 'checkbox') {
            this.props.onSelectAll(e);
        }
    }

    render() {
        const { sortColumn, sortDirection, showCheckbox, isSelectAll } = this.props;
        const columns = this.props.columns.slice();
        if (columns && columns.length === 0) return null;

        return (
            <tr 
                style={{ width: this.props.rowWidth }}
                onClick={this.handleColumnClicked}>
                { showCheckbox ? 
                    <th>
                        <Checkbox customStyleCheckbox={{
                                margin: '0 auto',
                                width: '48px',
                                textAlign: 'center' }}
                            value={isSelectAll}
                            indeterminate={isSelectAll === 'indeterminate'}
                        />
                    </th> 
                    : null
                }
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