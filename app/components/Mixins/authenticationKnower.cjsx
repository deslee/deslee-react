broadcastListenerMixin = require('./broadcastListener.cjsx')

module.exports =
	mixins: [broadcastListenerMixin]
	getInitialState: ->
		authenticated: window.des_globals.authenticated

	on_authenticated: ->
		@setState authenticated: true