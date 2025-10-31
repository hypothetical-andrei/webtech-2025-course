const id = Symbol('id')
const user = {
  name: 'Alice',
  age: 25,
  [id]: 12345
}

console.log(user.name)   // Alice
console.log(user[id])    // 12345

// Symbols are not shown in normal property enumeration:
console.log(Object.keys(user)) // [ 'name', 'age' ]
console.log(Object.getOwnPropertySymbols(user)) // [ Symbol(id) ]
