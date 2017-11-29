import React from 'react';
import InfoTableRow from '../InfoTableRow';

class InfoTableRows extends React.Component {
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
        const {
            tableHeight,
            tableBodyClassName,
        } = this.props;

        const rows = this.getRows();

        if  (tableHeight !== '') {
            const customStyle = { overflowY: "scroll", height: tableHeight }
            return (<tbody style={customStyle}>{rows}</tbody>);
        }

        return (
            <tbody className={tableBodyClassName}>{rows}</tbody>
        );
    }
}

export default InfoTableRows;

