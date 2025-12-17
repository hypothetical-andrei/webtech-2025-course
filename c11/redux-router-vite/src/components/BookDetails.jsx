import React from 'react'
import { useParams } from 'react-router'

function BookDetails () {
  const { id } = useParams()

  return (
    <div>
      <h2>Book Details</h2>
      <div>
        Book details for book: {id}
      </div>
    </div>
  )
}

export default BookDetails
