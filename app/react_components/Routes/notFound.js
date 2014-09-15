/** @jsx React.DOM */
define([], function(){
	return React.createClass({
		render: function() {
			return React.DOM.div(null, 
				React.DOM.h2(null, "Not Found"), 
				React.DOM.p(null, "The page you are looking for cannot be found.")
			)
		}
	});
});