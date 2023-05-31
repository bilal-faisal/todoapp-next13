"use client";
import { BiSend } from "react-icons/bi";
import { useState } from "react";
import { useRouter } from "next/navigation";

async function addTodo(todo: { todo: string }) {
  try {
    let res = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Unexpected error has occured");
    }
  } catch (err) {
    console.log(err);
  }
}

const InputBar = () => {
  const { refresh } = useRouter();
  const [todo, setTodo] = useState({ todo: "" });
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await addTodo(todo);
        setTodo({ todo: "" });
        refresh();
      }}
    >
      <div className="flex items-center mb-4 w-fit mx-auto space-x-2">
        <input
          type="text"
          id="myInput"
          onChange={(e) => {
            setTodo({ todo: e.target.value });
          }}
          value={todo.todo}
          placeholder="type here..."
          className="bg-gray-300 py-1.5 pl-2 rounded-lg outline-gray-500"
        />
        <button className="rounded-full bg-blue-500 p-2">
          <BiSend className="text-white text-xl" />
        </button>
      </div>
    </form>
  );
};

export default InputBar;
