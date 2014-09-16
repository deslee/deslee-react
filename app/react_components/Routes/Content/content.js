/** @jsx React.DOM */
define(['Mixins/broadcastListener', './main', './aside'], function(broadcastListenerMixin, Main, Aside) {
	return React.createClass({
		mixins: [broadcastListenerMixin],
		render: function() {
			var asideClasses = React.addons.classSet({
				hidden: this.props.activeRouteHandler().props.hideSidebar
			});

			var content = React.DOM.div({id: "contentComponent"}, 
				React.DOM.div({className: "ui content stackable grid"}, 
					Main({activeRouteHandler: this.props.activeRouteHandler}), 
					Aside({className: asideClasses, activeRouteHandler: this.props.activeRouteHandler})
				)
			);
			return content;
		}
	});
});