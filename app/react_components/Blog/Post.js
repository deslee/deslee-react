/** @jsx React.DOM */
define(function() {
	var converter = new Showdown.converter();
	var DisplayPost = React.createClass({displayName: 'DisplayPost',
		edit: function(e) {
			e.preventDefault();
			this.props.onEdit()
		},
		render: function() {
				var data = this.props.data;

				var text = converter.makeHtml(data.text);

				return React.DOM.article(null, 
			        React.DOM.h2(null, React.DOM.a({href: "#"}, data.title)), 
			        React.DOM.div({dangerouslySetInnerHTML: {__html: text}}), 
			 		React.DOM.div({className: "field"}, React.DOM.button({className: "ui basic button", type: "button", onClick: this.edit}, "Edit"))
			      )
		}
	})

	var EditPost = React.createClass({displayName: 'EditPost',
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

			return 	React.DOM.article(null, 
				React.DOM.form({className: "ui form", onSubmit: this.back}, 
					React.DOM.div({className: "field"}, React.DOM.input({ref: "title", onChange: this.changed, type: "text", placeholder: "Title"})), 
					React.DOM.div({className: "field"}, React.DOM.textarea({ref: "text", onChange: this.changed, type: "text", placeholder: "Text"})), 
					React.DOM.div({className: "field"}, React.DOM.button({onClick: this.delete, className: "ui basic button", type: "button"}, "Delete entry")), 
					React.DOM.div({className: "field"}, React.DOM.input({type: "submit", className: "ui basic button", value: "Submit"}))
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
				return DisplayPost({data: this.props.data, onEdit: this.edit})
			}
			else {
				return EditPost({data: this.props.data, onChange: this.changed, onDelete: this.deleted, onBack: this.back})
			}
		}
	});

	return Post;
});