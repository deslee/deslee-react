/** @jsx React.DOM */
define(['./Post', 'bower/react-router/dist/react-router', 'Routes/notFound', 'Mixins/authenticationKnower'], 
	function(Post, Router, NotFound, authenticationKnower) {
	return React.createClass({
		mixins: [ReactFireMixin, authenticationKnower],
		componentWillMount: function() {
			var ref = new Firebase(window.des_globals.ref + "posts");
			this.isRemoved = false;
			this.bindAsObject(ref, 'posts');
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


			var editButtonClasses = {
				'ui basic button': true,
				'hidden': !this.state.authenticated
			}

			if (this.state && this.state.posts !== undefined) {
				var data = this.state.posts[this.props.params.pageSlug];
				if (!data) {
					post = React.DOM.div(null, 
						NotFound(null), 
						
					React.DOM.div({className: "field"}, 
						React.DOM.button({className: React.addons.classSet(editButtonClasses), type: "button", onClick: this.create}, "Add new")
					)
					)
				} else {
					post = Post({id: this.props.params.pageSlug, data: data, onDeleted: this.deleted, onEdited: this.edited});
				}
			}

			return post
		}
	});
});