import React, {Component} from 'react';
import Book from './Book';

class BooksGrid extends Component {
    render() {
        return (
            <ol className="books-grid">
                {this.props.books.map(
                    (book) => (
                        <li key={book.id}>
                            <Book book={book}/>
                        </li>
                    )
                )}
            </ol>
        )
    }
}

export default BooksGrid;