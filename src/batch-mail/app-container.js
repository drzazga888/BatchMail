import React from 'react';
import Header from './header';
import Template from './template';
import Replacements from './replacements';
import Recipients from './recipients';
import CCs from './ccs';

class AppContainer extends React.Component {

    render() {

        let replacements = null;
        if (!this.props.templateDirectInputMode) {
            replacements = <Replacements
                googleSheetList={this.props.googleSheetList}
                replacementsSheetTabs={this.props.replacementsSheetTabs}
                replacements={this.props.replacements}
                onReplacementsListChange={this.props.onReplacementsListChange}
                onReplacementsSheetsListChange={this.props.onReplacementsSheetsListChange}
                replacementsSheetSelected={this.props.replacementsSheetSelected}
                replacementsSheetTabSelected={this.props.replacementsSheetTabSelected}
            />;
        }

        return (
            <main>
                <header className="header-line">
                    <Header
                        onSendRequest={this.props.onSendRequest}
                        onDocsRefresh={this.props.onDocsRefresh}
                        onSheetsRefresh={this.props.onSheetsRefresh}
                        template={this.props.template}
                        recipients={this.props.recipients}
                    />
                </header>
                <div className="horizontal-split">
                    <div className="main-split">
                        <section>
                            <Template
                                googleDocList={this.props.googleDocList}
                                templateBookmarks={this.props.templateBookmarks}
                                template={this.props.template}
                                onTemplateListChange={this.props.onTemplateListChange}
                                onBookmarksListChange={this.props.onBookmarksListChange}
                                templateDocSelected={this.props.templateDocSelected}
                                templateBookmarkSelected={this.props.templateBookmarkSelected}
                                replacements={this.props.replacements}
                                recipients={this.props.recipients}
                                ccs={this.props.ccs}
                                templateDirectInputMode={this.props.templateDirectInputMode}
                                onTemplateDirectInputModeChange={this.props.onTemplateDirectInputModeChange}
                                onTemplateBodyChange={this.props.onTemplateBodyChange}
                                onTemplateSubjectChange={this.props.onTemplateSubjectChange}
                            />
                        </section>
                    </div>
                    <div className="side-split">
                        <section>
                            {replacements}
                        </section>
                        <section>
                            <Recipients
                                googleSheetList={this.props.googleSheetList}
                                recipientsSheetTabs={this.props.recipientsSheetTabs}
                                recipients={this.props.recipients}
                                singleMailMode={this.props.singleMailMode}
                                onRecipientsListChange={this.props.onRecipientsListChange}
                                onRecipientsSheetsListChange={this.props.onRecipientsSheetsListChange}
                                recipientsSheetSelected={this.props.recipientsSheetSelected}
                                recipientsSheetTabSelected={this.props.recipientsSheetTabSelected}
                                onSingleMailModeChanged={this.props.onSingleMailModeChanged}
                                onRecipientChange={this.props.onRecipientChange}
                            />
                        </section>
                        <section>
                            <CCs
                                googleSheetList={this.props.googleSheetList}
                                ccsSheetTabs={this.props.ccsSheetTabs}
                                ccs={this.props.ccs}
                                customCCsMode={this.props.customCCsMode}
                                onCCsListChange={this.props.onCCsListChange}
                                onCCsSheetsListChange={this.props.onCCsSheetsListChange}
                                ccsSheetSelected={this.props.ccsSheetSelected}
                                ccsSheetTabSelected={this.props.ccsSheetTabSelected}
                                onCustomCCsModeChanged={this.props.onCustomCCsModeChanged}
                                onCustomCCsRowChange={this.props.onCustomCCsRowChange}
                                onCustomCCsRowInsert={this.props.onCustomCCsRowInsert}
                                onCustomCCsRowDelete={this.props.onCustomCCsRowDelete}
                            />
                        </section>
                    </div>
                </div>
            </main>
        );
    }

}

export default AppContainer;