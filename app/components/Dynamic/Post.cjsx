React = require 'react'
Router = require 'react-router'

AjaxLinkMixin = require '../Mixins/AjaxLinkMixin.cjsx'
markdown = require 'markdown'

DisplayPost = React.createClass
	mixins: [AjaxLinkMixin]
	edit: (e) ->
		e.preventDefault()
		@props.onEdit
	render: ->
		thing = <article>
			<h2><a href={Router.makeHref(@props.type, {slug: @props.id})} onClick={this.toPage}>{@props.data.title}</a></h2>
			<div dangerouslySetInnerHTML={{__html: markdown.parse(@props.data.text)}}></div>
		</article>


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
		console.log(@props.type);
		unless @state.editing
			return <DisplayPost id={@props.id} data={@props.data} onEdit={@edit} type={@props.type} />
		else
			return <EditPost data={@props.data} onChange={@changed} onDelete={@deleted} onBack={@back} />