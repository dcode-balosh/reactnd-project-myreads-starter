import React , {Component} from 'react'
import SearchNewBookShelf from "./SearchNewBookShelf";
import SearchLibraryBookShelf from "./SearchLibraryBookShelf";
import {Link} from "react-router-dom";

class SearchView extends Component{
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
                            value={this.props.query}
                            onChange={(event) => this.props.updateQuery(event.target.value)}
                            placeholder="Search by title or author"
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <SearchNewBookShelf title='New Books'
                                        libraryBooks={this.props.libraryBooks}
                                        searchedBooks={this.props.searchedBooks}
                                        onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                    <SearchLibraryBookShelf title='Currently Reading'
                                            libraryBooks={this.props.libraryBooks}
                                            shelfBooks={this.props.currentlyReadingBooks}
                                            searchedBooks={this.props.searchedBooks}
                                            onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                    <SearchLibraryBookShelf title='Want to Read'
                                            libraryBooks={this.props.libraryBooks}
                                            shelfBooks={this.props.wantToReadBooks}
                                            searchedBooks={this.props.searchedBooks}
                                            onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                    <SearchLibraryBookShelf title='Read'
                                            libraryBooks={this.props.libraryBooks}
                                            shelfBooks={this.props.readBooks}
                                            searchedBooks={this.props.searchedBooks}
                                            onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                </div>
            </div>
        )
    }
}

export default SearchView;