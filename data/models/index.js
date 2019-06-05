// Initiate database connection
const db = require('../dbConfig')

// ==== Global Database Methods ==== //
async function find(table) {
  try {
    let data = await db(table).orderBy('id')
    return data
  }
  catch (err) {
    return err
  }
}

async function findById(id, table) {
  try {
    let data = await db(table)
      .where({ id: Number(id) })
      .first()
    return data
  }
  catch (err) {
    return err
  }
}

async function insert(data, table) {
  try {
    let newRecordId = await db(table).insert(data, 'id')
    let newRecord = await findById(newRecordId)
    return newRecord
  }
  catch (err) {
    return err
  }
}

async function update(id, data, table) {
  try {
    let updateCount = await db(table)
      .where({ id }).update(data)
    if (updateCount > 0) {
      let updatedRecord = await findById(id)
      return updatedRecord
    } else throw err
  }
  catch (err) {
    return err
  }
}

async function remove(id, table) {
  try {
    let deleteCount = await db(table)
      .where({ id }).del()
    if (deleteCount > 0) {
      return {
        message: `${deleteCount} ${updateCount > 1 ?
          'records' : 'record'} deleted`
      }
    } else throw err
  }
  catch (err) {
    return err
  }  
}

module.exports = {
  db,
  find,
  findById,
  insert,
  update,
  remove
}