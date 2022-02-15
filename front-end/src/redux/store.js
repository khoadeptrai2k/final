import React from 'react'
import {createStore} from 'redux'
import rootReducer from './reducers'
import {Provider} from 'react-redux'

const store = createStore(rootReducer,
    window._REDUX_DEVTOOLS_EXTENSION_&& window._REDUX_DEVTOOLS_EXTENSION_()
)

function DataProvider({children}) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default DataProvider