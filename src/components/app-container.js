import React from 'react';
import Header from './header';
import Template from './template';
import Replacements from './replacements';
import Recipients from './recipients';

class AppContainer extends React.Component {

    render() {
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
                            />
                        </section>
                    </div>
                    <div className="side-split">
                        <section>
                            <Replacements
                                googleSheetList={this.props.googleSheetList}
                                replacementsSheetTabs={this.props.replacementsSheetTabs}
                                replacements={this.props.replacements}
                                onReplacementsListChange={this.props.onReplacementsListChange}
                                onReplacementsSheetsListChange={this.props.onReplacementsSheetsListChange}
                                replacementsSheetSelected={this.props.replacementsSheetSelected}
                                replacementsSheetTabSelected={this.props.replacementsSheetTabSelected}
                            />
                        </section>
                        <section>
                            <Recipients
                                googleSheetList={this.props.googleSheetList}
                                recipientsSheetTabs={this.props.recipientsSheetTabs}
                                recipients={this.props.recipients}
                                onRecipientsListChange={this.props.onRecipientsListChange}
                                onRecipientsSheetsListChange={this.props.onRecipientsSheetsListChange}
                                recipientsSheetSelected={this.props.recipientsSheetSelected}
                                recipientsSheetTabSelected={this.props.recipientsSheetTabSelected}
                            />
                        </section>
                    </div>
                </div>
            </main>
        );
    }

}

export default AppContainer;