import http from "./config";
const workers = {
  create: (data) => http.post("/worker", data),
  get: (params) => http.get("/workers", { params }),
  delet: (id) => http.delete(`/worker/${id}`),
  put: (data) => http.put(`/worker` ,data),
};
export default workers;
