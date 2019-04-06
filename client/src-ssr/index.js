/*
 * This file runs in a Node context (it's NOT transpiled by Babel), so use only
 * the ES6 features that are supported by your Node version. https://node.green/
 *
 * All content of this folder will be copied as is to the output folder. So only import:
 *  1. node_modules (and yarn/npm install dependencies -- NOT to devDependecies though)
 *  2. create files in this folder and import only those with the relative path
 *
 * Note: This file is used only for PRODUCTION. It is not picked up while in dev mode.
 *   If you are looking to add common DEV & PROD logic to the express app, then use
 *   "src-ssr/extension.js"
 */

const express = require('express')
const compression = require('compression')

const ssr = require('../ssr')
const extension = require('./extension')
const app = express()
const port = process.env.PORT || 3000

const serve = (path, cache) => express.static(ssr.resolveWWW(path), {
  maxAge: cache ? 1000 * 60 * 60 * 24 * 30 : 0
})

// gzip
app.use(compression({ threshold: 0 }))

// serve this with no cache, if built with PWA:
if (ssr.settings.pwa) {
  app.use('/service-worker.js', serve('service-worker.js'))
}

// serve "www" folder
app.use('/', serve('.', true))

// we extend the custom common dev & prod parts here
extension.extendApp({ app })

// this should be last get(), rendering with SSR
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  ssr.renderToString({ req, res }, (err, html) => {
    if (err) {
      res.status(500).send('500 | Internal Server Error')
      console.error(`500 on ${req.url}`)
      console.error(err)
      console.error(err.stack)
    } else {
      res.send(html)
    }
  })
})

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})