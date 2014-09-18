Router = require 'react-router'
ReactFireMixin = require 'reactfire'
React = require 'react'
globals = require('../../globals.coffee')
EditPost = require './EditPost.cjsx'

module.exports = (endpoint) ->
	React.createClass
		mixins: [ReactFireMixin]
		getInitialState: ->
			edit: false

		edit: (post) ->
			@setState({edit: post})

		edit_close: ->
			@setState({edit: false})

		render: ->
			Post = require './Post.cjsx'
			NotFound = require '../Routes/notFound.cjsx'

			editPost = undefined
			if @state.edit != false 
				return <EditPost 
					id={@props.params.slug}
					type={endpoint}
					data={@state.edit}
					onDone={@edit_close}
				/>

			return <Post 
					id={@props.params.slug} 
					type={endpoint}
					onEdit={@edit}
					isEditing={@state.edit}
				/>
