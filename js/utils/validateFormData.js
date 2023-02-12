export default function validateFormData({
  name,
  poster = "link da imagem",
  attractions,
  description,
  scheduled,
  number_tickets,
}) {
  for (const property in arguments[0]) {
    if (arguments[0][property].length === 0) throw new Error("Empty field");
  }
  attractions = attractions.split(",").map((e) => e.trim());
  scheduled = validateDate(scheduled);
  number_tickets = parseInt(number_tickets, 10);
  return {
    name,
    poster: poster,
    attractions,
    description,
    scheduled,
    number_tickets,
  };
}

function validateDate(date) {
  const dateRegex = new RegExp(
    /^([0-2][0-9]|[3][0-1])(\/)(([0-9])|([0][0-9])|([1][0-2]))(\/)\d{4}(\s+)(00|(0)?[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/
  );
  if (!dateRegex.test(date)) throw new Error("invalid Date");
  const [day, month, year, hour, minutes] = date.split(/[\/\s+:]/);
  return new Date(year, parseInt(month) - 1, day, hour, minutes).toJSON();
}
