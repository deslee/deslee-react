define(['./Post', 'bower/react-router/dist/react-router'], function(Post, Router) {
	return React.createClass({
		mixins: [ReactFireMixin],
		componentWillMount: function() {
			this.isRemoved = false;
			this.bindAsObject(new Firebase("https://deslee-me.firebaseio.com/pages").child(this.props.params.pageSlug), 'post');
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

			console.log(this.state);
			if (this.state && this.state.post !== undefined) {
				if (this.state.post == null) {
					console.log('replacing');
					if (this.isRemoved == false) {
						Router.replaceWith('/error/404');
					}
				} else {
					post = Post({id: this.props.params.pageSlug, data: this.state.post, onDeleted: this.deleted, onEdited: this.edited});
				}
			}

			return post
		}
	});
});