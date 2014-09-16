define(['Mixins/broadcastListener'], function(broadcastListenerMixin) {
	return {
		mixins: [broadcastListenerMixin],
		getInitialState: function() {
			return {authenticated: window.des_globals.authenticated};
		},
		on_authenticated: function() {
			this.setState({authenticated: true});
		},
	};
});