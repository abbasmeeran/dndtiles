import React, { useEffect, useState } from "react";
import { Message } from "../message";
import Tile, { TileData } from "../Tile";

type Props = {
  rows: number;
  cols: number;
  messages: Message[];
  onMove: (src: TileData, taget: TileData) => void;
};

function Grid({ rows = 3, cols = 4, messages, onMove }: Props) {
  return (
    <div>
      <div
        className="grid gap-2 !sm:grid-cols-1 !sm:grid-rows-1 border-2 m-10 p-3 border-slate-500"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {messages.map((message, i) => (
          <Tile value={message} index={i} onMove={onMove} />
        ))}
      </div>
    </div>
  );
}

export default Grid;
