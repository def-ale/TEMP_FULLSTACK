import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function abrirBd() {
  return open({
    filename: './database.sqlite',
    driver: sqlite3.Database
  })
}

async function inicializarBd() {
  const db = await abrirBd();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS produto (
      id TEXT PRIMARY KEY,
      nome TEXT NOT NULL,
      codigo INTEGER NOT NULL UNIQUE,
      preco REAL NOT NULL
    )
  `);
}

inicializarBd();
