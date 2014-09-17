React = require 'react'
ReactFireMixin = require 'reactfire'

markdown = require 'markdown'
globals = require '../../globals.coffee'

module.exports = React.createClass
	getInitialState: () ->
		renderable:
			text: 'loading'
			format: 'text'

	mixins: [ReactFireMixin]

	componentWillMount: () ->
		@bindAsObject new Firebase("#{globals.ref}/renderableComponents").child(@props.path), "renderable"
	
	render: () ->
		format = @state.renderable.format;
		text = @state.renderable.text;
		if format == 'markdown'
			return <span dangerouslySetInnerHTML={{__html: markdown.parse(text)}}></span>
		else
			return <span>{text}</span>