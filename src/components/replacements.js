import React from 'react';
import Select from './select';
import Table from './table';
import TableColumn from './table-column';

class Replacements extends React.Component {

    render() {

        var link = `https://docs.google.com/spreadsheets/d/${this.props.replacementsSheetSelected}/edit#gid=${this.props.replacementsSheetTabSelected}`;
        var openInNewTab = this.props.replacementsSheetSelected ? <p><a href={link} target="_blank">Open sheet in a new tab</a></p> : null;

        return (
            <div>
                <h2>Replacements</h2>
                <Select
                    id="replacements-select"
                    list={this.props.googleSheetList}
                    onChange={this.props.onReplacementsListChange}
                    value={this.props.replacementsSheetSelected}
                    engineOptions={{
                        placeholder: 'Select source'
                    }}
                >
                    Google Sheet
                </Select>
                <Select
                    id="replacements-sheet-tab-select"
                    list={this.props.replacementsSheetTabs}
                    onChange={this.props.onReplacementsSheetsListChange}
                    value={this.props.replacementsSheetTabSelected}
                    engineOptions={{
                        placeholder: 'Select Sheet Tab'
                    }}
                >
                    Sheet tab
                </Select>
                {openInNewTab}
                <Table data={this.props.replacements}>
                    <TableColumn id="type">Type</TableColumn>
                    <TableColumn id="search">Search</TableColumn>
                    <TableColumn id="replace_to">Replace to</TableColumn>
                </Table>
            </div>
        );
    }

}

export default Replacements;