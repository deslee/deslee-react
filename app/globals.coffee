module.exports = 
	element: document.getElementById 'des-app'
	ref: document.getElementById('des-app').getAttribute 'data-firebaseref'
	auth: document.getElementById('des-app').getAttribute 'data-auth'

	broadcast_listeners: []
	authenticated: false
	
	broadcast: (event) ->
		listener.on_broadcast_event event for listener in @broadcast_listeners

	setAuthenticated: (authenticated, value) ->
		@authenticated = authenticated
		window.localStorage.setItem 'token', value
		@broadcast 'authenticated', value

	authenticateWithToken: (token) ->
		new Firebase(@ref).auth token, (error) =>
			if error
				console.log(error)
				window.localStorage.removeItem 'token'
			else
				@setAuthenticated true, token