import React from 'react';
import InfoTableRow from '../InfoTableRow';

class Rows extends React.PureComponent {
    render() {
        const {
            data,
            rowSelected, 
            rowSelectedClassName,
            onRowClick,
            rowWidth,
            columns
        } = this.props;

        return data.map((row, rowIndex) => {
            const rowSelect = (rowSelected.rowIndex === rowIndex) ? rowSelectedClassName : '';
            return <InfoTableRow
                key={rowIndex}
                rowSelectedClass={rowSelect}
                columns={columns}
                row={row}
                rowIndex={rowIndex}
                rowWidth={rowWidth}
                onRowClick={onRowClick}
            />
        });
    }
}

export default Rows;

