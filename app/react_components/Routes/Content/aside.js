/** @jsx React.DOM */
define(['Dynamic/Renderable'], function(Renderable){
	return React.createClass({
		render: function() {
			var classes = {
				'four wide column': true
			};
			classes[this.props.className] = true;
			var className = React.addons.classSet(classes);

			var aside = React.DOM.aside({id: "asideComponent", className: className}, 
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
			);

			return aside;
		}
	});
});