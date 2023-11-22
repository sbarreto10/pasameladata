// Recibir id del evento como parámetro de la url
const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');

// Renderizar imagen principal
document.querySelector(".event-image-container").innerHTML = `
    <img
      class="event-image-bg"
      src="../imgs/event-${eventId}-pics/main.jpg"
    />
    <img
      class="event-image"
      src="../imgs/event-${eventId}-pics/main.jpg"
      alt="Imagen del evento"
    />
  `

// Transición inicial de imagen principal del evento
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelector(".event-image").style.transform = "translate(0)"
    document.querySelector(".event-image-bg").style.filter = "contrast(1.5) blur(2.5vw) opacity(1)"
  }, [0])
});


// Relativizar ruta para el fetching de los datos (local/remoto)
const fetchRouteRoot = document.location.href.startsWith(
  "https://sbarreto10.github.io"
) || document.location.href.startsWith(
  "file:"
)
  ? "https://raw.githubusercontent.com/sbarreto10/pasameladata/main"
  : "..";

// Función de renderización de datos que requieran fetching
renderEvent = async () => {
  // Fetchear evento
  const response = await fetch(`${fetchRouteRoot}/data/events/${eventId}.json`);
  const event = await response.json();

  document.title = `PLD - ${event.title}`

  // Fetchear y obtener lista de reviewers del evento con formato {id: fetchedReviewer}
  const eventReviewersList = await Promise.all(
    event.reviews.map(async (review) => {
      const _response = await fetch(`${fetchRouteRoot}/data/reviewers/${review.reviewer}.json`);
      const reviewerData = await _response.json()
      const obj = {};
      obj[review.reviewer] = reviewerData;
      return obj
    })
  );

  // Formatear lista de reviewers en un solo objeto con esquema {id: fetchedReviewer}
  const eventReviewers = {};
  for(let i = 0; i < eventReviewersList.length; i++ ) {
    Object.assign(eventReviewers, eventReviewersList[i]);
  }

  // Crear variables de fecha y horario
  const eventDate = new Date(...event.date)
  const hours = eventDate.getHours();
  const minutes = eventDate.getMinutes();
  const zeroHour = hours < 10 ? `0${hours}` : hours;
  const zeroMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const eventTime = `${zeroHour}:${zeroMinutes}`;

  // Renderizar detalles del evento
  document.querySelector(".event-details").innerHTML = `
    <div class="event-title">${event.title} - ${event.location}</div>
    <div class="event-time">
      ${eventDate.toLocaleDateString()} - ${eventTime}hs - <span class="mandarina"><u>${event.vigence}</u></span>
    </div>
    ${
      event.ticketsLink ?
      `<div class="event-access">Entradas disponibles <a class="fuxia-link" href="${event.ticketsLink}" target="_BLANK"><u>en este link</u></a></div>`
      :(
         event.accessMessage!=undefined ? `<div class="text-secondary">${event.accessMessage}</div>` : ""
        )
    }
  `
  // Renderizar maps iframe de la ubicación del evento
  document.querySelector(".event-location").innerHTML = `
    <iframe
      src="${event.iframeSrc}"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
  `
  // Renderizar descripción del evento
  document.querySelector(".event-main-description").innerHTML = `
    <span>${event.description}</span>
  `

  // Renderizar galería de pics del evento
  for (let i = 0; i < event.pics.length; i++) {
    const imgSrc = `../imgs/event-${eventId}-pics/${event.pics[i]}.jpg`
    document.querySelector(".pic-gallery").innerHTML += `
      <div class="pic-container"><a href="${imgSrc}" target="_blank"><img src="${imgSrc}"></a></div>
    `
  }
  // Renderizar reviews del evento
  for (let i = 0; i < event.reviews.length; i++) {
    const id = event.reviews[i].reviewer;
    document.querySelector("#event-reviews").innerHTML += `
      <div class="review-card">
        <div class="review-top">
          <div class="reviewer-photo">
            <img
              src="../imgs/reviewers/${id}.jpg"
              alt="Foto del reviewer"
            />
          </div>
          <div class="review-title">
            Review de
            <span class="reviewer-name"><a href="#">${eventReviewers[id].firstName} ${eventReviewers[id].lastName}</a></span>
          </div>
        </div>
        <div class="review-bottom">
          ${event.reviews[i].body}
        </div>
      </div>
    `
  }

  // Renderizar asistencia al evento
  document.querySelector("#event-attendance").innerHTML += `<div class="align-self-center mandarina"><b>${event.attendance} Personas asistirán</b></div>`

  // Gestionar estilos y eventListeners de la galería del evento
  const picContainers = document.querySelectorAll(".pic-container");
  picContainers.forEach((container) => {
    container.addEventListener("mouseover", () => {
      // Cuando el mouse está sobre un elemento, la opacidad de todos cambia a 0.5
      picContainers.forEach((c) => {
        c.classList.add("pic-container-hover");
      });
      // Excepto el que está en :hover
      container.classList.remove("pic-container-hover");
    });
    container.addEventListener("mouseout", () => {
      // Cuando el mouse sale de un elemento, la opacidad de todos cambia a 1
      picContainers.forEach((c) => {
        c.classList.remove("pic-container-hover");
      });
    });
  });

};

renderEvent()