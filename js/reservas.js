import convertDateFormat from "./utils/convertDateFormat.js";
const params = new URLSearchParams(window.location.search);
fetch(`https://soundgarden-api.deta.dev/bookings/event/${params.get("id")}`)
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const element = document.createElement("tr");
      element.innerHTML = `<th scope="row">${i + 1}</th>
                           <td>${convertDateFormat(data[i].created_at)}</td>
                           <td>${data[i].owner_name}</td>
                           <td>${data[i].number_tickets}</td>`;
      const td = document.createElement("td");
      const button = document.createElement("button");
      button.textContent = "excluir";
      button.classList.add("btn");
      button.classList.add("btn-danger");
      button.addEventListener("click", (e) => {
        // deleteReservation(data[i]._id, data[i].owner_name);
      });
      td.appendChild(button);
      element.appendChild(td);
      const table = document.querySelector(".events-table-body");
      table.appendChild(element);
    }
  })
  .catch((error) => {
    alert(
      "Houve um erro ao realizar a requisição, por favor tente novamente mais tarde."
    );
  });

// TODO
// function deleteReservation(id, name) {
//   if (prompt(`Insira o nome para confirmar: ${name}`) === name) {
//     fetch(`soundgarden-api.deta.dev/bookings/${id}`, { method: "DELETE" })
//       .then((res) => {})
//       .catch((error) => {});
//   }
// }
