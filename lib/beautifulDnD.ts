import type { DropResult } from 'react-beautiful-dnd';
import type { AppStore } from '../redux/store';

const onDragEnd = (result: DropResult, store: AppStore) => {
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

export {
  onDragEnd
}