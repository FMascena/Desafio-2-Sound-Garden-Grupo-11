import convertDateFormat from "./utils/convertDateFormat.js";
import LoadingSpinner from "./utils/LoadingSpinner.js";
const loader = new LoadingSpinner();

main();

async function main() {
  const params = new URLSearchParams(window.location.search);
  loader.show();
  try {
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

  document.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
      loader.show();
      const res = await fetch(
        `https://soundgarden-api.vercel.app/events/${params.get("id")}`,
        {
          method: "DELETE",
        }
      );
      loader.hide();
      if (res.ok) {
        alert("Evento exluido com sucesso.");
        window.location = "admin.html";
      } else {
        alert(
          "Houve uma falha ao realizar a requisição, por favor tente mais tarde novamente"
        );
      }
    } catch (error) {
      alert(
        "Houve uma falha ao realizar a requisição, por favor tente mais tarde novamente"
      );
    }
  });
}
