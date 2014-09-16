/** @jsx React.DOM */

define(['bower/react-router/dist/react-router'], function(Router) {
	var converter = new Showdown.converter();
	var DisplayPost = React.createClass({displayName: 'DisplayPost',
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

				return React.DOM.article(null, 
			      React.DOM.h2(null, React.DOM.a({href: href, onClick: this.routeToPost}, data.title)), 
			      React.DOM.div({dangerouslySetInnerHTML: {__html: text}}), 

			 		React.DOM.div({className: "field"}, React.DOM.button({className: "ui basic button", type: "button", onClick: this.edit}, "Edit"))
			    )
		}
	})

	var EditPost = React.createClass({displayName: 'EditPost',
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
				return React.DOM.div({className: "item", 'data-value': type}, name);
			});

			return React.DOM.article({className: "post"}, 

				React.DOM.form({className: "ui form", onSubmit: this.back}, 
					React.DOM.div({className: "field"}, React.DOM.input({ref: "title", onChange: this.changed, type: "text", placeholder: "Title"})), 
					React.DOM.div({className: "field"}, React.DOM.textarea({ref: "text", onChange: this.changed, type: "text", placeholder: "Text"})), 

					React.DOM.div({ref: "dropdown", className: "ui selection dropdown"}, 
						React.DOM.input({type: "hidden", name: "gender"}), 
						React.DOM.div({className: "default text"}, default_text), 
						React.DOM.i({className: "dropdown icon"}), 
						React.DOM.div({className: "menu"}, 
							menuItems
						)
					), 
					React.DOM.div({className: "field"}, React.DOM.input({type: "submit", className: "ui basic button", value: "Back"}), " ", React.DOM.button({onClick: this.delete, className: "ui red delete button", type: "button"}, "Delete entry"))
				)
		    )
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