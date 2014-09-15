define(['Routes/header', 
	'Routes/nav', 
	'Routes/Content/content',
	'bower/react-router/dist/react-router',
], function(Header, Nav, Content, ReactRouter) {
	return React.createClass({
		render: function() {
			return <div id="container">
				<Header />
				<Nav />
				<Content activeRouteHandler={this.props.activeRouteHandler} />
			</div>
		}
	});
});