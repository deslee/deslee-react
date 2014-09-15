/** @jsx React.DOM */
define([], function() {
	return React.createClass({
		render: function() {
			return React.DOM.main({id: "mainComponent", className: "twelve wide column"}, 
        		this.props.activeRouteHandler()
			)
		}
	});
});