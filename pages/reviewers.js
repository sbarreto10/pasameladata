// Establecer cantidad de reviewers a fetchear
// (Para no tener que manejar directorios)

const nRev = 10

const reviewers = [];
for (let i = 1; i <= nRev; i++) {
  reviewers.push(i)
}

// Relativizar ruta para el fetching de los datos (local/remoto)
const fetchRouteRoot = document.location.href.startsWith(
  "https://sbarreto10.github.io"
)
  ? "https://raw.githubusercontent.com/sbarreto10/pasameladata/main"
  : "..";

// Función de renderización de datos que requieran fetching
renderEvent = async () => {
  // Fetchear y obtener lista de reviewers con formato {id: fetchedReviewer}
  const reviewersList = await Promise.all(
    reviewers.map(async (id) => {
      const _response = await fetch(
        `${fetchRouteRoot}/data/reviewers/${id}.json`
      );
      const reviewerData = await _response.json();
      const obj = {};
      obj[id] = reviewerData;
      return obj;
    })
  );

  // Formatear lista de reviewers en un solo objeto con esquema {id: fetchedReviewer}
  const reviewersObj = {};
  for (let i = 0; i < reviewersList.length; i++) {
    Object.assign(reviewersObj, reviewersList[i]);
  }

  // Renderizar reviews del evento
  for (let i = 0; i < reviewers.length; i++) {
   const reviewer = reviewersObj[reviewers[i]]
   console.log(reviewer);
    document.querySelector("#reviewers-grid").innerHTML += `
      <div class="reviewer-card">
        <div class="reviewer-photo-bg">
            <img src="../imgs/reviewers/${reviewers[i]}.jpg" alt="Foto del reviewer" />
         </div>
         <div class="reviewer-photo">
            <img src="../imgs/reviewers/${reviewers[i]}.jpg" alt="Foto del reviewer" />
         </div>
         <div class="reviewer-text">
           <div class="reviewer-name">${reviewer.firstName} ${reviewer.lastName}</div>
           <div class="reviewer-media">
              <a href="https://www.instagram.com/officialrickastley/" target="_BLANK">> <u>instagram</u></a>
           </div>
         </div>
      </div>
    `;
  }

};

renderEvent();
