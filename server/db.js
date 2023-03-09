const path = require('path')
const bcrypt = require('bcryptjs');

//location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

//Create connection to db
const knex = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: dbPath,
    },
    useNullAsDefault: true
})

// USERS TABLE -------------------------------------
// Create table in the db
const adminPw = "asdf"
knex.schema
    // check if table exists
    .hasTable('users')
        .then((exists) => {
            if(!exists) {
                //if no rsrvtn table exists, create new cols with id as primary
                //increment id w/ every new record
                return knex.schema.createTable('users', (table) => {
                    table.increments('id').primary()
                    table.string('name').notNullable().unique()
                    table.string('email').notNullable().unique()
                    table.integer('phone', 10)
                    table.string('password').notNullable()
                    table.string('userID').notNullable().unique()
                    table.string('backgroundColor')
                    table.string('borderColor')
                    table.string('textColor')
                    table.integer('verified', 1).notNullable()
                    table.string('confirmationCode').notNullable()
                })
                .then(() => {
                    console.log('Table \'users\' created')
                    return knex('users').insert([
                        {name: "admin", email: 'admin@cedarfalls.cc', phone: '555-555-5555', password: bcrypt.hash(adminPw, 12), backgroundColor: 'purple', borderColor: 'black', textColor: 'white', verified: 1, confirmationCode: 'pre-verified'},
                    ]);
                })
                .catch((error) => {
                    console.error(`There was an error creating the table: ${error}`)
                })
            }
        })
        .then(() => {
            //Log success message
            console.log('database success')
        })
        .catch((error) => {
            console.error(`There was an error setting up the database: ${error}`)
        })

//debugging - loga data
knex.select('*').from('users')
    .then(data => console.log('user data:', data[0]))
    .catch(err => console.log(err))
// USERS TABLE ------------------------------------


// RESERVATION TABLE ------------------------------
// Create table in the db
knex.schema
    // check if table exists
    .hasTable('reservation')
        .then((exists) => {
            if(!exists) {
                //if no rsrvtn table exists, create new cols with id as primary
                //increment id w/ every new record
                return knex.schema.createTable('reservation', (table) => {
                    table.increments('id').primary()
                    table.string('title')
                    table.string('author')
                    table.string('start')
                    table.string('end')
                    table.string('description')
                    table.string('backgroundColor')
                    table.string('borderColor')
                    table.string('textColor')
                    table.string('room')
                    table.integer('boyBunkBeds')
                    table.integer('girlBunkBeds')
                })
                .then(() => {
                    console.log('Table \'reservation\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating the table: ${error}`)
                })
            }
        })
        .then(() => {
            //Log success message
            console.log('database success')
        })
        .catch((error) => {
            console.error(`There was an error setting up the database: ${error}`)
        })

//debugging - loga data
knex.select('*').from('reservation')
    .then(data => console.log('reservation data:', data[0]))
    .catch(err => console.log(err))
// RESERVATION TABLE -------------------------------


// ROOM AVAILABILITY TABLE ------------------------
/*
knex.schema
    hasTable('availability')
        .then((exists) => {
            if(!exists) {
                return knex.schema.createTable('availability', (table) => {
                    table.increments('id').primary()
                    table.string('date')
                    table.string('author')
                    table.string('title')


                })
                .then(() => {
                    console.log('Table \'availability\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating the table: ${error}`)
                })
            }
        })
        .then(() => {
            console.log('database success')
        })
        .catch((error) => {
            console.log(`There was an error setting up the database: ${error}`)
        })
knex.select('*').from('availability')
    .then(data => console.log('reservation data:', data[0]))
    .catch(err => console.log(err))
*/
// ROOM AVAILABILITY TABLE ------------------------

// MESSAGES TABLE -------------------------------
//Create table in the db 
knex.schema
    //make sure no such table exists before creating one
    .hasTable('messages')
        .then((exists) => {
            if(!exists) {
                //if no mssgs table exists, create new cols with id as primary
                //incrementing id w/ every new record
                return knex.schema.createTable('messages', (table) => {
                    table.increments('id').primary()
                    table.string('author')
                    table.string('mssg')
                })
                .then(() => {
                    console.log('Table \'messages\' created')
                })
                .catch((error) => {
                    console.error(`There was an error creating the table: ${error}`)
                })
            }
        })
        .then(() => {
            //Log success message
            console.log('database success')
        })
        .catch((error) => {
            console.error(`There was an error setting up the database: ${error}`)
        })

//debugging - log all data
knex.select('*').from('messages')
    .then(data => console.log('messages data:', data[0]))
    .catch(err => console.log(err))
// MESSAGES TABLE ------------------------------------------

/*IMAGES TABLE ---------------------------------------------
knex.schema
    .hasTable('images')
        .then((exists) => {
            if(!exists) {
                return knex.schema.createTable('images', (table) => {
                    table.increments('id').primary()
                    table.string('userID').notNullable().unique()
                    table.string("filename").unique().notNullable()
                    table.string("filepath").notNullable()
                    table.string("mimetype").notNullable()
                    table.bigInteger("size").notNullable()
                })
                .then(() => {
                    console.log('Table \'images\' created')
                    return knex('users').insert([
                        {userID: '1', filename: "default", filepath: "public/images/default", mimetype: "image/png", size: 118719}
                    ]);
                })
                .catch((error) => {
                    console.log(error(`There was an error creating the table: ${error}`))
                })
            }
        })
//IMAGES TABLE ---------------------------------------------
*/
module.exports = knex