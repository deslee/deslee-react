define([], function() {
	return React.createClass({
		render: function() {
			return <main id="mainComponent" className="twelve wide column">
        		{this.props.activeRouteHandler()}
			</main>
		}
	});
});