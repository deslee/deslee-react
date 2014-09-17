Router = require 'react-router'
ReactFireMixin = require 'reactfire'
React = require 'react'
authenticationKnower = require '../Mixins/authenticationKnower.cjsx'
globals = require('../../globals.coffee')

Page = (endpoint) ->
	React.createClass
		mixins: [ReactFireMixin]
		getInitialState: ->
			post: 
				title: 'Loading'
				text: 'Loading'

		componentWillMount: ->
			ref = new Firebase("#{globals.ref}/#{endpoint}").child(@props.params.slug)
			@bindAsObject ref, 'post'

		create: ->
			@firebaseRefs['post'].set
				title: @props.params.slug
				published: false
				text: "Hello world"

		render: ->
			Post = require './Post.cjsx'
			NotFound = require '../Routes/notFound.cjsx'
			if not @state.post
				return <div>
					<NotFound />
					<button type="button" onClick={@create}>Add new</button>
				</div>

			return <Post id={@props.params.slug} data={@state.post} type={endpoint} ></Post>

module.exports = Page
