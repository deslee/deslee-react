/** @jsx React.DOM */
define([
	'bower/react-router/dist/react-router'], function(Router){

	var HeaderLink = React.createClass({displayName: 'HeaderLink',
		clicked: function(e) {
			e.preventDefault();
			Router.transitionTo(this.props.path)
		},
		render: function() {
			var className = this.props.icon + ' icon';
		    return React.DOM.a({href: this.props.path, onClick: this.clicked, className: "item"}, React.DOM.i({className: className}), " ", this.props.name)
		}
	})

	return React.createClass({
		render: function() {
			var socialLinks = React.DOM.span({className: "socialLinks"}, 
				React.DOM.a({href: "//facebook.com/desmondl", className: "item"}, React.DOM.i({className: "facebook icon"}), " Facebook"), 
	            React.DOM.a({href: "//linkedin.com/in/deslee/", className: "item"}, React.DOM.i({className: "linkedin icon"}), " LinkedIn"), 
	            React.DOM.a({href: "//github.com/deslee", className: "item"}, React.DOM.i({className: "github icon"}), " Github")
            )

            var navLinks = React.DOM.span({className: "navLinks"}, 
            	HeaderLink({path: "/", name: "Home", icon: "home"}), 
            	HeaderLink({path: "/about", name: "About", icon: "info letter"}), 
            	HeaderLink({path: "/projects", name: "Projects", icon: "folder"})
            )

			return React.DOM.nav({id: "navComponent"}, 
			    React.DOM.div({className: "ui menu hide on mobile"}, 
			    	navLinks, 
			        React.DOM.div({className: "right menu"}, 
			            socialLinks
			        )
			    ), 

			    React.DOM.div({className: "ui thin navigation sidebar menu vertical"}, 
			        navLinks, 
			        React.DOM.div({className: "ui horizontal icon divider"}, 
			            React.DOM.i({className: "empty star icon"})
			        ), 
			            socialLinks
			    ), 
			    React.DOM.button({className: "navigation ui small basic button hide on desktop"}, 
			        React.DOM.i({className: "icon list layout"}), " Nav"
			    )
			)
		}
	});
});