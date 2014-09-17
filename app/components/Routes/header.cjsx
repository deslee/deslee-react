React = require 'react'
AjaxLinkMixin = require '../Mixins/AjaxLinkMixin.cjsx'


module.exports = React.createClass
	mixins: [AjaxLinkMixin]
	render: () ->
		Renderable = require '../Dynamic/Renderable.cjsx'
		return <header>
			<h1 className="masthead">
				<a href="/" onClick={@toPage}><Renderable path="h1" /></a> <small><Renderable path="slogan" /></small>
			</h1>
		</header>