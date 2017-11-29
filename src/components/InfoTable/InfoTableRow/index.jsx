import React from 'react';
import DefaultRow from '../DefaultRow';

const InfoTableRow = (props) => {
    const { customRow } = props;
    const Row = customRow ? customRow : DefaultRow;
    return <Row {...props} />;
}

export default InfoTableRow;