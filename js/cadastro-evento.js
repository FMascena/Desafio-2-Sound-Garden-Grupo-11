import validateFormData from "./utils/validateFormData.js";
const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const formData = validateFormData({
      name: form.elements["nome"].value,
      attractions: form.elements["atracoes"].value,
      description: form.elements["descricao"].value,
      scheduled: form.elements["data"].value,
      number_tickets: form.elements["lotacao"].value,
    });
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
