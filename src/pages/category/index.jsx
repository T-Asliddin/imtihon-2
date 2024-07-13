import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { CategoryTable } from "@ui";
import { AddCategory } from "@modal";
import { category } from "@service";
import Pagination from "@mui/material/Pagination";



const Index = () => {
  const [modal, setModal] = useState(false);
  const [data ,setData]=useState([])
  const [count ,setCount]=useState(0)
  const [params, setParams] = useState({ page: 1, limit: 6 });
  const handleChange = (event, value) => {
    setParams({
      ...params,  
      page: value,
    });
  };

  const getdata = async () => {
    try {
      const response = await category.get(params);
      if (response.data.categories&& response.status===200) {
        let total = Math.ceil(response.data.total_count/params.limit)
        setCount(total)
        setData(response.data.categories)
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getdata();
  }, [params]);

  return (
    <>
      <AddCategory modal={modal} toggle={() => setModal(false)} />
      
        <div className="flex flex-col gap-6 mb-4 ">
       <div className="flex justify-end mr-8">
       <Button
            variant="contained"
            className=""
            onClick={() => {
              setModal(true);
            }}
          >
            Add
          </Button>
       </div>
         <div>
         <CategoryTable data={data} />
         </div>
        </div>
        <Pagination count={count} page={params.page} onChange={handleChange} />

    </>
  );
};

export default Index;
