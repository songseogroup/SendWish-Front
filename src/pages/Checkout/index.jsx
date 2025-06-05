import React, { useRef, useState } from "react";
// import { Button } from "@mui/material"
import {
  CardElement,
  useElements,
  useStripe,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import { PaymentComplete } from "../../core/services/event.service";
import { Form, CardInput, PayButton, ErrorMessage } from "../../global.styles";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import logocard from "../../assets/images/logo.png";
import cards from "../../assets/images/payment-cards.png";
const StripeCheckoutForm = ({
  cart,
  handleClose,
  setSnackSuccessOpen,
  setSnackFailedOpen,
}) => {
  const toast = useRef();
  const stripe = useStripe();
  const navigate = useNavigate();
  const elements = useElements();
  const paymentIntent = JSON.parse(localStorage.getItem("paymentIntent"));
  const giftSenderData = JSON.parse(localStorage.getItem("eventsData"));
  const userData = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = React.useState(null);
  const [showDialog, setShowDialog] = React.useState(false);
  const [loading, setloading] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    setloading(true);
    
    try {
      const cardElement = elements.getElement(CardNumberElement);
      
      // Create a payment method without attaching it to a customer
      const paymentMethod = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });
      
      if (!paymentMethod || !paymentMethod.paymentMethod) {
        throw new Error("Failed to create payment method");
      }
      
      // Confirm the payment with the payment method
      const confirmPayment = await stripe.confirmCardPayment(
        paymentIntent?.data?.client_secret,
        {
          payment_method: paymentMethod.paymentMethod.id,
        }
      );
      
      if (confirmPayment.error) {
        throw new Error(confirmPayment.error.message);
      }
      
      // If payment is successful, complete the payment process
      const data = {
        gift_message: giftSenderData?.giftmessage,
        gift_amount: Number(giftSenderData?.gift),
        gift_fee: Number((parseFloat(giftSenderData?.gift) * 0.07).toFixed(4)),
        country: giftSenderData.country.code,
        userId: giftSenderData.from,
        eventId: giftSenderData.eid,
        email: giftSenderData.email,
        paymentIntentId: paymentIntent.data.id,
      };
      
      const response = await PaymentComplete(data);
      console.log(response, "successResponse");
      setShowDialog(true);
      setloading(false);
    } catch (err) {
      console.error(err, "error");
      setloading(false);
      toast.current.show({
        severity: "error",
        detail: err?.message || err?.data?.error || "Payment failed. Please try again.",
      });
    }
  };
  const closeDialog = () => {
    setShowDialog(false);
  };
  return (
    <>
      <Toast ref={toast} />
      <div className="flex w-full min-h-screen bg-primary gap singo">
        <div className="flex flex-col sing items-center justify-center w-full min-h-screen gap-3 lg:w-1/2">
          <img src={logocard} alt="img" className="w-[384px] h-[234px] object-contain px-12" />
          <h1 className="text-[white] font-poppins font-medium text-[26px]">
            Gifting Made Easy
          </h1>
        </div>
        <div className="flex singss flex-col items-start justify-center pb-12 px-12 w-full lg:w-1/2">
          <h1 className="text-[white] font-poppins font-medium text-[24px]">
            Payment Information
          </h1>
          <Form
            onSubmit={handleSubmit}
            className="flex flex-col w-full gap-0 mt-3"
          >
            <div>
              <label className="text-[white] font-poppins text-sm ml-3">
                Card number
              </label>
              <CardInput className="relative">
                <CardNumberElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#495057",
                        "::placeholder": {
                          color: "#6c757d",
                        },
                      },
                      invalid: {
                        color: "#dc3545",
                      },
                    },
                  }}
                />
                <img
                  src={cards}
                  alt="cards"
                  className="absolute -top-3 right-1"
                />
              </CardInput>
            </div>
            <div className="flex w-full gap-5">
              <div className="w-full">
                <label className="text-[white] font-poppins text-sm ml-3">
                  Expiration Date
                </label>
                <CardInput>
                  <CardExpiryElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#495057",
                          "::placeholder": {
                            color: "#6c757d",
                          },
                        },
                        invalid: {
                          color: "#dc3545",
                        },
                      },
                    }}
                  />
                </CardInput>
              </div>
              <div className="w-full">
                <label className="text-[white] font-poppins text-sm ml-3">
                  Security Code
                </label>
                <CardInput>
                  <CardCvcElement
                    options={{
                      style: {
                        base: {
                          fontSize: "16px",
                          color: "#495057",
                          "::placeholder": {
                            color: "#6c757d",
                          },
                        },
                        invalid: {
                          color: "#dc3545",
                        },
                      },
                    }}
                  />
                </CardInput>
              </div>
            </div>

            {error && <ErrorMessage>{error}</ErrorMessage>}
            <div className="flex justify-between gap-3">
              <PayButton className="pay-btn" type="button" onClick={() => navigate(-1)}>
                Back
              </PayButton>
              <PayButton
                type="submit"
                className="pay-btns"
                disabled={!stripe || !elements || loading}
              >
                {loading ? "Processing..." : "Give Gift"}
              </PayButton>
            </div>

            <Dialog
              visible={showDialog}
              style={{ width: "350px" }}
              onHide={() => {
                  setShowDialog(false);
                  navigate("/dashboard");
                  closeDialog()
                  setTimeout(() => {
                    navigate("/dashboard");
                  }, 1000);
                }}
            >
              <p className="mb-5 text-base font-bold text-center font-poppins">
                Your payment was processed successfully!
              </p>

              <PayButton
                type="Button"
                className="google-login-button"
                onClick={() => {
                  setShowDialog(false);
                  navigate("/dashboard");
                }}
              >
                Ok
              </PayButton>
            </Dialog>
          </Form>
          <div className="flex flex-col w-full gap-5 mt-5 max-w-[500px]">
            <div className="flex justify-between w-full">
              <p className="text-[white] font-poppins font-medium text-[16px]">
                Gift Amount:
              </p>
              <p className="text-[white] font-poppins font-medium text-[16px]">
                ${giftSenderData?.gift || 0}
              </p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-[white] font-poppins font-medium text-[16px]">
                Fees:
              </p>
              <p className="text-[white] font-poppins font-medium text-[16px]">
                ${parseFloat((parseFloat((giftSenderData?.gift) * 0.07) + 0.5 || 0).toFixed(4))}
              </p>
            </div>
            <div className="flex justify-between w-full">
              <p className="text-[white] font-poppins font-medium text-[16px]">
                Total (AUD) :
              </p>
              <p className="text-[white] font-poppins font-medium text-[16px]">
                ${parseFloat(giftSenderData?.gift) + parseFloat(((giftSenderData?.gift)*0.07)) + 0.5 || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StripeCheckoutForm;

// {id: "pi_3KpReuIG3H3VZzXI1VpGm4Ug", object: "payment_intent", amount: 10059, amount_capturable: 0,…}
// amount: 10059
// amount_capturable: 0
// amount_details: {tip: {amount: null}}
// tip: {amount: null}
// amount_received: 0
// application: null
// application_fee_amount: null
// automatic_payment_methods: null
// canceled_at: null
// cancellation_reason: null
// capture_method: "automatic"
// charges: {object: "list", data: [], has_more: false, total_count: 0,…}
// client_secret: "pi_3KpReuIG3H3VZzXI1VpGm4Ug_secret_nLJREy0MHN0Zes4yETzFUMo0w"
// confirmation_method: "automatic"
// created: 1650177152
// currency: "usd"
// customer: null
// description: null
// id: "pi_3KpReuIG3H3VZzXI1VpGm4Ug"
// invoice: null
// last_payment_error: null
// livemode: false
// metadata: {}
// next_action: null
// object: "payment_intent"
// on_behalf_of: null
// payment_method: null
// payment_method_options: {,…}
// payment_method_types: ["card"]
// processing: null
// receipt_email: null
// review: null
// setup_future_usage: null
// shipping: null
// source: null
// statement_descriptor: null
// statement_descriptor_suffix: null
// status: "requires_payment_method"
// transfer_data: null
// transfer_group: null
