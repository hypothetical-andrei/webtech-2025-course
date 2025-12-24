import React, { useEffect } from 'react'
import actions from '../actions'
import  { useDispatch, useSelector } from 'react-redux'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Button } from 'primereact/button'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { useState } from 'react'
import { useNavigate} from 'react-router'

const { bookActions } = actions

const bookListSelector = state => state.book.data
const bookListCountSelector = state => state.book.count

function BookList () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const bookList = useSelector(bookListSelector)
  const bookCount = useSelector(bookListCountSelector)

  const [pageSize, setPageSize] = useState(2)
  const [pageNo, setPageNo] = useState(0)
  const [filterField, setFilterField] = useState('')
  const [filterValue, setFilterValue] = useState('')
  const [sortField, setSortField] = useState('')
  const [sortOrder, setSortOrder] = useState('ASC')
  const [first, setFirst] = useState(0)

  const [selectedBook, setSelectedBook] = useState(null)
  const [isAddDialogShown, setIsAddDialogShown] = useState(false)
  const [isNewBook, setIsNewBook] = useState(true)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    dispatch(bookActions.getBooks(pageSize, pageNo, filterField, filterValue, sortField, sortOrder))
  }, [dispatch, pageSize, pageNo, filterField, filterValue, sortField, sortOrder])

  const addNew = () => {
    setTitle('')
    setContent('')
    setSelectedBook(null)
    setIsAddDialogShown(true)
    setIsNewBook(true)
  }

  const tableFooter = (
    <div>
      <span>
        <Button label='Add' onClick={addNew} icon='pi pi-plus' />
      </span>
    </div>
    
  )

  const editBook = (rowData) => {
    setSelectedBook(rowData.id)
    setTitle(rowData.title)
    setContent(rowData.content)
    setIsNewBook(false)
    setIsAddDialogShown(true)
  }

  const opsTemplate = (rowData) => {
    return (
      <div>
        <Button icon='pi pi-times' className='p-button-danger' onClick={() => dispatch(bookActions.deleteBook(rowData.id, pageSize, pageNo, filterField, filterValue, sortField, sortOrder ))} />
        <Button icon='pi pi-arrow-right' onClick={() => navigate(`/books/${rowData.id}`)} />
        <Button icon='pi pi-pencil' className='p-button-warning' onClick={() => editBook(rowData)} />
      </div>
    )
  }


  const saveBook = () => {
    if (isNewBook) {
      dispatch(bookActions.addBook({ title, content }, pageSize, pageNo, filterField, filterValue, sortField, sortOrder))
    } else {
      dispatch(bookActions.updateBook(selectedBook, { title, content }, pageSize, pageNo, filterField, filterValue, sortField, sortOrder))
    }
    setIsAddDialogShown(false)
    setTitle('')
    setContent('')
    setSelectedBook(null)
  }
  
  const addDialogFooter = (
    <div>
      <Button label='Save' icon='pi pi-save' onClick={() => saveBook()} />
    </div>
  )


  const handlePage = (evt) => {
    setPageNo(evt.page)
    setPageSize(evt.rows)
    setFirst(evt.first)
  }

  const handleSort = (evt) => {
    setSortField(evt.sortField)
    setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')
  }

  const handleFilter = (evt) => {
    console.warn(evt.filters)
    for (const key in evt.filters) {
      if (evt.filters[key].value !== null) {
        setFilterField(key)
        setFilterValue(evt.filters[key].value)
      }
    } 
  }

  const hideDialog = () => {
    setIsAddDialogShown(false)
  }
  

  return (
    <div>
      <DataTable 
        value={bookList}
        footer={tableFooter}
        paginator
        totalRecords={bookCount}
        first={first}
        rows={pageSize}
        rowsPerPageOptions={[2, 5, 10]}
        onPage={handlePage}
        lazy
        onSort={handleSort}
        onFilter={handleFilter}
        filterDisplay='row'
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