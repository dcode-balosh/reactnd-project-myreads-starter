import React, {Component} from 'react';
import Book from './Book';

class BooksGrid extends Component {
    state =  {books: []}

    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                books: nextProps.books
            }
        )
    }

    render() {
        return (
            <ol className="books-grid">
                {this.state.books.map(
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