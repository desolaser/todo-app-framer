import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import store from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  const onDragEnd = () => {

  }

  return (
    <ChakraProvider>
      <DragDropContext onDragEnd={onDragEnd}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </DragDropContext>
    </ChakraProvider>
  );
}

export default MyApp;