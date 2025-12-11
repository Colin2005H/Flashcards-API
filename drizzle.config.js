import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    schema: './src/db/schema.js',
    dialect: 'sqlite',
    dbCredentials: {
        url: process.env.DB_FILE
    }
})