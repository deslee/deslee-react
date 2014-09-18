React = require 'react'
ReactFireMixin = require 'reactfire'
globals = require('../../globals.coffee')

module.exports = React.createClass
	mixins: [ReactFireMixin]

	getInitialState: ->
		post:
			title: "Loading"
			text: "loading"

	componentWillMount: ->
		@ref = new Firebase("#{globals.ref}/#{@props.type}").child(@props.id)

	text_elements: [
		'title'
		'text'
	]
	checkbox_elements: [
		'published'
	]

	changed: (e) ->
		data = {}
		(data[element] = @refs[element].getDOMNode().value) for element in @text_elements
		(data[element] = @refs[element].getDOMNode().checked) for element in @checkbox_elements

		@props.onChange(data) if @props.onChange
		@ref.update(data);

	done: (e) ->
		@props.onDone() if @props.onDone


	componentDidMount: ->
		@refs[element].props.onChange = @changed for element in @text_elements
			.concat(@checkbox_elements)

		(@refs[element].getDOMNode().value = @props.data[element]) for element in @text_elements
		(@refs[element].getDOMNode().checked = @props.data[element]) for element in @checkbox_elements

	render: ->
		return <form>
			<div><input ref="title" placeholder="Title" /></div>
			<div><textarea ref="text" placeholder="Text"></textarea></div>
			<div><label htmlFor={"#{@props.id}_published"}>Published</label>: <input id={"#{@props.id}_published"} ref="published" type="checkbox" /></div>
			<div><button onClick={@done} type="button">Done</button></div>
		</form>