import React from 'react'
import * as BooksAPI from './BooksAPI'
import LibraryBookShelf from './LibraryBookShelf';
import SearchView from './SearchView'
import './App.css'


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
            this.setState(h);
        }
    };

    onCloseClick = () => {
        this.setState({showSearchPage: false})
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
                    />
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
                                                  updateShelfBooks={this.updateShelfBooks.bind(this)}
                                                  shelfBooks={this.state.currentlyReadingBooks}/>
                                <LibraryBookShelf title='Want to Read'
                                                  books={this.state.books}
                                                  name='wantToRead'
                                                  updateShelfBooks={this.updateShelfBooks.bind(this)}
                                                  shelfBooks={this.state.wantToReadBooks}/>
                                <LibraryBookShelf title='Read'
                                                  books={this.state.books}
                                                  name='read'
                                                  updateShelfBooks={this.updateShelfBooks.bind(this)}
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
