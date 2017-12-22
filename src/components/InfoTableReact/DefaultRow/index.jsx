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

class DefaultRow extends React.PureComponent {
    getCells(row, rowIndex, columns) {
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
                            key={`R${rowIndex}_C${columnIndex}`}
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
        const { columns, row, rowIndex, } = this.props;
        return this.getCells(row, rowIndex, columns);
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