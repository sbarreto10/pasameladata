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