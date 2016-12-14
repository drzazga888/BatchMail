import $ from 'jquery';
import ReactDOM from 'react-dom';
import React from 'react';
import AppController from './batch-mail/app-controller';
//import TableTest from './test/table-test';
//import DocSelectorTest from './test/doc-selector-test';

ReactDOM.render(
    <AppController />,
    //<TableTest />,
    //<DocSelectorTest />,
    $('#react-me').get(0)
);
