import React from "react";
import { Message } from "../message";
import { BeakerIcon, EnvelopeIcon } from "@heroicons/react/16/solid";

export type TileData = {
  message?: Message;
  index: number;
};
type Props = {
  value?: Message;
  index: number;
  onMove: (src: TileData, taget: TileData) => void;
};

function Tile({ value, index, onMove }: Props) {
  const { message, date } = value || {};

  const onDrag: any = () => {};

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    const eventData = e.dataTransfer.getData("text/json");
    const draggedTile = JSON.parse(eventData) as TileData;
    const currentTile = { message: value, index };
    console.log(draggedTile, currentTile);
    onMove(draggedTile, currentTile);
    e.currentTarget.style.background = "var(--tile-bg-color)";
  };

  function dragoverHandler(e: React.DragEvent<HTMLElement>) {
    e.preventDefault();
    e.currentTarget.style.background = "var(--drop-color)";
  }

  const onDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.currentTarget.style.border = "dashed";
    e.dataTransfer.setData(
      "text/json",
      JSON.stringify({ message: value, index })
    );
  };

  function onDragEnd(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.border = "solid var(--tile-border-color)";
  }

  function onDragLeave(e: React.DragEvent<HTMLElement>) {
    e.currentTarget.style.background = "var(--tile-bg-color)";
  }

  return (
    <div
      draggable
      className="tile"
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDrop={handleDrop}
      onDragOver={dragoverHandler}
      onDragEnd={onDragEnd}
      onDragLeave={onDragLeave}
    >
      <div className="ml-2 flex justify-start">
        <EnvelopeIcon className="size-3 text-blue-950 mr-2 text-wrap self-center" />
        <div>{date}</div>
      </div>
      <div className="flex justify-center text-wrap">{message}</div>
    </div>
  );
}

export default Tile;
