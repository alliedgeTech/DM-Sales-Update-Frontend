import React, { useEffect, useState } from 'react'
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
// import { useDemoData } from '@mui/x-data-grid-generator';
import { Link } from 'react-router-dom';
import { useGetItems } from '../../services/companyAndItemServices';
import "../../assets/css/style.css"

export const ListCompanyWiseItemComponent = () => {

    // const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

    const columns = [
        { field: 'id', headerName: 'ID', width: 350 },
        { field: 'Company', headerName: 'Company', width: 300 },
        { field: 'Items', headerName: 'Items', width: 450 },
    ]
    var { data, isLoading } = useGetItems()

    const [rowData, setRowData] = useState([])

    const setRows = (data) => {
        const completedData = data.map(element => {
            return {
                "id": element._id,
                "Company": element.companyId?.name,
                "Items": element.name,
            }

        })
        setRowData(completedData)
        console.log("dsfadsfa  => ", rowData);
    }
    useEffect(() => {
        console.log(data);
        if (data && isLoading === false)
            setRows(data?.data?.data)
    }, [isLoading])

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
                            <h3>company's items</h3>
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
                                        items
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
                            {
                                rowData.length != 0 ? (
                                    <DataGrid
                                        columns={columns}
                                        rows={rowData}
                                        slots={{ toolbar: GridToolbar }}
                                    />
                                ) : (
                                    <div className='d-flex justify-content-center align-item-center my-5'>
                                        <div class="spinner-border" style={{ width: "3rem", height: "3rem" }} role="status">
                                            <span class="visually-hidden"></span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
