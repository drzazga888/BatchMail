import React from 'react';
import TableColumn from './table-column';

class Table extends React.Component {

    _onInputChange(i, name, e) {
        this.props.editable.onChange(i, name, e.target.value);
    }

    _onDeleteButtonClick(i) {
        this.props.editable.onRowDelete(i);
    }

    render() {

        let children = this.props.children;
        let message = null;
        let newRowInserter = null;

        if (!Array.isArray(children)) {
            children = [children];
        }
        children = children.slice();

        if (this.props.editable.enabled && !this.props.editable.onlyChangeAllowed && this.props.data.length) {
            children.push(<TableColumn key="delete-option" id="delete-option" />);
        }

        let rows = this.props.data.map(function(row, i) {
            let cols = children.map(function(column) {
                let id = column.props.id;
                let field;
                if (this.props.editable.enabled) {
                    if (id === 'delete-option') {
                        field = <button className="danger" onClick={this._onDeleteButtonClick.bind(this, i)}>Delete</button>
                    } else {
                        field = <input className="full-width" type="text" value={row[id]} onChange={this._onInputChange.bind(this, i, id)} />;
                    }
                } else {
                    field = row[id];
                }
                return <td key={id}>{field}</td>;
            }.bind(this));
            return <tr key={i}>{cols}</tr>;
        }.bind(this));

        if (this.props.data.length === 0) {
            message = <p className="little-hidden centered">Table is empty</p>;
        }

        if (this.props.editable.enabled && !this.props.editable.onlyChangeAllowed) {
            newRowInserter = <p><button onClick={this.props.editable.onRowInsert}>Add new item</button></p>;
        }

        return (
            <div>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>{children}</tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </table>
                </div>
                {message}
                {newRowInserter}
            </div>
        );
    }

}

Table.defaultProps = {
    data: [],
    editable: {
        enabled: false,
        onlyChangeAllowed: false,
        onRowInsert: null,
        onChange: null,
        onRowDelete: null
    }
};

export default Table;