document.addEventListener('DOMContentLoaded', () => {
  
  document.querySelectorAll('.code-wrapper').forEach(wrapper => {
    const editorDiv = wrapper.querySelector('.editor')
    const outputDiv = wrapper.querySelector('.result')
    const runButton = wrapper.querySelector('.run-button')
  
    const code = editorDiv.textContent || ''
    const aceEditor = ace.edit(editorDiv)
    aceEditor.setTheme('ace/theme/monokai')
    aceEditor.session.setMode('ace/mode/javascript')
    aceEditor.setValue(code.trim(), -1)
  
    // Ensure height
    editorDiv.style.height = '300px'
  
    runButton.onclick = () => {
      fetch('/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: aceEditor.getValue() })
      })
        .then(res => res.json())
        .then(data => outputDiv.textContent = data.output)
        .catch(err => outputDiv.textContent = 'Error: ' + err)
    }
  })
  
  let current = 0
  const slides = document.querySelectorAll('.slide')
  const total = slides.length
  
  function showSlide(index) {
    slides.forEach((s, i) => s.style.display = i === index ? 'block' : 'none')
  }
  
  function nextSlide() {
    current = (current + 1) % total
    showSlide(current)
  }
  
  function prevSlide() {
    current = (current - 1 + total) % total
    showSlide(current)
  }
  
  // Use window instead of document to capture events even when an Ace editor is focused
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      nextSlide()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      prevSlide()
    }
  })
  
  const toggleBtn = document.getElementById('toggle-theme')

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark')
      toggleBtn.textContent = document.body.classList.contains('dark')
        ? '☀️ Light Mode'
        : '🌙 Dark Mode'
    })
  } else {
    console.warn('#toggle-theme not found – was it overwritten by slide content?')
  }

})

