import React from 'react';
import DefaultFooter from '../DefaultFooter';

class InfoTableFooter extends React.Component {
    render() {
        const { customFooter } = this.props; 
        const Footer = customFooter ? customFooter : DefaultFooter;
        return (
            <tr>
                <Footer {...this.props} />
            </tr>
        )
    }
}
export default InfoTableFooter;
