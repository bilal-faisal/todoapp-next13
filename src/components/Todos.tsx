import { Todo } from "@/db/schema/mytodos";
import { GoPrimitiveDot } from "react-icons/go";


async function getData() {
  try {
    let res = await fetch("http://localhost:3000/api/todo", {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new Error("Unexpected error has occured");
    }
    return res.json();
  } catch (err) {
    console.log(err);
  }
}

const Todos = async () => {
  let data: Todo[] = await getData();
  return (
    <div className="w-full p-5 h-[80%] overflow-y-scroll">
      {data.reverse().map((item) => {
        return (
          <div className="bg-gray-200 my-1 rounded-md p-2 flex items-center">
            <GoPrimitiveDot className="text-blue-500" />
            <span className="pl-2">{item.todos}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Todos;
