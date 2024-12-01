import "./App.css";

import { Routes, Route } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Dashboard from "./pages/Dashboard";
import Desktop from "./pages/Desktop";
import EventCreate from "./pages/EventCreate/index";
import EventUpdate from "./pages/EventUpdate";
import MyEvents from "./pages/MyEvents";
import EventCreateS2 from "./pages/EventCreateS2/index";
import MyGift from "./pages/MyGift";
import Signin from "./pages/Signin/index";
import Signup from "./pages/Signup/index";
import PublicLayout from "../src/components/screen-components/layouts/publicLayout";
import PrivateLayout from "../src/components/screen-components/layouts/privateLayout";
import DashboardLayout from "../src/components/screen-components/layouts/dashboardlayout";
import SignupVerify from "./pages/SignupVerify";
import StripeCheckoutForm from "./pages/Checkout";
// import CheckoutForm from "./components/screen-components/CheckoutWidget";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyEventGifts from "./pages/EventGifts/EventGifts";
import GiftDetail from "./pages/GiftDetail/GiftDetail";
import UpdatePassword from "./pages/ResetPassword/UpdatePassword";
import TermsAndConditions from "./pages/Terms/TermsConditions";
import SendWishRegistrationGuide from "./components/Modal/Guide";
const stripePromise = loadStripe(
  "pk_test_51MppICJeXAKvhuBVhD94Mp2hOae0MfQGmVkPySYE3DEHURo7eIIasiG4PFcmvESnUYcMDmohziWFunzB4uPUchlA00b1WOe5fA"
);

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <PrivateLayout>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </PrivateLayout>
          }
        />
        <Route
          path="/"
          element={
            <PublicLayout>
              <Desktop />
            </PublicLayout>
          }
        />
        <Route
          path="/create-event"
          element={
            <PrivateLayout>
              <DashboardLayout>
                <EventCreate />
              </DashboardLayout>
            </PrivateLayout>
          }
        />
        <Route
          path="/my-events"
          element={
            <PrivateLayout>
              <DashboardLayout>
                <MyEvents />
              </DashboardLayout>
            </PrivateLayout>
          }
        />

        <Route
          path="/events/:id"
          element={
            <PrivateLayout>
              <DashboardLayout showheading={false}>
                <EventUpdate />
              </DashboardLayout>
            </PrivateLayout>
          }
        />
              <Route
          path="/my-gifts"
          element={
            <PrivateLayout>
              <DashboardLayout showheading={true}>
                <MyGift />
              </DashboardLayout>
            </PrivateLayout>
          }
        />
             <Route
          path="/update-password"
          element={
            <PrivateLayout>
              <DashboardLayout showheading={true}>
                <UpdatePassword />
              </DashboardLayout>
            </PrivateLayout>
          }
        />
           <Route
          path="/payment/:id/event-details"
          element={
            <PrivateLayout>
              <DashboardLayout showheading={true}>
                <GiftDetail />
              </DashboardLayout>
            </PrivateLayout>
          }
        />
        <Route
          path="/event/:event_url/:id"
          element={
            <PublicLayout>
              {/* <DashboardLayout showheading={false}> */}
                <EventCreateS2 />
              {/* </DashboardLayout> */}
            </PublicLayout>
          }
        />
            <Route
          path="/event-gifts/:id"
          element={
            <PrivateLayout>
              <DashboardLayout showheading={false}>
                <MyEventGifts />
              </DashboardLayout>
            </PrivateLayout>
          }
        />
        <Route
          path="/signup-guide"
          element={
            <PublicLayout>
              <SendWishRegistrationGuide/>
            </PublicLayout>
          }
        />
        <Route
          path="/checkout-page"
          element={
            <PublicLayout>
              <Elements stripe={stripePromise}>
                <StripeCheckoutForm />
              </Elements>
            </PublicLayout>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicLayout>
              <Signin />
            </PublicLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicLayout>
              <Signup />
            </PublicLayout>
          }
        />
        <Route
          path="/signup-verify/:accessToken/:refreshToken"
          element={
            <PublicLayout>
              <SignupVerify />
            </PublicLayout>
          }
        />
          <Route
          path="/reset-password"
          element={
            <PublicLayout>
              <ResetPassword />
            </PublicLayout>
          }
        />
             <Route
          path="/terms-and-conditions"
          element={
            <PublicLayout>
              <TermsAndConditions />
            </PublicLayout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
