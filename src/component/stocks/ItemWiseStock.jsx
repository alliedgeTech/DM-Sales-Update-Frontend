import { useHistoryData } from "../../services/stockServices";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useParams } from "react-router-dom";
import "../../assets/css/style.css";
import { useMutation } from "react-query";

export const ItemWiseStock = () => {

    var id = useParams();
    console.log("id", id);
    var mutation = useHistoryData();
    // var { data, isLoading } = (id);

    const columns = [
        { field: "id", headerName: "ID", width: 90 },
        { field: "_id", headerName: "", width: "0" },
        { field: "type", headerName: "Type", width: 150 },
        { field: "date", headerName: "Date", width: 150 },
        { field: "company", headerName: "Company", width: 150 },
        { field: "item", headerName: "Items", width: 150 },
        { field: "inQty", headerName: "Quantity", width: 150 },
        { field: "currentQty", headerName: "Current Stock", width: 200 }
    ]

    const [rowData, setRowData] = useState([]);
    var [stockPrice, setstockPrice] = useState(0)
    const setRows = (data) => {
        console.log("setRows Data", data);
        var id = 0;
        const completedData = data.map((element) => {
            console.log("purchase stock list", element);
            stockPrice += (element.price * element.qty);
            setstockPrice(stockPrice);
            return {
                id: ++id,
                _id: element?._id,
                date: element?.date,
                type: element?.type,
                company: element?.companyId.name,
                item: element?.itemId?.name,
                inQty: element?.inQty,
                currentQty: element.type === "purchase" ? (element?.inQty + element.currentQty) : (element.currentQty - element?.inQty)
            };
        });
        setRowData(completedData);
    };

    // var [others, setothers] = useState([])
    // const mutation = useMutation();

    useEffect(() => {
        if (!mutation.data && mutation.isLoading === false) {
            mutation.mutate(id)
        }
        if (mutation.data && mutation.isLoading === false) {
            setRows(mutation.data?.data?.data);
        }
    }, [mutation.isLoading]);

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
                                <h3>Stocks</h3>
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
                                            stock
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                    <section className="section">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title">Item Wise Stock Histroy</h4>
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
                                        <h6>No Data Available</h6>
                                    </div>
                                )}
                                {/* <div className="col-12 col-md-6 m-2">
                                <h5>Stock's total price : {stockPrice}</h5>
                            </div> */}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
