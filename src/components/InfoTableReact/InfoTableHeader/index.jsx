import React from 'react';
import BulkActions from '../BulkActions';
import DefaultHeaderFilter from '../DefaultHeaderFilter';
import ShowListColumnsModal from '../ShowListColumnsModal';

class InfoTableHeader extends React.Component {
    render() {
        const { customFilterComponent, customBulkActions, customHeader, showFilter } = this.props;
        if (customHeader) return React.createElement(customHeader, {...this.props}, null);
        const Filter = customFilterComponent ? customFilterComponent : DefaultHeaderFilter;
        const Actions = customBulkActions ? customBulkActions : BulkActions;
        return (
            <div style={{
                padding: '10px 5px',
                display: 'flex',
                justifyContent: 'flex-end',
                height: 48 + 'px'
            }}>
                <ShowListColumnsModal 
                    {...this.props}
                    id="showListColumnsModal"
                />
                { showFilter ? <Filter { ...this.props } /> : '' }
                <Actions { ...this.props } />
            </div>
        )
    }
}



export default InfoTableHeader;