import React from 'react'
import * as BooksAPI from './BooksAPI'
import SearchView from './SearchView'
import ListView from "./ListView";
import './App.css'
let _ = require('underscore')._;

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books: [],
        query: '',
        searchedBooks: [],
        // not great but don't have good way to pass data without redux and hops in the air
        readBooks: [],
        wantToReadBooks: [],
        currentlyReadingBooks: []
    };

    getBooks = () => {
        BooksAPI.getAll().then(
            (books) => {
                this.updateBooks(books)
            }
        );
    };

    updateBooks = (books) => {
        this.setState({
            books: books,
            readBooks: books.filter((b) => b.shelf === 'read'),
            wantToReadBooks: books.filter((b) => b.shelf === 'wantToRead'),
            currentlyReadingBooks: books.filter((b) => b.shelf === 'currentlyReading')
        })
    };

    componentDidMount() {
        this.getBooks();
    }

    updateQuery = (query) => {
        BooksAPI.search(query, 20).then(
            (searchedBooks) => {
                if (!Array.isArray(searchedBooks)){
                    searchedBooks = []
                }
                this.setState({
                    query: query,
                    searchedBooks: searchedBooks
                })
            }
        )
    };

    onBookShelfChangerClick = (book,e) =>{
        let shelf = e.target.value;
        // let shelf = e.target.value;
        BooksAPI.update(book,shelf).then(() => {
            if(shelf !== 'none'){
                BooksAPI.get(book.id).then(
                    (updatedBook) => {
                        let books = this.state.books.slice();
                        let idx = _.findIndex(books,{id: updatedBook.id});
                        if(idx !== -1){
                            books[idx] = updatedBook;
                        }else{
                            books.push(updatedBook);
                        }
                        this.updateBooks(books)
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
                {this.state.showSearchPage ? (
                    <SearchView libraryBooks={this.state.books}
                                searchedBooks={this.state.searchedBooks}
                                currentlyReadingBooks={this.state.currentlyReadingBooks}
                                wantToReadBooks={this.state.wantToReadBooks}
                                readBooks={this.state.readBooks}
                                updateQuery={this.updateQuery}
                                onCloseClick={this.onCloseClick}
                                query={this.state.query}
                                onBookShelfChangerClick={this.onBookShelfChangerClick}
                    />
                ) : (
                    <ListView books={this.state.books}
                              currentlyReadingBooks={this.state.currentlyReadingBooks}
                              wantToReadBooks={this.state.wantToReadBooks}
                              readBooks={this.state.readBooks}
                              onSearchClick={this.onSearchClick}
                              onBookShelfChangerClick={this.onBookShelfChangerClick}
                    />
                )}
            </div>
        )
    }
}

export default BooksApp
