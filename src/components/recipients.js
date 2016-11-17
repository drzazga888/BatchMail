import React from 'react';
import Select from './select';
import Table from './table';
import TableColumn from './table-column';

class Recipients extends React.Component {

    renderSwitchers() {

        var link = `https://docs.google.com/spreadsheets/d/${this.props.recipientsSheetSelected}/edit#gid=${this.props.recipientsSheetTabSelected}`;
        var openInNewTab = this.props.recipientsSheetSelected ? <p><a href={link} target="_blank">Open sheet in a new tab</a></p> : null;

        return (
            <div>
                <Select
                    id="recipients-select"
                    list={this.props.googleSheetList}
                    onChange={this.props.onRecipientsListChange}
                    value={this.props.recipientsSheetSelected}
                    engineOptions={{
                        placeholder: 'Select source'
                    }}
                >
                    Google Sheet
                </Select>
                <Select
                    id="recipients-sheet-tab-select"
                    list={this.props.recipientsSheetTabs}
                    onChange={this.props.onRecipientsSheetsListChange}
                    value={this.props.recipientsSheetTabSelected}
                    engineOptions={{
                        placeholder: 'Select Sheet Tab'
                    }}
                >
                    Sheet tab
                </Select>
                {openInNewTab}
                <Table data={this.props.recipients}>
                    <TableColumn id="email">Email</TableColumn>
                    <TableColumn id="full_name">Full name</TableColumn>
                </Table>
            </div>
        );
    }

    renderEmailInputs() {
        return (
            <div>
                <p className="distant-inline">
                    <label htmlFor="recipient-email-input">Email</label>
                    <input
                        type="text"
                        id="recipient-email-input"
                        value={this.props.recipients.length ? this.props.recipients[0].email : ''}
                        onChange={this.props.onRecipientEmailInput}
                    />
                </p>
                <p className="distant-inline">
                    <label htmlFor="recipient-full-name-input">Full Name</label>
                    <input
                        type="text"
                        id="recipient-full-name-input"
                        value={this.props.recipients.length ? this.props.recipients[0].full_name: ''}
                        onChange={this.props.onRecipientFullNameInput}
                        disabled={!this.props.recipients.length}
                    />
                </p>
            </div>
        );
    }

    render() {

        var switchers = this.props.singleMailMode ? this.renderEmailInputs() : this.renderSwitchers();

        return (
            <div>
                <h2>Recipients</h2>
                <p className="distant-inline">
                    <label htmlFor="recipients-mode-switcher">Single-mail mode</label>
                    <input
                        type="checkbox"
                        id="recipients-mode-switcher"
                        checked={this.props.singleMailMode}
                        onChange={this.props.onSingleMailModeChanged}
                    />
                </p>
                {switchers}
            </div>
        );
    }

}

export default Recipients;