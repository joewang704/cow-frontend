import express from 'express'
import React from 'react'
import { createStore } from 'redux'
import reducers from '../ducks'
import { renderToString } from 'react-dom/server'
import App from '../components/App'
import { Provider } from 'react-redux'
import transit from 'transit-immutable-js'
import webpackConfig from '../../webpack.dev.config.js'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { getInitialStoreState } from './db.js'
import { checkAuthMiddleware, login, register } from './auth.js'
import { getCookies } from './utils.js'
import jwt from 'jsonwebtoken'

const isDevEnvironment = process.env.NODE_ENV === 'dev'

const app = express()
const portNum = process.env.PORT || 40

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use('/static', express.static(`${__dirname}/../static`))

if (isDevEnvironment) {
  const compiler = webpack(webpackConfig)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    hot: true,
  }))
  app.use(webpackHotMiddleware(compiler))
}

app.set('views', `${__dirname}/../static/html`)
app.set('view engine', 'ejs')

app.get('/register', (req, res) => res.render('register'))
app.get('/login', (req, res) => res.render('login'))

app.post('/register', (req, res) => {
  const { email, password } = req.body
  const token = jwt.sign({ email, password }, 'is2gjoe')
  register(token).then((success) => {
    if (success) {
      res.cookie('cow_token', token)
      return res.redirect('/')
    }
    return res.redirect('/register')
  })
})

app.post('/login', (req, res) => {
  const { email, password } = req.body
  const token = jwt.sign({ email, password }, 'is2gjoe')
  login(token).then((success) => {
    if (success) {
      res.cookie('cow_token', token)
      return res.redirect('/')
    }
    return res.redirect('/login')
  })
})

app.get('/', checkAuthMiddleware, (req, res) => {
  getInitialStoreState(req.token).then((initialState) => {
    const store = createStore(reducers, initialState)
    let component
    try {
      component = renderToString(
        <Provider store={store}>
          <App />
        </Provider>
      )
    } catch (err) {
      return res.send(`Server error: ${err}`)
    }
    return res.send(renderFullPage(component, store.getState()))
  }).catch((err) => res.send(`Server error: ${err}`))
})

const renderFullPage = (component, initialState) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Cow.</title>
        <link rel="stylesheet" href="static/css/bootstrap.min.css">
        <link rel="stylesheet" href="static/css/font-awesome.min.css">
        <link rel="stylesheet" href="static/css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Indie+Flower" rel="stylesheet" type="text/css">
      </head>
      <body>
        <!--[if lt IE 8]>
          <p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="http://browserhappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div id="root">${component}</div>
        <script>
          window.__INITIAL_STATE__ = ${JSON.stringify(transit.toJSON(initialState))}
        </script>
        <script src="${isDevEnvironment ? '/webpack/bundle.js' : '/static/client-bundle.js'}"></script>
      </body>
    </html>
  `
}

app.listen(portNum, () => {
  if (!process.env.PORT) {
    // eslint-disable-next-line no-console
    console.log(`Serving port number ${portNum}`)
  }
})

