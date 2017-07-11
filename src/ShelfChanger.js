import React, {Component} from 'react'

class ShelfChanger extends Component{

  render(){
    const {query, book} = this.props;

    return(
      <div className="book-shelf-changer">
        <select onChange={(event) => this.props.updateShelf(book, event.target.value, query)} >
          <option value="none" >Move to...</option>
            {/*I considered iterating over an array of shelves here
            but consistency is needed in search results so that wouldn't work.
            If there was a get Shelves function of the API then it might make sense to do that*/}
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
      )
  }

}
export default ShelfChanger