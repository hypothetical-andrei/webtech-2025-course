function timed(fn) {
  return function(...args) {
    const start = performance.now()
    const result = fn(...args)
    const end = performance.now()
    console.log(`${fn.name || 'anonymous'} ran in ${(end - start).toFixed(2)} ms`)
    return result
  }
}

function slowFunction() {
  for (let i = 0; i < 10000000; i++) {} 
  return 'done'
}

const timedSlow = timed(slowFunction)
timedSlow()
