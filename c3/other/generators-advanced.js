function* words(text) {
  const parts = text.split(/\s+/)
  for (const word of parts) {
    yield word
  }
}

// Example usage
const text = "Generators let us process data step by step without storing everything in memory."

for (const word of words(text)) {
  console.log(word)
}
