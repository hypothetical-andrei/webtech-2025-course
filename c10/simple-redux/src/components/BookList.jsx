import React, { useEffect }  from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getBooks } from '../actions/actions'

const bookListSelector = state => state.book.bookList

const BookList = () => {
  const books = useSelector(bookListSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooks())
  }, [])

  return (
    <div>
      {
        books.map(e => <div key={e.id}>{e.title}</div>)
      }
    </div>
  )
}

export default BookList