import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useApollo } from '../lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import store from '../store/store';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import '../styles/font.css';

import 'react-loading-skeleton/dist/skeleton.css';
import 'draft-js/dist/Draft.css';
import 'draftail/dist/draftail.css';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { useEffect } from 'react';
import * as ga from '../lib/ga';
import { useRouter } from 'next/router';

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    const handleRouteChange = url => {
      ga.pageview(url);
    };
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange);

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
