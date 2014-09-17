Router = require 'react-router'
ReactFireMixin = require 'reactfire'
React = require 'react'
authenticationKnower = require '../Mixins/authenticationKnower.cjsx'
globals = require('../../globals.coffee')

module.exports = React.createClass
	mixins: [ReactFireMixin]
	getInitialState: ->
		posts: {}

	componentWillMount: ->
		ref = new Firebase("#{globals.ref}/blog")
		@bindAsObject ref, 'posts'

	render: ->
		Post = require './Post.cjsx'
		posts = Object.keys(@state.posts).map (key) =>
			return <Post id={key} data={@state.posts[key]} type="blog" />
		return <div>
			{posts}
		</div>