ReactRouter = require 'react-router'
React = require 'react'

Routes = ReactRouter.Routes
Route = ReactRouter.Route
DefaultRoute = ReactRouter.DefaultRoute
NotFoundRoute = ReactRouter.NotFoundRoute

module.exports = React.createClass
	render: () ->
		IndexHandler = require './Routes/index.cjsx'
		PageHandler = require './Dynamic/Page.cjsx'
		NotFoundHandler = require './Routes/notFound.cjsx'

		return <Routes location="history">
			<Route name="app" path="/" handler={IndexHandler}>
				<Route name="page" path="/:pageSlug" handler={PageHandler} />
				<NotFoundRoute name="notFound" path='/error/404' handler={NotFoundHandler} />
			</Route>
		</Routes>