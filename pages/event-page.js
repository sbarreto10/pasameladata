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

  const eventDate = new Date(...event.date)
  
console.log(event.date);

  // document.querySelector(".event-details").innerHTML = `
  //   <div class="event-title">${event.title} - ${event.location}</div>
  //   <div class="event-time">
  //     17/12/2023 - 18:00 - <span class="mandarina"><u>Única vez</u></span>
  //   </div>
  //   <div class="event-access">
  //     Entradas disponibles <a href="#"><u>en este link</u></a>
  //   </div>
  // `
  
};

renderEvent()

document.addEventListener("DOMContentLoaded", () => {
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
});