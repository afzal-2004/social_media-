import { useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Appcontext } from "../Context/Appcontext";
import { BackendUrl, token } from "../assets/constant";

export const Form = () => {
  const { Cardid, update, data, setdata, File, setFile, FetchAllMypost } =
    useContext(Appcontext);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleData = (e) => {
    setdata({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendData = async (e) => {
    e.preventDefault();

    console.log(File);
    const formdata = new FormData();
    formdata.append("File", File);
    formdata.append("Creator", data.Creator);
    formdata.append("Title", data.Title);
    formdata.append("Message", data.Message);
    formdata.append("tags", data.tags);

    if (!update) {
      try {
        await axios
          .post(`${BackendUrl}/memories/senddata`, formdata, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(async (res) => {
            console.log(res);

            await FetchAllMypost();
          })
          .catch((err) => console.log(err));
        setdata({
          Creator: "",
          Title: "",
          Message: "",
        });
        setFile(null);
        toast.success("  Succefully Post Your Data  ");
      } catch (error) {
        console.log(error);
        toast.error("All Field Are  Required");
      }
    } else {
      try {
        await axios
          .put(`${BackendUrl}/memories/updatedata/` + Cardid, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log("My Updated data is ", res);
            console.log(res.data);
            toast.success("Data Updated Succefully ");
            FetchAllMypost();
          });
      } catch (error) {
        toast.error("someThing Wrong");
        console.log(error);
      }
    }
  };
  const clearData = () => {
    setdata({
      Creator: "",
      Title: "",
      Message: "",
      tags: "",
      File: null,
    });
  };
  return (
    <div className=" Formmain rounded-lg ">
      <h1 className="text-[20px]  text-center font-semibold">
        {update ? "Update" : "Creating"} memory
      </h1>
      <form
        action="Sumbit"
        onSubmit={handleSendData}
        className=" flex flex-col  "
      >
        <input
          type="text "
          placeholder="Creator"
          name="Creator"
          value={data.Creator}
          onChange={handleData}
        />
        <input
          type="text "
          placeholder="Title"
          name="Title"
          value={data.Title}
          onChange={handleData}
        />
        <textarea
          className=" outline-none border border-black mt-4 p-2 rounded-lg "
          maxLength={"300"}
          placeholder="Message"
          value={data.Message}
          name="Message"
          onChange={handleData}
        />

        <input type="file" name="Filepath" onChange={handleFileChange} />
        <button
          type="sumbit"
          disabled={!token}
          className={token ? "bg-blue-500" : "bg-blue-300 cursor-not-allowed"}
        >
          {update ? "Update" : "Post"}
        </button>
        <button className=" bg-red-500 " onClick={clearData}>
          Clear
        </button>
      </form>
    </div>
  );
};
