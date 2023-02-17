export default function validateFormData({
  name,
  poster,
  attractions,
  description,
  scheduled,
  number_tickets,
}) {
  let invalidField = false;
  for (const property in arguments[0]) {
    if (isFieldValid(property, arguments[0][property].value)) {
      arguments[0][property].classList.remove("is-invalid");
    } else {
      arguments[0][property].classList.add("is-invalid");
      invalidField = true;
    }
  }
  if (invalidField) {
    throw new Error("Invalid field");
  }
  return {
    name: name.value.trim(),
    poster: poster.value.trim(),
    attractions: attractions.value.trim().split(/\s*,\s*/),
    description: description.value.trim(),
    scheduled: parseDate(scheduled.value),
    number_tickets: parseInt(number_tickets.value, 10),
  };
}

function isDateValid(date) {
  date = date.trim();
  const dateRegex = new RegExp(
    /^([0-2][1-9]|[1-3][0-1])(\/)(([1-9])|([0][1-9])|([1][0-2]))(\/)(\d{4}|\d{2})(\s+)(00|(0)?[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9])$/
  );
  return dateRegex.test(date);
}

function parseDate(date) {
  const [day, month, year, hour, minutes] = date.trim().split(/[\/:]|\s+/);
  return new Date(
    year <= 99 ? parseInt(year, 10) + 2000 : year,
    parseInt(month) - 1,
    day,
    hour,
    minutes
  ).toJSON();
}

function isFieldValid(property, value) {
  switch (property) {
    case "scheduled":
      return isDateValid(value);

    case "number_tickets":
      return !isNaN(parseInt(value, 10)) && value > 0;

    default:
      return value.trim().length > 0;
  }
}
