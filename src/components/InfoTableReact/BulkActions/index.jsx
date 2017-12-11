import React from 'react';

const ShowListButton = () =>
    <button
        className="btn btn-default btn-sm"
        data-target="#showListColumnsModal"
        data-toggle="modal"
    >
        <i className="fa fa-th-list" aria-hidden="true" />
    </button>

const BulkActions = ({ showListColumns }) => {
    const ShowListColumn = showListColumns ? <ShowListButton /> : null;
    return (
        <div
            style={{ order: 0, marginRight: 'auto' }}
        >
            {ShowListColumn}
        </div>
    );
}

export default BulkActions;
