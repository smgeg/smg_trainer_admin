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
const Customers = () => {
  const title = "سجل المتدربين";
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [filtersRow, setFiltersRow] = useState({
    code: "",
  });
  const columns = [
    {
      key: "code",
      name: "م",
      formatter: (param) => param.row.code,
    },
    {
      key: "name",
      name: "اسم",
      formatter: (param) => param.row.name,
    },
    {
      key: "phone",
      name: "موبايل",
      formatter: (param) => param.row.phone,
    },
    {
      key: "email",
      name: "ايميل",
      formatter: (param) => param.row.email,
    },
    {
      key: "governorate",
      name: "محافظة",
      formatter: (param) => param.row.governorate,
    },
    {
      key: "job",
      name: "وظيفة",
      formatter: (param) => param.row.job,
    },
    {
      key: "type",
      name: "نوع",
      formatter: (param) => param.row.type,
    },
  ];

  const filteredColumns = columns.filter((column) => {
    return column.hidden === undefined;
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/customers`
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

export default Customers;
