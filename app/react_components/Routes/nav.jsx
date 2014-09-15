define([
	'bower/react-router/dist/react-router'], function(Router){

	var HeaderLink = React.createClass({
		clicked: function(e) {
			e.preventDefault();
			Router.transitionTo(this.props.path)
		},
		render: function() {
			var className = this.props.icon + ' icon';
		    return <a href={this.props.path} onClick={this.clicked} className="item"><i className={className}></i> {this.props.name}</a>
		}
	})

	return React.createClass({
		render: function() {
			var socialLinks = <span className="socialLinks">
				<a href="//facebook.com/desmondl" className="item"><i className="facebook icon"></i> Facebook</a>
	            <a href="//linkedin.com/in/deslee/" className="item"><i className="linkedin icon"></i> LinkedIn</a>
	            <a href="//github.com/deslee" className="item"><i className="github icon"></i> Github</a>
            </span>

            var navLinks = <span className="navLinks">
            	<HeaderLink path="/" name="Home" icon="home" />
            	<HeaderLink path="/about" name="About" icon="info letter" />
            	<HeaderLink path="/projects" name="Projects" icon="folder" />
            </span>

			return <nav id="navComponent">
			    <div className="ui menu hide on mobile">
			    	{navLinks}
			        <div className="right menu">
			            {socialLinks}
			        </div>
			    </div>

			    <div className="ui thin navigation sidebar menu vertical">
			        {navLinks}
			        <div className="ui horizontal icon divider">
			            <i className="empty star icon"></i>
			        </div>
			            {socialLinks}
			    </div>
			    <button className="navigation ui small basic button hide on desktop">
			        <i className="icon list layout"></i> Nav
			    </button>
			</nav>
		}
	});
});