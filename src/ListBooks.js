import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ShelfChanger from './ShelfChanger'
//import escapeRegExp from 'escape-string-regexp'
//import sortBy from 'sort-by'

class ListBooks extends Component{

  handleShelfChange = (book,newShelf) => {
    this.props.updateBookShelf(book,newShelf);
  }

  render(){
    /** Create an array of all shelf items with the books array **/
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
                  <h2 className="bookshelf-title">{/* Change the shelf propery into a proper title using regex */shelf.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); })}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {/*filter the books for the current shelf*/this.props.books.filter((book) => {return book.shelf === shelf}).map((book) => (
                         <li key={book.id}>
                            <div className="book">
                              <div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail}")` }}></div>
                                <ShelfChanger updateShelf={this.handleShelfChange} book={book} />
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