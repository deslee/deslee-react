ReactRouter = require 'react-router'
React = require 'react'
$ = require 'jquery'

Routes = ReactRouter.Routes
Route = ReactRouter.Route
DefaultRoute = ReactRouter.DefaultRoute
NotFoundRoute = ReactRouter.NotFoundRoute

module.exports = React.createClass
	render: () ->
		IndexHandler = require './Routes/index.cjsx'
		PageHandler = require('./Dynamic/Page.cjsx') 'pages'
		BlogPageHandler = require('./Dynamic/Page.cjsx') 'blog'
		NotFoundHandler = require './Routes/notFound.cjsx'
		BlogHandler = require './Dynamic/Blog.cjsx'
		AdminHandler = require './Routes/Admin/index.cjsx'

		SlugRouteHandler = React.createClass
			render: () ->
				if (@props.params.slug == 'admin')
					adminHandler = <AdminHandler />
					$.extend(adminHandler.props, @props)
					return adminHandler
				else
					pageHandler = <PageHandler  />
					$.extend(pageHandler.props, @props)
					return pageHandler

		return <Routes location="history">
			<Route name="app" path="/" handler={IndexHandler}>
				<DefaultRoute handler={BlogHandler} />
				<Route name="pages" path="/:slug" handler={SlugRouteHandler} />
				<Route name="blog" path="blog/:slug" handler={BlogPageHandler} />
				<NotFoundRoute name="notFound" path='/error/404' handler={NotFoundHandler} />
			</Route>
		</Routes>