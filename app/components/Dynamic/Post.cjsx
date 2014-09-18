React = require 'react'
Router = require 'react-router'

AjaxLinkMixin = require '../Mixins/AjaxLinkMixin.cjsx'
AuthenticationKnower = require '../Mixins/authenticationKnower.cjsx'
markdown = require 'markdown'

DisplayPost = React.createClass
	mixins: [AjaxLinkMixin, AuthenticationKnower]
	edit: (e) ->
		e.preventDefault()
		@props.onEdit
	render: ->
		edit_button = <button onClick={@edit}>Edit</button>

		return <article>
			<h2><a href={Router.makeHref(@props.type, {slug: @props.id})} onClick={this.toPage}>{@props.data.title}</a></h2>
			<div dangerouslySetInnerHTML={{__html: markdown.parse(@props.data.text)}}></div>
			{if @state.authenticated then edit_button else undefined}
		</article>

EditPost = React.createClass
	render: ->
		<p>Editing</p>



module.exports = React.createClass
	getInitialState: ->
		editing: false

	edit: ->
		@setState
			editing: true
	changed: ->
		@props.onEdited @props.id
	deleted: ->
		@props.onDeleted @props.id
	back: ->
		@setState
			editing: false

	render: ->		
		unless @state.editing
			return <DisplayPost id={@props.id} data={@props.data} onEdit={@edit} type={@props.type} />
		else
			return <EditPost data={@props.data} onChange={@changed} onDelete={@deleted} onBack={@back} />