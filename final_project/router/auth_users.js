const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  let user = users.filter((u) => u.username === username);
  if (user.length > 0) {
    return false;
  }
  return true;
}

const authenticatedUser = (username, password) => {
  let validusers = users.filter((u) => u.username === username && u.password === password);
  if (validusers.length > 0) {
    return true;
  }
  return false;
}

// Only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign({data: password}, 'access', {expiresIn: 60 * 60});
    req.session.authorization = {accessToken, username};
    return res.status(200).json({message: "User login successful"});
  } else {
    return res.status(208).json({message: "Invalid username or password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.body.review;
  const username = req.session.authorization?.username;
  if (!username) {
    return res.status(401).json({message: "User not logged in"});
  }
  if (books[isbn]) {
    books[isbn].reviews[username] = review;
    return res.status(200).json({message: "Review added/modified successfully", reviews: books[isbn].reviews});
  }
  return res.status(404).json({message: "Book not found"});
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization?.username;
  if (!username) {
    return res.status(401).json({message: "User not logged in"});
  }
  if (books[isbn]) {
    if (books[isbn].reviews[username]) {
      delete books[isbn].reviews[username];
      return res.status(200).json({message: "Review deleted successfully"});
    }
    return res.status(404).json({message: "No review found for this user"});
  }
  return res.status(404).json({message: "Book not found"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
