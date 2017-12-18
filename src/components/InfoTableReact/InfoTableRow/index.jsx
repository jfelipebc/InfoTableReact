import React from 'react';
import DefaultRow from '../DefaultRow';

const InfoTableRow = (props) => {
    const { customRow, columns, row, rowIndex, rowWidth, rowSelectedClass, onRowClick } = props;
    const Row = customRow ? customRow : DefaultRow;
    return <Row 
        columns={columns}
        row={row}
        rowIndex={rowIndex}
        rowWidth={rowWidth}
        rowSelectedClass={rowSelectedClass}
        onRowClick={onRowClick}
    />;
}

export default InfoTableRow;