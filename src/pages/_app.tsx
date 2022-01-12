import '../styles/globals.css';
import type { AppProps } from 'next/app';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { useApollo } from '../lib/apolloClient';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import store from '../store/store';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import '@draft-js-plugins/alignment/lib/plugin.css';
import '../styles/font.css';
import '@draft-js-plugins/emoji/lib/plugin.css';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Provider>
  );
}
export default MyApp;
