import React from 'react';
import ReactSelect from 'react-select';

class Select extends React.Component {

    render() {

        let options = this.props.list.map(function(item) {
            return {
                value: item.id.toString(),
                label: item.name
            };
        });

        return (
            <div className="distant-inline input-container">
                <label htmlFor={this.props.id}>
                    {this.props.children}
                </label>
                <ReactSelect
                    value={this.props.value}
                    options={options}
                    placeholder={this.props.placeholder}
                    onChange={this.props.onChange}
                    name={this.props.id}
                    disabled={!options.length}
                />
            </div>
        );
    }

}

export default Select;