import React, {Component} from "react";
// import {Debounce} from "react-throttle";

class Book extends Component {
    render(){
        let book = this.props.book;
        let book_authors = book.authors ? book.authors.join("\n") : 'No authors in api' // example: Android Ice Cream Sandwich Superguide

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.smallThumbnail})`
                    }}>

                    </div>
                    <div className="book-shelf-changer">
                        {/*not working, I'll fix later<Debounce time="4000" handler="onChange">*/}
                            <select
                                defaultValue={book.shelf}
                                onChange={this.props.onBookShelfChangerClick.bind(null, book)}
                            >
                                <option value="MoveTo" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        {/*</Debounce>*/}
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book_authors}</div>
            </div>
        )
    }
}

export default Book;