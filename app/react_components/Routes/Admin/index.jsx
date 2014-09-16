define(['Mixins/broadcastListener'], function(broadcastListenerMixin) {
	return React.createClass({
		mixins: [broadcastListenerMixin],

		getInitialState: function() {
			return {authenticated: false}
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
			return <div>
				<form className="ui form" onSubmit={this.login}>
					<div className="field"><input ref="password" type="password" placeholder="password" /></div>
					<button type="submit">Submit</button>
				</form>
			</div>
		}
	});
})