function* counter() {
  console.log('Starting generator...')
  yield 1
  yield 2
  yield 3
  console.log('Generator finished')
}

const gen = counter()

console.log(gen.next()) // { value: 1, done: false }
console.log(gen.next()) // { value: 2, done: false }
console.log(gen.next()) // { value: 3, done: false }
console.log(gen.next()) // { value: undefined, done: true }
