import React from 'react'
import { useParams } from 'react-router'

function BookDetails() {
  const params = useParams()

  return (
    <div>
      i am book details {params.id}
    </div>
  )
}

export default BookDetails
