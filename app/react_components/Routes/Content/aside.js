/** @jsx React.DOM */
define([], function() {
	return React.createClass({
		render: function() {
			return React.DOM.aside({id: "asideComponent", className: "four wide column"}, 
			    React.DOM.div({className: "custom half block"}, 
			      React.DOM.h3(null, "About me"), 
			      React.DOM.div({className: "face-container"}, 
			        React.DOM.img({className: "face", src: "img/face2.jpg"})
			      ), 
			      React.DOM.p(null, "Hi, my name is Desmond Lee."), 
			      React.DOM.p(null, "I am an undergraduate Software Engineering student at The University of Texas at Dallas. I have a strong interest in web development, Unix based systems, and artificial intelligence / machine learning.")
			    ), 
			    React.DOM.div({className: "custom half block"}, 
			      React.DOM.h3(null, "Info"), 
			      React.DOM.p(null, "This site was built on the ", React.DOM.a({href: "http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and/"}, "MEAN"), " stack, uses ", React.DOM.a({href: "http://semantic-ui.com/"}, "SemanticUI"), ", and is proudly running on ", React.DOM.a({href: "http://aws.amazon.com/ec2/"}, "Amazon Web Services"), ".")
			    )
			)
		}
	});
});