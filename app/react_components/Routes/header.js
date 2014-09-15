/** @jsx React.DOM */
define([], function(){
	return React.createClass({
		render: function() {
			return React.DOM.header({id: "headerComponent"}, " ", 
				React.DOM.h1({className: "masthead"}, 
		          React.DOM.a({href: "/"}, "Desmond Lee"), " ", React.DOM.small(null, "Developer / Dallas")
		        )
			)
		}
	});
});