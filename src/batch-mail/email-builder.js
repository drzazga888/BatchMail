import $ from 'jquery';
import React from 'react';

class EmailBuilder {

    constructor(mode) {
        this.mode = mode;
    }

    static create(mode) {
        return new EmailBuilder(mode);
    }

    static htmlEscape(str) {
        return $("<div>").text(str).html();
    }

    static htmlUnescape(str) {
        return $("<div>").html(str).text();
    }

    getHtml() {
        return this.built;
    }

    getText() {
        return {
            subject: EmailBuilder.htmlUnescape(this.built.subject),
            body: EmailBuilder.htmlUnescape(this.built.body),
            email: this.built.email,
            ccs: this.built.ccs
        }
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
        if (!source) {
            source = '';
        }
        replacements.forEach(function(replacement) {
            switch (replacement.type) {
                case 'normal':
                    source = source.split(replacement.search).join(this.wrap(replacement.replace_to, replacement));
                    break;
                case 'full-name':
                    let full_name = recipient ? recipient.full_name : 'Full Name';
                    source = source.split(replacement.search).join(this.wrap(full_name, replacement));
                    break;
                case 'email':
                    let email = recipient ? recipient.email : 'Email';
                    source = source.split(replacement.search).join(this.wrap(email, replacement));
                    break;
            }
        }.bind(this));
        return source;
    }

    build(template, replacements, recipient, ccs) {
        // escaping replacements
        let escapedReplacements = replacements.map(function(replacement) {
            return {
                type: replacement.type,
                search: EmailBuilder.htmlEscape(replacement.search),
                replace_to: EmailBuilder.htmlEscape(replacement.replace_to)
            }
        });
        // escaping and replacing other things
        let replacedSubject = template.subject;
        if (!replacedSubject) {
            // let's extract it from replacements
            let subjectReplacements = escapedReplacements.filter(function(replacement) {
                return replacement.type === 'subject-if-not-exists';
            });
            if (subjectReplacements.length > 0) {
                replacedSubject = subjectReplacements[subjectReplacements.length - 1].replace_to;
            }
        } else {
            replacedSubject = EmailBuilder.htmlEscape(replacedSubject);
        }
        replacedSubject = this.replace(replacedSubject, escapedReplacements, recipient);
        ccs = ccs.map(function(item) {
            if (this.mode === 'preview') {
                return `<span class="cc-item">${item.cc}</span>`;
            } else {
                return item.cc;
            }
        }.bind(this));
        let replacedBody = this.replace(EmailBuilder.htmlEscape(template.body), escapedReplacements, recipient);
        this.built = {
            subject: replacedSubject,
            body: replacedBody,
            email: recipient ? recipient.email : null,
            ccs: this.mode === 'preview' ? ccs : ccs.join(',')
        };
        return this;
    }

}

export default EmailBuilder;