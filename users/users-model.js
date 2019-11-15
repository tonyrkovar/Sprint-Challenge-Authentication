const db = require('../database/dbConfig')

function find() {
    return db('users').select('username', 'id')
}

function findBy(filter) {
    return db('users').where(filter)
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids
            return findBy(id)
        })
}

module.exports = {
    add,
    find,
    findBy
}