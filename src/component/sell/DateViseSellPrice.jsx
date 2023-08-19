import { React, useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useDateWiseSellBill } from "../../services/sellServices"
export const DateViseSellPrice = () => {


  const validation = {
    date: {
      required: {
        value: true,
        message: "Date is required.",
      },
    }
  }
  var id = 0
  var { register, handleSubmit, formState: { errors } } = useForm();
  const [datewiseselllist, setdatewiseselllist] = useState([])
  const mutation = useDateWiseSellBill();
  console.log("Mutation: " ,mutation);

  const submitData = (data) => {
    mutation.mutate(data)
  }

  var [item, setitem] = useState([])
  var [sellupipayment, setsellupipayment] = useState([])
  var [cash, setcash] = useState([])
  var [Cheque, setCheque] = useState([])
  var [debit, setdebit] = useState([])

  useEffect(() => {
    if (mutation.data && mutation.isLoading === false) {
      setitem(mutation.data.data.data)
      var tempupi=0,tempcash=0,tempCheque=0,tempdebit=0,temptotalsellAmt=0;
      item.forEach((itm)=>{
          if(itm.paymentMode=="UPI"){
            itm.items.forEach((e)=>{
                tempupi+=e.price*e.qty
            })
            setsellupipayment(tempupi)  
          }
          else if(itm.paymentMode=="Cash")
          {
                itm.items.forEach((c)=>{
                  tempcash+=c.price*c.qty
                })
              setcash(tempcash)
          }
          else if(itm.paymentMode=="Cheque")
          {
                itm.items.forEach((a)=>{
                  tempCheque+=a.price*a.qty
                })
                setCheque(tempCheque)
          }
          else if(itm.paymentMode=="")
          {
                itm.items.forEach((x)=>{
                  tempdebit+=x.price*x.qty
                })
                setdebit(tempdebit)
          }
          else if(itm.paymentMode){
             itm.items.forEach((i)=>{
               temptotalsellAmt=i.price*i.qty
             })
            settotalsellAmt(temptotalsellAmt)
          }
      })
    }
  }, [mutation])

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
                <h3>Sell Amount</h3>
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
                <h4 className="card-title">Date Wise Sell Amount</h4>
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

          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Sell Items </h4>
            </div>
            {item.length === 0 ? (
              <div className="d-flex justify-content-center align-item-center my-5">
                No items added
              </div>
            ) : (
              <div className="card-content p-2">
                <div className="table-responsive">
                  <div className="d-flex justify-content-evenly"></div>
                  <table className="table mb-0">
                    <thead className="thead-dark">
                      <tr>
                        <th>Id</th>
                        <th>Sell Bill NO</th>
                        <th>Payment Type</th>
                        <th>Payment Mode</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        item?.map((data) => {

                          return (
                            <>
                              <tr>
                                <td>{++id}</td>
                                <td>{data.sellbillno}</td>
                                <td>{data.paymentType === 1 ? "Credit" : "Debit"}</td>
                                <td>{data.paymentMode === "" ? "--" : data.paymentMode}</td>
                                <td>{
                                  data.items.reduce((accumulator, currentValue) => {
                                    return accumulator + (currentValue.price * currentValue.qty);
                                  }, 0)
                                }</td>
                              </tr>
                            </>
                          )
                        })
                      }
                    </tbody>
                  </table>
                  <div className="col-12 col-md-6 m-2">
                <h6>Total of UPI : {sellupipayment}</h6>
              </div>
              <div className="col-12 col-md-6 m-2">
                <h6>Total of Cash : {cash}</h6>
              </div>
              <div className="col-12 col-md-6 m-2">
                <h6>Total of Cheque : {Cheque}</h6>
              </div>
              <div className="col-12 col-md-6 m-2">
                <h6>Total of Debit : {debit}</h6>
              </div>
              <p>--------------------------------</p>
              <div className="col-12 col-md-6 m-2">
                <h6>Total Sell Amount :{(+sellupipayment)+(+cash)+(+Cheque)+(+debit)}</h6>
              </div>
                </div>
              </div>
            )}
             
          </div>
        </div >
      </div >
    </>
  )
}
