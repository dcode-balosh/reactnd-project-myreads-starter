import React, {Component} from 'react';
import BooksShelf from './BookShelf';

class LibraryBookShelf extends Component {
    state = {
        books: null
    };

    componentWillReceiveProps(nextProps) {
        if (this.state.books !== nextProps.shelfBooks) {
            this.setState(
                {
                    books: nextProps.books.filter((b) => b.shelf === nextProps.name)
                },
                () =>
                    nextProps.updateShelfBooks(nextProps.name + 'Books', this.state.books)
            )
        }
    }

    render() {
        return (<BooksShelf title={this.props.title} books={this.state.books}/>)
    }
}

export default LibraryBookShelf;