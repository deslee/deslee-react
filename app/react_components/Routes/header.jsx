define(['Dynamic/Renderable'], function(Renderable){
	return React.createClass({
		render: function() {
			return <header id="headerComponent">&nbsp;
				<h1 className="masthead">
		          <a href="/"><Renderable path="h1" /></a> <small><Renderable path="slogan" /></small>
		        </h1>
			</header>
		}
	});
});