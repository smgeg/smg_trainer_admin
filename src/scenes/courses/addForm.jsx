import React from "react";
import { Input, Textarea } from "@mui/joy";
import {
  alpha,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  InputBase,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from "@emotion/styled";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import Header from "../../components/Header";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import ProgressCircle from "../../components/ProgressCircle";
import "react-notifications/lib/notifications.css";

const AddCourseForm = () => {
  //CONSTANT
  const title = "كورس جديد";
  const fieldSpace = "15px";
  //JSON
  const theme = createTheme({
    direction: "rtl", // Both here and <body dir="rtl">
  });
  // Create rtl cache
  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });
  //STATE
  const [newCode, setNewCode] = useState();
  const [loading, setLoading] = useState(false);

  //FUNCTION
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      console.log(data);
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses`,
        data
      );
      if (res.status === 201) {
        NotificationManager.success("تم انشاء الكورس بنجاح");
      }
    } catch (error) {
      if (error.status === 500) {
        console.error(error.message);
        NotificationManager.error("فشل انشاء الكورس ");
      }
    }
  };

  return (
    <Box dir="rtl" sx={{ m: "5px", p: "5px" }}>
      {loading ? (
        <CircularProgress />
      ) : (
        <div>
          <Header title={title} subtitle="" />
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <Box mt={"40px"} mx={"48px"}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  style={{ display: "grid" }}
                >
                  <TextField
                    {...register("title", { required: "مطلوب اسم الكورس" })}
                    sx={{ width: "300px", mb: fieldSpace }}
                    size="small"
                    label="الاسم"
                    variant="outlined"
                    error={errors.title ? true : false}
                    helperText={errors.title ? errors.title.message : ""}
                  />

                  <TextField
                    {...register("desc")}
                    sx={{ width: "500px", mb: fieldSpace }}
                    size="small"
                    minRows={3}
                    label="الوصف"
                    multiline={true}
                    variant="outlined"
                  />

                  <TextField
                    {...register("no_of_lec")}
                    sx={{ width: "300px", mb: fieldSpace }}
                    size="small"
                    label="عدد المحاضرات"
                    variant="outlined"
                  />
                  <TextField
                    {...register("no_of_hours")}
                    sx={{ width: "300px", mb: fieldSpace }}
                    size="small"
                    label="عدد الساعات"
                    variant="outlined"
                  />
                  <TextField
                    {...register("price")}
                    sx={{ width: "300px", mb: fieldSpace }}
                    size="small"
                    label="السعر"
                    variant="outlined"
                  />
                  <TextField
                    {...register("location")}
                    sx={{ width: "300px", mb: fieldSpace }}
                    size="small"
                    label="المكان"
                    variant="outlined"
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ width: "200px" }}
                  >
                    تم
                  </Button>
                </form>
              </Box>
            </ThemeProvider>
          </CacheProvider>
        </div>
      )}
      <NotificationContainer />
    </Box>
  );
};

export default AddCourseForm;
