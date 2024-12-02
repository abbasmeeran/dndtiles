export type Message = Record<"date" | "message", string>;

export type MessagesByYear = { [key: number]: Message[] };

export const input: Message[] = [
  { date: "2021-06-21", message: "message D" },
  { date: "2020-06-18", message: "message A" },
  { date: "2021-06-20", message: "message C" },
  { date: "2020-06-19", message: "message B" },
  { date: "2021-06-10", message: "message F" },
  { date: "2020-06-01", message: "message G" },
  { date: "2021-06-03", message: "message H" },
  { date: "2020-06-15", message: "message I" },
  { date: "2017-06-10", message: "message F" },
  { date: "2004-06-01", message: "message G" },
  { date: "2017-06-03", message: "message H" },
  { date: "2020-06-15", message: "message I" },
];

export function getMessages() {
  return [...input];
}

export function orderMessagesByDate(messages: Message[]) {
  const orderedMessages = [...messages];
  orderedMessages.sort((msg1, msg2) => {
    const date1 = new Date(msg1.date);
    const date2 = new Date(msg2.date);
    return date1.getTime() - date2.getTime();
  });
  return orderedMessages;
}
