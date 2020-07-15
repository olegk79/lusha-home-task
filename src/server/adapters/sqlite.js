const Database = require('sqlite-async');
const dbPath = "./src/server/db/lusha_home_task.db";

module.exports = class SqliteAdapter {

    constructor() {
        this._db = null;
    }

    async getUsersPage(start,limit) {
        try {
            await this._openDb();
            return await this._db.all(`select first_name,last_name,email,description from users order by email limit ${limit} offset ${start}`);
        }
        catch(error) {
            throw Error('cannot get all users');
        }
    }

    async getAllUsers() {
        try {
            await this._openDb();
            return await this._db.all('select first_name,last_name,email,description from users order by email');
        }
        catch(error) {
            throw Error('cannot get all users');
        }
    }

    async addNewUser({first_name, last_name, email, password, description}) {
        let res = {
            success: false,
            emailExists: false,
            error: null
        };
        try {
            await this._openDb();
            await this._db.run(`insert into users values('${email}','${first_name}','${last_name}','${password}','${description}')`);
            res.success = true;
        }
        catch(error) {
            if(error.errno===19 && error.code==='SQLITE_CONSTRAINT') {
                res.emailExists = true;
            } 
            res.error = error.message;   
        }
        return res;

    }

    // open DB
    async _openDb() {

        try {
            this._db = await Database.open(dbPath);
        } catch (error) {
            throw Error('can not access sqlite database');
        }      
    }
 
    // *** just for convenience
    async cleanDb() {
        try {
            await this._openDb();
            let res = await this._db.run(`delete from users`);
        }
        catch(error) {
            throw Error('can not delete users');
        }
    }
}