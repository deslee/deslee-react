define([], function() {
	return React.createClass({
		render: function() {
			return <aside id="asideComponent" className="four wide column">
			    <div className="custom half block">
			      <h3>About me</h3>
			      <div className="face-container">
			        <img className="face" src="img/face2.jpg" />
			      </div>
			      <p>Hi, my name is Desmond Lee.</p>
			      <p>I am an undergraduate Software Engineering student at The University of Texas at Dallas. I have a strong interest in web development, Unix based systems, and artificial intelligence / machine learning.</p>
			    </div>
			    <div className="custom half block">
			      <h3>Info</h3>
			      <p>This site was built on the <a href="http://blog.mongodb.org/post/49262866911/the-mean-stack-mongodb-expressjs-angularjs-and/">MEAN</a> stack, uses <a href="http://semantic-ui.com/">SemanticUI</a>, and is proudly running on <a href="http://aws.amazon.com/ec2/">Amazon Web Services</a>.</p>
			    </div>
			</aside>
		}
	});
});