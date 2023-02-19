// Selecionando onde os eventos vão aparecer
const eventosMuralIndex = document.querySelector('#eventosIndex')
const URL = 'https://soundgarden-api.vercel.app/events'

async function mostrarEventos() {
  try {
    const response = await fetch(URL)
    const data = await response.json()
    const primeirosEventos = data.slice(0, 3)

    primeirosEventos.forEach(evento => {
      // Formatando data do evento, pela API ela vem em formato ISO, transformei para o formato local
      let dataEvento = new Date(evento.scheduled).toLocaleString()

      // Para cada evento da API aparecer na página
      let html = `
      <article class="evento card p-5 m-3">
        <h2>${evento.name} - ${dataEvento}</h2>
        <h4>${evento.attractions}</h4>
        <p>
          ${evento.description}
        </p>
        <button class="btn btn-primary" id=${evento._id} onclick='abrirModalIndex(event)'>reservar Ingresso</button>
      </article>
      `
      
      // Concatenando para que cada evento seja adicionado na variável e apareça na página
      eventosMuralIndex.innerHTML += html
    })

    console.log(data.slice(0, 3))
  } catch (error) {
    console.log(error)
  }
}

// Chamando função para listar eventos no DOM
mostrarEventos()

// Função para redirecionar o usuário para a página eventos.html
function redirecionar() {
  window.location.href = 'index.html'
}

// Modal com formulário para reservar o ingresso do evento

const modal = document.querySelector('#telaModalIndex')

function abrirModalIndex(event) {
  event.preventDefault();
  modal.style.display = 'block';
  modal.setAttribute('id_evento', event.target.id);
}


// Reservar ingresso para evento onsubmit

const form = document.querySelector('#telaModalIndex form')
form.addEventListener('submit', fazerReservaIngresso)

console.log(form);

async function fazerReservaIngresso(event) {
  console.log("teste");
  event.preventDefault();
  const nome = document.getElementById('nome').value
  const email = document.getElementById('email').value
  const ingressos = document.getElementById('qtdIngresso').value
  const id = modal.getAttribute('id_evento')

  const URL_RESERVA = 'https://soundgarden-api.vercel.app/bookings'

  const reserva = {
    owner_name: nome,
    owner_email: email,
    number_tickets: ingressos,
    event_id: id
  }

  try {
    const response = await fetch(URL_RESERVA, {
      method: 'POST',
      body: JSON.stringify(reserva),
      headers: { 'Content-type': 'application/json' }
    })
    console.log(reserva)

    if (response.ok) {
      alert('Reserva Efetuada! Aproveite seu evento!')
      redirecionar()
    } else {
      console.log(response)
      throw new Error(`${response.status}`)
    }

    const result = await response.json()
    return result
  } catch (err) {
    if (err.message === '400') alert('Algo deu errado! Tente novamente!')
    console.log(err)
  }
}

// Fechar o modal ao clicar

const closeBtn = document.querySelector('#closeBtn')
closeBtn.onclick = function () {
  modal.style.display = 'none'
}

window.onclick = function (event) {
  if (event.target == modal) modal.style.display = 'none'
}