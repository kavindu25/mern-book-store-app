import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const {enqueueSnackbar} = useSnackbar();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://mern-book-store-8b4b.onrender.com/books/${id}`)
      .then((res) => {
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setTitle(res.data.title);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        alert("Error occured! Please check console.");
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const bookData = {
      title,
      author,
      publishYear,
    };
    setIsLoading(true);
    axios
      .put(`https://mern-book-store-8b4b.onrender.com/books/${id}`, bookData)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar('Book Updated Successfully!', {variant: 'success'});
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        // alert("Error occured! Please check console.");
        enqueueSnackbar('Error Occured!', {variant: 'error'});
        console.log(error);
      });
  };
  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {isLoading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full rounded-lg"
          />
        </div>
        <button
          className="p-2 bg-sky-300 m-8 hover:bg-sky-400 rounded-lg"
          onClick={handleEditBook}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default EditBook;
