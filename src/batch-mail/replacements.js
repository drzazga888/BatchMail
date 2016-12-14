import React from 'react';
import DocSelector from '../components/doc-selector';
import Table from '../components/table';
import TableColumn from '../components/table-column';

class Replacements extends React.Component {

    render() {

        return (
            <div>
                <h2>Replacements</h2>
                <DocSelector
                    docType="spreadsheets"
                    subDocType="tab"
                    docList={this.props.googleSheetList}
                    subDocList={this.props.replacementsSheetTabs}
                    docSelected={this.props.replacementsSheetSelected}
                    subDocSelected={this.props.replacementsSheetTabSelected}
                    onDocChange={this.props.onReplacementsListChange}
                    onSubDocChange={this.props.onReplacementsSheetsListChange}
                />
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