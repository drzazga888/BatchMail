import React from 'react';
import Select from './select';

class DocSelector extends React.Component {

    render() {

        let link = `https://docs.google.com/${this.props.docType}/d/${this.props.docSelected}/edit#gid=${this.props.subDocSelected}`;
        let openInNewTab = this.props.docSelected ? <p><a href={link} target="_blank">Open {this.props.docType} in a new tab</a></p> : null;

        return (
            <div>
                <Select
                    id={this.props.id + '-doc-select'}
                    list={this.props.docList}
                    onChange={this.props.onDocChange}
                    value={this.props.docSelected}
                    placeholder={'Select ' + this.props.docType}
                >
                    Google {this.props.docType}
                </Select>
                <Select
                    id={this.props.id + '-sub-doc-select'}
                    list={this.props.subDocList}
                    onChange={this.props.onSubDocChange}
                    value={this.props.subDocSelected}
                    placeholder={'Select ' + this.props.subDocType}
                >
                    {this.props.subDocType.charAt(0).toUpperCase() + this.props.subDocType.slice(1)}
                </Select>
                {openInNewTab}
            </div>
        );

    }

}

DocSelector.defaultProps = {
    docList: [],
    subDocList: []
};

export default DocSelector;