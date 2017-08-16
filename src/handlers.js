const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const bcrypt = require('bcryptjs');
const addNewUser = require('./queries/addUser');
const checkPw = require('./queries/checkPw');
const getData = require('./queries/getData');
const addNewBook = require('./queries/addBook');

const { parse } = require('cookie');
const jwt = require('jsonwebtoken');

const maxAge = new Date();
maxAge.setDate(maxAge.getDate()+14); //setting max age of the cookie to two weeks
const secret = 'this shit is potatoes';


const handleHomeRoute = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'login.html')
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

const handleBookPage = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'home.html')
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

const handlePublic = (request, response) => {
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
  })
  request.on('end', () => {
    const parsedSignup = querystring.parse(signupData);
    const userSignup = parsedSignup.userSignup; // grab username
    const pwSignup = parsedSignup.pwSignup; // grab password
    bcrypt.hash(pwSignup, 10, (err, hashPw) => { //hash the password
      if (err) {
        console.log('haha', err);
        return
      } else {
        addNewUser(userSignup, hashPw, (err) => {// send it to the query function - to update db
          if (err) {
            console.log('hehe', err);
            return
          } else {
            response.writeHead(302, {'Location': '/'})
            response.end();
          }
        })
      }
    })
  });
}


const handleLogin = (request, response) => {
    let loginData = '';
    request.on('data', chunk => {
      loginData += chunk;
    })
    request.on('end', () => {
      const parsedLogin = querystring.parse(loginData);
      console.log("login data after parsed", loginData);
      const userLogin = parsedLogin.userLogin; // grab username
      const pwLogin = parsedLogin.pwLogin; // grab password

      checkPw(userLogin, (err, res) => {
        if(err) {
          console.log("fififi", err);
          return
        } else {
          const hashPw = res.rows[0].password;
          bcrypt.compare(pwLogin, hashPw, (error, resp) => { //compare the password
            if (error)   {
              console.log('tatahaha', error)
              return
            } else {
              console.log("successful comparison!")

              const cookie1 = jwt.sign((userLogin, hashPw), secret)
              console.log(cookie1)

              response.writeHead(
              302, 
              {
                'Location': '/home',
                'Set-Cookie': [`logged_in=true; expires=${maxAge};`, `user_session=${cookie1};  expires=${maxAge};`],
              })

              return response.end()
            };
        })
      }
    })
  })
};

const handleLogout = (request, response) => {
    response.writeHead(
      302,
      {
        'Location': '/home',
        'Set-Cookie': [`user_sessions=0; Max-Age=0`, `logged_in=false, Max-Age=0`]
      }
    );
    return response.end()
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
  handleBookPage,
  handleGetData,
  handleLogin,
  handleSignup,
  handleLogout
  // handleNewBook
}