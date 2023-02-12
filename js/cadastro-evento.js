const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const formData = validateFormData(
      form.elements["nome"].value,
      form.elements["atracoes"].value,
      form.elements["descricao"].value,
      form.elements["data"].value,
      form.elements["lotacao"].value
    );
    const res = await sendNewEvent(formData);
    if (res.ok) {
      alert("Evento cadastrado com sucesso.");
      form.reset();
    } else {
      alert(
        "Houve uma falha com a requisição, por favor tente novamente mais tarde."
      );
    }
  } catch (error) {
    alert(
      "Houve um erro ao cadastrar este evento, por favor revise os dados fornecidos"
    );
  }
});

function validateFormData(
  name,
  attractions,
  description,
  scheduled,
  number_tickets
) {
  for (const field of arguments) {
    if (field.length === 0) throw new Error("Empty field");
  }
  attractions = attractions.split(",").map((e) => e.trim());
  scheduled = validateDate(scheduled);
  number_tickets = parseInt(number_tickets, 10);
  return {
    name,
    poster: "link da imagem",
    attractions,
    description,
    scheduled,
    number_tickets,
  };
}

function validateDate(date) {
  const dateRegex =
    /^([0-2][0-9]|(3)[0-1])(\/)(([0-9])|((0)[0-9])|((1)[0-2]))(\/)\d{4}(\s*)(([0-1])?([0-9])|2([0-3])):([0-5])([0-9])$/;
  if (!dateRegex.test(date)) throw new Error("invalid Date");
  const [day, month, year, hour, minutes] = date.split(/[\/,\s*,:]/);
  return new Date(year, parseInt(month) - 1, day, hour, minutes).toJSON();
}

async function sendNewEvent(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("https://soundgarden-api.deta.dev/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      resolve(res);
    } catch (error) {
      reject(null);
    }
  });
}
