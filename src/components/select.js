import React from 'react';
import $ from 'jquery';
import 'select2';

class Select extends React.Component {

    componentDidMount() {
        $(this.refs.select).select2(this.props.engineOptions).on('change', function(a, b, c) {
            if (this.props.onChange) {
                this.props.onChange(a, b, c);
            }
        }.bind(this));
    }

    render() {

        var options = this.props.list.map(function(item) {
            return <option key={item.id} value={item.id}>{item.name}</option>;
        });

        return (
            <p className="distant-inline">
                <label htmlFor={this.props.id}>
                    {this.props.children}
                </label>
                <select
                    id={this.props.id}
                    ref='select'
                    disabled={!this.props.list.length}
                    onChange={this.props.onChange}
                    value={this.props.value}
                    style={{width: '65%'}}
                >
                    <option value=""></option>
                    {options}
                </select>
            </p>
        );
    }

}

Select.defaultProps = {
    engineOptions: {}
};

export default Select;