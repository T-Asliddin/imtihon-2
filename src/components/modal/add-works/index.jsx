import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { IconButton, InputAdornment } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Notification from "@notification";
// import { useMask } from '@react-input/mask';
import { ToastContainer } from "react-toastify";
import { workerValidationSchema } from "@validation";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { worker } from "@service";
import { useMask } from "@react-input/mask";

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

export default function TransitionsModal({ modal, toggle, item }) {
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    first_name: item?.first_name ? item?.first_name : "",
    last_name: item?.last_name ? item?.last_name : "",
    age: item?.age ? item?.age : "",
    email: item?.email ? item?.email : "",
    password: "",
    phone_number: item?.phone_number ? item?.phone_number : "",
    gender: item?.gender ? item?.gender : "",
  };
  const inputRef = useMask({
    mask: "+998 (__) ___-__-__",
    replacement: { _: /\d/ },
  });
  const handleSubmit = async (values) => {
    const phone_number = values.phone_number.replace(/\D/g, "");
    const payload = { ...values, phone_number: `${phone_number}` };
    if (item) {
      const edit = { ...values, phone_number: `${phone_number}`, id: item.id };
      try {
        const response = await worker.put(edit);
        if (response.status === 200) {
          window.location.reload();
        }
      } catch (error) {
        Notification({ title: "Nimadir xato", type: "error " });
      }
    } else {
      try {
        const response = await worker.create(payload);
        if (response.status === 201) {
          window.location.reload();
        }
      } catch (error) {
        Notification({ title: "Nimadir xato", type: "error " });
      }
    }
  };
  return (
    <div>
      <ToastContainer />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modal}
        onClose={toggle}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modal}>
          <Box sx={style}>
            <Typography
              className="text-center"
              id="transition-modal-title"
              variant="h4"
              component="h2"
            >
              Create Workers
            </Typography>
            <Typography id="transition-modal-description">
              <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={workerValidationSchema}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div>
                      <div>
                        <Field
                          name="first_name"
                          type="text"
                          id="firstname"
                          as={TextField}
                          fullWidth
                          label="First Name"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="first_name"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                        <Field
                          name="last_name"
                          type="text"
                          id="lastname"
                          as={TextField}
                          fullWidth
                          label="Last Name"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="last_name"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                        <Field
                          name="age"
                          type="number"
                          id="age"
                          as={TextField}
                          fullWidth
                          label="Age"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="age"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                      </div>
                      <div>
                        <Field
                          name="phone_number"
                          type="text"
                          id="phone_number"
                          as={TextField}
                          fullWidth
                          inputRef={inputRef}
                          label="Phone"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="phone_number"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                        <Field
                          name="email"
                          type="email"
                          id="email"
                          as={TextField}
                          fullWidth
                          label="Email"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="email"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                        <Field
                          name="password"
                          type={showPassword ? "text" : "password"}
                          id="password"
                          as={TextField}
                          fullWidth
                          label="Password"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="password"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={() => {
                                    setShowPassword(!showPassword);
                                  }}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row justify-center mb-3 items-center">
                      <div className="flex flex-row gap-16 ">
                        <label>
                          <Field type="radio" name="gender" value="male" />
                          Male
                        </label>
                        <label>
                          <Field type="radio" name="gender" value="female" />
                          Female
                        </label>
                        <ErrorMessage name="gender" component="div" />
                      </div>
                    </div>
                    <Button
                      margin="normal"
                      fullWidth
                      disabled={isSubmitting}
                      variant="contained"
                      type="submit"
                    >
                      {isSubmitting ? "Loading..." : "Create"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
