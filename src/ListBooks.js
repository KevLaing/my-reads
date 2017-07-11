import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ShelfChanger from './ShelfChanger'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

/**
This component is used by both the main app and the search component
The main app provides the shelf array to being with,
however the search results are unknown when the component mounts so we need to build that array from the books returned.
This is done at the beginning of the render method, after checking if the prop has been passed by the parent.
**/

class ListBooks extends Component{

  handleShelfChange = (book,newShelf) => {
    this.props.updateBookShelf(book,newShelf);
  }

  render(){
    /**  Create an array of all shelf items with the books array **/
    const shelf = this.props.shelf;
    if(shelf.length === 0){
      this.props.books.forEach(function(book){
          if(shelf.indexOf(book.shelf) < 0){
            shelf.push(book.shelf);
          }
      });
    }
    return(
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {/** Iterate over each shelf **/
              shelf.map((shelf) =>(
                <div className="bookshelf" key={shelf}>
                  <h2 className="bookshelf-title">{/* Change the shelf property into a proper title using regex */shelf.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {
                      /*
                        filter the books for the current shelf and map over a list item
                        I considered making this it's own component but passing the functions up the stack is tedios and I saw little value in it.
                      */
                        this.props.books.filter((book) => {return book.shelf === shelf}).map((book) => (
                         <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                <ShelfChanger updateShelf={this.handleShelfChange} book={book} query={this.props.query} />
                              </div>
                              <div className="book-title">{book.title}</div>
                              <div className="book-authors">{book.author}</div>
                            </div>
                          </li>
                        )
                      )
                    }
                    </ol>
                  </div>
                </div>
              )
            )
          }
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>

      )

  }
}

export default ListBooks;