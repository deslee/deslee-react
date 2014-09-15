define(['Dynamic/Renderable'], function(Renderable){
	return React.createClass({
		render: function() {
			return <aside id="asideComponent" className="four wide column">
			    <div className="custom half block">
			      <h3>About me</h3>
			      <div className="face-container">
			        <img className="face" src="img/face2.jpg" />
			      </div>
			      <Renderable path="intro" />
			    </div>
			    <div className="custom half block">
			      <h3>Info</h3>
			      <Renderable path="info" />
			    </div>
			</aside>
		}
	});
});