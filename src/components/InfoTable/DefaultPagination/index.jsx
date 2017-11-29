import React from 'react';

const computePage = (totalCount, itemsPerPage) => {
    let totalPages = Math.floor(totalCount / itemsPerPage);
    if (totalCount % itemsPerPage !== 0) {
        totalPages++;
    }
    return totalPages;
}

const getPages = (totalCount, itemsPerPage, currentPage, onChangePage) => {
    const pages=[];
    const total = Math.ceil(totalCount / itemsPerPage);
    for(let i = 1; i <= total; i++){
        pages.push(
            <li
                key={`Page${i}`}
                className={currentPage === i ? 'active' : ''}
                onClick={e => onChangePage(e, i)}
            >
                <a>{i}</a>
            </li>
        );
    }
    return pages;
}


class DefaultPagination extends React.Component {
    constructor(props) {
        super(props);
        const totalPages = computePage(this.props.totalCount, this.props.itemsPerPage);
        this.state = {
            totalPages
        }

        this.handleOnChangePage = this.handleOnChangePage.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const totalPages = computePage(nextProps.totalCount, nextProps.itemsPerPage);
        this.setState({ totalPages });
    }

    handleOnChangePage(event, currentPage) {
        this.props.onChangeGrid(event, { currentPage });
    }

    render() {
        const { totalCount, itemsPerPage, currentPage } = this.props;
        const Pages = getPages(totalCount, itemsPerPage, currentPage, this.handleOnChangePage);
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li>
                        <a aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {Pages}
                    <li>
                        <a aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
} 

export default DefaultPagination;
