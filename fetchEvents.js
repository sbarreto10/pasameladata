const eventIds = ["1", "2", "3", "4", "5", "6"];

getEventById = async (id) => {
  const response = await fetch(`https://raw.githubusercontent.com/sbarreto10/pasameladata/main/data/events/${id}.json`);
  const event = await response.json();
  return event;
};

logNMostPopularEvents = async (nPopular) => {
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

  // Crear
  for (let i = 0; i < sortedEvents.length; i++) {
    const selector = i < nPopular ? "#popular .places" : "#explore.places"
    document.querySelector(selector).innerHTML += `<div class="place">
      <a href="./pages/event-page.html"><img
       src="./imgs/event-${sortedEvents[i].id}-pics/main.jpg"
       alt="${sortedEvents[i].event.title}"/></a>
   </div>`;
   
  }
};

// Ejemplo: Loggear los 3 eventos con mayor asistencia
logNMostPopularEvents(2);
