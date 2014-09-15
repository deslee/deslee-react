/** @jsx React.DOM */
define(['bower/react-router/dist/react-router'], function(Router) {
	var converter = new Showdown.converter();
	var Renderable = React.createClass({
		mixins: [ReactFireMixin],
		componentWillMount: function() {
			this.bindAsObject(new Firebase("https://deslee-me.firebaseio.com/renderableComponents")
				.child(this.props.path), 'renderable');
		},
		edit: function() {
			console.log('editing');
		},
		render: function() {
				var text = "Loading"; 
				if (this.state && this.state.renderable && this.state.renderable.text) {
					var renderable = this.state.renderable;
					text = renderable.format === 'markdown' ? converter.makeHtml(renderable.text) : renderable.text;
				}

				return <span className="renderable">
					<span dangerouslySetInnerHTML={{__html: text}}></span>
				</span>
		}
	})

	var EditRenderable = React.createClass({
		componentDidMount: function() {
			this.fields = ['title', 'text'];


			this.fields.forEach(function(field) {
				this.refs[field].getDOMNode().value = this.props.data[field];
			}.bind(this));
		},
		changed: function() {
			var data = this.props.data;
			this.fields.forEach(function(field) {
				data[field] = this.refs[field].getDOMNode().value;
			}.bind(this));
			this.props.onChange();
		},
		delete: function() {
			this.props.onDelete();
		},
		back: function(e) {
			e.preventDefault();
			this.props.onBack();
		},
		render: function() {
			var data = this.props.data;

			var text = converter.makeHtml(data.text);

			return 	<article>
				<form className="ui form" onSubmit={this.back}>
					<div className="field"><input ref="title" onChange={this.changed} type="text" placeholder="Title" /></div>
					<div className="field"><textarea ref="text" onChange={this.changed} type="text" placeholder="Text"></textarea></div>
					<div className="field"><button onClick={this.delete} className="ui basic button" type="button" >Delete entry</button></div>
					<div className="field"><input type="submit" className="ui basic button" value="Submit" /></div>
				</form>
		      </article>
		}
	})

	return Renderable;
});