/** @jsx React.DOM */
define([], function() {
	return {
		componentDidMount: function() {
			des_globals.broadcast_listeners.push(this);
		},
		componentWillUnmount: function() {
			var idx = des_globals.broadcast_listeners.indexOf(this);
			if (idx > -1) {
				des_globals.broadcast_listeners.splice(idx, 1);
			}
		},
		on_broadcast_event: function(event, obj) {
			var fun = this['on_' + event];
			if (typeof(fun) === 'function') {
				fun.call(this, obj);
			}
		},
	};
});