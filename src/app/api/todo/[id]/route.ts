import { MyTodosTable, Todo, db } from '@/lib/drizzle';
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    let result;
    try {
        result = await db.delete(MyTodosTable).where(eq(MyTodosTable.id, Number(params.id)))
    } catch (err) {
        return NextResponse.json({ message: (err as { message: string }).message }, { status: 404 })
    }
    if (result.rowCount == 0) {
        return NextResponse.json({ message: `No task with id ${params.id} exists.` }, { status: 400 })
    }
    return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 })
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    let body = await req.json();
    let result;
    try {
        result = await db.update(MyTodosTable).set({ todos: body.todo }).where(eq(MyTodosTable.id, Number(params.id)))
    } catch (err) {
        return NextResponse.json({ message: (err as { message: string }).message }, { status: 404 })
    }
    if (result.rowCount == 0) {
        return NextResponse.json({ message: `No task with id ${params.id} exists.` }, { status: 400 })
    }
    return NextResponse.json({ message: "Task updated successfully" }, { status: 200 })
}