import convertDateFormat from "./utils/convertDateFormat.js";
import LoadingSpinner from "./utils/LoadingSpinner.js";
const loader = new LoadingSpinner();

main();

function main() {
  const params = new URLSearchParams(window.location.search);
  getReservations(params.get("id"));
  getEventName(params.get("id"));
}

async function getReservations(eventId) {
  try {
    loader.show();
    const res = await fetch(
      `https://soundgarden-api.vercel.app/bookings/event/${eventId}`
    );
    const data = await res.json();
    const table = document.querySelector(".events-table-body");
    for (let i = 0; i < data.length; i++) {
      const tr = createTableRow(data[i], i);
      table.appendChild(tr);
    }
    loader.hide();
  } catch (error) {
    loader.hide();
    alert(
      "Houve um erro ao realizar a requisição, por favor tente novamente mais tarde."
    );
  }
}

async function deleteReservation(id) {
  if (
    confirm(
      "Você tem certeza que deseja exluir esta reserva? Esta ação não pode ser desfeita."
    )
  ) {
    try {
      loader.show();
      const res = await fetch(
        `https://soundgarden-api.vercel.app/bookings/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        window.location.reload();
      } else {
        throw new Error("falha na requisição");
      }
    } catch (error) {
      loader.hide();
      alert("Houve um erro com esta requisição");
    }
  }
}

async function getEventName(eventId) {
  const eventName = document.querySelector(".event-name");
  try {
    const res = await fetch(
      `https://soundgarden-api.vercel.app/events/${eventId}`
    );
    const data = await res.json();
    eventName.textContent = `${data.name}`;
  } catch (error) {
    alert("Falha ao requisitar o nome do evento.");
  }
}

function createTableRow(data, index) {
  const tr = document.createElement("tr");
  const th = document.createElement("th");
  const tdDate = document.createElement("td");
  const tdName = document.createElement("td");
  const tdEmail = document.createElement("td");
  const tdNumberTickets = document.createElement("td");
  const tdActions = document.createElement("td");
  const buttonExclude = document.createElement("a");
  th.scope = "row";
  th.textContent = `${index + 1}`;
  tdDate.textContent = `${convertDateFormat(data.created_at)}`;
  tdName.textContent = `${data.owner_name}`;
  tdEmail.textContent = `${data.owner_email}`;
  tdNumberTickets.textContent = `${data.number_tickets}`;
  buttonExclude.classList.add("btn", "btn-danger");
  buttonExclude.textContent = "excluir";
  buttonExclude.addEventListener("click", () => {
    deleteReservation(data._id);
  });
  tr.appendChild(th);
  tr.appendChild(tdDate);
  tr.appendChild(tdName);
  tr.appendChild(tdEmail);
  tr.appendChild(tdNumberTickets);
  tr.appendChild(tdActions);
  tdActions.appendChild(buttonExclude);
  return tr;
}
