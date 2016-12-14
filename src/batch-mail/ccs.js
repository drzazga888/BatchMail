import React from 'react';
import DocSelector from '../components/doc-selector';
import Table from '../components/table';
import TableColumn from '../components/table-column';

class CCs extends React.Component {

    render() {

        let docSelector = null;
        if (!this.props.customCCsMode) {
            docSelector = <DocSelector
                docType="spreadsheets"
                subDocType="tab"
                docList={this.props.googleSheetList}
                subDocList={this.props.ccsSheetTabs}
                docSelected={this.props.ccsSheetSelected}
                subDocSelected={this.props.ccsSheetTabSelected}
                onDocChange={this.props.onCCsListChange}
                onSubDocChange={this.props.onCCsSheetsListChange}
            />;
        }

        return (
            <div>
                <h2>CCs</h2>
                <p>
                    <input
                        id="custom-cc-mode"
                        checked={this.props.customCCsMode}
                        onChange={this.props.onCustomCCsModeChanged}
                        type="checkbox"
                    />
                    <label htmlFor="custom-cc-mode">Custom CCs mode</label>
                </p>
                {docSelector}
                <Table
                    data={this.props.ccs}
                    editable={{
                        enabled: this.props.customCCsMode,
                        onlyChangeAllowed: false,
                        onChange: this.props.onCustomCCsRowChange,
                        onRowInsert: this.props.onCustomCCsRowInsert,
                        onRowDelete: this.props.onCustomCCsRowDelete
                    }}
                >
                    <TableColumn id="cc">CC</TableColumn>
                </Table>
            </div>
        );

    }

}

export default CCs;