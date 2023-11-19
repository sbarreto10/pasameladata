// Relativizar ruta del homelink (local/remoto)
const homeLink = document.location.href.startsWith("https://sbarreto10.github.io") ? "/pasameladata/" : "../"
document.querySelector(".floating-logo a").href = homeLink

// Importar css del homelink al documento
document.querySelector("head").innerHTML+=`<link rel="stylesheet" href="style/fixed-logo.css" />`