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
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}\s*\d{2}:\d{2}$/;
  if (!dateRegex.test(scheduled)) throw new Error("invalid Date");
  attractions = attractions.split(",").map((e) => e.trim());
  scheduled = new Date(scheduled).toJSON();
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
