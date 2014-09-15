define(['./Post', 'bower/react-router/dist/react-router', 'Routes/notFound'], 
	function(Post, Router, NotFound) {
	return React.createClass({
		mixins: [ReactFireMixin],
		componentWillMount: function() {
			this.isRemoved = false;
			this.bindAsObject(new Firebase("https://deslee-me.firebaseio.com/pages"), 'posts');
		},
		componentWillUnmount: function() {
		},
		edited: function(id) {
			var slug = this.props.params.pageSlug;
			var data = this.state.posts[slug];
			this.firebaseRefs.posts.child(slug).update(data);
		},
		deleted: function(id) {
			var slug = this.props.params.pageSlug;
			var data = this.state.posts[slug];
			this.firebaseRefs.posts.child(slug).remove();
		},
		create: function() {
			var slug = this.props.params.pageSlug;
			this.firebaseRefs.posts.child(slug).set(
			{
				title: slug,
				published: true,
				text: "Hello World"
			});	
		},
		render: function() {
			var self = this;
			var post = null;
			if (this.state && this.state.posts !== undefined) {
				var data = this.state.posts[this.props.params.pageSlug];
				if (!data) {
					post = <div>
						<NotFound />
						
					<div className="field">
						<button className="ui basic button" type="button" onClick={this.create}>Add new</button>
					</div>
					</div>
				} else {
					post = Post({id: this.props.params.pageSlug, data: data, onDeleted: this.deleted, onEdited: this.edited});
				}
			}

			return post
		}
	});
});