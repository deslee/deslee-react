Router = require 'react-router'

module.exports = 
	toPage: (e) ->
		href = e.currentTarget.getAttribute('href');
		e.preventDefault()
		Router.transitionTo href