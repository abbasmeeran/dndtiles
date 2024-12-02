import React, { useState } from "react";
import { Message } from "../message";

type Props = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  onSave: (m: Message) => void;
};

function TileForm({ dialogRef, onSave }: Props) {
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");

  const onSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSave({ message, date });
    toggleDialog(false);
  };

  const onCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleDialog(false);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "message") {
      setMessage(value);
    } else if (name === "date") {
      setDate(value);
    }
  };

  const toggleDialog = (open: boolean) => {
    if (dialogRef.current) {
      if (!open) {
        setDate("");
        setMessage("");
      }
      open ? dialogRef.current.showModal() : dialogRef.current.close();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="mx-auto my-40 border-2 border-zinc-700 rounded-md w-[30%] "
    >
      <div className="bg-sky-200 h-10 flex items-center p-2">
        <h1 className="font-bold">Add Tile</h1>
        <button
          className="flex-1 flex justify-end m-2"
          onClick={() => toggleDialog(false)}
        >
          x
        </button>
      </div>
      <form className=" my-auto m-2">
        <div className="border-b-2 m-2 pb-2 flex items-center">
          <label className="mr-2 flex-1">Date</label>
          <input
            type="date"
            name="date"
            className="px-2 h-10 flex-[60%]"
            value={date}
            onChange={onChange}
            required
          />
        </div>
        <div className="border-b-2 m-2 pb-2 flex items-center">
          <label className="mr-2 flex-1">Message </label>
          <input
            type="text"
            name="message"
            className="px-2 h-10 flex-[60%] border-2 rounded-md"
            value={message}
            onChange={onChange}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onSaveClick}
            className="bg-sky-500 p-1 rounded-md font-medium m-2 w-20"
          >
            Save
          </button>
          <button
            onClick={onCancel}
            className="bg-sky-500 p-1 rounded-md font-medium m-2 w-20"
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default TileForm;
