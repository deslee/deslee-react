define(['./Post', 'bower/react-router/dist/react-router'], function(Post, Router) {
	return React.createClass({
		mixins: [ReactFireMixin],
		componentWillMount: function() {
			this.isRemoved = false;
			this.bindAsObject(new Firebase("https://deslee-me.firebaseio.com/pages"), 'posts');
		},
		componentWillUnmount: function() {
		},
		edited: function(id) {
			this.firebaseRefs.post.update(this.state.post);
			//this.firebaseRefs.blog.update(updateData);
		},
		deleted: function(id) {
			this.isRemoved = true;
			this.firebaseRefs.post.remove();
		},
		render: function() {
			var self = this;
			var post = null;
			if (this.state && this.state.posts !== undefined) {
				var data = this.state.posts[this.props.params.pageSlug];
				if (!data) {
					Router.replaceWith('/error/404');
				} else {
					post = Post({id: this.props.params.pageSlug, data: data, onDeleted: this.deleted, onEdited: this.edited});
				}
			}

			return post
		}
	});
});