const SymbolToJSON = Symbol('toJSON')

// A custom type
class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  // We use our symbol to define a generic "convert to JSON-like" behavior
  [SymbolToJSON]() {
    return { x: this.x, y: this.y }
  }
}

// A generic function that checks if an object implements our concept
function serialize(obj) {
  if (typeof obj[SymbolToJSON] === 'function') {
    return JSON.stringify(obj[SymbolToJSON]())
  }
  throw new Error('Object does not implement SymbolToJSON')
}

const p = new Point(10, 20)
console.log(serialize(p)) // {"x":10,"y":20}
