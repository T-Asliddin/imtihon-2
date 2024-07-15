import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { product } from "@service";
import { Carusel } from "@ui";
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

  return (
    <>
      <div>
        {
          <div className="flex flex-row  justify-center items-center gap-44 mt-20">
            <div>
              <Carusel />
            </div>
            <div>
              <div>
                <h1 className="text-[50px] mb-8">{data.product_name}</h1>
              </div>
              <div className="text-[25px]">
                <h1 className="inline-block mr-2">Description :</h1>
                <p className="inline-block font-semibold">{data.description}</p>
                <br />
                <h1 className="inline-block mr-2">Madi In :</h1>
                <p className="inline-block font-semibold">{data.made_in}</p>
                <br />
                <h1 className="inline-block mr-2">Color :</h1>
                <p className="inline-block font-semibold">
                  {data?.color?.join(" ")}
                </p>
                <br />
                <h1 className="inline-block mr-2">Size :</h1>
                <p className="inline-block font-semibold">
                  {data?.size?.join(" ")}
                </p>
                <br />
                <h1 className="inline-block mr-2">Count :</h1>
                <p className="inline-block font-semibold">{data.count}</p>
                <br />
                <h1 className="inline-block mr-2">Cost :</h1>
                <p className="inline-block font-semibold">{data.cost} $</p>
                <br />
                <h1 className="inline-block mr-2">Discount :</h1>
                <p className="inline-block font-semibold">{data.discount} %</p>
                <br />
                <h1 className="inline-block mr-2">Age Range:</h1>
                <p className="inline-block font-semibold">
                  {data.age_min} - {data.age_max}
                </p>
                <br />
                <h1 className="inline-block mr-2">For Gender :</h1>
                <p className="inline-block font-semibold">{data.for_gender}</p>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default index;
