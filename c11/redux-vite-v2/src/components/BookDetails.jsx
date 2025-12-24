import React from 'react'
import { useParams } from 'react-router'

function BookDetails () {
  const { id } = useParams()

  return (
    <div>
      i will be the book details for {id}
    </div>
  )
}

export default BookDetails