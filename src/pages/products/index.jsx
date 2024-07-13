import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Button } from "@mui/material";
import { AddProduct } from "@modal";
import { ProductTable } from "@ui";
import { product } from "@service";
import { useEffect } from "react";

const Index = () => {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [modal, setModal] = useState(false);
  const [params, setParams] = useState({ page: 1, limit: 6 });
  const handleChange = (event, value) => {
    setParams({
      ...params,
      page: value,
    });
  };
  const getdata = async () => {
    try {
      const response = await product.get(params);
      if (response.data.products&& response.status===200) {
        let total = Math.ceil(response.data.total_count/params.limit)
        setCount(total)
        setData(response.data.products)
      }
    } catch (error) {}
  };
  useEffect(() => {
    getdata();
  }, [params]);
  return (
    <>
      <div>
        <AddProduct modal={modal} toggle={() => setModal(false)} />
        <Button
          onClick={() => {
            setModal(true);
          }}
          variant="contained"
        >
          Add
        </Button>
      </div>
      <div>
        <ProductTable data={data} />
      </div>
      <Pagination count={count} page={params.page} onChange={handleChange} />
    </>
  );
};

export default Index;
