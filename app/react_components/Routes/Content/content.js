/** @jsx React.DOM */
define(['./main', './aside'], function(Main, Aside) {
	return React.createClass({
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