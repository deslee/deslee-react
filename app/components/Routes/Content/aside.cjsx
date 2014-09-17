React = require 'react/addons'

module.exports = React.createClass render: ->
	classes = "aside": true
	classes[@props.className] = true
	className = React.addons.classSet(classes)

	Renderable = require '../../Dynamic/Renderable.cjsx'

	aside = <aside id="asideComponent" className={className}>
		<h3>About me</h3>

		<Renderable path="intro" />

		<Renderable path="info" />
	</aside>;
