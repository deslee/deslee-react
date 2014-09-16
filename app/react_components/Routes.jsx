define([
	'bower/react-router/dist/react-router',
	'Routes/index',
	'Dynamic/Blog',
	'Routes/notFound',
	'Dynamic/Page',
	'Routes/Admin/index',
], function(ReactRouter, IndexHandler, BlogHandler, NotFoundHandler, PageHandler, AdminHandler) {
	var Routes = ReactRouter.Routes;
	var Route = ReactRouter.Route;
	var DefaultRoute = ReactRouter.DefaultRoute;
	var NotFoundRoute = ReactRouter.NotFoundRoute;

	var AppRoutes = React.createClass({
		render: function() {

			return <Routes location="hash">
				<Route name="app" path="/" handler={IndexHandler}>
					<DefaultRoute handler={BlogHandler} />
					<Route name="page" path="/:pageSlug" handler={PageHandler} />
					<Route name="admin" path="/admin/index" handler={AdminHandler} hideSidebar />
					<NotFoundRoute name="notFound" path='/error/404' handler={NotFoundHandler} />
				</Route>
			</Routes>
		}
	})
	return AppRoutes;
});