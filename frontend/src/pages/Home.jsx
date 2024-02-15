import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewType, setViewType] = useState("table");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://mern-book-store-8b4b.onrender.com/books")
      .then((res) => {
        setBooks(res.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-center items-center gap-x-4">
        <button
          className="bg-sky-300 hover:bg-sky-400 px-4 py-1 rounded-lg"
          onClick={() => {
            setViewType("table");
          }}
        >
          Table
        </button>
        <button
          className="bg-sky-300 hover:bg-sky-400 px-4 py-1 rounded-lg"
          onClick={() => {
            setViewType("card");
          }}
        >
          Card
        </button>
      </div>
      <div className="flex justify-between items-center shadow-xl px-4 my-6 rounded-xl bg-slate-100">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {isLoading ? (
        <Spinner />
      ) : viewType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
