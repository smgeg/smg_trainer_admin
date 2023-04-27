import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@mui/material";
import React from "react";
import Header from "../../components/Header";
import DataGrid from "react-data-grid";
import axios from "axios";
import { mockDataSubscriptions } from "../../data/mockData";
import { tokens } from "../../theme";
import { useEffect } from "react";
import { useState } from "react";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { useContext } from "react";
import { useFocusRef } from "react-data-grid";
import { createContext } from "react";
import css from "styled-components";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMemo } from "react";
import { exportToCsv, exportToXlsx, exportToPdf } from "../../utils/export";
import { format } from "date-fns";

const Subscriptions = () => {
  const title = "سجل التدريب العام";
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rows, setRows] = useState([]);
  const [test, setTest] = useState("all");
  const [loading, setLoading] = useState(true);
  const [filtersRow, setFiltersRow] = useState({
    type: "all",
    customerName: "",
  });

  const FilterContext = createContext(undefined);
  useEffect(() => {
    // This code will run when the `filters` state changes
    setTest(filtersRow.type);
    console.log("Filters have changed:", filtersRow);
    console.log("Type have changed:", filtersRow.type);
  }, [filtersRow]);
  function FilterRenderer({ isCellSelected, column, children }) {
    const filtersContext = useContext(FilterContext);
    const { ref, tabIndex } = useFocusRef(isCellSelected);

    return (
      <>
        <div>{column.name}</div>

        <div>{children({ ref, tabIndex, filtersContext })}</div>
      </>
    );
  }
  function inputStopPropagation(event) {
    if (["ArrowLeft", "ArrowRight"].includes(event.key)) {
      event.stopPropagation();
    }
  }
  const handleSelect = (e) => {
    setFiltersRow({
      ...filtersRow,
      type: e.target.value,
    });
  };

  const columns = [
    {
      key: "code",
      name: "م",
      width: "max-content",

      formatter: (params) => params.row.code,
    },
    {
      key: "courseCode",
      name: "كود الكورس",
      width: "max-content",
      formatter: (params) => `CN${params.row.course.code}`,
    },
    {
      key: "courseTitle",
      name: "اسم الكورس",
      width: "max-content",
      formatter: (params) => params.row.course.title,
    },
    {
      key: "createAt",
      name: "التاريخ",
      width: "max-content",
      formatter: (params) => params.row.createdAt,
    },
    {
      key: "courseDesc",
      name: "وصف الكورس",
      hidden: true,
      formatter: (params) => params.row.course.desc,
    },
    {
      key: "coursePrice",
      name: "سعر الكورس",
      width: "max-content",
      formatter: (params) => params.row.course.price,
    },
    {
      key: "courseNoOfLec",
      name: "عدد المحاضرات",
      width: "max-content",
      formatter: (params) => params.row.course.no_of_lec,
    },
    {
      key: "courseLocation",
      name: "المكان",
      width: "max-content",
      formatter: (params) => params.row.course.location,
    },
    {
      key: "courseNoOfHours",
      name: "عدد الساعات",
      width: "max-content",
      formatter: (params) => params.row.course.no_of_hours,
    },

    {
      key: "customerName",
      name: "اسم المتدرب",
      resizable: true,
      width: "max-content",
      formatter: (params) => params.row.customer.name,
    },

    {
      key: "customerPhone",
      name: "رقم واتس",
      resizable: true,
      width: "max-content",
      formatter: (params) => params.row.customer.phone,
    },
    {
      key: "customerEmail",
      name: "ايميل",
      resizable: true,
      width: "max-content",
      formatter: (params) => params.row.customer.email,
    },
    {
      key: "customerJob",
      name: "وظيفة",
      resizable: true,
      width: "max-content",
      formatter: (params) => params.row.customer.job,
    },

    {
      key: "customerType",
      name: "نوع",
      resizable: true,
      width: "max-content",
      headerCellClass: "filter-cell",
      formatter: (params) =>
        params.row.customer.type === "individual" ? "فرد" : "شركات",
      headerRenderer: (p) => (
        <FilterRenderer {...p}>
          {({ filters, ...rest }) => (
            <Select
              {...rest}
              value={test}
              sx={{ width: "100%", my: "5px" }}
              size="small"
              onChange={handleSelect}
            >
              <MenuItem value="all">الكل</MenuItem>
              <MenuItem value="individual">فرد</MenuItem>
              <MenuItem value="company">شركات</MenuItem>
            </Select>
          )}
        </FilterRenderer>
      ),
    },
    {
      key: "customer.governorate",
      name: "محافظة",
      resizable: true,
      width: "max-content",
      formatter: (params) => params.row.customer.governorate,
    },
    {
      key: "customer.region",
      name: "منطقة",
      resizable: true,
      width: "max-content",
      formatter: (params) => params.row.customer.region,
    },
  ];

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const apiUrl = process.env.REACT_APP_BACKEND_URL;
        const res = await axios.get(`${apiUrl}/api/subscriptions`);
        if (res.status === 200) {
          setRows(res.data);
        } else {
          NotificationManager.error("see console", "خطأ");
          console.error(res.data);
        }
      } catch (error) {
        NotificationManager.error("see console", "خطأ");

        console.error(error);
        setRows([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      console.log(row);
      return (
        (filtersRow.type === "all"
          ? true
          : row.customer.type.includes(filtersRow.type)) &&
        (filtersRow.customerName
          ? row.customer.name.includes(filtersRow.customerName)
          : true)
      );
    });
  }, [rows, filtersRow]);

  const filteredColumns = columns.filter((column) => {
    return column.hidden === undefined;
  });
  const gridElement = (
    <DataGrid
      className={"rdg-light fill-grid"}
      direction={"rtl"}
      headerRowHeight={84}
      rows={filteredRows}
      columns={filteredColumns}

      // components={{ Toolbar: GridToolbar }}
    />
  );
  return (
    <Box m="20px">
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
              <Grid2>
                <TextField
                  placeholder="Type"
                  size="small"
                  onChange={(e) =>
                    setFiltersRow({
                      ...filtersRow,
                      type: e.target.value,
                    })
                  }
                />
                <TextField
                  placeholder="اسم المتدرب"
                  size="small"
                  onChange={(e) =>
                    setFiltersRow({
                      ...filtersRow,
                      customerName: e.target.value,
                    })
                  }
                />
                <TextField
                  placeholder="كود الكورس"
                  size="small"
                  onChange={(e) =>
                    setFiltersRow({
                      ...filtersRow,
                      customerName: e.target.value,
                    })
                  }
                />
              </Grid2>
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

export default Subscriptions;
