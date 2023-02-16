import convertDateFormat from "./utils/convertDateFormat.js";
import validateFormData from "./utils/validateFormData.js";
import LoadingSpinner from "./utils/LoadingSpinner.js";
const loader = new LoadingSpinner();

main();

async function main() {
  const params = new URLSearchParams(window.location.search);

  try {
    loader.show();
    const res = await fetch(
      `https://soundgarden-api.vercel.app/events/${params.get("id")}`
    );
    const data = await res.json();
    loader.hide();
    const form = document.querySelector("form");
    form.elements["nome"].value = data.name;
    form.elements["banner"].value = data.poster;
    form.elements["atracoes"].value = data.attractions
      .toString()
      .replace(",", ", ");
    form.elements["descricao"].value = data.description;
    form.elements["data"].value = convertDateFormat(data.scheduled);
    form.elements["lotacao"].value = data.number_tickets;
  } catch (error) {
    alert(
      "Houve um erro ao realizar a requisição, por favor tente novamente mais tarde."
    );
  }

  const form = document.querySelector("form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      const formData = validateFormData({
        name: form.elements["nome"],
        poster: form.elements["banner"],
        attractions: form.elements["atracoes"],
        description: form.elements["descricao"],
        scheduled: form.elements["data"],
        number_tickets: form.elements["lotacao"],
      });
      loader.show();
      const res = await sendEventChanges(formData, params.get("id"));
      loader.hide();
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
}
async function sendEventChanges(formData, eventId) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(
        `https://soundgarden-api.vercel.app/events/${eventId}`,
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
