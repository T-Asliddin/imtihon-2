import http from './config'
const auth = {
    sign_in: (data)=> http.post("/login",data),
    sign_up: (data)=> http.post("/register", data)
}
export default auth