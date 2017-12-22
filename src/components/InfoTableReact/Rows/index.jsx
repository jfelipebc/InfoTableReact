import React from 'react';
import InfoTableRow from '../InfoTableRow';

class Rows extends React.PureComponent {

    getRowSelect(row, rows) {
        if (this.props.showCheckbox) {
            const rowIndex = rows.findIndex(rowItem => rowItem._index && rowItem._index === row._index);
            if (rowIndex !== -1) {
                return true;
            }
            return false;
        } else {
            return (this.props.rowSelected && this.props.rowSelected._index === row._index);
        }
    }

    handleRowClick(e, row, rowIndex) {

    }

    render() {
        const {
            data,
            rowSelectedClassName,
            onRowClick,
            rowWidth,
            columns,
            showCheckbox,
            selectedRows,
            customRow,
            expandComponent,
            expandableRow,
        } = this.props;

        return data.map((row, rowIndex) => {
            const isSelect = this.getRowSelect(row, selectedRows);
            const rowSelect = isSelect ? rowSelectedClassName : '';

            return (
                <InfoTableRow
                    key={rowIndex}
                    rowSelectedClass={rowSelect}
                    columns={columns}
                    row={row}
                    rowIndex={rowIndex}
                    rowWidth={rowWidth}
                    onRowClick={onRowClick}
                    showCheckbox={showCheckbox}
                    isSelect={isSelect}
                    customRow={customRow}
                    expandComponent={expandComponent}
                    expandableRow={expandableRow}
                />
            );
        });
    }
}

export default Rows;

