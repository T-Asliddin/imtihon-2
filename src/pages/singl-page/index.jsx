import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "@service";
import {Carusel} from "@ui"
const index = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await product.get({ page: 1, limit: 10 });
      response.data.products.map((item) => {
        if (item.product_id === id) {
          setData(item);
        }
      });
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  data?.image_url?.map((i) => {
    console.log(i);
  });
  return (
    <>
      <div>
        {
          <div className="flex flex-row  justify-center items-center gap-44 mt-20">
            <div >
            <Carusel/>
            </div>
            <div>
              <div>
                <h1 className="text-[50px] mb-8">{data.product_name}</h1>
              </div>
              <div className="text-[25px]">
                <h1>Description :{data.description}</h1>
                <h1>Madi In :{data.made_in}</h1>
                <h1>Color :{data?.color?.join(" ")}</h1>
                <h1>Size :{data?.size?.join(" ")}</h1>
                <h1>Count :{data.count}</h1>
                <h1>Cost :{data.cost} $</h1>
                <h1>Discount :{data.discount} %</h1>
                <h1>
                  Age Range: {data.age_min}- {data.age_max}{" "}
                </h1>
                <h1>For Gender :{data.for_gender}</h1>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default index;
