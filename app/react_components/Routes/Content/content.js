/** @jsx React.DOM */
define(['./main', './aside'], function(Main, Aside) {
	return React.createClass({
		render: function() {
			return React.DOM.div({id: "contentComponent"}, 
				React.DOM.div({className: "ui content stackable grid"}, 
					Main({activeRouteHandler: this.props.activeRouteHandler}), 
					Aside(null)
				)
			)
		}
	});
});