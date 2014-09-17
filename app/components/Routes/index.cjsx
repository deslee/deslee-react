React = require 'react'

module.exports = React.createClass
	render: () ->
		Header = require './header.cjsx'
		Nav = require './nav.cjsx'
		Content = require './Content/content.cjsx'

		return <div id="container">
			<Header />
			<Nav />
			<Content activeRouteHandler={@props.activeRouteHandler} />
		</div>