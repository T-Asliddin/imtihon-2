import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { auth } from "@service";
import { NavLink } from "react-router-dom";

const Index = () => {
  const [form, setForm] = useState({});
  // // const [open, setOpen] = useState(false);
  // // const [modal, setModal] = useState(false);

  // // const [severity, setSeverity] = useState("");

  const hendleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   console.log(form);
    try {
      const response = await auth.sign_up(form);
      console.log(response);
      // if (response.status === 200) {
      //   localStorage.setItem("email", form.email);
      //   setSeverity("success")
      //    setOpen(true);
      //    setTimeout(()=>{
      //     setModal(true);
      //   } ,1500)
      // }
    } catch (error) {
      setSeverity("error")
      setOpen(true)
    }
  };
 
  return (
    <>
     
    
      
      <div className="w-full h-screen flex items-center justify-center ">
      
       <h1 >   </h1>
       <NavLink className="inline mb-[600px] mr-[300px] ' text-2xl" to="/">≺ Ortga </NavLink>
      
        <div className="w-[600px] mr-[380px]  p-5">
          <h1 className="text-[50px] my-6 text-center ">Ro'yxatdan o'tish</h1>
          <form onSubmit={handleSubmit}
          className=" flex flex-col gap-6 ">
             <TextField
              fullWidth
              type="text"
              label="Ismingiz"
              id="name"
              name="name"
              onChange={hendleChange}
            />
             <TextField
              fullWidth
              type="text"
              label="Telefon raqamingiz"
              id="number"
              name="number"
              onChange={hendleChange}
            />
            <TextField
              fullWidth
              type="email"
              label="Email"
              id="email"
              name="email"
              onChange={hendleChange}
            />
          
            <TextField
              fullWidth
              type="password"
              label="Parol"
              id="password"
              name="password"
              onChange={hendleChange}
            />
             <TextField
              fullWidth
              type="password"
              label="Parolni tasdiqlash"
              id="password_2"
              name="password_2"
              onChange={hendleChange}
            />
        
            <Button type="submit" variant="contained">
              Ro'yxatdan o'tish
            </Button>
          </form>
          <div className=" flex justify-center items-center mt-7 ">
            Ro'yxatdan o'tganmisiz? 
            <NavLink className=" text-blue-500  ml-5" to="/">
               Tizmiga kirish
            </NavLink>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Index;


// xasannosirov094@gmail.com
//Sehtols@01