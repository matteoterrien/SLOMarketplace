import React, { FC, useState, useId, useActionState } from "react";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft } from "@fortawesome/free-solid-svg-icons";

interface AddItemPageProps {
  darkmode: boolean;
  authToken: string | null;
}

const AddItemPage: FC<AddItemPageProps> = (props) => {
  const navigate = useNavigate();
  const redirectPage = (): void => {
    navigate("/");
  };

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);
  const fileInputId: string = useId();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function readAsDataURL(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const fr: FileReader = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = (err) => reject(err);
      fr.readAsDataURL(file);
    });
  }

  const [result, submitAction, isPending] = useActionState(
    async (
      previousState: { type: string; message: string } | null,
      formData: FormData
    ) => {
      const file = selectedFile;
      const titleTrimmed = title.trim();
      const priceTrimmed = price.trim();
      const descriptionTrimmed = description.trim();
      const categories = ["All"];

      if (!file || !titleTrimmed || !priceTrimmed || !descriptionTrimmed) {
        console.log("Missing required fields!");
        return {
          type: "error",
          message: "Please provide an image, title, price, and description.",
        };
      }

      try {
        const uploadData = new FormData();
        uploadData.append("image", file);
        uploadData.append("title", titleTrimmed);
        uploadData.append("price", priceTrimmed);
        uploadData.append("details", descriptionTrimmed);
        uploadData.append("categirues", JSON.stringify(categories));

        const response = await fetch("/api/items", {
          method: "POST",
          body: uploadData,
          headers: {
            Authorization: props.authToken ? `Bearer ${props.authToken}` : "",
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
          return { type: "error", message: "Upload failed. Please try again." };
        }

        return { type: "success", message: "Item uploaded successfully!" };
      } catch (error) {
        return { type: "error", message: "Network error. Please try again." };
      }
    },
    null
  );

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    const fileList = event.target.files;
    if (fileList && fileList[0]) {
      const file = fileList[0];
      setSelectedFile(file);
      try {
        const dataURL = await readAsDataURL(file);
        setPreviewSrc(dataURL as string);
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
          <label htmlFor={fileInputId} className="text-xl mb-2">
            Upload image:
          </label>
          <input
            id={fileInputId}
            name="file"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isPending}
            className="border-2 ml-2 rounded-lg p-1 hover:bg-neutral-300 active:bg-neutral-500"
          />
        </div>

        <div className="self-center">
          {previewSrc && (
            <img
              style={{ maxWidth: "20em", maxHeight: "40em" }}
              src={previewSrc}
              alt="Preview"
            />
          )}
        </div>

        {result && <p className={`message ${result.type}`}>{result.message}</p>}

        <div className="flex flex-row gap-2 items-center">
          <label className="text-xl">Title:</label>
          <input
            name="title"
            placeholder="really cool item!"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPending}
            className="w-full border-2 ml-2 rounded-lg p-1"
          />
        </div>

        <div className="flex flex-row gap-2 items-center">
          <label className="text-xl">Price</label>
          <input
            name="Price"
            placeholder="$$$"
            type="text"
            onChange={(e) => setPrice(e.target.value)}
            disabled={isPending}
            className="w-20 border-2 ml-2 rounded-lg p-1"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-xl">Description:</label>
          <textarea
            name="Description"
            placeholder="a description of the great item you would like to hand over to someone else!"
            onChange={(e) => setDescription(e.target.value)}
            disabled={isPending}
            className="w-full px-3 my-1 text-pretty border-2 mx-2 rounded-lg p-2"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-[var(--color-accent0)] hover:bg-green-900 active:bg-green950 text-white p3 m2 w-fit self-center rounded-lg p-3"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
