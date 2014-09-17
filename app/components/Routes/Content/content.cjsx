React = require 'react'
broadcastListenerMixin = require '../../Mixins/broadcastListener.cjsx'

module.exports = React.createClass
	mixins: [broadcastListenerMixin],
	render: () ->
		Aside = require './aside.cjsx'
		Main = require './main.cjsx'

		return <div>
			<Aside />
			<Main activeRouteHandler={@props.activeRouteHandler} />
		</div>