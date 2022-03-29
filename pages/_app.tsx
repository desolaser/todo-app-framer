import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import store from '../redux/store';

function MyApp({ Component, pageProps }: AppProps) {
  const onDragEnd = (result: DropResult) => {
    const { draggableId, source, destination } = result;
    if (!destination) 
      return;

    if (destination.index === source.index && destination.droppableId === source.droppableId) 
      return;
    
    if (draggableId.startsWith('column') !== destination.droppableId.startsWith('main')) {
      return;
    }

    if (draggableId.startsWith('column')) {
      store.dispatch({ type: 'todo/swapColumn', payload: {
        columnId: draggableId,
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
      <ChakraProvider>
        <DragDropContext onDragEnd={onDragEnd}>
          <Component {...pageProps} />
        </DragDropContext>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;