import { useGetSellData } from "../../services/sellServices";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";

export const DebitSellBill = () => {
  var { data, isLoading } = useGetSellData();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    { field: "_id", headerName: "", width: "0" },
    { field: "sellbillno", headerName: "Bill no", width: 150 },
    { field: "date", headerName: "Date", width: 250 },
    { field: "client", headerName: "Client", width: 350 },
    { field: "paymentType", headerName: "PaymentType", width: 250 }
  ];

  const [rowData, setRowData] = useState([]);

  const setRows = (data) => {
    var id = 0;
    const completedData = data.filter(element => element.paymentType === 0).map(element => {
        var date = element.date.substring(0, 10).split("-");
        date = `${date[2]}/${date[1]}/${date[0]}`;
        console.log("element: ", element);
        //   id += 1;
        return {
            id: ++id,
            _id: element._id,
            sellbillno: element.sellbillno,
            date: date,
            client: element?.clientId?.name,
            paymentType: element.paymentType === 0 ? "Debit" : "?"
        };
    })
    setRowData(completedData);
    console.log("dsfadsfa  => ", rowData);
};

  // var [others, setothers] = useState([])
  // var [totalPrice, settotalPrice] = useState(0)
  // const handleButtonClick = (id) => {
  //   others = []
  //   setothers(others)
  //   console.log("blank : ", others);
  //   totalPrice = 0
  //   settotalPrice(totalPrice)
  //   let calculation = 0
  //   const dts = data?.data?.data?.filter((d) => d._id === id)[0].items;
  //   dts.forEach(itm => {
  //     console.log("iddd ---> ", itm);
  //     calculation += (itm.price * itm.qty)
  //     settotalPrice(calculation)
  //     console.log(totalPrice, "----------", calculation);
  //     others.push(itm)
  //     setothers(others)
  //   })
  // };

  useEffect(() => {
    console.log(data);
    if (data && isLoading === false) {
      setRows(data?.data?.data);
    }
  }, [isLoading]);


  return (
      <>
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
                  <h3>Debit Bill List</h3>
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
                        sell
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            <section className="section">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Enter Client wise Bill</h4>
                </div>
                <div className="card-body">
                  {rowData.length != 0 ? (
                    <DataGrid
                      columnVisibilityModel={{
                        status: false,
                        _id: false,
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
        </>
        )
}
