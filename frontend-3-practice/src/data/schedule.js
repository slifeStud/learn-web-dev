// 1. Данные. Учебное «сегодня» совпадает с датой в макете.
export const today = new Date(2027, 2, 12);
export const schedule = {
  "2027-03-12": [
    { time: "12:00", available: true },
    { time: "16:30", available: false },
  ],
  "2027-03-13": [{ time: "12:00", available: false }],
};
