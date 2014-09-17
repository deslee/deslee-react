Firebase = require 'firebase'
React = require 'react'
AppRoutes = require './components/Routes.cjsx'

window.des_globals =
	element: document.getElementById 'des-app'
	ref: document.getElementById('des-app').getAttribute 'data-firebaseref'
	auth: document.getElementById('des-app').getAttribute 'data-auth'

	broadcast_listeners: []
	authenticated: false
	
	broadcast: (event) ->
		listener.on_broadcast_event event for listener in this.broadcast_listeners

	setAuthenticated: (authenticated, value) ->
		this.authenticated = authenticated
		window.localStorage.setItem 'token', value
		this.broadcast 'authenticated', value

	authenticateWithToken: (token) ->
		new Firebase(this.ref).auth token, (error) =>
			if error
				console.log(error)
				window.localStorage.removeItem 'token'
			else
				this.setAuthenticated true, token

token = window.localStorage.getItem 'token'
des_globals.authenticateWithToken token  if token?

React.renderComponent <AppRoutes />, document.getElementById 'des-app'