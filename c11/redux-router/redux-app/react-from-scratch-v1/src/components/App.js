import React from 'react'
import BookEditor from './BookEditor'
import { HashRouter as Router, Routes, Route } from "react-router"
import About from './About'
import BookDetails from './BookDetails'

function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BookEditor />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  )
}

export default App
