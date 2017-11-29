import React from 'react';
import DefaultPagination from '../DefaultPagination';

class DefaultFooter extends React.Component {
    render() {
        const { customPagination, showPagination } = this.props;
        const Pagination = customPagination ? customPagination : DefaultPagination;
        return (
            <td>
                { showPagination ? <Pagination {...this.props} /> : null }
            </td>
        )
    }
}

export default DefaultFooter;
