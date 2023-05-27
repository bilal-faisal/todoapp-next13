import {
    pgTable,
    serial,
    varchar,
} from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const MyTodosTable = pgTable("mytodos", {
    id: serial("id").primaryKey(),
    todos: varchar("todos", { length: 255 }).notNull()
})

export type Todo = InferModel<typeof MyTodosTable>;