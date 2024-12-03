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
        className="flex flex-col gap-2 md:grid  mt-5 m-2 p-3 rounded-md app-border"
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
