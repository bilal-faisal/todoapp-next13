import { db } from '@/lib/drizzle';
import { sql } from '@vercel/postgres';
import { MyTodosTable } from '@/db/schema/mytodos';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    let result;
    try {
        result = await db.select().from(MyTodosTable);
    } catch (err) {
        return NextResponse.json({ message: (err as { message: string }).message }, { status: 404 })
    }
    return NextResponse.json(result, { status: 200 })
}

export async function POST(req: NextRequest) {
    let body;
    let res;
    try {
        body = await req.json();
    } catch (err) {
        return NextResponse.json({ message: (err as { message: string }).message }, { status: 404 })
    }

    if (!body.todo) {
        return NextResponse.json({ message: "todo field is required" }, { status: 400 })
    }
    try {
        await sql`CREATE TABLE IF NOT EXISTS MyTodos(id SERIAL PRIMARY KEY, todos VARCHAR(255) NOT NULL)`;
        res = await db.insert(MyTodosTable).values({ todos: body.todo }).returning();
    } catch (err) {
        return NextResponse.json({ message: (err as { message: string }).message }, { status: 404 })
    }
    return NextResponse.json({ message: "Todo has been added Successfully", data: res }, { status: 200 })
}