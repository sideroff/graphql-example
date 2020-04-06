import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails'

function BookList(props) {

  const [selectedBookId, setSelectedBookId] = useState()

  return (
    <React.Fragment>
      {props.data.loading
        ? (<div>loading</div>)
        : (
          <ul id="book-list">
            {props.data.books.map(book => (
              <li key={book.id} onClick={e => { setSelectedBookId(book.id) }}>{book.name}</li>
            ))}
          </ul>)}
      <BookDetails bookId={selectedBookId}/>
    </React.Fragment>

  )
}

export default graphql(getBooksQuery)(BookList)
