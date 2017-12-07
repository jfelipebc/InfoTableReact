import React from 'react';
import InfoTableRow from '../InfoTableRow';

class Rows extends React.Component {
    getRows() {
        const {
            data,
            rowSelected, 
            rowSelectedClassName,
        } = this.props;

        return data.map((row, rowIndex) => {
            const rowSelect = (rowSelected.rowId === rowIndex) ? rowSelectedClassName : '';
            return <InfoTableRow
                {...this.props}
                rowId={rowIndex}
                row={row}
                key={rowIndex}
                rowSelectedClass={rowSelect}
            />
        });
    }
    render() {
        return this.getRows();
    }
}

export default Rows;

