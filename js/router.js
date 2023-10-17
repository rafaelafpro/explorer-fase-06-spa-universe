export class Router {
    routes = {} 
  
    add(routeName, page) {
      this.routes[routeName] = page
    }
    
    route(event) {
      event = event || window.event
      event.preventDefault()
  
      window.history.pushState({}, "", event.target.href)
      this.handle()
    }
  
    handle() {
      const { pathname }  = window.location
      const route = this.routes[pathname] || this.routes[404]
      fetch(route)
      .then(data => data.text())
      .then(html => {
        document.querySelector('#app').innerHTML = html
        document.querySelector(".active")?.classList.remove("active");
        document.querySelector(`a[href="${pathname}"]`).classList.add("active");

        let databg = document.querySelector("section").dataset.bg;

        document.body.style.backgroundImage = `url('${databg}')`
      })
    }
  
  }