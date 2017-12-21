import React from 'react';
import DefaultRow from '../DefaultRow';
import Checkbox from '../Checkbox';

const InfoTableRow = (props) => {
    const { customRow,
        columns,
        row,
        rowIndex,
        rowWidth,
        rowSelectedClass,
        onRowClick,
        showCheckbox,
        isSelect
    } = props;
    const Row = customRow ? customRow : DefaultRow;

    return (
        <tr 
            onClick={event => onRowClick(event, row, rowIndex)} 
            className={rowSelectedClass}
            style={{ width: rowWidth }}
        >   
            { showCheckbox ? 
                <td>
                    <Checkbox 
                        customStyleCheckbox={{
                            margin: '0 auto',
                            width: '48px',
                            textAlign: 'center' }}
                        value={isSelect}
                    />
                </td> 
                : null
            }
            <Row 
                columns={columns}
                row={row}
                rowIndex={rowIndex}
            />
        </tr>
    );
}

export default InfoTableRow;