import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { compose } from 'recompose'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

function AddBook(props) {

  const [formState, setFormState] = useState({
    name: '',
    genre: '',
    authorId: '',
  })

  const displayAuthors = () => {
    const data = props.getAuthorsQuery

    return data.loading
      ? (<option disabled>Loadng Authors...</option>)
      : (
        data.authors.map(author => (
          <option key={author.id} value={author.id}>{author.name}</option>
        ))
      )
  }

  const submitForm = e => {
    e.preventDefault()

    props.addBookMutation({
      variables: {
        name: formState.name,
        genre: formState.genre,
        authorId: formState.authorId
      },
      refetchQueries:[{
        query: getBooksQuery
      }]
    })
  }

  return (
    <form id='add-book' onSubmit={submitForm}>

      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={e => setFormState({ ...formState, name: e.target.value })} />
      </div>

      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={e => setFormState({ ...formState, genre: e.target.value })} />
      </div>

      <div className="field">
        <label>Author:</label>
        <select onChange={e => setFormState({ ...formState, authorId: e.target.value })}>
          <option>Select Author</option>
          {displayAuthors()}
        </select>
      </div>

      <button>+</button>
    </form>
  )
}

export default compose(
  graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
  graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook)
