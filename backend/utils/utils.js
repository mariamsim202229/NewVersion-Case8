const fs = require("fs");

const MOVIES_DB_PATH = "db/movies.json";
const USERS_DB_PATH = "db/users.json";

function getDatabase() {
    const dbData = fs.readFileSync(MOVIES_DB_PATH, { encoding: "utf-8" });
    return JSON.parse(dbData);
}

function setDatabase(data) {
    const str = JSON.stringify(data);
    fs.writeFileSync(MOVIES_DB_PATH, str);
}

function getUsersFromDB() {
    const dbData = fs.readFileSync(USERS_DB_PATH, { encoding: "utf-8" });
    return JSON.parse(dbData);
}

function setUsersFromDB(data) {
    const str = JSON.stringify(data);
    fs.writeFileSync(USERS_DB_PATH, str);
}

export { getDatabase, setDatabase, getUsersFromDB, setUsersFromDB};