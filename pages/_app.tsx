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
    
    if (
      source.droppableId.startsWith('column') && destination.droppableId.startsWith('todo') ||
      source.droppableId.startsWith('todo') && destination.droppableId.startsWith('column')
    ) {
      return;
    }

    if (draggableId.startsWith('column')) {      
      store.dispatch({ type: 'todo/swapColumn', payload: {
        todoId: draggableId,
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