// Relativizar ruta del homelink (local/remoto)
let homeLink = "../"

if(document.location.href.startsWith("https://sbarreto10.github.io")) homeLink = "/pasameladata/"
if(document.location.href.startsWith("file:")) homeLink = "../index.html"

document.querySelector(".floating-logo a").href = homeLink