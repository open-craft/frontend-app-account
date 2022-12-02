import 'core-js/stable';
import 'regenerator-runtime/runtime';

import 'formdata-polyfill';
import { ErrorPage } from '@edx/frontend-platform/react';
import {
  subscribe, APP_INIT_ERROR, APP_READY,
} from '@edx/frontend-platform';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './export';

import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <App />,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});
