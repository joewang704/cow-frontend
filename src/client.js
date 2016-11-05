import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './ducks'
import App from './components/App'
import thunk from 'redux-thunk'
import transit from 'transit-immutable-js'
import { AppContainer } from 'react-hot-loader'
import moment from 'moment'

let state = transit.fromJSON(window.__INITIAL_STATE__)

const store = createStore(
  rootReducer,
  state,
  applyMiddleware(thunk)
)

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./ducks', () => {
    const nextRootReducer = require('./ducks/index').default
    store.replaceReducer(nextRootReducer)
  })
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    render(
      <AppContainer>
        <Provider store={store}>
          <NextApp />
        </Provider>
      </AppContainer>
    , document.getElementById('root'))
  })
}
