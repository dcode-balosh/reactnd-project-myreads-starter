import React , {Component} from 'react'
import SearchNewBookShelf from "./SearchNewBookShelf";
import SearchLibraryBookShelf from "./SearchLibraryBookShelf";
import {Link} from "react-router-dom";
import {shelf_component_did_mount} from './shelfHelper'
import * as BooksAPI from "./BooksAPI";

class SearchView extends Component{
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            currentlyReadingBooks: [],
            wantToReadBooks: [],
            readBooks: [],
            query: "",
            searchedBooks: []
        };
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
    }

    componentWillReceiveProps(nextProps){
        shelf_component_did_mount.call(this, nextProps);
    }

    render(){
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/' className="close-search">Close</Link>
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
                                        books={this.state.books}
                                        searchedBooks={this.state.searchedBooks}
                                        onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                    <SearchLibraryBookShelf title='Currently Reading'
                                            shelfBooks={this.state.currentlyReadingBooks}
                                            searchedBooks={this.state.searchedBooks}
                                            onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                    <SearchLibraryBookShelf title='Want to Read'
                                            shelfBooks={this.state.wantToReadBooks}
                                            searchedBooks={this.state.searchedBooks}
                                            onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                    <SearchLibraryBookShelf title='Read'
                                            shelfBooks={this.state.readBooks}
                                            searchedBooks={this.state.searchedBooks}
                                            onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                </div>
            </div>
        )
    }
}

export default SearchView;