import {
    pgTable,
    serial,
    varchar,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { InferModel } from "drizzle-orm";
import { sql } from "@vercel/postgres";

export const MyTodosTable = pgTable("mytodos", {
    id: serial("id").primaryKey(),
    todos: varchar("todos", { length: 255 }).notNull()
})

export type Todo = InferModel<typeof MyTodosTable>;

export const db = drizzle(sql);