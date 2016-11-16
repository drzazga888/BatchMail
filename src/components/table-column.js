import React from 'react';

class TableColumn extends React.Component {

    render() {
        return (
            <th>{this.props.children}</th>
        );
    }

}

export default TableColumn;