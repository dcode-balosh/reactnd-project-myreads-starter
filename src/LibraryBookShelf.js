import React, {Component} from 'react';
import BooksShelf from './BookShelf';
let _ = require('underscore')._;

class LibraryBookShelf extends Component {

    render() {
        return (<BooksShelf title={this.props.title}
                            books={this.props.shelfBooks}
                            onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>)
    }
}

export default LibraryBookShelf;