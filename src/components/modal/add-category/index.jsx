import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { category } from "@service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ modal, toggle, name, id }) {
  const [form, setForm] = useState("");
  const heandleChange = (e) => {
    setForm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      category_name: form,
    };
    if (name) {
      const payload = {
        category_name: form ? form : name,
        category_id: id,
      };
      try {
        const response = await category.put(payload);
        if (response.status === 200) {
          toggle();
          window.location.reload();
        }
      } catch (error) {}
    } else {
      try {
        const response = await category.create(payload);
        if (response.status === 201) {
          toggle();
          window.location.reload();
        }
      } catch (error) {}
    }
  };
  return (
    <div>
      <Modal
        open={modal}
        onClose={toggle}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="spring-modal-title"
            variant="h4"
            component="h2"
            className="text-center "
          >
            Create Category
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <TextField
                fullWidth
                defaultValue={name}
                required
                type="text"
                label="Category"
                id="name"
                onChange={heandleChange}
              />

              <Button
                type="submit"
                fullWidth
                className=" mt-3"
                variant="contained"
              >
                Submit
              </Button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
