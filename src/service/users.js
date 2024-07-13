import http from './config'
const users = {
    get :()=>http.get("/workers", {params:{page:1 ,limit:10} }) 
}
export default users