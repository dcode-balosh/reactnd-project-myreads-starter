import React , {Component} from 'react'
import SearchNewBookShelf from "./SearchNewBookShelf";
import SearchLibraryBookShelf from "./SearchLibraryBookShelf";

class SearchView extends Component{
    render(){
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <a className="close-search"
                       onClick={() => this.props.onCloseClick()}>Close</a>
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
                                        libraryBooks={this.props.books}
                                        searchedBooks={this.props.searchedBooks}/>
                    <SearchLibraryBookShelf title='Currently Reading'
                                            shelfBooks={this.props.currentlyReadingBooks}
                                            searchedBooks={this.props.searchedBooks}/>
                    <SearchLibraryBookShelf title='Want to Read'
                                            shelfBooks={this.props.wantToReadBooks}
                                            searchedBooks={this.props.searchedBooks}/>
                    <SearchLibraryBookShelf title='Read'
                                            shelfBooks={this.props.readBooks}
                                            searchedBooks={this.props.searchedBooks}/>
                </div>
            </div>
        )
    }
}

export default SearchView;