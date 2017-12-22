import React from 'react';

const ExpandComponent = (props) => (
    <tr style={{ display: `${props.expand ? 'inherit' : 'none'}` }}>
        <td width={props.width}>
            {props.children}
        </td>
    </tr>
);

export default ExpandComponent;
