# Samnage-API

A (currently thin) class for interacting with the Samanage API

## Usage

### Search or Get
``` ecmascript 6

const samanage = new Samanage(YOUR_API_KEY. '2.1', 'json')
// Get a list of users
const users = await samanage.get('users', { per_page: 10, page: 2 })
console.log(users.data)

// Get a specific user
const user = await samanage.get('users', { id: 123456  })
console.log(user)

// Search for a user
const user = await samanage.get('users', { name: '*John*' }
console.log(user)
```

## TODO:
- Provide functions for specific endpoints.
- Finish writing examples
