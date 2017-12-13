import React from 'react';
import InfoTableRow from '../InfoTableRow';

class Rows extends React.PureComponent {
    getRows() {
        const {
            data,
            rowSelected, 
            rowSelectedClassName,
        } = this.props;

        return data.map((row, rowIndex) => {
            const rowSelect = (rowSelected.rowIndex === rowIndex) ? rowSelectedClassName : '';
            return <InfoTableRow
                {...this.props}
                rowIndex={rowIndex}
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

