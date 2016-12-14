import React from 'react';

class Header extends React.Component {

    render() {

        let sendingActive = this.props.recipients.length > 0 && this.props.template.body && this.props.template.subject;

        return (
            <div className="distant-inline">
                <h1>BatchMail</h1>
                <div className="inline-set">
                    <button onClick={this.props.onSendRequest} disabled={!sendingActive}>Send Emails</button>
                    <button onClick={this.props.onDocsRefresh}>Refrest Docs</button>
                    <button onClick={this.props.onSheetsRefresh}>Refresh Sheets</button>
                </div>
            </div>
        );
    }

}

export default Header;