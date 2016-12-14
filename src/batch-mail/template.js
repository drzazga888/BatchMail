import React from 'react';
import Select from '../components/select';
import TemplatePreview from './template-preview';
import DocSelector from '../components/doc-selector';

class Template extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            previewEmail: ''
        };
        this.changePreviewEmail = this.changePreviewEmail.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!this.getSelectedRecipient(nextProps.recipients)) {
            let i = this.getSelectedPosition();
            if (i === null || i >= nextProps.recipients.length) {
                this.setState({
                    previewEmail: ''
                });
            } else {
                this.setState({
                    previewEmail: this.props.recipients[i].email
                });
            }
        }
    }

    getSelectedPosition() {
        let keys = Object.keys(this.props.recipients);
        for (let i = 0; i < keys.length; ++i) {
            if (keys[i] === this.state.previewEmail) {
                return i;
            }
        }
        return null;
    }

    getSelectedRecipient(recipients) {
        let arr = recipients.filter(function(recipient) {
            return recipient.email === this.state.previewEmail
        }.bind(this));
        return arr.length ? arr[0] : null;
    }

    changePreviewEmail(e) {
        this.setState({
            previewEmail: e ? e.value : ''
        });
    }

    render() {

        let recipients = this.props.recipients.map(function(recipient) {
            return {
                id: recipient.email,
                name: recipient.full_name + ' (' + recipient.email + ')'
            }
        });

        let docSelector = null;
        let previewForSelector = null;
        if (!this.props.templateDirectInputMode) {
            docSelector = <DocSelector
                docType="document"
                subDocType="bookmark"
                docList={this.props.googleDocList}
                subDocList={this.props.templateBookmarks}
                docSelected={this.props.templateDocSelected}
                subDocSelected={this.props.templateBookmarkSelected}
                onDocChange={this.props.onTemplateListChange}
                onSubDocChange={this.props.onBookmarksListChange}
            />;
            previewForSelector = <Select
                name="template-recipient-select"
                list={recipients}
                onChange={this.changePreviewEmail}
                value={this.state.previewEmail}
                placeholder="Select recipient"
            >
                Preview for
            </Select>;
        }

        return (
            <div>
                <h2>Template</h2>
                <p>
                    <input
                        id="template-custom-mode"
                        checked={this.props.templateDirectInputMode}
                        onChange={this.props.onTemplateDirectInputModeChange}
                        type="checkbox"
                    />
                    <label htmlFor="template-custom-mode">From direct input</label>
                </p>
                {docSelector}
                <h3>Preview</h3>
                {previewForSelector}
                <TemplatePreview
                    template={this.props.template}
                    replacements={this.props.replacements}
                    recipient={this.getSelectedRecipient(this.props.recipients)}
                    ccs={this.props.ccs}
                    templateDirectInputMode={this.props.templateDirectInputMode}
                    onTemplateBodyChange={this.props.onTemplateBodyChange}
                    onTemplateSubjectChange={this.props.onTemplateSubjectChange}
                />
            </div>
        );
    }

}

export default Template;