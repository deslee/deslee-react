/** @jsx React.DOM */
define([
	'bower/react-router/dist/react-router',
	'Routes/index',
	'Dynamic/Blog',
	'Routes/notFound',
	'Dynamic/Page',
], function(ReactRouter, IndexHandler, BlogHandler, NotFoundHandler, PageHandler) {
	var Routes = ReactRouter.Routes;
	var Route = ReactRouter.Route;
	var DefaultRoute = ReactRouter.DefaultRoute;
	var NotFoundRoute = ReactRouter.NotFoundRoute;

	var AppRoutes = React.createClass({displayName: 'AppRoutes',
		render: function() {

			return Routes({location: "hash"}, 
				Route({name: "app", path: "/", handler: IndexHandler}, 
					DefaultRoute({handler: BlogHandler}), 
					NotFoundRoute({name: "notFound", path: "/error/404", handler: NotFoundHandler}), 
					Route({name: "page", path: "/:pageSlug", handler: PageHandler})
				)
			)
		}
	})
	return AppRoutes;
});