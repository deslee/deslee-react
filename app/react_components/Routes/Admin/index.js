/** @jsx React.DOM */
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
					return React.DOM.option({value: key}, key);
				});

			var prompt = this.state.selectedRenderable ? this.state.selectedRenderable : 'Select a renderable';

			return React.DOM.div(null, 
				React.DOM.form({className: "ui form", onSubmit: this.login}, 
					React.DOM.div({className: "field"}, React.DOM.input({ref: "password", type: "password", placeholder: "password"})), 
					React.DOM.button({type: "submit"}, "Submit")
				), 


				React.DOM.select(null, 
					menuItems
				)
			)
		}
	});
})