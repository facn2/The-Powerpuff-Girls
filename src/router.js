const {handleHomeRoute, handlePublic, handleGetData, handleNewBook, handleLogin} = require('./handlers');

const router = (request, response) => {
	const endpoint = request.url.split('/')[1];

	if (endpoint === '') {
		handleHomeRoute(response);
	} else if (endpoint.indexOf('public') === 0) {
		handlePublic(response, request);
	} else if (endpoint === 'login') {
		handleLogin(response, request)
	} else if (endpoint === 'sign-up') {
		handleSignUp(request, response)
	} else if (endpoint === 'logout') {
		handleLogout(request, response)
	} else if (endpoint === 'books') {
		handleGetData(response);
	} else if (endpoint === 'add-new-book') {
		handleNewBook(response, request)
 	} else {
		response.writeHead(404, 'Content-Type: text/html');
		response.end('<h1>404 file not found</h1>');
	}
};

module.exports = router;
