import React from 'react';
import PropTypes from 'prop-types';
const Cell = ({columnIndex, cellTooltip, columnWidth, children}) => 
    (<td
        key={columnIndex}
        title={cellTooltip}
        style={{ width: `${columnWidth}%` }}
    >
        {children}
    </td>);

class DefaultRow extends React.Component {
    constructor(...args) {
        super(...args);

        this.onHandleRowClick = this.onHandleRowClick.bind(this);
    }
    onHandleRowClick(event, row, rowId) {
        this.props.onRowClick(event, row, rowId);
    }

    getCells(row, columns, columnWidth) {
        return columns
            .filter(column => column.isVisible)
            .map((column, columnIndex) => {
                const cell = (typeof column.render === "function")
                    ? column.render(this.props, column, columnIndex)
                    : row[column.columnName];

                const cellTooltip = (typeof row[column.columnName] === "string" ||
                    typeof row[column.columnName] === "number")
                        ? row[column.columnName]
                        : column.columnName;
                    return (
                        <Cell
                            key={`${column.columnName}'$$'${columnIndex}`}
                            columnIndex={columnIndex}
                            cellTooltip={cellTooltip}
                            columnWidth={columnWidth}
                        >
                            {cell}
                        </Cell>
                    );  
            });
    }

    render() {
        const { columns, row, rowId, rowSelectedClass } = this.props;
        const columnsVisible = columns.filter(column => column.isVisible)
        const columnWidth = 100 / columnsVisible.length;
        return (
            <tr 
                valign="middle"
                onClick={event => this.onHandleRowClick(event, row, rowId)} 
                className={rowSelectedClass}
            >
                {
                    this.getCells(row, columnsVisible, columnWidth)
                }
            </tr>
        );
    }
}

DefaultRow.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape({
        columnName: PropTypes.string,
        displayName: PropTypes.string,
        formatter: PropTypes.func,
        isKey: PropTypes.bool,
        isSorting: PropTypes.bool,
        isVisible: PropTypes.bool,
        render: PropTypes.func,
    })).isRequired,
    row: PropTypes.object.isRequired,
    rowId: PropTypes.number.isRequired,
    rowClassName: PropTypes.string,
    rowSelectedClass: PropTypes.string,
}

export default DefaultRow;