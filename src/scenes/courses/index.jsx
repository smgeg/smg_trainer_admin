import { Box, Button, CircularProgress } from "@mui/material";
import React from "react";
import DataGrid from "react-data-grid";
import { useState } from "react";
import Header from "../../components/Header";
import { exportToXlsx } from "../../utils/export";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { useEffect } from "react";
import axios from "axios";
import { useMemo } from "react";
import { format } from "date-fns";
import "react-notifications/lib/notifications.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AlertDialogSlide from "../../utils/dialog";
const Courses = () => {
  const title = "سجل الكورسات";
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  const [rows, setRows] = useState([]);
  const [filtersRow, setFiltersRow] = useState({
    code: "",
  });

  const handleEdit = (code) => {};
  const handleDelete = async (code) => {
    try {
      setOpenDialog(true);
      //   const res = await axios.delete(
      //     `${process.env.REACT_APP_BACKEND_URL}/api/courses/${code}`
      //   );
      //   if (res.status === 200) {
      //     NotificationManager.success("تم حذف الكورس بنجاح ");
      //     fetchData();
      //   }
    } catch (error) {
      console.error(error.message);
      NotificationManager.error("فشل حذف الكورس بنجاح ");
    }
  };
  const columns = [
    {
      key: "code",
      name: "م",
      formatter: (param) => param.row.code,
    },
    {
      key: "title",
      name: "الاسم",
      formatter: (param) => param.row.title,
    },
    {
      key: "desc",
      name: "الوصف",
      hidden: true,
      formatter: (param) => param.row.desc,
    },
    {
      key: "price",
      name: "السعر",
      formatter: (param) => param.row.price,
    },
    {
      key: "noOfLec",
      name: "عدد المحاضرات",
      formatter: (param) => param.row.no_of_lec,
    },
    {
      key: "location",
      name: "المكان",
      formatter: (param) => param.row.location,
    },
    {
      key: "noOfHours",
      name: "عدد الساعات",
      formatter: (param) => param.row.no_of_hours,
    },
    {
      key: "img",
      name: "الصورة",
      hidden: true,
      formatter: (param) => param.row.img,
    },
    {
      key: "action",
      name: "اكشن",
      formatter: (param) => (
        <Box>
          <EditIcon
            color="warning"
            onClick={() => alert("hello")}
            sx={{
              ml: "5px",
              cursor: "pointer",
            }}
          />
          <DeleteIcon
            color="error"
            onClick={() => handleDelete(param.row.code)}
            sx={{
              ml: "5px",
              cursor: "pointer",
            }}
          />
        </Box>
      ),
    },
  ];

  const filteredColumns = columns.filter((column) => {
    return column.hidden === undefined;
  });
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/courses`
      );
      if (res.status === 200) {
        setRows(res.data);
      } else {
        console.error(res.data);
        NotificationManager.error("خطأ");
      }
    } catch (error) {
      console.error(error);
      NotificationManager.error("خطأ");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    setLoading(true);

    fetchData();
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      console.log(row);
      return filtersRow.code.length > 0
        ? row.code.includes(filtersRow.code)
        : true;
    });
  }, [rows, filtersRow]);

  const gridElement = (
    <DataGrid
      className={"rdg-light fill-grid"}
      direction={"rtl"}
      headerRowHeight={35}
      rows={filteredRows}
      columns={filteredColumns}

      // components={{ Toolbar: GridToolbar }}
    />
  );
  return (
    <Box m="20px">
      <AlertDialogSlide open={openDialog} />
      <Header title={title} subtitle="" />
      <Box m="40px 0 0 0">
        {loading && loading ? (
          <CircularProgress />
        ) : (
          <>
            <Box
              sx={{
                borderRadius: 2,
                m: "5px",
                p: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Button
                  color="primary"
                  variant="contained"
                  type="button"
                  onClick={() =>
                    exportToXlsx(
                      gridElement,
                      `${title} ${format(Date.now(), "dd-MM-yyyy")} ${format(
                        Date.now(),
                        "hh-mm"
                      )}.xlsx`
                    )
                  }
                >
                  Export XLSX
                </Button>
              </Box>
            </Box>

            {gridElement}
          </>
        )}
      </Box>
      <NotificationContainer />
    </Box>
  );
};

export default Courses;
