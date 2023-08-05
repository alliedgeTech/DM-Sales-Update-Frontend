import { useGetPurchaseData } from "../../services/purchaseServices";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";

export const ListPurchaseComponent = () => {
  var { data, isLoading } = useGetPurchaseData();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 30,
    },
    { field: "_id", headerName: "", width: "0" },
    { field: "invoice", headerName: "Bill no", width: 300 },
    { field: "date", headerName: "Date", width: 250 },
    { field: "vendor", headerName: "Vendor", width: 350 },
    {
      field: "actions",
      headerName: "View Items",
      width: 100,
      renderCell: (params) => (
        <button
          className="btn btn-sm"
          onClick={() => handleButtonClick(params.row._id)}
        >
          <i class="bi bi-box-arrow-up"></i>
        </button>
      ),
    },
  ];

  const [rowData, setRowData] = useState([]);

  const setRows = (data) => {
    var id = 0;
    const completedData = data.map((element) => {
      var date = element.date.substring(0, 10).split("-");
      date = `${date[2]}/${date[1]}/${date[0]}`;
      //   id += 1;
      return {
        id: ++id,
        _id: element._id,
        invoice: element.invoice,
        date: date,
        vendor: element.vendorId.vendorName,
      };
    });
    setRowData(completedData);
    console.log("dsfadsfa  => ", rowData);
  };

  const handleButtonClick = (id) => {
    console.log("iddd ---> ", id);
  };

  useEffect(() => {
    console.log(data);
    if (data && isLoading === false) setRows(data?.data?.data);
  }, [isLoading]);

  return (
    <div id="main">
      <header className="mb-3">
        <a href="#" className="burger-btn d-block d-xl-none">
          <i className="bi bi-justify fs-3" />
        </a>
      </header>
      <div className="page-heading">
        <div className="page-title">
          <div className="row">
            <div className="col-12 col-md-6 order-md-1 order-last">
              <h3>Purchases</h3>
            </div>
            <div className="col-12 col-md-6 order-md-2 order-first">
              <nav
                aria-label="breadcrumb"
                className="breadcrumb-header float-start float-lg-end"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Deshboard</Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    purchase
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <section className="section">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Enter company wise items</h4>
            </div>
            <div className="card-body">
              {rowData.length != 0 ? (
                <DataGrid
                  columnVisibilityModel={{
                    status: false,
                    _id : false
                  }}
                  columns={columns}
                  rows={rowData}
                  slots={{ toolbar: GridToolbar }}
                />
              ) : (
                <div className="d-flex justify-content-center align-item-center my-5">
                  <div
                    class="spinner-border"
                    style={{ width: "3rem", height: "3rem" }}
                    role="status"
                  >
                    <span class="visually-hidden"></span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
