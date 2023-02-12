import convertDateFormat from "./utils/convertDateFormat.js";
fetch("https://soundgarden-api.deta.dev/events")
  .then((res) => res.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      const element = document.createElement("tr");
      element.innerHTML = `<th scope="row">${i + 1}</th>
                           <td>${convertDateFormat(data[i].scheduled)}</td>
                           <td>${data[i].name}</td>
                           <td>${data[i].attractions
                             .toString()
                             .replaceAll(",", ", ")}</td>
                           <td>
                                <a href="reservas.html?id=${data[i]._id}" 
                                class="btn btn-dark">ver reservas</a>
                                <a href="editar-evento.html?id=${data[i]._id}" 
                                class="btn btn-secondary">editar</a>
                                <a href="excluir-evento.html?id=${data[i]._id}" 
                                class="btn btn-danger">excluir</a>
                            </td>`;
      const table = document.querySelector(".events-table-body");
      table.appendChild(element);
    }
  })
  .catch((error) => {
    alert(
      "Houve um erro ao realizar a requisição, por favor tente novamente mais tarde."
    );
  });
