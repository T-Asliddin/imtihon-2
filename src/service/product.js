import http from "./config";
const product = {
  create: (data) => http.post("/product", data),
  get: (params) => http.get("/products", { params }),
  delet: (id) => http.delete(`/product/${id}`),
  put: (data)=> http.put(`/product`, data),
  upload: (id,data)=> http.post(`/media/upload-photo?id=${id}`, data),

};
export default product;
