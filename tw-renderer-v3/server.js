// server.js
const express = require('express')
const fs = require('fs')
const path = require('path')
const markdownIt = require('markdown-it')
const vm = require('vm')
const app = express()

app.use(express.static('public'))
app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

const md = markdownIt({
  html: true,
  highlight: (str, lang) => {
    if (lang === 'js' || lang === 'javascript') {
      return `
        <div class="code-wrapper">
          <div class="editor">${str}</div>
          <button class="run-button">Run</button>
          <div class="output"><pre class="result">[Run to see output]</pre></div>
        </div>
      `
    }
    return `<pre><code class="language-${lang}">${md.utils.escapeHtml(str)}</code></pre>`
  }
})

app.get('/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'slides', req.params.filename)

  if (!filePath.endsWith('.md')) {
    return res.status(400).send('Only .md files are allowed')
  }

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(404).send('File not found')

    const slides = data
      .split(/^---$/m)
      .map(s => md.render(s.trim()))

    const content = slides.map((html, index) => `
      <section class="slide" data-slide="${index}" style="${index === 0 ? '' : 'display:none'}">
        ${html}
      </section>
    `).join('\n')

    // ✅ Use layout.ejs
    res.render('layout', {
      title: req.params.filename,
      content
    })
  })
})


app.post('/run', (req, res) => {
  try {
    let output = ''
    const consoleLog = (...args) => {
      output += args.join(' ') + '\n'
    }

    vm.runInNewContext(req.body.code, { console: { log: consoleLog } }, { timeout: 1000 })
    res.json({ output })
  } catch (err) {
    res.json({ output: err.toString() })
  }
})

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001/')
})
