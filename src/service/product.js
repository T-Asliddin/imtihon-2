import http from './config'
const product = {
    create: (data)=> http.post("/product",data),
    get: (params)=> http.get("/products",{params}),

   
   
}
export default product