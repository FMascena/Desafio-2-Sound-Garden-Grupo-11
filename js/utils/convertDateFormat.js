export default function convertDateFormat(jsonDate) {
  const date = new Date(jsonDate);
  return (
    `${date.getDate().toString().padStart(2, "0")}/` +
    `${(parseInt(date.getMonth()) + 1).toString().padStart(2, "0")}/` +
    `${date.getFullYear()} ` +
    `${date.getHours().toString().padStart(2, "0")}:` +
    `${date.getMinutes().toString().padStart(2, "0")}`
  );
}
