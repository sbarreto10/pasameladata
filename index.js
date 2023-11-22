// Establecer cantidad de eventos a fetchear
// (Para no tener que manejar directorios)

const nEv = 7;

const eventIds = [];
for (let i = 1; i <= nEv; i++) {
   eventIds.push(i);
}

// Relativizar ruta para el fetching de los datos (local/remoto)
const fetchRouteRoot = document.location.href.startsWith(
   "https://sbarreto10.github.io"
)
   ? "https://raw.githubusercontent.com/sbarreto10/pasameladata/main"
   : "..";

// Cuando cargue todo el contenido del DOM, se crean los eventListeners para los elementos estáticos
document.addEventListener("DOMContentLoaded", () => {
   // Links a suscripción
   const subClicks = [
      document.querySelector(".big-view-sub-link"),
      document.querySelector(".small-view-sub-link .btn"),
   ];
   const subModal = document.querySelector("#subscription-modal");
   const closeBtn = document.querySelector("#subscription-modal .close-btn");

   subClicks.forEach((subClick) => {
      subClick.addEventListener("click", () => {
         subModal.style.display = "flex";
         setTimeout(() => (subModal.style.transform = "scale(1)"), [0]);
      });
   });
   closeBtn.addEventListener("click", () => {
      setTimeout(() => {
         subModal.style.display = "none";
      }, [500]);
      subModal.style.transform = "scale(0)";
   });
});

// Recibe un id y devuelve el evento (en forma de promesa)
getEventById = async (id) => {
   const response = await fetch(`${fetchRouteRoot}/data/events/${id}.json`);
   const event = await response.json();
   return event;
};

// Recibe la cantidad de eventos que se quieran mostrar en la sección de populares
// Fectchea y renderiza todos los eventos
renderEvents = async (nPopular) => {
   // Obtener los eventos y sus asistencias
   const eventsWithAttendance = await Promise.all(
      eventIds.map(async (id) => {
         const event = await getEventById(id);
         return { id, event };
      })
   );

   // Ordenar los eventos por asistencia de mayor a menor
   const sortedEvents = eventsWithAttendance.sort(
      (a, b) => b.event.attendance - a.event.attendance
   );

   // Renderizar eventos
   for (let i = 0; i < sortedEvents.length; i++) {
      const placeElement = `
    <div class="place">
    <a href="./pages/event-page.html?eventId=${sortedEvents[i].id}"><img
    src="./imgs/event-${sortedEvents[i].id}-pics/main.jpg"
    alt="${sortedEvents[i].event.title}"/></a>
    </div>
    `;
      // Esto no fue muy mobile first de mi parte
      if (i < nPopular) {
         document.querySelector("#popular .row").innerHTML += `
      <div class="col-offset-${
         i == nPopular - 1 && i % 2 == 0 ? "12 w-100" : "6 w-50 place-wrap-sm"
      }">${placeElement}</div>
      `;
      } else {
         let selector =
            i == sortedEvents.length - 1 && (i - nPopular) % 2 == 0
               ? "#explore .row"
               : (i - nPopular) % 2 == 0
               ? "#explore-col-1"
               : "#explore-col-2";
         document.querySelector(selector).innerHTML += `
          <div class="col-offset-12 w-100">${placeElement}</div>
          `;
      }
   }

   const wrapCols = document.querySelectorAll(".place-wrap-sm");

   // MQ Para bootstrap grid (No encuentro una manera más sencilla de implementarlo sin js)

   // Función para manejar el cambio en la media query
   function handleMediaChange(mq) {
      if (mq.matches) {
         if ([...wrapCols[0].classList].includes("w-100")) {
            wrapCols.forEach((element) => {
               element.classList.remove("col-offset-12", "w-100");
               element.classList.add("col-offset-6", "w-50");
            });
         }
      } else {
         if ([...wrapCols[0].classList].includes("w-50")) {
            wrapCols.forEach((element) => {
               element.classList.remove("col-offset-6", "w-50");
               element.classList.add("col-offset-12", "w-100");
            });
         }
      }
   }

   const mediaQuery = window.matchMedia("(min-width: 768px)");
   handleMediaChange(mediaQuery);
   mediaQuery.addListener(handleMediaChange);

   document.querySelectorAll(".place").forEach((element) => {
      element.addEventListener("mouseover", () => {
         let imgChildren = element.children[0].children[0];
         let distance = imgChildren.offsetHeight - element.offsetHeight;
         imgChildren.style.transition = `transform ${distance / 500}s ease`;
         imgChildren.style.transform = `translateY(${-distance}px)`;
      });
      element.addEventListener("mouseout", () => {
         let imgChildren = element.children[0].children[0];
         let distance = imgChildren.offsetHeight - element.offsetHeight;
         imgChildren.style.transition = `transform ${distance / 1000}s ease`;
         imgChildren.style.transform = `translateY(${0}px)`;
      });
   });
};

const recommended = 2;
renderEvents(recommended);
