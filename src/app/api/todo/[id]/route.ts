import { db } from '@vercel/postgres';
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const client = await db.connect();
    let result;
    try {
        result = await client.sql`DELETE FROM MyTodos WHERE id=${Number(params.id)}`;
    } catch (err) {
        return NextResponse.json({ message: (err as { message: string }).message }, { status: 404 })
    }
    if (result.rowCount == 0) {
        return NextResponse.json({ message: `No task with id ${params.id} exists.` }, { status: 400 })
    }
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const client = await db.connect();
    let body = await req.json();
    let result;
    try {
        result = await client.sql`UPDATE MyTodos SET todos=${body.todo} WHERE id=${Number(params.id)}`;
    } catch (err) {
        return NextResponse.json({ message: (err as { message: string }).message }, { status: 404 })
    }
    if (result.rowCount == 0) {
        return NextResponse.json({ message: `No task with id ${params.id} exists.` }, { status: 400 })
    }
    return NextResponse.json({ message: "Task updated successfully" }, { status: 200 })
}