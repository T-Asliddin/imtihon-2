import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { MenuItem, Select } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Notification from "@notification";
import { ToastContainer } from "react-toastify";
import { productValidationSchema } from "@validation";
import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";
import { category, product } from "@service";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal({ modal, toggle, item }) {
  const [data, setData] = useState({});
  console.log(item);
  const options = [
    { value: "ozbekiston", label: "O'zbekiston" },
    { value: "turkiya", label: "Turkiya" },
    { value: "china", label: "China" },
  ];
  const initialValues = {
    age_max: item?.age_max ? item.age_max : "",
    age_min: item?.age_min ? item.age_min : "",
    category_id: item?.category_id ? item.category_id : "",
    color: item?.color ? item.color.join(" ") : "",
    cost: item?.cost ? item.cost : "",
    count: item?.count ? item.count : "",
    description: item?.description ? item.description : "",
    for_gender: item?.for_gender ? item.for_gender : "",
    made_in: item?.made_in ? item.made_in : "",
    product_name: item?.product_name ? item.product_name : "",
    size: item?.size ? item.size.join(" ") : "",
    discount: item?.discount ? item.discount : "",
  };

  const handleSubmit = async (values) => {
    if (item) {
      let arr1 = [values.color];
      let color = arr1[0].split(" ");
      let arr2 = [values.size];
      let size = arr2[0].split(" ");
      let payload = {
        ...values,
        size,
        color,
        product_id: item.product_id,
      };

      try {
        const response = await product.put(payload);
        console.log(response);
        if (response.status === 200) {
          toggle();
          window.location.reload();
        }
        console.log(response);
      } catch (error) {}
    } else {
      let arr1 = [values.color];
      let color = arr1[0].split(" ");
      let arr2 = [values.size];
      let size = arr2[0].split(" ");
      let payload = {
        ...values,
        size,
        color,
      };
      try {
        const response = await product.create(payload);
        console.log(response);
        if (response.status === 201) {
          window.location.reload();
        }
      } catch (error) {
        Notification({ title: "Nimadir xato", type: "error " });
      }
    }
  };

  const getdata = async () => {
    try {
      const response = await category.get({ page: 1, limit: 100 });
      setData(response?.data?.categories);
    } catch (error) {}
  };
  useState(() => {
    getdata();
  }, []);
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
              Create Product
            </Typography>
            <Typography id="transition-modal-description">
              <Formik
                onSubmit={handleSubmit}
                initialValues={initialValues}
                validationSchema={productValidationSchema}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="flex flex-row gap-5">
                      <div className="w-[650px]">
                        <Field
                          name="age_max"
                          type="number"
                          as={TextField}
                          fullWidth
                          label="Age maximum"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="age_max"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                        <Field
                          name="age_min"
                          type="number"
                          as={TextField}
                          fullWidth
                          label="Age minimum"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="age_min"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                        <Field
                          name="category_id"
                          type="text"
                          as={Select}
                          fullWidth
                          label="Category"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="category_id"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        >
                          {data.map((item, index) => (
                            <MenuItem key={index} value={item?.category_id}>
                              {item?.category_name}
                            </MenuItem>
                          ))}
                        </Field>

                        <Field
                          name="color"
                          type="text"
                          as={TextField}
                          fullWidth
                          label="Color"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="color"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                        <Field
                          name="cost"
                          type="number"
                          as={TextField}
                          fullWidth
                          label="Cost"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="cost"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                      </div>
                      <div className="w-[650px]">
                        <Field
                          name="count"
                          type="number"
                          as={TextField}
                          fullWidth
                          label="Count"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="count"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                        <Field
                          name="discount"
                          type="number"
                          as={TextField}
                          fullWidth
                          label="Discount"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="discount"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                        <Field
                          name="madi_in"
                          type="text"
                          as={Select}
                          fullWidth
                          label="Madi in"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="madi_in"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        >
                          {options.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                              {item?.label}
                            </MenuItem>
                          ))}
                        </Field>
                        <div className="h-[82px] flex flex-row justify-center items-center">
                          <div className="text-[25px] flex flex-row gap-16 ">
                            <label>
                              <Field
                                type="radio"
                                name="for_gender"
                                value="male"
                              />
                              Male
                            </label>
                            <label>
                              <Field
                                type="radio"
                                name="for_gender"
                                value="female"
                              />
                              Female
                            </label>
                            <ErrorMessage name="gender" component="div" />
                          </div>
                        </div>
                        <Field
                          name="size"
                          type="Text"
                          as={TextField}
                          fullWidth
                          label="Size"
                          variant="outlined"
                          margin="normal"
                          helperText={
                            <ErrorMessage
                              name="size"
                              component="p"
                              className="text-[red] text-[15px]"
                            />
                          }
                        />
                      </div>
                    </div>
                    <Field
                      name="product_name"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Product Name"
                      variant="outlined"
                      margin="normal"
                      helperText={
                        <ErrorMessage
                          name="product_name"
                          component="p"
                          className="text-[red] text-[15px]"
                        />
                      }
                    />
                    <Field
                      name="description"
                      type="text"
                      as={TextField}
                      fullWidth
                      label="Description"
                      variant="outlined"
                      margin="normal"
                      helperText={
                        <ErrorMessage
                          name="description"
                          component="p"
                          className="text-[red] text-[15px]"
                        />
                      }
                    />
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
