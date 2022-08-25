require("dotenv").config()
const axios = require('axios')

module.exports = {
    addApplication: function (app, env){
        axios({
            method:"post",
            url: `${process.env.MAIN_API_HOST_URL}/apps/add?pswd=${process.env.APPLICATION_API_PASSWORD}`,
            data:{
                name: env.PROJECT_NAME,
                description: env.PROJECT_DESCRIPTION,
                port: env.PORT,
                host: env.SELF_HOSTNAME,
                routes: this.getRoutes(app)
            }
        })
        .then(response => {
            console.log(`Successfully registered app ${response.data.data})`)
        })
        .catch(error => console.log(error.toString()))
    },
    getRoutes: function(app){
        let router = app._router.stack,
        routes = []
        
        // adding router routes to routes array so it has all routes
        // since router have an parent path which isnt mentioned in the route obj itself i need to copy the custom tag to
        // each route
        router.forEach( rt => {
            if (rt.name === "router") {
                let rts = rt.handle.stack
                rts.forEach(rt2rt => {
                    rt2rt["custom"] = rt.handle.custom
                })
                router = router.concat(rts)
            }
        })
        
        router.forEach(rt => {
            if(rt.route){
                // checks if route already mentioned in routes.json
                let rpath = rt.custom ? rt.custom.parent_path + rt.route.path : rt.route.path
                routes.push(rpath)
            }
        })

        return routes
    }
}