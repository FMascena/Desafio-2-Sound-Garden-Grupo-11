import convertDateFormat from "./utils/convertDateFormat.js";
import validateFormData from "./utils/validateFormData.js";
const params = new URLSearchParams(window.location.search);
fetch(`https://soundgarden-api.deta.dev/events/${params.get("id")}`)
  .then((res) => res.json())
  .then((data) => {
    const form = document.querySelector("form");
    form.elements["nome"].value = data.name;
    form.elements["banner"].value = data.poster;
    form.elements["atracoes"].value = data.attractions;
    form.elements["descricao"].value = data.description;
    form.elements["data"].value = convertDateFormat(data.scheduled);
    form.elements["lotacao"].value = data.number_tickets;
  })
  .catch((error) => {
    alert(
      "Houve um erro ao realizar a requisição, por favor tente novamente mais tarde."
    );
  });

const form = document.querySelector("form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const formData = validateFormData({
      name: form.elements["nome"].value,
      poster: form.elements["banner"].value,
      attractions: form.elements["atracoes"].value,
      description: form.elements["descricao"].value,
      scheduled: form.elements["data"].value,
      number_tickets: form.elements["lotacao"].value,
    });
    const res = await sendEventChanges(formData);
    if (res.ok) {
      alert("Alterações cadastradas com sucesso.");
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

async function sendEventChanges(formData) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `https://soundgarden-api.deta.dev/events/${params.get("id")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      resolve(res);
    } catch (error) {
      reject(null);
    }
  });
}
