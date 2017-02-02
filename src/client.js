import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './ducks'
import App from './components/App'
import thunk from 'redux-thunk'
import transit from 'transit-immutable-js'
import { AppContainer } from 'react-hot-loader'
import moment from 'moment'

const state = transit.fromJSON(window.__INITIAL_STATE__)
const isDevEnvironment = process.env.NODE_ENV === 'dev'

state.items = state.items.map(item => {
  const today = moment().startOf('day')
  const date = item.get('date')
  if (moment(date).isBefore(today)) {
    return item.set('date', today).set('actualDate', date)
  }
  return item
})

const composeEnhancers = isDevEnvironment
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  : compose

const store = createStore(
  rootReducer,
  state,
  composeEnhancers(applyMiddleware(thunk))
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
