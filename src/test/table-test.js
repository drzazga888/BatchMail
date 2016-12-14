import React from 'react';
import Table from '../components/table';
import TableColumn from '../components/table-column';

class TableTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    id1: 'aaa',
                    id2: 'bbb'
                }, {
                    id1: 'aaa',
                    id2: 'bbb'
                }, {
                    id1: 'aaa',
                    id2: 'bbb'
                }
            ],
            editable: false,
            onlyChangeAllowed: false,
            useData: true
        };
        this.onDataChange = this.onDataChange.bind(this);
        this.onEditableChange = this.onEditableChange.bind(this);
        this.onOnlyOneRowChange = this.onOnlyOneRowChange.bind(this);
        this.onUseDataChange = this.onUseDataChange.bind(this);
        this.onDataRowInsert = this.onDataRowInsert.bind(this);
        this.onDataRowDelete = this.onDataRowDelete.bind(this);
    }

    onDataChange(i, name, value) {
        let arr = this.state.data;
        arr[i][name] = value;
        this.setState({
            data: arr
        });
    }

    onDataRowInsert() {
        let arr = this.state.data;
        arr.push({
            id1: '',
            id2: ''
        });
        this.setState({
            data: arr
        });
    }

    onDataRowDelete(i) {
        let arr = this.state.data;
        arr.splice(i, 1);
        this.setState({
            data: arr
        });
    }

    onEditableChange() {
        this.setState({
            editable: !this.state.editable
        });
    }

    onOnlyOneRowChange() {
        this.setState({
            onlyChangeAllowed: !this.state.onlyChangeAllowed
        });
    }

    onUseDataChange() {
        this.setState({
            useData: !this.state.useData
        });
    }

    render() {
        return (
            <div>

                <p>
                    <label>
                        Editable
                        <input type="checkbox" checked={this.state.editable} onChange={this.onEditableChange} />
                    </label>
                </p>

                <p>
                    <label>
                        Only change allowed
                        <input type="checkbox" checked={this.state.onlyChangeAllowed} onChange={this.onOnlyOneRowChange} />
                    </label>
                </p>

                <p>
                    <label>
                        Use data
                        <input type="checkbox" checked={this.state.useData} onChange={this.onUseDataChange} />
                    </label>
                </p>

                <Table
                    data={this.state.useData ? this.state.data: []}
                    editable={{
                        enabled: this.state.editable,
                        onlyChangeAllowed: this.state.onlyChangeAllowed,
                        onChange: this.onDataChange,
                        onRowInsert: this.onDataRowInsert,
                        onRowDelete: this.onDataRowDelete
                    }}
                >
                    <TableColumn id="id1">Name1</TableColumn>
                    <TableColumn id="id2">Name2</TableColumn>
                </Table>

            </div>
        );
    }

}

export default TableTest;