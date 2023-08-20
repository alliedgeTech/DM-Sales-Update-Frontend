import { useGetSellData, useGetSellPriceHistory } from "../../services/sellServices";
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarContainer, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import { useUpdateDebitMoney } from "../../services/sellServices"
// import { Mutation } from "react-query";

export const DebitSellBill = () => {

  const validation = {
    debitMoney: {
      required: {
        value: true,
        message: "Please Add Money"
      },
    },
    type: {
      required: {
        value: true,
        message: "Please select the payment type."
      },
    },
    date: {
      required: {
        value: true,
        message: "Please select the Date."
      },
    }
  }

  var { register, handleSubmit, formState: { errors } } = useForm();
  const { data, isLoading, refetch } = useGetSellData();
  const { data: sellHistoryData, isLoading: sellHistoryLoading, refetch: historyRefetch } = useGetSellPriceHistory();

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    { field: "_id", headerName: "", width: "0" },
    { field: "sellbillno", headerName: "Bill no", width: 120 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "client", headerName: "Client", width: 230 },
    { field: "paymentType", headerName: "PaymentType", width: 200 },
    { field: "total", headerName: "Amount", width: 150 },
    {
      field: "actions",
      headerName: "View Items",
      width: 100,
      renderCell: (params) => (
        <>
          <button
            className="btn btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#primaryItems"
            onClick={() => handleButtonClick(params.row._id, params.row.total)}
          >
            <i class="bi bi-box-arrow-up"></i>
          </button>
          <button
            type="button"
            className="btn btn-sm"
            data-bs-toggle="modal"
            data-bs-target={`#primary`}
            onClick={() => setrowId(params.row._id)}
          >
            <i class="bi bi-card-text text-primary"></i>
          </button>
        </>
      ),
    },
  ];

  const [rowId, setrowId] = useState("")

  const [rowData, setRowData] = useState([]);

  var [debitprice, setdebitprice] = useState(0)
  const setRows = (data) => {
    var id = 0;
    const completedData = data.filter(element => element.paymentType === 0).map(element => {
      debitprice += +element?.total;
      setdebitprice(debitprice);
      var date = element.date.substring(0, 10).split("-");
      date = `${date[2]}/${date[1]}/${date[0]}`;
      //   id += 1;
      return {
        id: ++id,
        _id: element._id,
        sellbillno: element.sellbillno,
        date: date,
        client: element?.clientId?.name,
        paymentType: element.paymentType === 0 ? "Debit" : "?",
        total: Math.round(element?.total)
      };
    })
    setRowData(completedData);
  };


  var mutation = useUpdateDebitMoney();
  const adddebitPrice = (data) => {
    data._Id = debitpriceid;
    console.log(data);
    mutation.mutate(data)
    document.getElementById("forms").reset();
  }

  var [note, setnote] = useState(1)
  useEffect(() => {
    if (data && isLoading === false && note === 1) {
      setRows(data?.data?.data);
      setnote(0)
    }
    else if (mutation.data && mutation.isLoading === true) {
      refetch()
      historyRefetch();
    }
    console.log(sellHistoryData);
  }, [isLoading, mutation]);

  const [debitpriceid, setdebitpriceid] = useState("")
  const handleButtonClick = (id) => {
    setdebitpriceid(id);
  }

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbar />
        <h5 style={{paddingTop:"12px"}}>DebitSell Bill List Total: {Math.round(debitprice)}</h5>
      </GridToolbarContainer>
    );
  };
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
                    // slots={{ toolbar: GridToolbar }}
                    components={{
                      Toolbar: CustomToolbar,
                    }}
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
                <div className="col-12 col-md-6 m-2">
                  <h5>Total Debit Bill Price : {Math.round(debitprice)}</h5>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div
        class="modal fade text-left"
        id="primaryItems"
        tabindex="-1"
        aria-labelledby="myModalLabel120"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h4 class="modal-title text-black" id="myModalLabel16">Add Money for Debit</h4>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div class="modal-body">
              <div className="card-content">
                <div className="table-responsive">
                  <form onSubmit={handleSubmit(adddebitPrice)} id='forms'>
                    <div className="col-md-12 px-2">
                      <div class="form-group mandatory">
                        <label for="addDebitMoney" class="form-label">Add Amount</label>
                        <input type="number"
                          id="addDebitMoney"
                          class="form-control"
                          placeholder="Add Debit amount"
                          name="fname-column"
                          data-parsley-required="true"
                          {...register("debitMoney", validation.debitMoney)}
                        />
                        <span className="text-danger font-weight-bold">
                          {errors?.debitMoney?.message}
                        </span>
                      </div>
                      <div class="form-group mandatory">
                        <label for="date" class="form-label">Date</label>
                        <input type="date"
                          id="date"
                          class="form-control"
                          data-parsley-required="true"
                          {...register("date", validation.date)}
                        />
                        <span className="text-danger font-weight-bold">
                          {errors?.date?.message}
                        </span>
                      </div>
                      <fieldset class="form-group mandatory">
                        <label htmlFor="paymentMode" class="form-label">Select Payment Mode</label>
                        <select class="form-select" id="type"
                          {...register("type", validation.type)}>
                          <option value="">Select PaymentMode</option>
                          <option value="Cash">Cash</option>
                          <option value="UPI">UPI</option>
                          <option value="Cheque">Cheque</option>
                          <option value="Credit Card">Credit Card</option>
                          <option value="Debit Card">Debit Card</option>
                        </select>
                        <span className="text-danger font-weight-bold">
                          {errors?.type?.message}
                        </span>
                      </fieldset>
                      <div className="d-flex flex-row-reverse">
                        <button type="submit"
                          class="btn btn-primary w-25"
                          data-bs-dismiss={errors?.type?.message?.length !== 0 ? "no" : "modal"}
                        >Add
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-light-secondary" data-bs-dismiss="modal">
                <i class="bx bx-x d-block d-sm-none"></i>
                <span class="d-none d-sm-block">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade text-left w-100" id="primary" tabindex="-1" aria-labelledby="myModalLabel16" style={{ "display": "none" }} aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header bg-primary">
              <h5 className="modal-title white" id="myModalLabel160">
                Sell's history
              </h5>
            </div>
            <div className="modal-body">
              <tr className='d-flex flex-column'>
                <td>
                  <div className="card-content p-2">
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead className="thead-dark">
                          <tr>
                            <th>Date</th>
                            <th>Type</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            sellHistoryData?.data?.data?.filter(d => d.sellId === rowId).map(hist => {
                              return (
                                <>
                                  <tr>
                                    <td>{hist?.date}</td>
                                    <td>{hist?.type}</td>
                                    <td>{hist?.amount}</td>
                                  </tr>
                                </>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </div>
                </td>
              </tr>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light-secondary"
                data-bs-dismiss="modal"
              >
                x
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
