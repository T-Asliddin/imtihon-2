import { useState } from "react";
import { product } from "@service";
import http from "../../../service/config";

const Index = ({ data }) => {
  const [payload, setPayload] = useState({});
  const id = "b4bce05c-1e97-401f-9440-d8d9845a1557";
  const handleChange = (e) => {
    setPayload({ file: e.target.files[0] });
  };

  const formhandleChange = async (e) => {
    e.preventDefault();
    console.log(payload);

    try {
      const response = await product.upload(id,  );
      console.log(response);
    } catch (error) {}
  };
  return (
    <div>
      <form onSubmit={formhandleChange}>
        <input type="file" onChange={handleChange} />

        <button type="submit">add</button>
      </form>
    </div>
  );
};

export default Index;
