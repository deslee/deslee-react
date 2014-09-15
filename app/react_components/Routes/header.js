/** @jsx React.DOM */
define(['Dynamic/Renderable'], function(Renderable){
	return React.createClass({
		render: function() {
			return React.DOM.header({id: "headerComponent"}, " ", 
				React.DOM.h1({className: "masthead"}, 
		          React.DOM.a({href: "/"}, Renderable({path: "h1"})), " ", React.DOM.small(null, Renderable({path: "slogan"}))
		        )
			)
		}
	});
});