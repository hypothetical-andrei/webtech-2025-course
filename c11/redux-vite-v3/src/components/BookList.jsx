import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Dialog } from 'primereact/dialog'
import { deleteBook, getBooks, addBook, updateBook } from '../actions/book-actions'
import { useNavigate } from 'react-router'
        
const bookListSelector = state => state.book.data
const bookCountSelector = state => state.book.count


function BookList() {
  const books = useSelector(bookListSelector)
  const count = useSelector(bookCountSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [ pageSize, setPageSize ] = useState(2)
  const [ pageNo, setPageNo ] = useState(0)
  const [ filterField, setFilterField ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ sortField, setSortField ] = useState('')
  const [ sortOrder, setSortOrder ] = useState('ASC')
  const [ first, setFirst ] = useState(0)

  const [selectedBook, setSelectedBook] = useState(null)
  const [isAddDialogShown, setIsAddDialogShown] = useState(false)
  const [isNewBook, setIsNewBook] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
//  
  useEffect(() => {
    dispatch(getBooks(pageSize, pageNo, filterField, filterValue, sortField, sortOrder))
  }, [dispatch, pageSize, pageNo, filterField, filterValue, sortField, sortOrder])

  const handlePage = (evt) => {
    setFirst(evt.first)
    setPageNo(evt.page)
    setPageSize(evt.rows)
  }

  const handleSort = (evt) => {
    setSortField(evt.sortField)
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
  }

  const handleFilter = (evt) => {
    for (const key in evt.filters) {
      if (evt.filters[key].value !== null) {
        setFilterField(key)
        setFilterValue(evt.filters[key].value)
      }
    }
  }

  const editBook = (rowData) => {
    setSelectedBook(rowData.id)
    setTitle(rowData.title)
    setContent(rowData.content)
    setIsNewBook(false)
    setIsAddDialogShown(true)
  }

  const addNew = () => {
    setTitle('')
    setContent('')
    setSelectedBook(null)
    setIsAddDialogShown(true)
    setIsNewBook(true)
  }

  const tableFooter = (
    <div>
      <Button icon='pi pi-plus' onClick={addNew} />
    </div>
  )

  const handleDelete = (id) => {
    dispatch(deleteBook(id, pageSize, pageNo, filterField, filterValue, sortField, sortOrder))
  }

  const opsTemplate = (rowData) => {
    return (
      <>
        <Button icon='pi pi-trash' className='p-button-danger' onClick={() => handleDelete(rowData.id)} />
        <Button icon='pi pi-pencil' className='p-button-warning' onClick={() => editBook(rowData)} />
        <Button icon='pi pi-arrow-right' className='p-button-success' onClick={() => navigate(`/books/${rowData.id}`)} />
        
      </>
      

    )
  }

  const hideDialog = () => { 
    setIsAddDialogShown(false)
  }

  const saveBook = () => {
    if (isNewBook) {
      dispatch(addBook({ title, content }, pageSize, pageNo, filterField, filterValue, sortField, sortOrder))
    } else {
      dispatch(updateBook(selectedBook, { title, content }, pageSize, pageNo, filterField, filterValue, sortField, sortOrder))
    }
    setIsAddDialogShown(false)
    setTitle('')
    setContent('')
    setSelectedBook(null)
  }

  const addDialogFooter = (
    <div>
      <Button label='Save' icon='pi pi-save' onClick={saveBook} />
    </div>
  )

  return (
    <div>
      <DataTable 
        value={books}
        paginator
        rowsPerPageOptions={[2, 5, 10]}
        totalRecords={count}
        rows={pageSize}
        first={first}
        lazy
        onPage={handlePage}
        onSort={handleSort}
        onFilter={handleFilter}
        filterDisplay='row'
        footer={tableFooter}
      >
        <Column field='title' header='Title' sortable filter showFilterMenu={false} showClearButton={false} />
        <Column field='content' header='Content' sortable filter showFilterMenu={false} showClearButton={false} />
        <Column body={opsTemplate} />
      </DataTable>
       {
        isAddDialogShown ?
          <Dialog
            visible={isAddDialogShown}
            header='add a book'
            footer={addDialogFooter}
            onHide={hideDialog}
          >
            <InputText onChange={(evt) => setTitle(evt.target.value)} value={title} name='title' placeholder='title' />
            <InputText onChange={(evt) => setContent(evt.target.value)} value={content} name='content' placeholder='content' />
          </Dialog>
        :
          null
      }
    </div>
    
  )
}

export default BookList
