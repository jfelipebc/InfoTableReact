import React from 'react';
import PropTypes from 'prop-types';

const Checkbox = ({ customStyleCheckbox, value, label, onChange, customClass, indeterminate }) => (
    <div className="checkbox" style={customStyleCheckbox}>
        <label>
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => onChange(e)}
                ref={input => { if (input) input.indeterminate = indeterminate}}
            /> {label}
        </label>
    </div>
);
    

Checkbox.defaultProps = {
    label: '',
    value: false,
    onChange: () => {},
}

Checkbox.propTypes = {
    label: PropTypes.string,
    value: PropTypes.bool,
    onChange: PropTypes.func,
}

export default Checkbox;