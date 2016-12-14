import React from 'react';
import DocSelector from '../components/doc-selector';

class DocSelectorTest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            docList: [],
            subDocList: [],
            docSelected: '',
            subDocSelected: ''
        };
    }

    componentDidMount() {
        google.script.run.withSuccessHandler(function (data) {
            this.setState({
                docList: data,
                docSelected: data[0].id
            });
        }.bind(this)).getDocs();
        google.script.run.withSuccessHandler(function (data) {
            this.setState({
                subDocList: data,
                subDocSelected: data[0].id
            });
        }.bind(this)).getBookmarks();
    }

    render() {
        return (
            <DocSelector
                docType="document"
                subDocType="bookmark"
                docList={this.state.docList}
                subDocList={this.state.subDocList}
                docSelected={this.state.docSelected}
                subDocSelected={this.state.subDocSelected}
            />
        );
    }

}

export default DocSelectorTest;