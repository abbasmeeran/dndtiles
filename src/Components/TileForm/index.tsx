import React, { useState } from "react";
import { Message } from "../message";
import { XCircleIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";

type Props = {
  dialogRef: React.RefObject<HTMLDialogElement>;
  onSave: (m: Message) => void;
};

type Error = Record<"date" | "message", string>;

function TileForm({ dialogRef, onSave }: Props) {
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");

  const [error, setError] = useState<Error>();

  const onSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const messageObj = { message, date };
    if (!validate(messageObj)) {
      return;
    }
    onSave(messageObj);
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
    validate({ date, message, [name]: value });
  };

  const toggleDialog = (open: boolean) => {
    if (dialogRef.current) {
      if (!open) {
        setDate("");
        setMessage("");
        setError({} as Error);
      }
      open ? dialogRef.current.showModal() : dialogRef.current.close();
    }
  };

  const validate = function ({ date, message }: Message) {
    const error = {} as Error;
    if (!date) {
      error.date = "required";
    } else {
      if (!Date.parse(date)) error.date = "Date is not valid";
    }
    if (!message) {
      error.message = "required";
    }
    setError(error);
    return !Object.keys(error).length;
  };

  return (
    <dialog
      ref={dialogRef}
      className="mx-auto my-40 app-border rounded-md md:w-[40%] w-[100%]"
    >
      <div className="bg-violet-200 h-12 flex items-center p-2 ">
        <h1 className="font-bold text-lg flex-1">Add Tile</h1>
        <button className="flex-1 justify-items-end m-2">
          <XCircleIcon
            className="size-5 cursor-pointer text-violet-800"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              toggleDialog(false);
            }}
          />
        </button>
      </div>
      <form className=" my-auto m-2 flex flex-col">
        <div className="border-b-2 m-2 pb-2 flex flex-col ">
          <label className="mr-2 mb-2">Date</label>
          <input
            type="date"
            name="date"
            className={clsx("form-input", error?.date && "error")}
            value={date}
            onChange={onChange}
            required
          />
          {error?.date && <div className="error-message">{error?.date}</div>}
        </div>
        <div className="border-b-2 m-2 pb-2 flex flex-col">
          <label className="mr-2 mb-2">Message </label>
          <input
            type="text"
            name="message"
            className={clsx("form-input", error?.message && "error")}
            value={message}
            onChange={onChange}
            required
            maxLength={50}
          />
          {error?.message && (
            <div className="error-message">{error?.message}</div>
          )}
        </div>
        <div className="flex justify-end">
          <button onClick={onSaveClick} className="button w-20">
            Save
          </button>
          <button
            onClick={onCancel}
            className="button w-20 bg-purple-100 text-black"
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default TileForm;
