import React from 'react';

class DefaultHeaderFilter extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            search: '',
        };
        this.onHandleSearchClick = this.onHandleSearchClick.bind(this);
        this.onHandleClearClick = this.onHandleClearClick.bind(this);
        this.onHandleChangeSearch = this.onHandleChangeSearch.bind(this);
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        return (nextState.search.toLocaleLowerCase() !== this.state.search.toLocaleLowerCase());
    }
    

    onHandleSearchClick(event) {
        if (this.props.onCustomFilter) {
            this.props.onCustomFilter(event, this.state.search);
        } else {
            this.props.onChangeGrid(event, { search: this.state.search });
        }
    }

    onHandleClearClick(event) {
        this.setState({ search: '' });
        if (this.props.onCustomClearFilter) {
            this.props.onCustomClearFilter(event);
        } else {
            this.props.onChangeGrid(event, { search: '' });
        }
    }

    onHandleChangeSearch(event) {
        this.setState({ search: event.target.value });
    }


    render() {
        const { filterPlaceholder } = this.props;
        return (
            <div className="form-inline" style={{ order: 1 }}>
                <input 
                    type="text"
                    value={this.state.search}
                    ref={inputSearch => this.inputSearch = inputSearch}
                    style={{ width: '350px' }}
                    className='form-control input-sm InfoTable-inputSearch'
                    placeholder={filterPlaceholder}
                    onChange={this.onHandleChangeSearch}
                />
                <button 
                    className="btn btn-default btn-sm"
                    onClick={this.onHandleSearchClick}
                >
                    <i className="fa fa-search" />
                </button>
                <button 
                    className="btn btn-default btn-sm"
                    onClick={this.onHandleClearClick}
                >
                    <i className="fa fa-close" />
                </button>
            </div>
        );
    }
}

export default DefaultHeaderFilter;