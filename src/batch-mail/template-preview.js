import React from 'react'
import EmailBuilder from './email-builder';

class TemplatePreview extends React.Component {

    render() {

        let preview = EmailBuilder.create('preview')
            .build(this.props.template, this.props.replacements, this.props.recipient, this.props.ccs)
            .getHtml();

        if (!preview.body) {
            preview.body = '<p class="little-hidden centered">Please select template</p>';
        }

        if (!preview.subject) {
            preview.subject = '<span class="little-hidden centered">Unknown</span>';
        }

        if (!preview.ccs.length) {
            preview.ccs = '<span class="little-hidden centered">No CC provided</span>';
        }

        let subject = null;
        let body = null;
        if (this.props.templateDirectInputMode) {
            subject = (
                <input
                    type="text"
                    className="template-subject-preview"
                    value={this.props.template.subject}
                    onChange={this.props.onTemplateSubjectChange}
                />
            );
            body = (
                <div className="template-preview-body">
                    <textarea
                        className="template-preview-body-input"
                        value={this.props.template.body}
                        onChange={this.props.onTemplateBodyChange}
                    />
                </div>
            );
        } else {
            subject = <span dangerouslySetInnerHTML={{__html: preview.subject}} className="template-subject-preview" />;
            body = <div dangerouslySetInnerHTML={{__html: preview.body}} className="template-preview-body"></div>;
        }

        return (
            <div className="template-preview">
                <p className="inside-input-full-width">
                    <span className="little-hidden">Subject:&nbsp;</span>
                    {subject}
                </p>
                <p>
                    <span className="little-hidden">CC:&nbsp;</span>
                    <span dangerouslySetInnerHTML={{__html: preview.ccs}} />
                </p>
                {body}
            </div>
        );
    }

}

export default TemplatePreview;