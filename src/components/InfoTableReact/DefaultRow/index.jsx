import React from 'react';
import PropTypes from 'prop-types';
const Cell = ({columnIndex, cellTooltip, columnWidth, children, align }) => 
    (<td
        key={columnIndex}
        title={cellTooltip}
        style={{ width: columnWidth, textAlign: align }}
    >
        {children}
    </td>);

class DefaultRow extends React.Component {
    constructor(...args) {
        super(...args);

        this.onHandleRowClick = this.onHandleRowClick.bind(this);
    }
    
    onHandleRowClick(event, row, rowId) {
        if (event.target.tagName === 'TR' || event.target.tagName === 'TD') {
            this.props.onRowClick(event, row, rowId);
        }
    }

    getCells(row, columns) {
        return columns
            .map((column, columnIndex) => {
                let dataValue = row[column.columnName];
                let cellTooltip = '';
                let rowAlign = column.align || 'center';
                if (typeof column.formatter === 'function') {
                    dataValue = column.formatter(dataValue);
                    cellTooltip = dataValue
                } else if (typeof row[column.columnName] === "string" || typeof row[column.columnName] === "number") {
                    cellTooltip = dataValue;
                } else {
                    cellTooltip = column.columnName
                }

                if (typeof row[column.columnName] === "number") {
                    rowAlign = 'right';
                }
                
                const cell = (typeof column.render === "function")
                    ? column.render(this.props, column, columnIndex, dataValue)
                    : dataValue;

                    return (
                        <Cell
                            key={`${column.columnName}'$$'${columnIndex}`}
                            columnIndex={columnIndex}
                            cellTooltip={cellTooltip}
                            columnWidth={column.columnWidth}
                            align={rowAlign}
                        >
                            {cell}
                        </Cell>
                    );  
            });
    }

    render() {
        const { columns, row, rowIndex, rowSelectedClass, rowWidth } = this.props;
        return (
            <tr 
                onClick={event => this.onHandleRowClick(event, row, rowIndex)} 
                className={rowSelectedClass}
                style={{ width: rowWidth }}
            >
                {
                    this.getCells(row, columns)
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
    rowIndex: PropTypes.number.isRequired,
    rowClassName: PropTypes.string,
    rowSelectedClass: PropTypes.string,
}

export default DefaultRow;