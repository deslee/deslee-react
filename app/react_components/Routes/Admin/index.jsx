define(['Mixins/broadcastListener', 'Mixins/authenticationKnower'], function(broadcastListenerMixin, authenticationKnower) {
	return React.createClass({
		mixins: [ReactFireMixin, authenticationKnower],
		getInitialState: function() {
			return {renderables: {}}
		},
		componentWillMount: function() {
			var ref = new Firebase(window.des_globals.ref + "renderableComponents");
			this.bindAsObject(ref, 'renderables');
		},

		login: function(e) {
			var self = this;
			e.preventDefault();
			var password = self.refs.password.getDOMNode().value;
			$.ajax(des_globals.auth, {
				data: {password: password},
				success: function(token) {
					des_globals.authenticateWithToken(token);
				}, 
				error: function(error) {
					self.refs.password.getDOMNode().focus();
				},
				type: "POST"
			});
		},

		setRenderable: function(e) {
			if(this.state.renderables[e.target.value]) {
				var content = this.state.renderables[e.target.value].text;
				this.refs.content.getDOMNode().value = content;
			}

			this.setState({key: e.target.value});
		},

		changed: function(e) {
			var self = this;
			var renderable = this.state.renderables[this.state.key];
			if (renderable) {
				renderable.text = e.target.value;
				this.firebaseRefs.renderables.child(this.state.key).update(renderable);
				this.forceUpdate();
			}
		},

		render: function() {
			var renderables = this.state.renderables;

			var menuItems = Object.keys(renderables)
				.map(function(key) {
					return <option value={key}>{key}</option>;
				});

			var prompt = this.state.selectedRenderable ? this.state.selectedRenderable : 'Select a renderable';

			var text;
			if (this.state.renderables[this.state.key]) {
				var converter = new Showdown.converter();
				text = converter.makeHtml(this.state.renderables[this.state.key].text);
			}	      

			var editInterfaceClass = 'hidden', loginFormClass='';
			if (this.state.authenticated) {
				editInterfaceClass = '';
				loginFormClass = 'hidden';
			}

			return <div>
				<form className="ui form" onSubmit={this.login} className={loginFormClass}>
					<div className="field"><input ref="password" type="password" placeholder="password" /></div>
					<button type="submit">Submit</button>
				</form>


				<div className={editInterfaceClass}>
					<select onChange={this.setRenderable}>
						<option value="">Select a renderable</option>
						{menuItems}
					</select>

					<form>
						<textarea onChange={this.changed} ref="content"></textarea>
					</form>

					<div dangerouslySetInnerHTML={{__html: text}}></div>
				</div>
			</div>
		}
	});
})