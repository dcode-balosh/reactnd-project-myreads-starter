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
                                          books={this.props.books}
                                          name='currentlyReading'
                                          updateShelfBooks={this.props.updateShelfBooks}
                                          shelfBooks={this.props.currentlyReadingBooks}/>
                        <LibraryBookShelf title='Want to Read'
                                          books={this.props.books}
                                          name='wantToRead'
                                          updateShelfBooks={this.props.updateShelfBooks}
                                          shelfBooks={this.props.wantToReadBooks}/>
                        <LibraryBookShelf title='Read'
                                          books={this.props.books}
                                          name='read'
                                          updateShelfBooks={this.props.updateShelfBooks}
                                          shelfBooks={this.props.readBooks}/>
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