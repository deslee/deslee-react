/** @jsx React.DOM */
define(['Dynamic/Renderable'], function(Renderable){
	return React.createClass({
		render: function() {
			return React.DOM.aside({id: "asideComponent", className: "four wide column"}, 
			    React.DOM.div({className: "custom half block"}, 
			      React.DOM.h3(null, "About me"), 
			      React.DOM.div({className: "face-container"}, 
			        React.DOM.img({className: "face", src: "img/face2.jpg"})
			      ), 
			      Renderable({path: "intro"})
			    ), 
			    React.DOM.div({className: "custom half block"}, 
			      React.DOM.h3(null, "Info"), 
			      Renderable({path: "info"})
			    )
			)
		}
	});
});