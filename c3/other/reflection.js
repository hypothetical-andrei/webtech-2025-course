// Create a proxy that adds methods like: find_by_name("Ana"), find_all_by_role("admin")
function createActiveRecord(list) {
  if (!Array.isArray(list)) throw new TypeError('Expected an array')

  return new Proxy(list, {
    get(target, prop, receiver) {
      if (typeof prop === 'string') {
        // match "find_by_field" or "find_all_by_field"
        const m1 = prop.match(/^find_by_(.+)$/)
        const m2 = prop.match(/^find_all_by_(.+)$/)

        if (m1) {
          const field = m1[1]
          return value => target.find(item => item[field] === value)
        }

        if (m2) {
          const field = m2[1]
          return value => target.filter(item => item[field] === value)
        }
      }

      // fall back to normal array behavior
      const value = Reflect.get(target, prop, receiver)
      return typeof value === 'function' ? value.bind(target) : value
    },

    set(target, prop, value, receiver) {
      return Reflect.set(target, prop, value, receiver)
    }
  })
}

// Example data
const users = createActiveRecord([
  { id: 1, name: 'Ana',  email: 'ana@example.com',  role: 'admin',  active: true },
  { id: 2, name: 'Mihai',email: 'mihai@example.com',role: 'editor', active: false },
  { id: 3, name: 'Ioana',email: 'ioana@example.com',role: 'admin',  active: true }
])

console.log(users.find_by_name('Mihai'))
// -> { id: 2, name: 'Mihai', ... }

console.log(users.find_all_by_role('admin'))
// -> [{ id: 1, ... }, { id: 3, ... }]

// Still an array
users.push({ id: 4, name: 'Radu', email: 'radu@example.com', role: 'viewer', active: true })
console.log(users.length)  // 4
