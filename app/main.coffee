Firebase = require 'firebase'
React = require 'react'
AppRoutes = require './components/Routes.cjsx'
globals = require './globals.coffee'

token = window.localStorage.getItem 'token'
globals.authenticateWithToken token  if token?

React.renderComponent <AppRoutes />, document.getElementById 'des-app'