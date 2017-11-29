import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ customStyleCheckbox, value, label, onChange }) => 
    <div className="checkbox">
        <label>
            <input
                style={customStyleCheckbox}
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e)}
            /> {label}
        </label>
    </div>


Checkbox.defaultProps = {
    label: 'label',
    value: false,
    onChange: () => {},
}

Checkbox.propTypes = {
    label: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
}

export default Checkbox;