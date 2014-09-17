React = require 'react'

module.exports = React.createClass render: ->
	return <main id="mainComponent">
		{this.props.activeRouteHandler()}
	</main>
