/** @jsx React.DOM */
require(['Blog/Blog'], function(Blog) {
	React.renderComponent(
		Blog(null),
	document.getElementById('react_blog')
	);
})