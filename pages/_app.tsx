import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import store, { persistor } from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  const onDragEnd = (result: DropResult) => {
    const { draggableId, source, destination, type } = result;
    if (!destination) 
      return;

    if (destination.index === source.index && destination.droppableId === source.droppableId) 
      return;
    
    if (draggableId.startsWith('column') !== destination.droppableId.startsWith('main')) {
      return;
    }

    if (type === 'column') {
      store.dispatch({ type: 'todo/swapColumn', payload: {
        sourceIndex: source.index, 
        destinationIndex: destination.index
      }})
    } else {
      store.dispatch({ type: 'todo/swapTodo', payload: {
        todoId: draggableId,
        sourceColumnId: source.droppableId, 
        destinationColumnId: destination.droppableId, 
        sourceIndex: source.index, 
        destinationIndex: destination.index
      }})
    }
  }

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ChakraProvider>
          <DragDropContext onDragEnd={onDragEnd}>
            <Component {...pageProps} />
          </DragDropContext>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;