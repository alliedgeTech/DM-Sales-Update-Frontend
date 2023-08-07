import React, { useEffect } from 'react'
import "../assets/css/main/app.css";
import "../assets/css/main/app-dark.css";
import "../assets/css/shared/iconly.css";
import { Line } from 'react-chartjs-2';
import { Chart, LineController, LinearScale, PointElement, LineElement, CategoryScale } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { useGetCompanys, useGetItems } from '../services/companyAndItemServices';
import { addCompany } from '../redux/CompanySlice';
import { addItems } from '../redux/ItemSlice';

export const Deshboard = () => {

    const { data: companyData, isLoading: companyLoading } = useGetCompanys();
    const { data: itemData, isLoading: itemLoading } = useGetItems();

    const itemsData = useSelector((state) => state.items.value)
    const companiesData = useSelector((state) => state.company.value)

    const dispatch = useDispatch();

    useEffect(() => {
        if (companyData !== undefined && companyLoading === false && companiesData.length === 0) {
            console.log("---", companyData);
            companyData.data.data.forEach(element => {
                dispatch(addCompany(element));
            });
        }

        if (itemData !== undefined && itemLoading === false && itemsData.length === 0) {
            itemData.data.data.forEach(element => {
                dispatch(addItems(element));
            })
        }
        console.log(itemsData, companiesData);
    }, [itemsData, companiesData, companyLoading, itemLoading])

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
                                                            Complete projects
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
                                                        <div className="stats-icon green mb-2">
                                                            <i className="iconly-boldAdd-User" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                        <h6 className="text-muted font-semibold">Following</h6>
                                                        <h6 className="font-extrabold mb-0">80.000</h6>
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
                                                        <div className="stats-icon red mb-2">
                                                            <i className="iconly-boldBookmark" />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-8 col-lg-12 col-xl-12 col-xxl-7">
                                                        <h6 className="text-muted font-semibold">Saved Post</h6>
                                                        <h6 className="font-extrabold mb-0">112</h6>
                                                    </div>
                                                </div>
                                            </div>
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
                                {/* <div className="row">
                                    <div className="col-12 col-xl-4">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4>Profile Visit</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="d-flex align-items-center">
                                                            <svg
                                                                className="bi text-primary"
                                                                width={32}
                                                                height={32}
                                                                fill="blue"
                                                                style={{ width: 10 }}
                                                            >
                                                                <use xlinkHref="assets/images/bootstrap-icons.svg#circle-fill" />
                                                            </svg>
                                                            <h5 className="mb-0 ms-3">Europe</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <h5 className="mb-0">862</h5>
                                                    </div>
                                                    <div className="col-12">
                                                        <div id="chart-europe" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="d-flex align-items-center">
                                                            <svg
                                                                className="bi text-success"
                                                                width={32}
                                                                height={32}
                                                                fill="blue"
                                                                style={{ width: 10 }}
                                                            >
                                                                <use xlinkHref="assets/images/bootstrap-icons.svg#circle-fill" />
                                                            </svg>
                                                            <h5 className="mb-0 ms-3">America</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <h5 className="mb-0">375</h5>
                                                    </div>
                                                    <div className="col-12">
                                                        <div id="chart-america" />
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="d-flex align-items-center">
                                                            <svg
                                                                className="bi text-danger"
                                                                width={32}
                                                                height={32}
                                                                fill="blue"
                                                                style={{ width: 10 }}
                                                            >
                                                                <use xlinkHref="assets/images/bootstrap-icons.svg#circle-fill" />
                                                            </svg>
                                                            <h5 className="mb-0 ms-3">Indonesia</h5>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <h5 className="mb-0">1025</h5>
                                                    </div>
                                                    <div className="col-12">
                                                        <div id="chart-indonesia" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-xl-8">
                                        <div className="card">
                                            <div className="card-header">
                                                <h4>Latest Comments</h4>
                                            </div>
                                            <div className="card-body">
                                                <div className="table-responsive">
                                                    <table className="table table-hover table-lg">
                                                        <thead>
                                                            <tr>
                                                                <th>Name</th>
                                                                <th>Comment</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td className="col-3">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar avatar-md">
                                                                            <img src="assets/images/faces/5.jpg" />
                                                                        </div>
                                                                        <p className="font-bold ms-3 mb-0">Si Cantik</p>
                                                                    </div>
                                                                </td>
                                                                <td className="col-auto">
                                                                    <p className=" mb-0">
                                                                        Congratulations on your graduation!
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td className="col-3">
                                                                    <div className="d-flex align-items-center">
                                                                        <div className="avatar avatar-md">
                                                                            <img src="assets/images/faces/2.jpg" />
                                                                        </div>
                                                                        <p className="font-bold ms-3 mb-0">Si Ganteng</p>
                                                                    </div>
                                                                </td>
                                                                <td className="col-auto">
                                                                    <p className=" mb-0">
                                                                        Wow amazing design! Can you make another tutorial
                                                                        for this design?
                                                                    </p>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            <div className="col-12 col-lg-3">
                                <div className="card">
                                    <div className="card-body py-4 px-4">
                                        <div className="ms-3 name">
                                            <h5 className="font-bold">Admin</h5>
                                            <h6 className="text-muted mb-0">@Executive</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header">
                                        <h4>Recent Messages</h4>
                                    </div>
                                    <div className="card-content pb-4">
                                        {/* <div className="recent-message d-flex px-4 py-3"> */}
                                        {/* <div className="avatar avatar-lg">
                                                <img src="assets/images/faces/4.jpg" />
                                            </div> */}
                                        <div className="name ms-4 mb-2">
                                            <h6 className="mb-1 text-danger">Jay Chemical</h6>
                                            <p className="mb-0 text-danger">Panding to give money</p>
                                        </div>
                                        <div className="name ms-4 mb-2">
                                            <h6 className="mb-1 text-success">Shree Enterprice</h6>
                                            <p className="mb-0 text-success">Panding to collect money</p>
                                        </div>
                                        {/* </div> */}
                                        {/* <div className="recent-message d-flex px-4 py-3">
                                            <div className="avatar avatar-lg">
                                                <img src="assets/images/faces/5.jpg" />
                                            </div>
                                            <div className="name ms-4">
                                                <h5 className="mb-1">Dean Winchester</h5>
                                                <h6 className="text-muted mb-0">@imdean</h6>
                                            </div>
                                        </div>
                                        <div className="recent-message d-flex px-4 py-3">
                                            <div className="avatar avatar-lg">
                                                <img src="assets/images/faces/1.jpg" />
                                            </div>
                                            <div className="name ms-4">
                                                <h5 className="mb-1">John Dodol</h5>
                                                <h6 className="text-muted mb-0">@dodoljohn</h6>
                                            </div>
                                        </div>*/}
                                        <div className="px-4">
                                            <button className="btn btn-block btn-xl btn-outline-primary font-bold mt-3">
                                                Checkout Messages
                                            </button>
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
                                    Maked by{" "}
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
