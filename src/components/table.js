import React from 'react';

class Table extends React.Component {

    render() {

        var rows = this.props.data.map(function(item, i) {
            var cols = this.props.children.map(function(column) {
                return <td key={column.props.id}>{item[column.props.id]}</td>;
            });
            return <tr key={i}>{cols}</tr>;
        }.bind(this));

        var message = null;

        if (this.props.data.length === 0) {
            message = <p className="little-hidden centered">Table is empty</p>;
        }

        return (
            <div className="table-container">
                <table>
                    <thead>
                    <tr>{this.props.children}</tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
                {message}
            </div>
        );
    }

}

export default Table;