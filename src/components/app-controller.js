import React from 'react';
import $ from 'jquery';
import AppContainer from './app-container';
import EmailBuilder from './email-builder';

class AppController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            googleDocList: [],
            googleSheetList: [],
            recipientsSheetTabs: [],
            replacementsSheetTabs: [],
            templateBookmarks: [],
            replacements: [],
            recipients: [],
            template: {
                body: [],
                subject: null
            },
            templateDocSelected: '',
            templateBookmarkSelected: '',
            recipientsSheetSelected: '',
            recipientsSheetTabSelected: '',
            replacementsSheetSelected: '',
            replacementsSheetTabSelected: ''
        };
        this.onTemplateListChange = this.onTemplateListChange.bind(this);
        this.onRecipientsListChange = this.onRecipientsListChange.bind(this);
        this.onReplacementsListChange = this.onReplacementsListChange.bind(this);
        this.onBookmarksListChange = this.onBookmarksListChange.bind(this);
        this.onRecipientsSheetsListChange = this.onRecipientsSheetsListChange.bind(this);
        this.onReplacementsSheetsListChange = this.onReplacementsSheetsListChange.bind(this);

        //this.onRecipientEmailInput = this.onRecipientEmailInput.bind(this);
        //this.onRecipientFullNameInput = this.onRecipientFullNameInput.bind(this);

        this.sendMails = this.sendMails.bind(this);
        this.updateGoogleDocList = this.updateGoogleDocList.bind(this);
        this.updateGoogleSheetList = this.updateGoogleSheetList.bind(this);
    }

    // loaders

    static reassignSelected(arr, id) {
        return arr.filter(function(item) {
            return item.id == id;
        }).length > 0 ? id : '';
    }

    updateGoogleDocList() {
        google.script.run.withSuccessHandler(function(data) {
            this.setState({
                googleDocList: data,
                templateDocSelected: AppController.reassignSelected(data, this.state.templateDocSelected)
            }, this.updateTemplateBookmarks);
        }.bind(this)).getDocs();
    }

    updateGoogleSheetList() {
        google.script.run.withSuccessHandler(function(data) {
            this.setState({
                googleSheetList: data,
                replacementsSheetSelected: AppController.reassignSelected(data, this.state.replacementsSheetSelected),
                recipientsSheetSelected: AppController.reassignSelected(data, this.state.recipientsSheetSelected)
            }, function() {
                this.updateRecipientsSheetTabs();
                this.updateReplacementsSheetTabs();
            });
        }.bind(this)).getSheets();
    }

    updateTemplateBookmarks() {
        if (this.state.templateDocSelected) {
            google.script.run.withSuccessHandler(function(data) {
                this.setState({
                    templateBookmarks: data,
                    templateBookmarkSelected: AppController.reassignSelected(data, this.state.templateBookmarkSelected)
                }, this.updateTemplate);
            }.bind(this)).getBookmarks(this.state.templateDocSelected);
        } else {
            this.setState({
                templateBookmarks: [],
                templateBookmarkSelected: ''
            });
        }
    }

    updateRecipientsSheetTabs() {
        if (this.state.recipientsSheetSelected) {
            google.script.run.withSuccessHandler(function(data) {
                this.setState({
                    recipientsSheetTabs: data,
                    recipientsSheetTabSelected: AppController.reassignSelected(data, this.state.recipientsSheetTabSelected)
                }, this.updateRecipients);
            }.bind(this)).getSheetTabs(this.state.recipientsSheetSelected);
        } else {
            this.setState({
                recipientsSheetTabs: [],
                recipientsSheetTabSelected: ''
            });
        }
    }

    updateReplacementsSheetTabs() {
        if (this.state.replacementsSheetSelected) {
            google.script.run.withSuccessHandler(function(data) {
                this.setState({
                    replacementsSheetTabs: data,
                    replacementsSheetTabSelected: AppController.reassignSelected(data, this.state.replacementsSheetTabSelected)
                }, this.updateReplacements);
            }.bind(this)).getSheetTabs(this.state.replacementsSheetSelected);
        } else {
            this.setState({
                replacementsSheetTabs: [],
                replacementsSheetTabSelected: ''
            });
        }
    }

    updateTemplate() {
        if (this.state.templateDocSelected) {
            google.script.run.withSuccessHandler(function(data) {
                if (data) {
                    this.setState({
                        template: data
                    });
                } else {
                    this.setState({
                        template: {
                            body: [],
                            subject: null
                        }
                    });
                }
            }.bind(this)).getTemplate(this.state.templateDocSelected, this.state.templateBookmarkSelected);
        } else {
            this.setState({
                template: {
                    body: [],
                    subject: null
                }
            });
        }
    }

    updateReplacements() {
        if (this.state.replacementsSheetSelected && this.state.replacementsSheetTabSelected) {
            google.script.run.withSuccessHandler(function(data) {
                this.setState({
                    replacements: data
                });
            }.bind(this)).getReplacements(this.state.replacementsSheetSelected, this.state.replacementsSheetTabSelected);
        } else {
            this.setState({
                replacements: []
            });
        }
    }

    updateRecipients() {
        if (this.state.recipientsSheetSelected && this.state.recipientsSheetTabSelected) {
            google.script.run.withSuccessHandler(function(data) {
                this.setState({
                    recipients: data
                });
            }.bind(this)).getRecipients(this.state.recipientsSheetSelected, this.state.recipientsSheetTabSelected);
        } else {
            this.setState({
                recipients: []
            });
        }
    }

    sendMails() {
        var emails = this.state.recipients.map(function(recipient) {
            return EmailBuilder.create('production')
                .build(this.state.template, this.state.replacements, recipient)
                .toStrings();
        }.bind(this));
        console.log('sending emails...', emails);
        google.script.run.withSuccessHandler(function() {
            alert('Emails have been successfully sent');
        }).withFailureHandler(function() {
            alert('Error while sending emails!');
        }).sendMails(emails);
    }

    // callbacks

    onTemplateListChange(e) {
        this.setState({
            templateDocSelected: $(e.target).val()
        }, this.updateTemplateBookmarks);
    }

    onRecipientsListChange(e) {
        this.setState({
            recipientsSheetSelected: $(e.target).val()
        }, this.updateRecipientsSheetTabs);
    }

    onReplacementsListChange(e) {
        this.setState({
            replacementsSheetSelected: $(e.target).val()
        }, this.updateReplacementsSheetTabs);
    }

    onBookmarksListChange(e) {
        this.setState({
            templateBookmarkSelected: $(e.target).val()
        }, this.updateTemplate);
    }

    onRecipientsSheetsListChange(e) {
        this.setState({
            recipientsSheetTabSelected: $(e.target).val()
        }, this.updateRecipients);
    }

    onReplacementsSheetsListChange(e) {
        this.setState({
            replacementsSheetTabSelected: $(e.target).val()
        }, this.updateReplacements);
    }

    /*onRecipientEmailInput(e) {
     this.setState({
     e.target.value);
     }

     onRecipientFullNameInput(e) {
     this.setState(e.target.value);
     }*/

    // react-specific

    componentDidMount() {
        this.updateGoogleDocList();
        this.updateGoogleSheetList();
    }

    render() {
        return (
            <AppContainer

                googleDocList={this.state.googleDocList}
                googleSheetList={this.state.googleSheetList}
                recipientsSheetTabs={this.state.recipientsSheetTabs}
                replacementsSheetTabs={this.state.replacementsSheetTabs}
                templateBookmarks={this.state.templateBookmarks}
                replacements={this.state.replacements}
                recipients={this.state.recipients}
                template={this.state.template}

                templateDocSelected={this.state.templateDocSelected}
                templateBookmarkSelected={this.state.templateBookmarkSelected}
                recipientsSheetSelected={this.state.recipientsSheetSelected}
                recipientsSheetTabSelected={this.state.recipientsSheetTabSelected}
                replacementsSheetSelected={this.state.replacementsSheetSelected}
                replacementsSheetTabSelected={this.state.replacementsSheetTabSelected}

                onTemplateListChange={this.onTemplateListChange}
                onRecipientsListChange={this.onRecipientsListChange}
                onReplacementsListChange={this.onReplacementsListChange}
                onBookmarksListChange={this.onBookmarksListChange}
                onRecipientsSheetsListChange={this.onRecipientsSheetsListChange}
                onReplacementsSheetsListChange={this.onReplacementsSheetsListChange}

                onSendRequest={this.sendMails}
                onDocsRefresh={this.updateGoogleDocList}
                onSheetsRefresh={this.updateGoogleSheetList}

            />
        );
    }

}

export default AppController;