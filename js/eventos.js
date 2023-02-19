// Elencando as variáveis
const muralDeEventos = document.querySelector('#muralDeEventos')
const URL = 'https://soundgarden-api.vercel.app/events'

// Função que renderiza os eventos na página "Todos os Eventos"
async function verTodosEventos() {
  try {
    const response = await fetch(URL)
    const listaEventos = await response.json()
    console.log(listaEventos)

    listaEventos.forEach(evento => {
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
            <button class="btn btn-primary" id=${evento._id} onclick='abrirModal()'>reservar Ingresso</button>
          </article>
      `

      // Concatenando para que cada evento seja adicionado na variável e apareça na página
      muralDeEventos.innerHTML += html
    })
  } catch (error) {
    console.log(error)
  }
}

// Chamando função para listar eventos no DOM
verTodosEventos()

// Função para redirecionar o usuário para a página eventos.html
function redirecionar() {
  window.location.href = 'eventos.html'
}

// MODAL
const modal = document.querySelector('#telaModal')

function abrirModal(event) {
  event.preventDefault()
  modal.style.display = 'block'
  modal.setAttribute('id_evento', event.target.id)
}

// Reservar ingresso para evento onsubmit

const form = document.querySelector('#telaModal form')
form.addEventListener('submit', fazerReservaIngresso)

async function fazerReservaIngresso(event) {
  event.preventDefault()
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