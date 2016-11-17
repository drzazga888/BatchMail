import React from 'react';
import Select from './select';
import TemplatePreview from './template-preview';

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
            var i = this.getSelectedPosition();
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
        var keys = Object.keys(this.props.recipients);
        for (var i = 0; i < keys.length; ++i) {
            if (keys[i] === this.props.previewEmail) {
                return i;
            }
        }
        return null;
    }

    getSelectedRecipient(recipients) {
        var arr = recipients.filter(function(recipient) {
            return recipient.email === this.state.previewEmail
        }.bind(this));
        return arr.length ? arr[0] : null;
    }

    changePreviewEmail(e) {
        this.setState({
            previewEmail: e.target.value
        });
    }

    render() {

        var link = `https://docs.google.com/document/d/${this.props.templateDocSelected}/edit#bookmark=${this.props.templateBookmarkSelected}`;
        var openInNewTab = this.props.templateDocSelected ? <p><a href={link} target="_blank">Open sheet in a new tab</a></p> : null;

        var recipients = this.props.recipients.map(function(recipient) {
            return {
                id: recipient.email,
                name: recipient.full_name + ' (' + recipient.email + ')'
            }
        });

        return (
            <div>
                <h2>Template</h2>
                <Select
                    id="template-select"
                    list={this.props.googleDocList}
                    onChange={this.props.onTemplateListChange}
                    value={this.props.templateDocSelected}
                    engineOptions={{
                        placeholder: 'Select Template'
                    }}
                >
                    Google Doc
                </Select>
                <Select
                    id="template-bookmark-select"
                    list={this.props.templateBookmarks}
                    onChange={this.props.onBookmarksListChange}
                    value={this.props.templateBookmarkSelected}
                    engineOptions={{
                        placeholder: 'Select Bookmark'
                    }}
                >
                    Bookmark
                </Select>
                {openInNewTab}
                <h3>Preview</h3>
                <Select
                    id="template-recipient-select"
                    list={recipients}
                    onChange={this.changePreviewEmail}
                    value={this.state.previewEmail}
                    engineOptions={{
                        allowClear: true,
                        placeholder: 'Select Recipient'
                    }}
                >
                    Preview for
                </Select>
                <TemplatePreview
                    template={this.props.template}
                    replacements={this.props.replacements}
                    recipient={this.getSelectedRecipient(this.props.recipients)}
                />
            </div>
        );
    }

}

export default Template;