const eventIds = ["1", "2", "3", "4", "5", "6"];

const route = (event) => {
   event = event || window.event
   event.preventDefault()
   window.history.pushState({}, "", event.target.href)
};

const routes = {
   "/": "/",
   "/about": "./pages/about.html"
}

const redirect = async () => { 
   const path = window.location.pathname
   if(path.startsWith("/event/"))
 }

window.route = route