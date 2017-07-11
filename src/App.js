import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    shelf:[],
    foundbooks:[]

  }
  getAllBooks = () =>{

    BooksAPI.getAll().then(
      (books) => {

        this.setState({
          books:books
        })
        this.generateShelf(books);
      }
    )
  }
  generateShelf = (books)=>{
    var shelf = [];
    books.forEach(function(book){
      if(shelf.indexOf(book.shelf) < 0){
        shelf.push(book.shelf);
      }
    });
    this.setState({shelf:shelf});
  }
  updateBookShelf = (book,shelf) =>{
    console.log(book +", "+shelf)
    BooksAPI.update(book,shelf)
    .then((book) => {
      this.setState((state) =>({
        books: state.books.concat([BooksAPI.get(book.id)])
      }))
    });

  }
  searchBooks =(query) =>{
    BooksAPI.search(query,10).then((books) => {
      if(books){
       this.setState({foundbooks:books})
      }
    })
  }
  componentDidMount = () =>{
    this.getAllBooks();
  }
  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
            <ListBooks books={this.state.books} shelf={this.state.shelf} updateBookShelf={this.updateBookShelf} />
          )}
        />
        <Route path="/search" render={() =>(
            <Search searchBooks={this.searchBooks} books={this.state.foundbooks}  updateBookShelf={this.updateBookShelf} />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
