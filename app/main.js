/** @jsx React.DOM */
require(['Routes'], function(AppRoutes) {
	React.renderComponent(
		AppRoutes(null),
		document.body, function() {
		}
	);
})