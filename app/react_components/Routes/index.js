/** @jsx React.DOM */
define(['Routes/header', 
	'Routes/nav', 
	'Routes/Content/content',
	'bower/react-router/dist/react-router',
], function(Header, Nav, Content, ReactRouter) {
	return React.createClass({
		render: function() {
			return React.DOM.div({id: "container"}, 
				Header(null), 
				Nav(null), 
				Content({activeRouteHandler: this.props.activeRouteHandler})
			)
		}
	});
});