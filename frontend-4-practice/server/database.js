// Учебная дата и расписание из макета Scissor&. Месяцы считаются с нуля.
export const database = {
  today: { day: 12, month: 2, year: 2027 },
  slotsEvenDay: [
    { time: "12:00", available: true },
    { time: "16:30", available: false },
  ],
  slotsOddDay: [{ time: "12:00", available: false }],
};
