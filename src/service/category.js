import http from './config'
const category = {
    create: (data)=> http.post("/category",data),
    get: (params)=> http.get("/categories",{params}),
    getall: ()=> http.get("/categories",{params:{page:1,limit:100}}),
    delet: (id)=> http.delete(`/category/${id}`),
    put: (data)=> http.put(`/category`, data),
   
}
export default category