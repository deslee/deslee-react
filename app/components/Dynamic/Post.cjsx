React = require 'react'
Router = require 'react-router'
ReactFireMixin = require 'reactfire'
AuthenticationKnower = require '../Mixins/authenticationKnower.cjsx'
AjaxLinkMixin = require '../Mixins/AjaxLinkMixin.cjsx'
markdown = require 'markdown'
globals = require('../../globals.coffee')


module.exports = React.createClass
	mixins: [AjaxLinkMixin, ReactFireMixin, AuthenticationKnower]

	getInitialState: ->
		post:
			title: "Loading"
			text: "loading"

	componentWillMount: ->
		@ref = new Firebase("#{globals.ref}/#{@props.type}").child(@props.id)
		@bindAsObject @ref, 'post'

	edit: ->
		@props.onEdit(@state.post) if @props.onEdit

	render: ->
		edit_button = undefined

		if @state.authenticated and @props.isEditing is false
			edit_button = <button onClick={@edit}>Edit</button>

		return <article>
			<h2><a href={Router.makeHref(@props.type, {slug: @props.id})} onClick={this.toPage}>{@state.post.title}</a></h2>
			<div dangerouslySetInnerHTML={{__html: markdown.parse(@state.post.text)}}></div>
			{edit_button}
		</article>