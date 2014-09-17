React = require 'react'

module.exports = React.createClass
	render: () ->
		Renderable = require '../Dynamic/Renderable.cjsx'
		return <header>
			<h1 className="masthead">
				<a href="/"><Renderable path="h1" /></a> <small><Renderable path="slogan" /></small>
			</h1>
		</header>