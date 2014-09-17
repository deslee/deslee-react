ReactRouter = require 'react-router'
React = require 'react'

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

		return <Routes location="history">
			<Route name="app" path="/" handler={IndexHandler}>
				<DefaultRoute handler={BlogHandler} />
				<Route name="page" path="/:slug" handler={PageHandler} />
				<Route name="blog" path="blog/:slug" handler={BlogPageHandler} />
				<NotFoundRoute name="notFound" path='/error/404' handler={NotFoundHandler} />
			</Route>
		</Routes>