const db = require("../db/connection");

db.serialize(() => {

    db.run(`
        CREATE TABLE IF NOT EXISTS teams (
            id INTEGER PRIMARY KEY,
            teamName TEXT NOT NULL,
            continentName TEXT NOT NULL,
            rankingFifa INTEGER NOT NULL,
            worldCupGroup TEXT NOT NULL
        )
    `);

});

console.log("Table created");