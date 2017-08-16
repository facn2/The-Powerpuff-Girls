const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const bcrypt = require('bcryptjs');
const addNewUser = require('./queries/addUser')
const getData = require('./queries/getData');
const addNewBook = require('./queries/addBook');


const handleHomeRoute = (response) => {
  const filePath = path.join(__dirname, '..', 'public', 'signup.html')
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, 'Content-Type: text/html')
      response.end('<h1> sorry, the page doesnt response </h1>')
    } else {
      response.writeHead(200, 'Content-Type: text/html')
      response.end(file);
    }
  });
}

const handlePublic = (response, request) => {
  const extensionType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon',
    img: 'image/png'
  }[request.url.split('.')[1]];

  const filePath = path.join(__dirname, '..', request.url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(500, 'Content-Type: text/html');
      response.end('<h1>Sorry something went wrong</h1>');
    } else {
      response.writeHead(200, `Content-Type:${extensionType}`);
      response.end(file)
    }
  })
}

const handleGetData = (response) => {
  getData((err, res) => {
    if (err) {
      response.writeHead(500, 'Content-Type:text/html');
      response.end('<h1>Sorry, there was a problem getting the users</h1>');
      console.log(err);
    } else {
      const data = JSON.stringify(res);
      response.writeHead(200, 'Content-Type:application/json');
      response.end(data);
    }
  })
};

const handleSignup = (request, response) => {
  let signupData = '';
  request.on('data', chunk => {
    signupData += chunk;
    console.log(signupData);
  })
  request.on('end', () => {
    const parsedSignup = querystring.parse(signupData);
    // grab username
    const userSignup = parsedSignup.userSignup;
    // grab password and hash password
    const pwSignup = parsedSignup.pwSignup;
    // send it to the query function - to update db
    bcrypt.hash(pwSignup, 10, (err, hashPw) => {
      console.log(hashPw);
      if (err) {
        console.log('haha', err);
        return
      } else {
        addNewUser(userSignup, hashPw, (err, res) => {
          console.log(res);
          if (err){
            console.log('hehe', err);
          } else {
            res.writeHead(301, {"Location": "/login"})
            res.end();
          }
        })
      }
    })
  });
}

// const hashPassword () => {
//   console.log();
// }

const handleLogin = (request, response) => {
  console.log('Do I workkkkkk?')
}

// const handleNewBook = ((response, request) => {
//   let inputData = '';

//   request.on('data', chunk => {
//     inputData += chunk;
//   })

//   request.on('end', () => {
//     const formInput = querystring.parse(inputData);
//     console.log(formInput);

//     addNewBook(formInput, (err) => {
//       if (err) {
//         console.log(err);
//         return 'Error with Adding New Book'
//         response.writeHead(404, 'Content-Type: text/html')
//         response.end('<h1>Sorry we couldn\'t add your book</h1>')
//       }
//       response.writeHead(301, { "Location": "/" })
//       response.end()
//     })
//   })
// });


module.exports = {
  handleHomeRoute,
  handlePublic,
  handleGetData,
  handleLogin,
  handleSignup
  // handleNewBook
}
