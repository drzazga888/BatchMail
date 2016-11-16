import React from 'react';
import Select from './select';
import Table from './table';
import TableColumn from './table-column';

class Recipients extends React.Component {

    render() {

        var link = `https://docs.google.com/spreadsheets/d/${this.props.recipientsSheetSelected}/edit#gid=${this.props.recipientsSheetTabSelected}`;
        var openInNewTab = this.props.recipientsSheetSelected ? <p><a href={link} target="_blank">Open sheet in a new tab</a></p> : null;

        return (
            <div>
                <h2>Recipients</h2>
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

}

export default Recipients;