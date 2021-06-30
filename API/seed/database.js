"use strict";

const Context = require("./context");

class Database {
  constructor(seedData, enableLogging) {
    this.players = seedData.players;
    this.enableLogging = enableLogging;
    this.context = new Context("fsjstd-restapi.db", enableLogging);
  }

  log(message) {
    if (this.enableLogging) {
      console.info(message);
    }
  }

  tableExists(tableName) {
    this.log(`Checking if the ${tableName} table exists...`);

    return this.context.retrieveValue(
      `
        SELECT EXISTS (
          SELECT 1 
          FROM sqlite_master 
          WHERE type = 'table' AND name = ?
        );
      `,
      tableName
    );
  }

  createPlayer(player) {
    return this.context.execute(
      `
        INSERT INTO Players
          (firstName, lastName, position, teamName, byeWeek, createdAt, updatedAt)
        VALUES
          (?, ?, ?, ?, ?, datetime('now'), datetime('now'));
      `,
      player.firstName,
      player.lastName,
      player.position,
      player.teamName,
      player.byeWeek
    );
  }

  async createPlayers(players) {
    for (const player of players) {
      await this.createPlayer(player);
    }
  }

  async init() {
    const playerTableExists = await this.tableExists("Players");

    if (playerTableExists) {
      this.log("Dropping the Players table...");

      await this.context.execute(`
        DROP TABLE IF EXISTS Players;
      `);
    }

    this.log("Creating the Players table...");

    await this.context.execute(`
      CREATE TABLE Players (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        firstName VARCHAR(255) NOT NULL DEFAULT '', 
        lastName VARCHAR(255) NOT NULL DEFAULT '', 
        position VARCHAR(255) NOT NULL DEFAULT '',  
        teamName VARCHAR(255) NOT NULL DEFAULT '', 
        byeWeek INTEGER NOT NULL,
        createdAt DATETIME NOT NULL,
        updatedAt DATETIME NOT NULL
        
      );
    `);

    this.log("Creating the user records...");

    await this.createPlayers(this.players);

    this.log("Database successfully initialized!");
  }
}

module.exports = Database;
