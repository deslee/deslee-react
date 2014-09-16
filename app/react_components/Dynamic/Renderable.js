/** @jsx React.DOM */
define(['bower/react-router/dist/react-router', 'Mixins/broadcastListener'], function(Router, broadcastListenerMixin) {
	var converter = new Showdown.converter();
	var Renderable = React.createClass({displayName: 'Renderable',
		mixins: [ReactFireMixin, broadcastListenerMixin],
		getInitialState: function() {
			return {authenticated: false};
		},
		on_authenticated: function() {
			this.setState({authenticated: true});
		},
		componentWillMount: function() {
			var ref = new Firebase(window.des_globals.ref + "renderableComponents");
			this.bindAsObject(ref.child(this.props.path), 'renderable');
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

				var editIconClasses = {
					'icon edit': true,
					'hidden': !this.state.authenticated
				}

				return React.DOM.span({className: "renderable"}, 
					React.DOM.span({dangerouslySetInnerHTML: {__html: text}}), 
					React.DOM.span(null, 
					React.DOM.i({className: React.addons.classSet(editIconClasses)})
					)
				)
		}
	})

	var EditRenderable = React.createClass({displayName: 'EditRenderable',
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

	return Renderable;
});