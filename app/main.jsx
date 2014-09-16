require(['Routes'], function(AppRoutes) {
	window.des_globals = {
		element: document.getElementById('des-app'),
		ref: document.getElementById('des-app').getAttribute('data-firebaseref'),
	};
	React.renderComponent(
		<AppRoutes />,
		document.getElementById('des-app'), function() {
		}
	);
})