import React, {Component} from 'react'
import LibraryBookShelf from "./LibraryBookShelf";

class ListView extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <LibraryBookShelf title='Currently Reading'
                                          name='currentlyReading'
                                          shelfBooks={this.props.currentlyReadingBooks}
                                          onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                        <LibraryBookShelf title='Want to Read'
                                          name='wantToRead'
                                          shelfBooks={this.props.wantToReadBooks}
                                          onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                        <LibraryBookShelf title='Read'
                                          name='read'
                                          shelfBooks={this.props.readBooks}
                                          onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => this.props.onSearchClick()}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default ListView;