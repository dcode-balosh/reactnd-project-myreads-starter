import React, {Component} from 'react';
import BooksShelf from './BookShelf';
let _ = require('underscore')._;

class SearchLibraryBookShelf extends Component {
    state = {
        books: []
    };

    componentWillReceiveProps(nextProps) {
        // generate id only arrays
        let searchedBooksIds = _.pluck(nextProps.searchedBooks, 'id');
        let shelfBooksIds = _.pluck( nextProps.shelfBooks, 'id');
        // // get book only on current shelf
        let shelfSearchedBooksIds = _.intersection(searchedBooksIds,shelfBooksIds);
        let books = [];
        _.each(shelfSearchedBooksIds, (id) => books = books.concat(_.where(nextProps.shelfBooks, {id}) ) );
        this.setState({books: books});
    }

    render() {
        return (<BooksShelf title={this.props.title}
                            books={this.state.books}
                            onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>)
    }
}

export default SearchLibraryBookShelf;