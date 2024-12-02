import React from "react";
import { Message } from "../message";

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

  const onDrag: any = (e: React.MouseEvent) => {};

  const handleDrop = (e: React.DragEvent) => {
    const eventData = e.dataTransfer.getData("text/json");
    const draggedTile = JSON.parse(eventData) as TileData;
    const currentTile = { message: value, index };
    console.log(draggedTile, currentTile);
    onMove(draggedTile, currentTile);
  };

  const onDragStart = (e: React.DragEvent<HTMLElement>) => {
    e.dataTransfer.setData(
      "text/json",
      JSON.stringify({ message: value, index })
    );
  };

  return (
    <div
      draggable
      className="border-2 border-stone-700 rounded-lg flex flex-col justify-center h-16"
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="ml-2">
        {date}
        {` (${index})`}
      </div>
      <div className="flex justify-center">{message}</div>
    </div>
  );
}

export default Tile;
