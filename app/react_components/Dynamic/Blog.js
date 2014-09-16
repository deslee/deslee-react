/** @jsx React.DOM */
define(['./Post'], function(Post) {
	var Blog = React.createClass({displayName: 'Blog',
		mixins: [ReactFireMixin],
		componentWillMount: function() {
			var ref = new Firebase(window.des_globals.ref + "posts");
			this.bindAsObject(ref, 'posts');
		},
		edited: function(id) {
			var updateData = {};
			updateData[id] = this.state.posts[id];
			this.firebaseRefs.posts.update(updateData);
		},
		deleted: function(id) {
			this.firebaseRefs.posts.child(id).remove();
		},
		render: function() {
			var self = this;
			var posts = {};

			if (this.state && this.state.posts) {
				for (var id in this.state.posts) {
					var data = this.state.posts[id];
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