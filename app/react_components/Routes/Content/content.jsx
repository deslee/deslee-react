define(['Mixins/broadcastListener', './main', './aside'], function(broadcastListenerMixin, Main, Aside) {
	return React.createClass({
		mixins: [broadcastListenerMixin],
		render: function() {
			var asideClasses = React.addons.classSet({
				hidden: this.props.activeRouteHandler().props.hideSidebar
			});

			var content = <div id="contentComponent">
				<div className="ui content stackable grid">
					<Main activeRouteHandler={this.props.activeRouteHandler} />
					<Aside className={asideClasses} activeRouteHandler={this.props.activeRouteHandler}/>
				</div>
			</div>;
			return content;
		}
	});
});