import dayjs from "dayjs";

export const formatDate = (dateText: string) => {
  let dueDate;
  dueDate = dayjs(dateText).format("YYYY-MM-DD HH:mm");
};