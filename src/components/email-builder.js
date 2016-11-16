import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';

class EmailBuilder {

    constructor(mode) {
        this.mode = mode;
    }

    static create(mode) {
        return new EmailBuilder(mode);
    }

    static htmlEscape(str) {
        return $("<div>").text(str).html()
            .replace(/^ /mg, "\n&nbsp;")
            .replace(/^\t/mg, "\n&nbsp;&nbsp;&nbsp;&nbsp;")
            .replace(/\n/g, '<br />');
    }

    toReactComponents() {
        return this.built;
    }

    toStrings() {
        var built = this.built;
        var dom = $('<div></div>');
        ReactDOM.render(React.createElement('div', null, built.body), dom[0]);
        built.body = dom.children().html();
        return built;
    }

    wrap(content, replacement) {
        switch (this.mode) {
            case 'production':
                return content;
            case 'preview':
                return `<span class="replacement ${replacement.type}">
                    ${content}
                    <div class="replacement-info">
                        <p>
                            <em>${replacement.type}</em>
                            <span class="little-hidden">replacement</span>
                        </p>
                        <p>
                            <span class="little-hidden">from</span>
                            ${replacement.search}
                        </p>
                    </div>
                </span>`;
            default:
                return null;
        }
    }

    replace(source, replacements, recipient) {
        replacements.forEach(function(replacement) {
            switch (replacement.type) {
                case 'normal':
                    source = source.split(replacement.search).join(this.wrap(replacement.replace_to, replacement));
                    break;
                case 'full-name':
                    var full_name = recipient ? recipient.full_name : 'Full Name';
                    source = source.split(replacement.search).join(this.wrap(full_name, replacement));
                    break;
                case 'email':
                    var email = recipient ? recipient.email : 'Email';
                    source = source.split(replacement.search).join(this.wrap(email, replacement));
                    break;
            }
        }.bind(this));
        return source;
    }

    static mapTemplate(template) {
        var nested = null;
        var prevType = null;
        var items = [];
        template.forEach(function(item, i) {
            if (item.type !== prevType) {
                if (nested) {
                    items.push(React.createElement(EmailBuilder.nestedMap[nested.type], {key: i}, nested.children));
                    nested = null;
                }
                if (Object.keys(EmailBuilder.nestedMap).indexOf(item.type) !== -1) {
                    nested = {
                        type: item.type,
                        children: []
                    }
                }
            }
            var reactDom = React.createElement(EmailBuilder.normalMap[item.type], {key: i, dangerouslySetInnerHTML: {__html: item.text}}, null);
            if (Object.keys(EmailBuilder.nestedMap).indexOf(item.type) !== -1) {
                nested.children.push(reactDom);
            } else {
                items.push(reactDom);
            }
            prevType = item.type;
        });
        if (nested) {
            items.push(React.createElement(EmailBuilder.nestedMap[nested.type], {key: i}, nested.children));
            nested = null;
        }
        return items;
    }

    build(template, replacements, recipient) {
        // escaping replacements
        var escapedReplacements = replacements.map(function(replacement) {
            return {
                type: replacement.type,
                search: EmailBuilder.htmlEscape(replacement.search),
                replace_to: EmailBuilder.htmlEscape(replacement.replace_to)
            }
        });
        // escaping and replacing other things
        var replacedSubject = template.subject;
        if (!replacedSubject) {
            // let's extract it from replacements
            var subjectReplacements = escapedReplacements.filter(function(replacement) {
                return replacement.type === 'subject-if-not-exists';
            });
            if (subjectReplacements.length > 0) {
                replacedSubject = subjectReplacements[subjectReplacements.length - 1].replace_to;
            }
        } else {
            replacedSubject = EmailBuilder.htmlEscape(replacedSubject);
        }
        replacedSubject = this.replace(replacedSubject, escapedReplacements, recipient);
        var replacedBody = template.body.map(function(elem) {
            return {
                type: elem.type,
                text: this.replace(
                    EmailBuilder.htmlEscape(elem.text),
                    escapedReplacements,
                    recipient
                )
            }
        }, this);
        this.built = {
            subject: replacedSubject,
            body: EmailBuilder.mapTemplate(replacedBody),
            email: recipient ? recipient.email : null
        };
        return this;
    }

}

EmailBuilder.normalMap = {
    LIST_ITEM: 'li',
    PARAGRAPH: 'p'
};

EmailBuilder.nestedMap = {
    LIST_ITEM: 'ul'
};

export default EmailBuilder;