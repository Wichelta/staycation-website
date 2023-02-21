import React from "react"
import { BrowserRouter as Router, Route } from "react-router-dom"
import LandingPage from "pages/LandingPage"
import DetailsPage from "pages/DetailsPage"
import CheckoutPage from "pages/CheckoutPage"
import InputNumber from "pages/ExampleInputNumber"
import InputDate from "pages/ExampleInputDate"
import Breadcrumb from "pages/ExampleBreadcrumb"
import "assets/scss/style.scss"

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/properties/:id" component={DetailsPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/exampleinputnumber" component={InputNumber} />
        <Route path="/exampleinputdate" component={InputDate} />
        <Route path="/examplebreadcrumb" component={Breadcrumb} />
      </Router>
    </div>
  );
}

export default App;
