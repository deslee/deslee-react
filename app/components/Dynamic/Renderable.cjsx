React = require 'react'
ReactFireMixin = require 'reactfire'

markdown = require 'markdown'

module.exports = React.createClass
	getInitialState: () ->
		renderable:
			text: 'loading'
			format: 'text'

	mixins: [ReactFireMixin]

	componentWillMount: () ->
		@bindAsObject new Firebase("#{des_globals.ref}renderableComponents").child(@props.path), "renderable"
	
	render: () ->
		format = @state.renderable.format;
		text = @state.renderable.text;
		if format == 'markdown'
			return <span dangerouslySetInnerHTML={{__html: markdown.parse(text)}}></span>
		else
			return <span>{text}</span>