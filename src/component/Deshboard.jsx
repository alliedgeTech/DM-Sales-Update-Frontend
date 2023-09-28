import React, { useEffect } from 'react'
import "../assets/css/main/app.css";
import "../assets/css/main/app-dark.css";
import "../assets/css/shared/iconly.css";
import { Line } from 'react-chartjs-2';
import { Link } from 'react-router-dom';
import { Chart, LineController, LinearScale, PointElement, LineElement, CategoryScale } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useGetStockData } from '../services/stockServices';
import { addStock } from '../redux/StockSlice';

export const Deshboard = () => {

    var { data: stockData, isLoading: stockLoading } = useGetStockData();

    const stocksData = useSelector((state) => state.stock.value)
    const dispatch = useDispatch();

    useEffect(() => {
        if (stockData !== undefined && stockLoading === false && stocksData.length === 0) {
            dispatch(addStock(stockData.data.data));
        }

    }, [ stockLoading])

    Chart.register(LineController, LinearScale, PointElement, LineElement, CategoryScale);
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Sales',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };


    return (
        <>
            <div id="app">
                <div id="main">
                    <header className="mb-3">
                        <a href="#" className="burger-btn d-block d-xl-none">
                            <i className="bi bi-justify fs-3" />
                        </a>
                    </header>
                    <div className="page-heading">
                        <h3>Company Statistics</h3>
                    </div>
                    <div className="page-content">
                        <section className="row">
                            <div className="col-12 col-lg-9">
                                <div className="row">
                                    <div className="col-6 col-lg-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body px-4 py-4-5">
                                                <div className="row">
                                                    <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                        <div className="stats-icon purple mb-2">
                                                            <i className="bi-check2-square" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                        <h6 className="text-muted font-semibold">
                                                            Total Sell Amount
                                                        </h6>
                                                        <h6 className="font-extrabold mb-0">112</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body px-4 py-4-5">
                                                <div className="row">
                                                    <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                        <div className="stats-icon blue mb-2">
                                                            <i className="iconly-boldProfile" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                        <h6 className="text-muted font-semibold">Followers</h6>
                                                        <h6 className="font-extrabold mb-0">183.000</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body px-4 py-4-5">
                                                <div className="row">
                                                    <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                        <div className="stats-icon blue mb-2">
                                                            <i className="iconly-boldProfile" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                        <h6 className="text-muted font-semibold">Following</h6>
                                                        <h6 className="font-extrabold mb-0">783.000</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6 col-lg-3 col-md-6">
                                        <div className="card">
                                            <div className="card-body px-4 py-4-5">
                                                <div className="row">
                                                    <div className="col-md-4 col-lg-12 col-xl-12 col-xxl-5 d-flex justify-content-start ">
                                                        <div className="stats-icon blue mb-2">
                                                            <i className="iconly-boldProfile" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                        <h6 className="text-muted font-semibold">Saved</h6>
                                                        <h6 className="font-extrabold mb-0">70</h6>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5 card pt-4 mx-3">
                                        <div className="card-content pb-4">
                                            <div className="name ms-4 mb-0">
                                                <h5 className="mb-0 text-gray ">Date Wise Debit Money List</h5>
                                            </div>
                                            <div className="px-4">
                                                <Link to='/datewiseaddmoneylist' className="btn btn-block btn-xl btn-outline-primary font-bold mt-3">
                                                    View Add MoneyList
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-md-6 card pt-4 mx-3">
                                        <div className="card-content pb-4 pl-2">
                                            <div className="name ms-4 mb-0">
                                                <h5 className="mb-0 text-gray">Month/Year Wise DebitMoney List</h5>
                                            </div>
                                            <div className="px-4">
                                                <Link to='/mywiseaddmoneylist' className="btn btn-block btn-xl btn-outline-primary font-bold mt-3">
                                                    Month/year wise List
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" col-md-6 card pt-4">
                                        <div className="card-content pb-4 pl-2">
                                            <div className="name ms-4 mb-0">
                                                <h5 className="mb-0 text-gray">Filters</h5>
                                            </div>
                                            <div className="px-4">
                                                <Link to='/filter' className="btn btn-block btn-xl btn-outline-primary font-bold mt-3">
                                                    Filters
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card">
                                                <div className="card-header">
                                                    <h4>Profit calculation</h4>
                                                </div>
                                                <div className="card-body">
                                                    <Line data={data} options={options} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-lg-3">
                                <div className="card">
                                    <div className="card-body py-4 px-4">
                                        <div className="ms-3 name">
                                            <h5 className="font-bold">Admin</h5>
                                            <h6 className="text-muted mb-0">@Darshit Raval</h6>
                                        </div>
                                    </div>
                                </div>
                                {/* -------------------------------------------------------- */}
                                <div className="card pt-4">
                                    <div className="card-content pb-4">
                                        <div className="name ms-4 mb-0">
                                            <h5 className="mb-1 text-danger">Credit Sell Bill</h5>
                                        </div>
                                        <div className="px-4">
                                            <Link to='/creditsellbill' className="btn btn-block btn-xl btn-outline-primary font-bold mt-3">
                                                View Credit Sell Bill
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* -------------------------------------------------------- */}
                                <div className="card pt-4">
                                    <div className="card-content pb-4">
                                        <div className="name ms-4 mb-0">
                                            <h5 className="mb-1 text-danger">Debit Sell Bill</h5>
                                        </div>
                                        <div className="px-4">
                                            <Link to='debitsellbill' className="btn btn-block btn-xl btn-outline-primary font-bold mt-3">
                                                View Debit Sell Bill
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>
                    <footer>
                        <div className="footer">
                            {/* <div className="float-start">
                                <p>2021 © Mazer</p>
                            </div> */}
                            <div className="float-end">
                                <p>
                                    Developed by{" "}
                                    <span className="text-danger">
                                        <i className="bi bi-heart" />
                                    </span>{" "}
                                    <a href="https://alliedge.in">Alliedge technologies</a>
                                </p>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}
