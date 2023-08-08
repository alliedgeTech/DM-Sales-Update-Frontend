// import './App.css'

import { Route, Routes } from "react-router-dom"
import { Deshboard } from "./component/Deshboard"
import { Sidebar } from "./component/Sidebar"
import { ClientComponent } from "./component/client/ClientComponent"
import { ListClientComponent } from "./component/client/ListClientComponent"
import { EditClient } from "./component/client/EditClient"
import { AddCompaniesComponent } from "./component/companines/AddCompaniesComponent"
import { Error404 } from "./component/errors/Error404"
import { AddCompanyWiseItemComponent } from "./component/companines/AddCompanyWiseItemComponent"
import { ListCompanyWiseItemComponent } from "./component/companines/ListCompanyWiseItemComponent"
import { AddPurchaseComponent } from "./component/purchase/AddPurchaseComponent"
import { VendorComponent } from "./component/vendor/VendorComponent"
import { ListVendorComponent } from "./component/vendor/ListVendorComponent"
import { EditVendor } from "./component/vendor/EditVendor"
import { ListPurchaseComponent } from "./component/purchase/ListPurchaseComponent"
import { AddSellBill } from "./component/sell/AddSellBill"
import { ViewSellBill } from "./component/sell/ViewSellBill"
import { StockListComponent } from "./component/stocks/StockListComponent"
import { CreaditSellBill } from "./component/Deshboard/CreaditSellBill"
import { DebitSellBill } from "./component/Deshboard/DebitSellBill"
import { SellBillPrintComponent } from "./component/sell/SellBillPrintComponent"
import { useState } from "react"

function App() {

  var [isOpen, setisOpen] = useState(true)
  var [sellItems, setsellItems] = useState([])
  return (
    <>
      {/* <AppContext.Provider value={{ sellItems }}> */}
      <Sidebar isOpen={isOpen} />
      <Routes>
        <Route path="/" element={<Deshboard />} />

        {/* Client API */}
        <Route path='/client' element={<ClientComponent />}></Route>
        <Route path='/clientlist' element={<ListClientComponent />} />
        <Route path='/clientlist/editclient/:clientId' element={<EditClient />} />

        {/* Vendor API */}
        <Route path='/vendor' element={<VendorComponent />}></Route>
        <Route path='/vendorlist' element={<ListVendorComponent />} />
        <Route path='/vendorlist/editvendor/:vendorId' element={<EditVendor />} />

        {/* Companies API */}
        <Route path="/add-company" element={<AddCompaniesComponent />} />
        <Route path="/add-item" element={<AddCompanyWiseItemComponent />} />
        <Route path="/show-item" element={<ListCompanyWiseItemComponent />} />

        {/* Purchase API */}
        <Route path="/add-purchase" element={<AddPurchaseComponent />} />
        <Route path='/list-purchase' element={<ListPurchaseComponent />} />

        {/* sell bill API */}
        <Route path="/addsellbill" element={<AddSellBill />} />
        <Route path="/viewsellbill" element={<ViewSellBill sellItems={setsellItems} />} />
        <Route path="/viewsellbill/generate-sell-bill/:id" element={<SellBillPrintComponent items={sellItems} onClose={() => setisOpen(false)} />} />
        {/* Stock API */}
        <Route path="creditsellbill" element={<CreaditSellBill />} />
        <Route path="debitsellbill" element={<DebitSellBill />} />

        {/* Stock API */}
        <Route path="/list-stock" element={<StockListComponent />} />

        <Route path="/*" element={<Error404 onClose={() => setisOpen(false)} />} />
      </Routes>
      {/* </AppContext.Provider> */}
    </>
  )
}

export default App
