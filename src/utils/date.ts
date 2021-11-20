import dayjs from "dayjs";

export const formatDate = (dateText: any) => {
  return dayjs(dateText).format("YYYY-MM-DD HH:mm");
};