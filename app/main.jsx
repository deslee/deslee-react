require(['Blog/Blog'], function(Blog) {
	React.renderComponent(
		<Blog />,
	document.getElementById('react_blog')
	);
})