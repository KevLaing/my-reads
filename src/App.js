import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom';
import ListBooks from './ListBooks';
import Search from './Search';

class BooksApp extends React.Component {
  state = {

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
    /*This iterates through the books array object and finds a unique set of shelves, then stores that set in the state */
    var shelf = [];
    books.forEach(function(book){
      if(shelf.indexOf(book.shelf) < 0){
        shelf.push(book.shelf);
      }
    });
    this.setState({shelf:shelf});
  }
  updateBookShelf = (book,shelf, query) =>{
    console.log(book +", "+shelf)
    BooksAPI.update(book,shelf)
    .then(() => {
      /** TODO: Fix this section so that it incrementally updates state instead of rebuilding the entire state tree - Need help with this**/
      if(query){
        this.searchBooks(query); //This doesn't seem to run for some reason. Can you explain?
      }else{
        this.getAllBooks()
      }
    });

  }
  searchBooks = (query) =>{
    BooksAPI.search(query,25).then((books) => {
      if(books){
        /*Since books through search are different than my books a seperate state property is required*/
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
