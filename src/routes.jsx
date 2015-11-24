"use strict";

var React = require('react')
,	Router = require('react-router');

var	Route = Router.Route
,	DefaultRoute = Router.DefaultRoute
,	NotFoundRoute = Router.NotFoundRoute
,	Redirect = Router.Redirect
;

var routes = (
	<Route name="app" path="/" handler={require('./components/app.jsx')}>
		<DefaultRoute handler={require('./components/homePage.jsx')} />
		<Route name="authors" handler={require('./components/authors/authorsPage.jsx')} />
		<Route name="addAuthor" path="author" handler={require('./components/authors/manageAuthorPage.jsx')} />
		<Route name="manageAuthor" path="author/:authorId" handler={require('./components/authors/manageAuthorPage.jsx')} />
		<Route name="courses" handler={require('./components/courses/coursesPage.jsx')} />
		<Route name="addCourse" path="course" handler={require('./components/courses/manageCoursePage.jsx')} />
		<Route name="manageCourse" path="course/:courseId" handler={require('./components/courses/manageCoursePage.jsx')} />
		<Route name="about" handler={require('./components/about/aboutPage.jsx')} />
		<NotFoundRoute handler={require('./components/404PageNotFound.jsx')} />
		<Redirect from="About-us" to="about" />
	</Route>
);

module.exports = routes;