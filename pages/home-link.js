const isRemote = document.location.href.startsWith("https://sbarreto10.github.io")
const homeLink = isRemote ? "/pasameladata" : "/"
document.querySelector(".floating-logo a").href = homeLink