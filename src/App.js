import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchView from './SearchView'
import ListView from "./ListView";
import './App.css'
import {Route} from "react-router-dom";
let _ = require('underscore')._;

class BooksApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            /**
             * TODO: Instead of using this state variable to keep track of which page
             * we're on, use the URL in the browser's address bar. This will ensure that
             * users can use the browser's back and forward buttons to navigate between
             * pages, as well as provide a good URL they can bookmark and share.
             */
            showSearchPage: false,
            books: [],
            query: '',
            searchedBooks: []
        };
    }

    getBooks = () => {
        BooksAPI.getAll().then(
            (books) => {
                this.updateBooks(books)
            }
        );
    };

    updateBooks = (books) => {
        this.setState({
            books
        })
    };

    componentDidMount() {
        this.getBooks();
    }

    onBookShelfChangerClick = (book,e) =>{
        let shelf = e.target.value;
        // let shelf = e.target.value;
        BooksAPI.update(book,shelf).then(() => {
            if(shelf !== 'none'){
                BooksAPI.get(book.id).then(
                    (updatedBook) => {
                        let books = this.state.books.filter((book) => book.id !== updatedBook.id );
                        books.push(updatedBook);
                        this.updateBooks(books);
                    }
                )
            }else{
                this.updateBooks(_.without(this.state.books,book))
            }
        });
    };

    onCloseClick = () => {
        this.setState({showSearchPage: false})
    };

    onSearchClick = () => {
        this.setState({showSearchPage: true})
    };

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <ListView books={this.state.books}
                              onSearchClick={this.onSearchClick}
                              onBookShelfChangerClick={this.onBookShelfChangerClick}
                    />
                )}/>
                <Route exact path="/search" render={() => (
                    <SearchView books={this.state.books}
                                onCloseClick={this.onCloseClick}
                                onBookShelfChangerClick={this.onBookShelfChangerClick}
                    />
                )}/>
            </div>
        )
    }
}

export default BooksApp
