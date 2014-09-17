globals = require '../../globals.coffee'

module.exports =
	componentDidMount: () =>
		globals.broadcast_listeners.push(this);

	componentWillUnmount: () =>
		idx = globals.broadcast_listeners.indexOf(this);
		globals.broadcast_listeners.splice(idx, 1) if idx > -1

	on_broadcast_event: (event, obj) => 
		fun = this['on_' + event]
		fun.call(this, obj) if typeof(fun) == 'function'