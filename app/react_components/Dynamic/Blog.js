/** @jsx React.DOM */
define(['./Post'], function(Post) {
	var Blog = React.createClass({displayName: 'Blog',
		mixins: [ReactFireMixin],
		componentWillMount: function() {
			var ref = new Firebase(window.des_globals.ref + "pages");
			this.bindAsObject(ref, 'blog');
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
					if (data.type==='page') {
						continue;
					}
					posts[id] = Post({id: id, data: data, onDeleted: this.deleted, onEdited: this.edited})
				}
			}

			return React.DOM.div(null, 
				posts
			)
		}
	});

	return Blog;
})