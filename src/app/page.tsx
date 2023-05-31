import InputBar from "@/components/InputBar";
import Todos from "@/components/Todos";

const Home = async () => {
  return (
    <div className="h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex justify-center items-center">
      <div className="w-full m-10 md:w-1/4 h-2/3 bg-white rounded-lg relative">
        {/* @ts-ignore */}
        <Todos />
        <div className="absolute bottom-3 w-full">
          <InputBar />
          <div className="h-1.5 w-1/3 mx-auto rounded-md bg-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
