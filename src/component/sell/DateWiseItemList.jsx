import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useDateWiseSellBill } from "../../services/sellServices"
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
export const DateWiseItemList = () => {
    const validation = {
        date: {
            required: {
                value: true,
                message: "Date is required.",
            },
        }
    }
    const mutation = useDateWiseSellBill();
    //   var { data, isLoading, refetch } = useDateWiseSellBill();


    var { register, handleSubmit, formState: { errors } } = useForm();

    const columns = [
        {
            field: "id",
            headerName: "ID",
            width: 70,
        },
        { field: "_id", headerName: "", width: "0" },
        { field: "company", headerName: "company", width: 200 },
        { field: "item", headerName: "Items", width: 200 },
        { field: "qty", headerName: "Quantity", width: 100 },
        { field: "uom", headerName: "Unit", width: 100 },
        { field: "price", headerName: "Price", width: 100 },
        { field: "total", headerName: "Total", width: 150 },
    ];
    const [rowData, setRowData] = useState([]);
    var [total, settotal] = useState(0)
    const setRows = (data) => {
        console.log("Data_____________",data);
        var id = 0; total = 0;
        console.log("data____", data);
        var array = [];
        data?.forEach((element1) => {
            element1.items?.forEach((element) => {
                total += ((element?.qty)*(element?.price))
                settotal(total)
                let thisData = {
                    id: ++id,
                    _id: element?._id,
                    company: element?.companyId?.name,
                    item: element?.itemId?.name,
                    qty: element?.qty,
                    uom: element?.uom,
                    price: element?.price,
                    total:((element?.qty)*(element?.price))
                };
                array.push(thisData);
            });
        });
     setRowData([...rowData, ...array]);
    };

    //   var [note, setnote] = useState(1)&& note === 
    useEffect(() => {
        if (mutation.data && mutation.isLoading === false) {
            setRows(mutation.data.data.data);
            //   setnote(0)
        }
        else if (mutation.data && mutation.isLoading === true) {
            refetch()
        }
    }, [mutation.isLoading]);

    const [itemdate, setitemdate] = useState('')
    const submitData = (data) => {
        mutation.mutate(data)
        setitemdate(data.date)
        setRowData
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
                                <h3> Item Summary</h3>
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
                                <h4 className="card-title">Enter Date </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(submitData)} id='forms'>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label htmlFor="date" class="form-label">
                                                Date
                                            </label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="date"
                                                {...register("date", validation.date)}
                                            />
                                            <span className="text-danger font-weight-bold">
                                                {errors?.date?.message}
                                            </span>
                                        </div>
                                        <div className="col-md-6 pt-2">
                                            <button type="submit" class="btn btn-primary me-1 mt-4">Submit</button>
                                            <button type="submit" class="btn btn-primary me-3 mt-4" onClick={() => document.getElementById("forms").reset()}>Reset</button>
                                        </div>
                                    </div>
                                </form>
                            </div >
                        </div >
                    </section >
                    <section className="section">
                        <div className="card">
                            <div className="card-header">
                                <h4 className="card-title"> Date Wise Item Summary :{itemdate}</h4>
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
                                    <h5>Total selling Price : {total}</h5>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}
