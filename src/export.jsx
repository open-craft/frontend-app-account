import { Route, Switch } from 'react-router-dom';
import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';
import { AppProvider } from '@edx/frontend-platform/react';
import {
  APP_READY, initialize, mergeConfig, subscribe,
} from '@edx/frontend-platform';
import { useEffect, useState } from 'react';
import configureStore from './data/configureStore';
import Head from './head/Head';
import CoachingConsent from './account-settings/coaching/CoachingConsent';
import IdVerificationPage from './id-verification/IdVerificationPage';
import AccountSettingsPage from './account-settings/AccountSettingsPage';
import { NotFoundPage } from './account-settings';
import appMessages from './i18n';

import './index.scss';

export const App = () => {
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    setInitialized(true);
    subscribe(APP_READY, () => {
      setInitialized(true);
    });
  }, []);
  return initialized && (
    <AppProvider store={configureStore()}>
      <Head />
      <Switch>
        <Route path="/coaching_consent" component={CoachingConsent} />
        <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
          <Header />
          <main className="flex-grow-1">
            <Switch>
              <Route path="/id-verification" component={IdVerificationPage} />
              <Route exact path="/" component={AccountSettingsPage} />
              <Route path="/account/settings" component={AccountSettingsPage} />
              <Route path="/notfound" component={NotFoundPage} />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Switch>
    </AppProvider>
  );
};

initialize({
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
  requireAuthenticatedUser: true,
  hydrateAuthenticatedUser: true,
  handlers: {
    config: () => {
      mergeConfig({
        SUPPORT_URL: process.env.SUPPORT_URL,
        COACHING_ENABLED: (process.env.COACHING_ENABLED || false),
        ENABLE_DEMOGRAPHICS_COLLECTION: (process.env.ENABLE_DEMOGRAPHICS_COLLECTION || false),
        DEMOGRAPHICS_BASE_URL: process.env.DEMOGRAPHICS_BASE_URL,
        ENABLE_COPPA_COMPLIANCE: (process.env.ENABLE_COPPA_COMPLIANCE || false),
        ENABLE_DOB_UPDATE: (process.env.ENABLE_DOB_UPDATE || false),
        MARKETING_EMAILS_OPT_IN: (process.env.MARKETING_EMAILS_OPT_IN || false),
      }, 'App loadConfig override handler');
    },
  },
});

export default App;
