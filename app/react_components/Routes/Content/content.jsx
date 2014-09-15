define(['./main', './aside'], function(Main, Aside) {
	return React.createClass({
		render: function() {
			return <div id="contentComponent">
				<div className="ui content stackable grid">
					<Main activeRouteHandler={this.props.activeRouteHandler} />
					<Aside />
				</div>
			</div>
		}
	});
});