define(['Mixins/broadcastListener'], function(broadcastListenerMixin) {
	return React.createClass({
		mixins: [ReactFireMixin, broadcastListenerMixin],
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
		render: function() {
			var renderables = this.state.renderables;

			var menuItems = Object.keys(renderables)
				.map(function(key) {
					return <option value={key}>{key}</option>;
				});

			var prompt = this.state.selectedRenderable ? this.state.selectedRenderable : 'Select a renderable';

			return <div>
				<form className="ui form" onSubmit={this.login}>
					<div className="field"><input ref="password" type="password" placeholder="password" /></div>
					<button type="submit">Submit</button>
				</form>


				<select>
					{menuItems}
				</select>
			</div>
		}
	});
})