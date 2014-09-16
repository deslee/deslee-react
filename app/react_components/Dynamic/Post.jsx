/** @jsx React.DOM */

define(['bower/react-router/dist/react-router'], function(Router) {
	var converter = new Showdown.converter();
	var DisplayPost = React.createClass({
		edit: function(e) {
			e.preventDefault();
			this.props.onEdit()
		},
		routeToPost: function(e) {
			e.preventDefault();
			Router.transitionTo('/'+this.props.id);
		},
		render: function() {
				var data = this.props.data;

				var text = converter.makeHtml(data.text);
				var href = '/'+this.props.id

				return <article>
			      <h2><a href={href} onClick={this.routeToPost}>{data.title}</a></h2>
			      <div dangerouslySetInnerHTML={{__html: text}}></div>

			 		<div className="field"><button className="ui basic button" type="button" onClick={this.edit}>Edit</button></div>
			    </article>
		}
	})

	var EditPost = React.createClass({
		getInitialState: function() {
			console.log(this.props.data.type);
			return {
				type: this.props.data.type
			}
		},
		componentDidMount: function() {
			this.fields = ['title', 'text'];


			this.fields.forEach(function(field) {
				this.refs[field].getDOMNode().value = this.props.data[field];
			}.bind(this));

			console.log(this.refs.dropdown.getDOMNode());
			var self = this;
			$(this.refs.dropdown.getDOMNode()).dropdown({
				onChange: function(value) {
					self.props.data.type = value;
					self.setState({
						type: self.props.data.type
					});
					self.props.onChange();
				}
			});
		},
		changed: function() {
			var data = this.props.data;
			this.fields.forEach(function(field) {
				data[field] = this.refs[field].getDOMNode().value;
			}.bind(this));
			this.props.onChange();
		},
		delete: function() {
			if (confirm("Are you sure?")) {
				this.props.onDelete();
			}
		},
		back: function(e) {
			e.preventDefault();
			this.props.onBack();
		},
		render: function() {
			var data = this.props.data;

			var text = converter.makeHtml(data.text);

			var types = {
				'blog': "Blog Post",
				'page': "Page"
			}

			var default_text = types[this.state.type];
			var menuItems = Object.keys(types).map(function(type) {
				var name = types[type];
				return <div className="item" data-value={type}>{name}</div>;
			});

			return <article className="post">

				<form className="ui form" onSubmit={this.back}>
					<div className="field"><input ref="title" onChange={this.changed} type="text" placeholder="Title" /></div>
					<div className="field"><textarea ref="text" onChange={this.changed} type="text" placeholder="Text"></textarea></div>

					<div ref="dropdown" className="ui selection dropdown">
						<input type="hidden" name="gender" />
						<div className="default text">{default_text}</div>
						<i className="dropdown icon"></i>
						<div className="menu">
							{menuItems}
						</div>
					</div>
					<div className="field"><input type="submit" className="ui basic button" value="Back" /> <button onClick={this.delete} className="ui red delete button" type="button" >Delete entry</button></div>
				</form>
		    </article>
		}
	})

	var Post = React.createClass({displayName: 'Post',
		getInitialState: function() {
			return {editing: false};
		},
		edit: function(e) {
			this.setState({editing: true});
		},
		changed: function() {
			this.props.onEdited(this.props.id);
		},
		deleted: function() {
			this.props.onDeleted(this.props.id);
		},
		back: function(e) {
			this.setState({editing: false});
		},
		render: function() {
			if (!this.state.editing) {
				return DisplayPost({id:this.props.id, data: this.props.data, onEdit: this.edit})
			}
			else {
				return EditPost({data: this.props.data, onChange: this.changed, onDelete: this.deleted, onBack: this.back})
			}
		}
	});

	return Post;
});