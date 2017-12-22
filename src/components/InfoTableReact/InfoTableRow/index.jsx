import React from 'react';
import DefaultRow from '../DefaultRow';
import Checkbox from '../Checkbox';
import ExpandComponent from '../ExpandComponent/index';
class InfoTableRow extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isExpand: false,
            isExpandibleRow: false,
        }

        this.handleRowClick = this.handleRowClick.bind(this);
    }

    componentWillMount = () => {
        const isExpandibleRow = this.props.expandableRow && this.props.expandableRow(this.props.row);
        this.setState({ isExpandibleRow })
    }

    render() {
        const { customRow,
            columns,
            row,
            rowIndex,
            rowWidth,
            rowSelectedClass,
            showCheckbox,
            isSelect,
            expandComponent
        } = this.props;
        const Row = customRow ? customRow : DefaultRow;

        return (
            <tr 
                onClick={event => this.handleRowClick(event, row, rowIndex)} 
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
                {
                    this.state.isExpandibleRow ? 
                        <ExpandComponent expand={this.state.isExpand} width={rowWidth}>
                            { React.createElement(expandComponent, { row, rowIndex }, null) }
                        </ExpandComponent>
                    : null
                }
            </tr>
        );
    }

    
    handleRowClick = (e, row, rowIndex) => {
        if (this.state.isExpandibleRow && e.target.type === undefined) {
            this.setState({ isExpand: !this.state.isExpand });
        }
        if (e.target.type === 'checkbox' || e.target.type === undefined) {
            this.props.onRowClick(e, row, rowIndex);    
        }
        
    }
}

export default InfoTableRow;