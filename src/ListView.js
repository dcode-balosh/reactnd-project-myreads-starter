import React, {Component} from 'react'
import LibraryBookShelf from "./LibraryBookShelf";
import {Link} from "react-router-dom";
import {shelf_component_did_mount} from './shelfHelper'

class ListView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            currentlyReadingBooks: [],
            wantToReadBooks: [],
            readBooks: []
        };
    }

    componentWillReceiveProps(nextProps){
        shelf_component_did_mount.call(this, nextProps);
    }

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
                                          shelfBooks={this.state.currentlyReadingBooks}
                                          onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                        <LibraryBookShelf title='Want to Read'
                                          name='wantToRead'
                                          shelfBooks={this.state.wantToReadBooks}
                                          onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                        <LibraryBookShelf title='Read'
                                          name='read'
                                          shelfBooks={this.state.readBooks}
                                          onBookShelfChangerClick={this.props.onBookShelfChangerClick}/>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default ListView;