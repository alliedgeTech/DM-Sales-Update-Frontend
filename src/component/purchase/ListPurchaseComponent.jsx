// import { useGetPurchaseData } from "../../services/purchaseServices";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/style.css";
import { useSelector } from "react-redux";

export const ListPurchaseComponent = () => {
  
  

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 30,
    },
    { field: "_id", headerName: "", width: "0" },
    { field: "invoice", headerName: "Invoice No", width: 100 },
    { field: "date", headerName: "Date", width: 220 },
    { field: "vendor", headerName: "Vendor", width: 250 },
    { field: "total", headerName: "Amount", width: 230 },
    {
      field: "actions",
      headerName: "View Items",
      width: 100,
      renderCell: (params) => (
        <>
          <button
            type="button"
            className="btn btn-sm"
            data-bs-toggle="modal"
            data-bs-target={`#primary`}
            onClick={() => handleButtonClick1(params.row._id)}
          >
            <i class="bi bi-card-text text-primary"></i>
          </button>
          <button
            className="btn btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#primaryItems"
            onClick={() => handleButtonClick(params.row._id)}
          >
            <i class="bi bi-box-arrow-up"></i>
          </button>
        </>
      ),
    },
  ];

  const store = useSelector((state) => state)
  const navigate = useNavigate();

  var totalWithGST = store?.purchase?.value?.map((element)=>{
    element?.items.map(ele => ((ele.qty * ele.price) + ((ele.qty * ele.price * ele.gstper) / 100)))
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  })
  


  var [rowData, setRowData] = useState([]);
  var totalPrices = 0;
  const setRows = () => {
    var id = 0;
    if (store.purchase.value.length !== 0) {
      const completedData = store?.purchase?.value?.map((element) => {
        element?.items.map(ele => ele.qty * ele.price).forEach(ele => totalPrices += ele)
        return {
          id: ++id,
          _id: element._id,
          invoice: element.invoice,
          date: element.date,
          vendor: element?.vendorId?.vendorName,
          total: element?.items.map(ele => ((ele.qty * ele.price)+((ele.qty * ele.price*ele.gstper)/100))).reduce((accumulator, currentValue) => {
            return accumulator + currentValue;
          }, 0)
        };
      });
      if (completedData)
        setRowData(completedData);
    } else {
      navigate('/')
    }
  };

  var [others, setothers] = useState([])
  var [totalPrice, settotalPrice] = useState(0)
  var [remarks, setRemarks] = useState('')
  const handleButtonClick = (id) => {
    others = []
    setothers(others)
    totalPrice = 0
    settotalPrice(totalPrice)
    let calculation = 0
    const dts = store?.purchase?.value?.filter((d) => d._id === id)[0].items;
    console.log("datatatatatat----",store);
    dts.forEach(itm => {
      calculation += ((itm.price * itm.qty)+((itm.price * itm.qty*itm.gstper)/100))
      settotalPrice(Math.round(calculation*100/100))
      settotalPrice(calculation)
      others.push(itm)
      setothers(others)
    })
  };
  useEffect(() => {
    console.log(store.purchase.value);
    setRows();
  }, [store.purchase.value]);

  const handleButtonClick1 = (id) => {
    console.log("params id", id);
    store?.purchase?.value.filter((e) => e._id === id).map((f) => {
      setRemarks(f.remark)
    })
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
                {rowData.length !== 0 && store.purchase.value?.length != 0 ? (

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
      <div
        className="modal fade text-left"
        id={`primary`}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="myModalLabel160"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header bg-primary">
              <h5 className="modal-title white" id="myModalLabel160">
                Other details
              </h5>
            </div>
            <div className="modal-body">
              <tr className='d-flex flex-column'>
                <td>
                  <h6>Remark</h6>
                  <p>
                    {remarks}
                  </p>
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
      <div class="modal fade text-left w-100" id="primaryItems" tabindex="-1" aria-labelledby="myModalLabel16" style={{ "display": "none" }} aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel16">Purchased itemSlice</h4>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <div class="modal-body">
              <div className="card-content p-2">
                <div className="table-responsive">
                  <table className="table mb-0">
                    <thead className="thead-dark">
                      <tr>
                        <th>Company</th>
                        <th>Items</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>GST</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {others?.map((itm) => {
                        return (
                          <>
                            <tr>
                              <td>{itm?.companyId?.name}</td>
                              <td>{itm?.itemId?.name}</td>
                              <td>{itm.qty}</td>
                              <td>{itm.price}</td>
                              <td>{itm.gstper}%</td>
                              <td>{(itm.qty*itm.price)+((itm.qty*itm.price*itm.gstper)/100)}</td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <div className="text-left">
                Total Purchase price : {totalPrice}
              </div>
              <button type="button" class="btn btn-light-secondary" data-bs-dismiss="modal">
                <i class="bx bx-x d-block d-sm-none"></i>
                <span class="d-none d-sm-block">Close</span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
