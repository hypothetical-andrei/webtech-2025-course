import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router'
import BookList from './BookList'
import BookDetails from './BookDetails'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/books" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Router>
  )
}

export default App
