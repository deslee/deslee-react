broadcastListenerMixin = require('./broadcastListener.cjsx')
globals = require('../../globals.coffee')

module.exports =
	mixins: [broadcastListenerMixin]
	getInitialState: ->
		authenticated: globals.authenticated

	on_authenticated: ->
		@setState authenticated: true