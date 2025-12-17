import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { bookActions } from '../actions'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const bookListSelector = state => state.book.data
const bookListCountSelector = state => state.book.count

function BookList () {
  const dispatch = useDispatch() 
  const bookList = useSelector(bookListSelector)
  const bookListCount = useSelector(bookListCountSelector)
  const [ pageSize, setPageSize ] = useState(2)
  const [ pageNo, setPageNo ] = useState(0)
  const [ filterField, setFilterField ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ sortField, setSortField ] = useState('')
  const [ sortOrder, setSortOrder ] = useState('')
  const [ first, setFirst ] = useState(0)

  useEffect(() => {
    dispatch(bookActions.getBooks(pageSize, pageNo, filterField, filterValue, sortField, sortOrder))
  }, [dispatch, pageSize, pageNo, filterField, filterValue, sortField, sortOrder])

  const opsTemplate = (rowData) => {
    return (
      <div>
        Placeholder
      </div>
    )
  }

  const handlePageChange = (evt) => {
    setPageNo(evt.page)
    setPageSize(evt.rows)
    setFirst(evt.first)
  }

  const handleSort = (evt) => {
    console.warn(evt)
  }

  const handleFilter = (evt) => {
    console.warn(evt)
  }

  return (
    <div>
      Page number is {pageNo}
      <DataTable 
        value={bookList} 
        paginator 
        rows={pageSize}
        totalRecords={bookListCount}
        first={first}
        page={pageNo}
        onPage={handlePageChange}
        onSort={handleSort}
        onFilter={handleFilter}
      >
          <Column field="title" header="Title" />
          <Column field="content" header="Content" />
          <Column body={opsTemplate} header="Commands" />
      </DataTable>
    </div>
  )
}

export default BookList