import React from 'react';
import DefaultFooter from '../DefaultFooter';

class InfoTableFooter extends React.Component {
    render() {
        const { customFooter, showFooter } = this.props; 
        if (!showFooter) return null;

        const Footer = customFooter ? customFooter : DefaultFooter;
        return (
            <tfoot>
                <tr>
                    <Footer {...this.props} />
                </tr>
            </tfoot>
        )
    }
}
//{ showPagination ? <Pagination {...this.props} /> : null }
export default InfoTableFooter;
