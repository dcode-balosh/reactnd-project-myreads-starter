import React, {Component} from 'react';
import BooksGrid from './BooksGrid';

class BookShelf extends Component {
    state = {
        books: []
    };

    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                books: nextProps.books.filter((b) => b.shelf === this.props.name)
            }
        )
    }

    render() {
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <BooksGrid books={this.state.books}/>
                </div>
            </div>
        )
    }
}

export default BookShelf;