# The Power Girls

## Book Share

### How to use our Website:

To check out the app, please clone this repository.
```
git clone
```
Install the dependencies
```
npm i
```
Run start
```
npm run devStart
```
## Our Product:

We want to create a web application which displays books for people in Founders & Coders to share.

### User Story:

**As a member of Founders & Coders who has a book I would like to share...**

* I can add a book to the database

**As a member of Founders & Coders who is interested in borrowing a book...**

* I can browse for available books
* I can reserve a book for certain dates
* I can unreserve a book

**Suggested additional requirements / stretch goals:**

* I can rate the book after I've read it
* Books can simultaneously be reserved by multiple users but for different dates

### Schemas:

**books**

| id  | book_name    | author | users_id | img_url |
| --- | ------------ | ------ | -------- | ------- |
| 1   | Harry Potter | J.K Rowling | 1 | img.jpg |

**users**

| id  |  username | password |
| --- |:-----:|:-------:|
| 1 | Katia | jfgh465kdfb347684fdbnbh89375t5 |


### Code Guidelines:

* CamelCase for variable names
* Comments for code clarification
* Sole use of arrow-functions on backend
* Use of QuerySelector to grab elements from html to js

### Team Checklist:

* Wireframe & Architecture
* Create schemas
* Create skeleton files
* Create database
* Create back-end server
* Create front-end client
