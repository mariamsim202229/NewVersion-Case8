const fs = require("fs");

const MOVIES_DB_PATH = "data/movies.json";
const USERS_DB_PATH = "data/users.json";
const BOOKINGS_DB_PATH = "data/bookings.json";

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


function getBookingsFromDB() {
    const dbData = fs.readFileSync(BOOKINGS_DB_PATH, { encoding: "utf-8" });
    return JSON.parse(dbData);
}

function setBookingsFromDB(data) {
    const str = JSON.stringify(data);
    fs.writeFileSync(BOOKINGS_DB_PATH, str);
}

export { getDatabase, setDatabase, getUsersFromDB, setUsersFromDB, getBookingsFromDB, setBookingsFromDB};