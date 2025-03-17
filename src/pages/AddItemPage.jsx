import React, { useState, useId, useActionState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

function AddItemPage(props) {
  const navigate = useNavigate();
  const redirectPage = () => {
    navigate("/");
  };

  const [previewSrc, setPreviewSrc] = useState(null);
  const fileInputId = useId();
  const [selectedFile, setSelectedFile] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  function readAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = (err) => reject(err);
      fr.readAsDataURL(file);
    });
  }

  const [result, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const file = formData.get("image");

      if (!file || !title) {
        console.log("Missing file!");
        return {
          type: "error",
          message: "Click here to provide an image",
        };
      }

      try {
        const uploadData = new FormData();
        uploadData.append("image", file);
        uploadData.append("title", title);

        console.log(
          "Form Data:",
          uploadData.get("image"),
          uploadData.get("title")
        );
        console.log("Auth Token:", authToken);

        const response = await fetch("/api/images", {
          method: "POST",
          body: uploadData,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          if (response.status === 400) {
            console.log("400 Bad Request - Check file format.");
            return {
              type: "error",
              message: "Bad upload request. Check file format.",
            };
          }
          if (response.status === 401) {
            console.log("401 Unauthorized - Missing or invalid token.");
            return {
              type: "error",
              message: "Unauthorized. Please log in again.",
            };
          }
          return {
            type: "error",
            message: "Upload failed. Please try again.",
          };
        }

        return { type: "success", message: "Image uploaded successfully!" };
      } catch (error) {
        return { type: "error", message: "Network error. Please try again." };
      }
    }
  );

  async function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      try {
        const dataURL = await readAsDataURL(file);
        setPreviewSrc(dataURL);
      } catch (error) {
        console.error("Error reading file:", error);
      }
    }
  }

  return (
    <div
      className={`flex flex-col items-center
        ${
          props.darkmode
            ? "bg-neutral-800 text-neutral-200"
            : "bg-white text-black"
        }`}
    >
      <button
        className="bg-stone-300 hover:bg-stone-400 active:bg-stone-500 flex gap-1 items-center w-fit px-4 py-2 rounded-xl absolute top-26 left-4 text-black"
        onClick={redirectPage}
      >
        <FontAwesomeIcon icon={faCaretLeft} />
        Back
      </button>

      <h2 className="text-3xl font-bold my-5">New Post</h2>

      <form
        action={submitAction}
        className="flex flex-col place-content-center gap-3 mx-6 w-1/2 md:w-1/3 border-2 p-3 rounded-xl"
      >
        <div className="flex flex-col">
          <label htmlFor={fileInputId}>Upload image: </label>
          <input
            id={fileInputId}
            name="file"
            type="file"
            accept="image/*"
            onChange={(e) => {
              handleFileChange(e);
            }}
            disabled={isPending}
          />
        </div>

        <div className="self-center">
          {previewSrc && (
            <img style={{ maxWidth: "20em" }} src={previewSrc} alt="Preview" />
          )}
        </div>

        {result && <p className={`message ${result.type}`}>{result.message}</p>}

        <div className="flex flex-row gap-2">
          <label className="text-2xl font-bold">Title:</label>
          <input
            name="title"
            placeholder="really cool item!"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            disabled={isPending}
          />
        </div>

        <div className="flex flex-row gap-2">
          <label className="text-xl font-bold">Price</label>
          <input
            name="Price"
            placeholder="$$$"
            type="text"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            disabled={isPending}
            className="w-20"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-xl">Description:</label>
          <textarea
            name="Description"
            placeholder="a description of the great item you would like to hand over to someone else!"
            type="paragraph"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            disabled={isPending}
            className="w-full px-3 my-1 text-pretty"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-[var(--color-accent0)] hover:bg-green-900 active:bg-green-950 text-white p-3 m-2 w-fit self-center rounded-lg"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}

export default AddItemPage;
