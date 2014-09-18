React = require 'react'
broadcastListenerMixin = require '../../Mixins/broadcastListener.cjsx'
authenticationKnower = require '../../Mixins/authenticationKnower.cjsx'
globals = require '../../../globals.coffee'
$ = require 'jquery'

ReactFireMixin = require 'reactfire'
markdown = require 'markdown'

module.exports = React.createClass
	mixins: [ReactFireMixin, authenticationKnower]

	getInitialState: ->
		renderables: {}

	componentWillMount: ->
		ref = new Firebase("#{globals.ref}/renderableComponents")
		@bindAsObject ref, "renderables"
		@bindAsObject new Firebase(globals.ref), "globalRef"

	login: (e) ->
		e.preventDefault()
		password = @refs.password.getDOMNode().value
		$.ajax globals.auth, 
			data: {password: password}
			success: (token) ->
				globals.authenticateWithToken token
			error: (error) ->
				@refs.password.getDOMNode().focus()
			type: "POST"

	selectRenderable: (e) ->
		if @state.renderables[e.target.value]
			content = @state.renderables[e.target.value].text
			@refs.content.getDOMNode().value = content
			@setState key: e.target.value

	changed: (e) ->
		renderable = @state.renderables[@state.key]
		if renderable
			renderable.text = e.target.value
			@firebaseRefs.renderables.child(@state.key).update renderable
			@forceUpdate()

	backup: (e) ->
		console.log JSON.stringify(@state.globalRef)

	render: ->
		renderables = @state.renderables

		menuItems = Object.keys(renderables).map((key) ->
			return <option value={key}>{key}</option>
		)

		loginForm = undefined
		editInterface = undefined
		text = undefined

		if @state.renderables[@state.key]
			text = markdown.parse(@state.renderables[@state.key].text)

		if @state.authenticated
			editInterface = <div>
				<select onChange={this.selectRenderable}>
					<option value="">Select a renderable</option>
					{menuItems}
				</select>

				<form>
					<textarea onChange={this.changed} ref="content"></textarea>
				</form>

				<div dangerouslySetInnerHTML={{__html: text}}></div>

				<button onClick={this.backup}>Backup</button>
			</div>
		else
			loginForm = <form onSubmit={this.login}>
				<div className="field"><input ref="password" type="password" placeholder="password" /></div>
				<button type="submit">Submit</button>
			</form>

		return <div>
			
			{loginForm}

			{editInterface}
		</div>