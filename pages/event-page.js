const urlParams = new URLSearchParams(window.location.search);
const eventId = urlParams.get('eventId');

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

renderEvent = async () => {
  const response = await fetch(`https://raw.githubusercontent.com/sbarreto10/pasameladata/main/data/events/${eventId}.json`);
  const event = await response.json();

  // Manejo de fecha y horario
  const eventDate = new Date(...event.date)
  const hours = eventDate.getHours();
  const minutes = eventDate.getMinutes();
  const zeroHour = hours < 10 ? `0${hours}` : hours;
  const zeroMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const eventTime = `${zeroHour}:${zeroMinutes}`;

  document.querySelector(".event-details").innerHTML = `
    <div class="event-title">${event.title} - ${event.location}</div>
    <div class="event-time">
      ${eventDate.toLocaleDateString()} - ${eventTime}hs - <span class="mandarina"><u>${event.vigence}</u></span>
    </div>
    <div class="event-access">
      Entradas disponibles <a href="#"><u>en este link</u></a>
    </div>
  `

  document.querySelector(".event-location").innerHTML = `
    <iframe
      src="${event.iframeSrc}"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    />
  `

  document.querySelector(".event-main-description").innerHTML = `
    <span>${event.description}</span>
  `

  for (let i = 0; i < event.pics.length; i++) {
    document.querySelector(".pic-gallery").innerHTML += `
      <div class="pic-container"><img src="../imgs/event-${eventId}-pics/${event.pics[i]}.jpg"></div>
    `
  }

  

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