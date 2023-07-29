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

function App() {

  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Deshboard />} />

        {/* Client API */}
        <Route path='/client' element={<ClientComponent />}></Route>
        <Route path='/clientlist' element={<ListClientComponent />} />
        <Route path='/clientlist/editclient/:clientId' element={<EditClient />} />

        {/* Companies API */}
        <Route path="/add-company" element={<AddCompaniesComponent />} />
        <Route path="/add-item" element={<AddCompanyWiseItemComponent />} />
        <Route path="/show-item" element={<ListCompanyWiseItemComponent />} />

        {/* Purchase API */}
        <Route path="/add-purchase" element={<AddPurchaseComponent />} />

        {/* errors */}
        <Route path="/erorr404" element={<Error404 />} />
      </Routes>
    </>
  )
}

export default App
