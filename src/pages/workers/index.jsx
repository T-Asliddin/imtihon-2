import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { AddWorkers } from "@modal";
import { WorkersTable } from "@ui";
import { worker } from "@service";

const Index = () => {
  const [modal, setModal] = useState(false);
  const [data, setData] = useState([]);
  const [params, setParams] = useState({ page: 1, limit:6 });
  const [count ,setCount]=useState(0)

  const getdata = async () => {
    try {
      const response = await worker.get(params);
      console.log(response);
      if (response.status === 200 && response.data.user) {
        setData(response.data.user);
        let total =Math.ceil(response.data.totcal_count/params.limit)
        setCount(total)
      }
    } catch (error) {}
  };

  useEffect(() => {
    getdata();
  }, [params]);

  const handleChange=(event,value)=>{
    setParams({
      ...params,  
      page: value,
    });
  }

  return (
    <>
      <AddWorkers modal={modal} toggle={() => setModal(false)} />
      <div className="flex flex-col gap-6 ">
        <div className="flex justify-end 6 mr-8">
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
          <WorkersTable data={data} />
        </div>
      </div>
      <Pagination count={count} page={params.page} onChange={handleChange} />

    </>
  );
};

export default Index;
