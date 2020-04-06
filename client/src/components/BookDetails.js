import React from 'react'
import { graphql } from 'react-apollo'
import { getBookQuery } from '../queries/queries'


function BookDetails(props) {
  if (!(props && props.data && props.data.book)) {
    return (<div>no book selected</div>)
  }
  console.log('props ', props)
  const book = props.data.book

  return (
    <div id='book-details'>
      <h2>{book.name}</h2>
      <p>{book.genre}</p>
      <p>{book.author.name}</p>
      <ul className='other-books'>
        {book.author.books.map(item => {
          return <li key={item.id}>{item.name}</li>
        })}
      </ul>
      <p>output book details here</p>
    </div>
  )
}

export default graphql(getBookQuery, {
  options: props => {
    return {
      variables: {
        id: props.bookId
      }
    }
  }
})(BookDetails)
