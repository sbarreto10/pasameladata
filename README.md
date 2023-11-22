# Pasame La Data
- Repositorio del proyecto final del curso de Frontend de BA Multiplica
- Deploy: sbarreto10.github.com/pasameladata
****
# De qué se trata PLD?
El proyecto **pasameladata** es el prototipo de una página web de difusión y reseñas diseñada para facilitar la busqueda y el descubrimiento de eventos personalizados para cada usuario. Pudiendo en ella además interactuar no solo de forma anónima, sino como reviewer experimentado.
****
# Cómo funciona?
## Frontend Exclusivo
El enfoque de este proyecto se centra exclusivamente en el desarrollo del frontend, proporcionando una experiencia de usuario intuitiva y atractiva.
## Mobile First y Diseño Responsive
Adoptando la metodología "Mobile First", se logra que la aplicación sea accesible y plenamente funcional en dispositivos móviles desde el inicio. Además, mediante un diseño responsive, se proporciona una experiencia coherente en diversos dispositivos.
## Contenido Dinámico
El uso de operaciones como fetch, setTimeout, y setInterval permite la presentación dinámica de contenido.
****
# Manejo de los datos dinámicos
A los efectos de organizar y almacenar los datos, se optó por estructurar las distintas categorías en carpetas (./data/eventos y ./data/reviewers), cada una conteniendo archivos JSON que representan los datos respectivos. Con este enfoque se simula una especie de base de datos no relacional a nivel local en el frontend, donde cada carpeta actúa como una colección de datos. Esta implementación es una solución simplificada y local, que se reemplazaría por el uso de una base de datos más robusta, como MongoDB, en una versión más avanzada del proyecto, con la gestión de datos trasladada al backend.