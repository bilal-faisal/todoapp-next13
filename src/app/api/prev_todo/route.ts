import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const client = await db.connect();
    let result;
    try {
        result = await client.sql`SELECT * FROM MyTodos`;
    } catch (err) {
        return NextResponse.json({ message: (err as { message: string }).message }, { status: 404 })
    }
    return NextResponse.json(result.rows, { status: 200 })
}

export async function POST(req: NextRequest) {
    const client = await db.connect();
    let body = await req.json();
    try {
        await client.sql`CREATE TABLE IF NOT EXISTS MyTodos(id SERIAL PRIMARY KEY, todos VARCHAR(255) NOT NULL)`;
        await client.sql`INSERT INTO MyTodos(todos) values (${body.todo})`;
    } catch (err) {
        return NextResponse.json({ message: (err as { message: string }).message }, { status: 404 })
    }
    return NextResponse.json({ message: "Todo has been added Successfully" }, { status: 200 })
}