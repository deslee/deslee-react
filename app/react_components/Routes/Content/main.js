/** @jsx React.DOM */
define([], function() {
	return React.createClass({
		render: function() {
			var className = (this.props.activeRouteHandler().props.hideSidebar ? "sixteen" : "twelve") + ' wide column';
			return React.DOM.main({id: "mainComponent", className: className}, 
        		this.props.activeRouteHandler()
			)
		}
	});
});