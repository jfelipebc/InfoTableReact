import React from 'react';
import DefaultPagination from '../DefaultPagination';

class DefaultFooter extends React.Component {
    render() {
        const { customPaginationComponent, showPagination } = this.props;
        const Pagination = customPaginationComponent ? customPaginationComponent : DefaultPagination;
        return showPagination ? <Pagination {...this.props} /> : null;
    }
}

export default DefaultFooter;
