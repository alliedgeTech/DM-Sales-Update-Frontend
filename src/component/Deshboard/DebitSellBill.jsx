import { useGetSellData } from "../../services/sellServices";
import { useForm } from "react-hook-form"
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import "../../assets/css/style.css";
import {useUpdateDebitMoney} from "../../services/sellServices"
// import { Mutation } from "react-query";

export const DebitSellBill = () => {


  const validation = {
    debitMoney: {
        required: {
            value: true,
            message: "pleaase Add Money"
        }
    }
  }

  var { register, handleSubmit, formState: { errors } } = useForm();
  var { data, isLoading } = useGetSellData();

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
    { field: "total", headerName: "Total price", width: 150 },
    {
      field: "actions",
      headerName: "View Items",
      width: 100,
      renderCell: (params) => (
        <button
          className="btn btn-sm"
          data-bs-toggle="modal"
          data-bs-target="#primaryItems"
        onClick={() => handleButtonClick(params.row._id)}
        >
          <i class="bi bi-box-arrow-up"></i>
        </button>
      ),
    },
  ];


  const [rowData, setRowData] = useState([]);

  var [debitprice, setdebitprice] = useState(0)
  const setRows = (data) => {
    var id = 0;
    const completedData = data.filter(element => element.paymentType === 0).map(element => {
      debitprice += (element?.items[0]?.price * element?.items[0]?.qty);
      setdebitprice(debitprice);
      console.log(debitprice);
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
        paymentType: element.paymentType === 0 ? "Debit" : "?",
        total: element?.items[0]?.price * element?.items[0]?.qty
      };
    })
    setRowData(completedData);
    console.log("dsfadsfa  => ", rowData);
  };

  useEffect(() => {
    console.log(data);
    if (data && isLoading === false) {
      setRows(data?.data?.data);
    }
  }, [isLoading]);

  const [debitPrice, setdebitPrice] = useState(0)
  const adddebitPrice=(data)=>{
    setdebitPrice(data.debitMoney)
        console.log("Add debited price ====> ",data.debitMoney)
  }
const [debitpriceid, setdebitpriceid] = useState("")
 const handleButtonClick =(id)=>{
   setdebitpriceid(id);
 }

 const mutation = useUpdateDebitMoney();
  const debitMoney=()=>{
    mutation.mutate({"debitpriceid":debitpriceid,"debitPrice":debitPrice});
  }

 
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
                 <div className="col-12 col-md-6 m-2">
                     <h5>Total Debit Bill Price : {debitprice}</h5>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* --------------------------------------Model------------------------------ */}
      <div class="modal fade text-left w-100" id="primaryItems" tabindex="-1" aria-labelledby="myModalLabel16" style={{ "display": "none" }} aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel16">Add Money for Debit</h4>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div class="modal-body">
              <div className="card-content p-2">
                <div className="table-responsive">
                  <form onSubmit={handleSubmit(adddebitPrice)} id='forms'>
                    <div className="row">
                      <div className="col-md-9">
                        <div class="form-group mandatory">
                          <label for="first-name-column" class="form-label">Add Money</label>
                          <input type="number"
                            id="addDebitMoney"
                            class="form-control"
                            placeholder="Add Debit Money"
                            name="fname-column"
                            data-parsley-required="true"
                          {...register("debitMoney", validation.debitMoney)} 
                          />
                        </div>
                        <span className="text-danger font-weight-bold">
                          {errors?.debitMoney?.message}
                        </span>
                        <button type="submit" class="btn btn-primary me-2 mb-4"
                        onClick={()=>{
                          debitMoney()
                        }}
                        >Add
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              {/* <div className="text-left">
                Total purchase price : {totalPrice}
              </div> */}
              <button type="button" class="btn btn-light-secondary" data-bs-dismiss="modal">
                <i class="bx bx-x d-block d-sm-none"></i>
                <span class="d-none d-sm-block">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}