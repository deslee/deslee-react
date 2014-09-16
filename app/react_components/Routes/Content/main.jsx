define([], function() {
	return React.createClass({
		render: function() {
			var className = (this.props.activeRouteHandler().props.hideSidebar ? "sixteen" : "twelve") + ' wide column';
			return <main id="mainComponent" className={className}>
        		{this.props.activeRouteHandler()}
			</main>
		}
	});
});