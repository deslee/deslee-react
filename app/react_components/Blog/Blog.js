/** @jsx React.DOM */
define(['Blog/Post'], function(Post) {
	var Blog = React.createClass({displayName: 'Blog',
		mixins: [ReactFireMixin],
		componentWillMount: function() {
			this.bindAsObject(new Firebase("https://deslee-me.firebaseio.com/blog"), 'blog');
		},
		submit: function() {
			this.firebaseRefs.blog.push(
			{
				slug: 'helloWorld',
				title: "Hello world!",
				published: true,
				text: "hey there, world!"
			});	
		},
		edited: function(id) {
			var updateData = {};
			updateData[id] = this.state.blog[id];
			this.firebaseRefs.blog.update(updateData);
		},
		deleted: function(id) {
			this.firebaseRefs.blog.child(id).remove();
		},
		render: function() {
			var self = this;
			var posts = {};

			if (this.state && this.state.blog) {
				for (var id in this.state.blog) {
					var data = this.state.blog[id];
					posts[id] = Post({id: id, data: data, onDeleted: this.deleted, onEdited: this.edited})
				}
			}

			return React.DOM.div(null, 
				posts, 
 				React.DOM.p(null, 
				React.DOM.div({className: "field"}, 
					React.DOM.button({className: "ui basic button", type: "button", onClick: this.submit}, "Add new")
				)
				)
			)
		}
	});

	return Blog;
})