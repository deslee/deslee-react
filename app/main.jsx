require(['Routes'], function(AppRoutes) {
	window.des_globals = {
		element: document.getElementById('des-app'),
		ref: document.getElementById('des-app').getAttribute('data-firebaseref'),
		auth: document.getElementById('des-app').getAttribute('data-auth'),
		broadcast_listeners: [],
		broadcast: function(event) {
			this.broadcast_listeners.forEach(function(listener) {
				listener.on_broadcast_event(event);
			});
		}
	};
	new Firebase(des_globals.ref).auth('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6dHJ1ZSwidiI6MCwiZCI6eyJ1aWQiOiIxIn0sImlhdCI6MTQxMDg0MzcwMH0.9M7IWqwhkK5BxhffPgzl09Mv1vg5kOcqNj8EwqKyI8M');
	React.renderComponent(
		<AppRoutes />,
		document.getElementById('des-app'), function() {
		}
	);
})