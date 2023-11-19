// Almacenar los ids de los eventos que se quieran renderizar, (No sería necesario con el uso de fs, o desde el backend)
const eventIds = ["1", "2", "3", "4", "5", "6"];

// Recibe un id y devuelve el evento (en forma de promesa)
getEventById = async (id) => {
  const response = await fetch(`https://raw.githubusercontent.com/sbarreto10/pasameladata/main/data/events/${id}.json`);
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
    `
    if(i<nPopular){
      document.querySelector("#popular .row").innerHTML += `
        <div class="col-offset-${i==nPopular-1 && i%2==0 ? "12 w-100" : "6 w-50"}">${placeElement}</div>
      `;
    }else{
      let selector = (i==sortedEvents.length-1 && (i-nPopular)%2==0) ? "#explore .row" : ((i-nPopular)%2==0 ? "#explore-col-1" : "#explore-col-2")
      document.querySelector(selector).innerHTML += `
        <div class="col-offset-12 w-100">${placeElement}</div>
      `;
    }
  }
};

const recommended = 3;
renderEvents(recommended);

//                    !!!

// IMPLEMENTAR MQ DESDE EL SCRIPT SI NO SE PUEDE CON LOS MISMOS BREAKPOINTS DE BOOTSTRAP

//                    !!!

// MQ Para bootstrap grid

// Función para manejar el cambio en la media query
// function handleMediaChange(mq) {

//   if (mq.matches) {
//       console.log("La ventana es igual o mayor a 768px");
//   } else {
//       halfCols.forEach(function(element) {
//         element.classList.remove('col-offset-6', 'w-50');
//         element.classList.add('col-offset-12', 'w-100');
//     });
//   }
// }

// const mediaQuery = window.matchMedia("(min-width: 768px)");
// handleMediaChange(mediaQuery);
// mediaQuery.addListener(handleMediaChange);