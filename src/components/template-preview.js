import React from 'react'
import EmailBuilder from './email-builder';

class TemplatePreview extends React.Component {

    render() {

        var preview = EmailBuilder.create('preview')
            .build(this.props.template, this.props.replacements, this.props.recipient)
            .toReactComponents();

        if (preview.body.length === 0) {
            preview.body = <p className="little-hidden centered">Please select template</p>;
        }

        if (!preview.subject) {
            preview.subject = '<span class="little-hidden centered">Unknown</span>';
        }

        return (
            <div className="template-preview">
                <p>
                    <span className="little-hidden">Subject: </span>
                    <span dangerouslySetInnerHTML={{__html: preview.subject}} className="template-subject-preview"></span>
                </p>
                <div className="template-preview-body">
                    {preview.body}
                </div>
            </div>
        );
    }

}

export default TemplatePreview;