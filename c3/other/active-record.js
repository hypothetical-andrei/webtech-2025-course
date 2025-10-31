// Helper: split "NameAndAge" -> ["name", "age"]
function parseFields(methodName, prefix) {
  const body = methodName.slice(prefix.length)
  if (!body) throw new Error(`No fields in ${methodName}`)
  return body.split('And').map(p => p[0].toLowerCase() + p.slice(1))
}

function createActiveRecord(list) {
  if (!Array.isArray(list)) throw new TypeError('Expected an array')

  return new Proxy(list, {
    get(target, prop, receiver) {
      // 1) Dynamic finders: findByXxx[AndYyy...], findAllByXxx[AndYyy...]
      if (typeof prop === 'string' && (prop.startsWith('findBy') || prop.startsWith('findAllBy'))) {
        const isAll = prop.startsWith('findAllBy')
        const fields = parseFields(prop, isAll ? 'findAllBy' : 'findBy')

        return (...args) => {
          if (args.length !== fields.length) {
            throw new Error(`Expected ${fields.length} argument(s): ${fields.join(', ')}`)
          }
          const matches = obj => fields.every((f, i) => obj[f] === args[i])
          return isAll ? target.filter(matches) : target.find(matches)
        }
      }

      // 2) Preserve normal array behavior (length, [i], push, map, etc.)
      const value = Reflect.get(target, prop, receiver)

      // If it's a function (like push/map), bind "this" to the array
      if (typeof value === 'function') {
        return value.bind(target)
      }

      return value
    },

    // Optional: write operations go through Reflect too
    set(target, prop, value, receiver) {
      return Reflect.set(target, prop, value, receiver)
    }
  })
}

// ===== Example usage =====
const users = createActiveRecord([
  { id: 1, name: 'Ana',  email: 'ana@example.com',  role: 'admin',  active: true },
  { id: 2, name: 'Mihai',email: 'mihai@example.com',role: 'editor', active: false },
  { id: 3, name: 'Ioana',email: 'ioana@example.com',role: 'admin',  active: true }
])

console.log(users.findByEmail('mihai@example.com'))
// -> { id: 2, name: 'Mihai', email: 'mihai@example.com', role: 'editor', active: false }

console.log(users.findAllByRoleAndActive('admin', true))
// -> [
//      { id: 1, name: 'Ana', ... },
//      { id: 3, name: 'Ioana', ... }
//    ]

// Still behaves like a normal array:
users.push({ id: 4, name: 'Radu', email: 'radu@example.com', role: 'viewer', active: true })
console.log(users.length)      // 4
console.log(users[0].name)     // "Ana"
