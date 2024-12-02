import { useEffect, useRef, useState } from "react";
import { getMessages, Message, orderMessagesByDate } from "../message";
import Grid from "../Grid";
import TileForm from "../TileForm";
import { TileData } from "../Tile";

type Props = {
  rows: number;
  cols: number;
};

function Container({ rows = 3, cols = 3 }: Props) {
  const [messages, setMessages] = useState<Message[]>(getMessages());
  const [tiles, setTiles] = useState<Message[]>([]);

  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setTiles(messages);
  }, [messages]);

  const toggleDialog = (open: boolean) => {
    if (dialogRef.current) {
      open ? dialogRef.current.showModal() : dialogRef.current.close();
    }
  };

  const orderMessages = () => {
    setTiles(orderMessagesByDate(messages));
  };

  const reset = () => {
    setTiles(messages);
  };

  const addTile = () => {
    toggleDialog(true);
  };

  const onSave = (m: Message) => {
    setMessages((messages) => {
      return [...messages, m];
    });
  };

  const onMove = (src: TileData, target: TileData) => {
    const newMessages = [...tiles];
    newMessages.splice(src.index, 1);
    src.message && newMessages.splice(target.index, 0, src.message);
    setTiles(newMessages);
  };

  return (
    <div className="m-2">
      <h1 className="text-3xl font-bold underline mb-3 flex justify-center">
        Draggable Tiles
      </h1>
      <div className="">
        <button id="init" onClick={reset} className="button">
          Iniital Order
        </button>
        <button id="order" onClick={orderMessages} className="button">
          Sorted Order
        </button>
        <button id="order" onClick={addTile} className="button">
          Add
        </button>
      </div>

      {tiles.length && (
        <Grid messages={tiles} rows={rows} cols={cols} onMove={onMove} />
      )}
      <TileForm dialogRef={dialogRef} onSave={onSave} />
    </div>
  );
}

export default Container;
