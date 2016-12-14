import React from 'react';
import DocSelector from '../components/doc-selector';
import Table from '../components/table';
import TableColumn from '../components/table-column';

class Recipients extends React.Component {

    render() {

        let docSelector = null;
        if (!this.props.singleMailMode) {
            docSelector = <DocSelector
                docType="spreadsheets"
                subDocType="tab"
                docList={this.props.googleSheetList}
                subDocList={this.props.recipientsSheetTabs}
                docSelected={this.props.recipientsSheetSelected}
                subDocSelected={this.props.recipientsSheetTabSelected}
                onDocChange={this.props.onRecipientsListChange}
                onSubDocChange={this.props.onRecipientsSheetsListChange}
            />;
        }

        return (
            <div>
                <h2>Recipients</h2>
                <p>
                    <input
                        id="single-mail-mode"
                        checked={this.props.singleMailMode}
                        onChange={this.props.onSingleMailModeChanged}
                        type="checkbox"
                    />
                    <label htmlFor="single-mail-mode">Single-mail mode</label>
                </p>
                {docSelector}
                <Table
                    data={this.props.recipients}
                    editable={{
                        enabled: this.props.singleMailMode,
                        onChange: this.props.onRecipientChange,
                        onlyChangeAllowed: true
                    }}
                >
                    <TableColumn id="email">Email</TableColumn>
                    <TableColumn id="full_name">Full name</TableColumn>
                </Table>
            </div>
        );

    }

}

export default Recipients;