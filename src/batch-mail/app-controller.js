import React from 'react';
import AppContainer from './app-container';
import EmailBuilder from './email-builder';

class AppController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            googleDocList: [],
            googleSheetList: [],

            templateBookmarks: [],
            recipientsSheetTabs: [],
            replacementsSheetTabs: [],
            ccsSheetTabs: [],

            replacements: [],
            recipients: [],
            template: {
                body: [],
                subject: null
            },
            ccs: [],

            singleMailMode: false,
            customCCsMode: false,
            templateDirectInputMode: false,

            templateDocSelected: '',
            templateBookmarkSelected: '',
            recipientsSheetSelected: '',
            recipientsSheetTabSelected: '',
            replacementsSheetSelected: '',
            replacementsSheetTabSelected: '',
            ccsSheetSelected: '',
            ccsSheetTabSelected: ''
        };

        this.onTemplateListChange = this.onTemplateListChange.bind(this);
        this.onRecipientsListChange = this.onRecipientsListChange.bind(this);
        this.onReplacementsListChange = this.onReplacementsListChange.bind(this);
        this.onCCsListChange = this.onCCsListChange.bind(this);
        this.onBookmarksListChange = this.onBookmarksListChange.bind(this);
        this.onRecipientsSheetsListChange = this.onRecipientsSheetsListChange.bind(this);
        this.onReplacementsSheetsListChange = this.onReplacementsSheetsListChange.bind(this);
        this.onCCsSheetsListChange = this.onCCsSheetsListChange.bind(this);

        this.onSingleMailModeChanged = this.onSingleMailModeChanged.bind(this);
        this.onCustomCCsModeChanged = this.onCustomCCsModeChanged.bind(this);
        this.onTemplateDirectInputModeChange = this.onTemplateDirectInputModeChange.bind(this);

        this.onRecipientChange = this.onRecipientChange.bind(this);
        this.onCustomCCsRowChange = this.onCustomCCsRowChange.bind(this);
        this.onCustomCCsRowInsert = this.onCustomCCsRowInsert.bind(this);
        this.onCustomCCsRowDelete = this.onCustomCCsRowDelete.bind(this);
        this.onTemplateBodyChange = this.onTemplateBodyChange.bind(this);
        this.onTemplateSubjectChange = this.onTemplateSubjectChange.bind(this);

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
                this.updateCCsSheetTabs();
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
            }, this.updateTemplate);
        }
    }

    _updateSheetTabs(name, uppercased) {
        if (!uppercased) {
            uppercased = name.charAt(0).toUpperCase() + name.slice(1);
        }
        let selectedName = name + 'SheetSelected';
        let sheetTabsName = name + 'SheetTabs';
        let sheetTabSelectedName = name + 'SheetTabSelected';
        let updateName = 'update' + uppercased;
        if (this.state[selectedName]) {
            google.script.run.withSuccessHandler(function(data) {
                let newState = {};
                newState[sheetTabsName] = data;
                newState[sheetTabSelectedName] = AppController.reassignSelected(data, this.state[sheetTabSelectedName]);
                this.setState(newState, this[updateName]);
            }.bind(this)).getSheetTabs(this.state[selectedName]);
        } else {
            let newState = {};
            newState[sheetTabsName] = [];
            newState[sheetTabSelectedName] = '';
            this.setState(newState, this[updateName]);
        }
    }

    updateRecipientsSheetTabs() {
        this._updateSheetTabs('recipients');
    }

    updateReplacementsSheetTabs() {
        this._updateSheetTabs('replacements');
    }

    updateCCsSheetTabs() {
        this._updateSheetTabs('ccs', 'CCs');
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

    _updateSheetRelatedState(name, callback) {
        let sheetSelected = name + 'SheetSelected';
        let sheetTabSelected = name + 'SheetTabSelected';
        if (this.state[sheetSelected] && this.state[sheetTabSelected]) {
            let gs = google.script.run.withSuccessHandler(function(data) {
                let newState = {};
                newState[name] = data;
                this.setState(newState);
            }.bind(this));
            callback(gs, this.state[sheetSelected], this.state[sheetTabSelected]);
        } else {
            let newState = {};
            newState[name] = [];
            this.setState(newState);
        }
    }

    updateReplacements() {
        this._updateSheetRelatedState('replacements', function(gs, sheet, tab) {
            gs.getReplacements(sheet, tab);
        });
    }

    updateRecipients() {
        if (this.state.singleMailMode) {
            return;
        }
        this._updateSheetRelatedState('recipients', function(gs, sheet, tab) {
            gs.getRecipients(sheet, tab);
        });
    }

    updateCCs() {
        if (this.state.customCCsMode) {
            return;
        }
        this._updateSheetRelatedState('ccs', function(gs, sheet, tab) {
            gs.getCCs(sheet, tab);
        });
    }

    sendMails() {
        let emails = this.state.recipients.map(function(recipient) {
            return EmailBuilder.create('production')
                .build(this.state.template, this.state.replacements, recipient, this.state.ccs)
                .getText();
        }.bind(this));
        google.script.run.withSuccessHandler(function() {
            alert('Emails have been successfully sent');
        }).withFailureHandler(function() {
            alert('Error while sending emails!');
        }).sendMails(emails);
    }

    // callbacks

    onTemplateListChange(e) {
        this.setState({
            templateDocSelected: e ? e.value : ''
        }, this.updateTemplateBookmarks);
    }

    onRecipientsListChange(e) {
        this.setState({
            recipientsSheetSelected: e ? e.value : ''
        }, this.updateRecipientsSheetTabs);
    }

    onReplacementsListChange(e) {
        this.setState({
            replacementsSheetSelected: e ? e.value : ''
        }, this.updateReplacementsSheetTabs);
    }

    onCCsListChange(e) {
        this.setState({
            ccsSheetSelected: e ? e.value : ''
        }, this.updateCCsSheetTabs);
    }

    onBookmarksListChange(e) {
        this.setState({
            templateBookmarkSelected: e ? e.value : ''
        }, this.updateTemplate);
    }

    onRecipientsSheetsListChange(e) {
        this.setState({
            recipientsSheetTabSelected: e ? e.value : ''
        }, this.updateRecipients);
    }

    onReplacementsSheetsListChange(e) {
        this.setState({
            replacementsSheetTabSelected: e ? e.value : ''
        }, this.updateReplacements);
    }

    onCCsSheetsListChange(e) {
        this.setState({
            ccsSheetTabSelected: e ? e.value : ''
        }, this.updateCCs);
    }

    // new features

    onSingleMailModeChanged() {
        if (!this.state.singleMailMode) {
            this.setState({
                singleMailMode: true,
                recipients: [{
                    email: '',
                    full_name: ''
                }]
            });
        } else {
            this.setState({
                singleMailMode: false
            }, function() {
                this.updateGoogleSheetList();
            });
        }
    }

    onCustomCCsModeChanged() {
        if (!this.state.customCCsMode) {
            this.setState({
                customCCsMode: true,
                ccs: []
            });
        } else {
            this.setState({
                customCCsMode: false
            }, function() {
                this.updateGoogleSheetList();
            });
        }
    }

    onTemplateDirectInputModeChange() {
        if (!this.state.templateDirectInputMode) {
            this.setState({
                templateDirectInputMode: true,
                template: {
                    body: '',
                    subject: ''
                }
            });
        } else {
            this.setState({
                templateDirectInputMode: false
            }, function() {
                this.updateGoogleDocList();
            });
        }
    }

    onRecipientChange(i, name, value) {
        let recipients = this.state.recipients;
        recipients[i][name] = value;
        this.setState({
            recipients: recipients
        });
    }

    onCustomCCsRowChange(i, name, value) {
        let ccs = this.state.ccs;
        ccs[i][name] = value;
        this.setState({
            css: ccs
        });
    }

    onCustomCCsRowInsert() {
        let ccs = this.state.ccs;
        ccs.push({
            cc: ''
        });
        this.setState({
            css: ccs
        });
    }

    onCustomCCsRowDelete(i) {
        let ccs = this.state.ccs;
        ccs.splice(i, 1);
        this.setState({
            css: ccs
        });
    }

    onTemplateBodyChange(e) {
        let template = this.state.template;
        template.body = e.target.value;
        this.setState({
            template: template
        });
    }

    onTemplateSubjectChange(e) {
        let template = this.state.template;
        template.subject = e.target.value;
        this.setState({
            template: template
        });
    }

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
                ccsSheetTabs={this.state.ccsSheetTabs}

                replacements={this.state.replacements}
                recipients={this.state.recipients}
                template={this.state.template}
                ccs={this.state.ccs}

                singleMailMode={this.state.singleMailMode}
                customCCsMode={this.state.customCCsMode}
                templateDirectInputMode={this.state.templateDirectInputMode}

                templateDocSelected={this.state.templateDocSelected}
                templateBookmarkSelected={this.state.templateBookmarkSelected}
                recipientsSheetSelected={this.state.recipientsSheetSelected}
                recipientsSheetTabSelected={this.state.recipientsSheetTabSelected}
                replacementsSheetSelected={this.state.replacementsSheetSelected}
                replacementsSheetTabSelected={this.state.replacementsSheetTabSelected}
                ccsSheetSelected={this.state.ccsSheetSelected}
                ccsSheetTabSelected={this.state.ccsSheetTabSelected}

                onTemplateListChange={this.onTemplateListChange}
                onRecipientsListChange={this.onRecipientsListChange}
                onReplacementsListChange={this.onReplacementsListChange}
                onCCsListChange={this.onCCsListChange}
                onBookmarksListChange={this.onBookmarksListChange}
                onRecipientsSheetsListChange={this.onRecipientsSheetsListChange}
                onReplacementsSheetsListChange={this.onReplacementsSheetsListChange}
                onCCsSheetsListChange={this.onCCsSheetsListChange}

                onSingleMailModeChanged={this.onSingleMailModeChanged}
                onCustomCCsModeChanged={this.onCustomCCsModeChanged}
                onTemplateDirectInputModeChange={this.onTemplateDirectInputModeChange}

                onRecipientChange={this.onRecipientChange}
                onCustomCCsRowChange={this.onCustomCCsRowChange}
                onCustomCCsRowInsert={this.onCustomCCsRowInsert}
                onCustomCCsRowDelete={this.onCustomCCsRowDelete}
                onTemplateBodyChange={this.onTemplateBodyChange}
                onTemplateSubjectChange={this.onTemplateSubjectChange}

                onSendRequest={this.sendMails}
                onDocsRefresh={this.updateGoogleDocList}
                onSheetsRefresh={this.updateGoogleSheetList}

            />
        );
    }

}

export default AppController;