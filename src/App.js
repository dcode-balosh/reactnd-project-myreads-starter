import React from 'react'
import * as BooksAPI from './BooksAPI'
import LibraryBookShelf from './LibraryBookShelf';
import SearchLibraryBookShelf from './SearchLibraryBookShelf';
import './App.css'
import SearchNewBookShelf from "./SearchNewBookShelf";


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


    componentDidMount() {
        BooksAPI.getAll().then(
            (books) => {
                this.setState({books})
            }
        );
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

    updateShelfBooks = (name, shelfBooks) => {
        if(shelfBooks !== this.state[name]){
            let h = {};
            h[name] = shelfBooks;
        }
    };

    render() {
        return (
            <div className="app">
                {this.state.showSearchPage ? (
                    <div className="search-books">
                        <div className="search-books-bar">
                            <a className="close-search" onClick={() => this.setState({showSearchPage: false})}>Close</a>
                            <div className="search-books-input-wrapper">
                                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                                <input
                                    type="text"
                                    value={this.state.query}
                                    onChange={(event) => this.updateQuery(event.target.value)}
                                    placeholder="Search by title or author"
                                />

                            </div>
                        </div>
                        <div className="search-books-results">
                            <SearchNewBookShelf title='New Books'
                                                libraryBooks={this.state.books}
                                                searchedBooks={this.state.searchedBooks}/>
                            <SearchLibraryBookShelf title='Currently Reading'
                                                    shelfBooks={this.state.currentlyReadingBooks}
                                                    searchedBooks={this.state.searchedBooks}/>
                            <SearchLibraryBookShelf title='Want to Read'
                                                    shelfBooks={this.state.wantToReadBooks}
                                                    searchedBooks={this.state.searchedBooks}/>
                            <SearchLibraryBookShelf title='Read'
                                                    shelfBooks={this.state.readBooks}
                                                    searchedBooks={this.state.searchedBooks}/>
                        </div>
                    </div>
                ) : (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <LibraryBookShelf title='Currently Reading'
                                                  books={this.state.books}
                                                  name='currentlyReading'
                                                  updateShelfBooks={this.updateShelfBooks}
                                                  shelfBooks={this.state.currentlyReadingBooks}/>
                                <LibraryBookShelf title='Want to Read'
                                                  books={this.state.books}
                                                  name='wantToRead'
                                                  updateShelfBooks={this.updateShelfBooks}
                                                  shelfBooks={this.state.wantToReadBooks}/>
                                <LibraryBookShelf title='Read'
                                                  books={this.state.books}
                                                  name='read'
                                                  updateShelfBooks={this.updateShelfBooks}
                                                  shelfBooks={this.state.readBooks}/>
                            </div>
                        </div>
                        <div className="open-search">
                            <a onClick={() => this.setState({showSearchPage: true})}>Add a book</a>
                        </div>
                    </div>
                )}
            </div>
        )
    }
}

export default BooksApp
