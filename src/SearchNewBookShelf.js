import React, {Component} from 'react';
import BooksShelf from './BookShelf';
let _ = require('underscore')._;

class SearchNewBookShelf extends Component {
    state = {
        books: []
    };

    componentWillReceiveProps(nextProps) {
        // generate id only arrays
        let searchedBooksIds = _.pluck(nextProps.searchedBooks, 'id');
        let libraryBooksIds = _.pluck(nextProps.libraryBooks, 'id');
        // // get book only not in library
        let newSearchedBooksIds = _.difference(searchedBooksIds,libraryBooksIds);
        let books = [];
        _.each(newSearchedBooksIds, (id) => books = books.concat(_.where(nextProps.searchedBooks, {id}) ) );
        this.setState({books: books});
    }

    render() {
        return (<BooksShelf title={this.props.title} books={this.state.books}/>)
    }
}

export default SearchNewBookShelf;