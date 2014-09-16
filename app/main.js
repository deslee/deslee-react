/** @jsx React.DOM */
require(['Routes'], function(AppRoutes) {
	window.des_globals = {
		element: document.getElementById('des-app'),
		ref: document.getElementById('des-app').getAttribute('data-firebaseref'),
	};
	new Firebase(des_globals.ref).auth('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhZG1pbiI6dHJ1ZSwidiI6MCwiZCI6eyJ1aWQiOiIxIn0sImlhdCI6MTQxMDg0MzcwMH0.9M7IWqwhkK5BxhffPgzl09Mv1vg5kOcqNj8EwqKyI8M');
	React.renderComponent(
		AppRoutes(null),
		document.getElementById('des-app'), function() {
		}
	);
})