export function filter_shelf(books,shelf) {
    return books.filter((book) => book.shelf === shelf)
}

export function shelf_component_did_mount(nextProps) {
    let books = nextProps.books;
    if (books !== this.state.books) {
        this.setState({
            books,
            currentlyReadingBooks: filter_shelf(books, 'currentlyReading'),
            wantToReadBooks: filter_shelf(books, 'wantToRead'),
            readBooks: filter_shelf(books, 'read')
        });
    }
}