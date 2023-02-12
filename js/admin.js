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
                                <a href="reservas.html" class="btn btn-dark">ver reservas</a>
                                <a href="editar-evento.html" class="btn btn-secondary">editar</a>
                                <a href="excluir-evento.html" class="btn btn-danger">excluir</a>
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

function convertDateFormat(jsonDate) {
  date = new Date(jsonDate);
  return (
    `${date.getDate().toString().padStart(2, "0")}/` +
    `${(parseInt(date.getMonth()) + 1).toString().padStart(2, "0")}/` +
    `${date.getFullYear()} ` +
    `${date.getHours().toString().padStart(2, "0")}:` +
    `${date.getMinutes().toString().padStart(2, "0")}`
  );
}
