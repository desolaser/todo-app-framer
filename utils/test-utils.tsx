import React, { PropsWithChildren } from 'react'
import { render as rtlRender } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { DragDropContext } from 'react-beautiful-dnd'
import { onDragEnd } from '../lib/beautifulDnD'

import { setupStore } from '../redux/store'
import type { AppStore, RootState } from '../redux/store'
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

function render(
  ui: React.ReactElement,
  {
    preloadedState= {} as PreloadedState<RootState>,
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (      
      <ChakraProvider>
        <DragDropContext onDragEnd={(result) => onDragEnd(result, store)}>
          <Provider store={store}>{children}</Provider>
        </DragDropContext>
      </ChakraProvider>
    )
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) }
}

export * from '@testing-library/react'
export { 
  render
}