import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { DragDropContext } from 'react-beautiful-dnd';
import { setupStore, persistor } from '../redux/store';
import { onDragEnd } from '../lib/beautifulDnD';

const store = setupStore()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider>
          <DragDropContext onDragEnd={(result) => onDragEnd(result, store)}>
            <Component {...pageProps} />
          </DragDropContext>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;