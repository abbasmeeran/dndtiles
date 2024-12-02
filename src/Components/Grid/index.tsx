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
        className="gap-2 hidden md:grid border-2 m-10 p-3 border-slate-500"
        style={{
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}
      >
        {messages.map((message, i) => (
          <Tile value={message} index={i} onMove={onMove} />
        ))}
      </div>
      <div className="sm:grid md:hidden grid-cols-1 border-2 m-10 p-3 border-slate-500 gap-3">
        {messages.map((message, i) => (
          <Tile value={message} index={i} onMove={onMove} />
        ))}
      </div>
    </div>
  );
}

export default Grid;
