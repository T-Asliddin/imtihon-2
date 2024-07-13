import { useState } from "react";
import { Button } from "@mui/material";
import { AddProduct } from "@modal";
import { ProductTable } from "@ui";
import { product } from "@service";
import { useEffect } from "react";

const Index = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [params, setParams] =useState( { page: 1, limit: 6 });
   const getdata = async () => {
    try{
      const response =await product.get(params)
      setData(response.data.products)
    }catch(error){

    }

    
  };
  useEffect(()=>{
    getdata()
  },[])
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
    </>
  );
};

export default Index;
