/** @jsx React.DOM */
require(['Routes'], function(AppRoutes) {
	window.des_globals = {
		element: document.getElementById('des-app'),
		ref: document.getElementById('des-app').getAttribute('data-firebaseref'),
		auth: document.getElementById('des-app').getAttribute('data-auth'),
		broadcast_listeners: [],
		broadcast: function(event) {
			this.broadcast_listeners.forEach(function(listener) {
				listener.on_broadcast_event(event);
			});
		},
		authenticated: false,
		setAuthenticated: function(authenticated, value) {
			console.log(value);
			this.authenticated = authenticated;
			window.localStorage.setItem('token', value);
			this.broadcast('authenticated', value);
		},
		authenticateWithToken: function(token) {
			var self = this;
			new Firebase(self.ref).auth(token, function(error) {
				if (error) {
					console.log(error);
					window.localStorage.removeItem('token');
				}
				else {
					self.setAuthenticated(true, token);
				}
			});
		}
	};

	var token = window.localStorage.getItem('token');
	if (token != null) {
		des_globals.authenticateWithToken(token);
	}

	React.renderComponent(
		AppRoutes(null),
		document.getElementById('des-app'), function() {
		}
	);
})