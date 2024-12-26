import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "./Payment.css";

// Reemplaza con tu clave pública de Stripe
const stripePromise = loadStripe("pk_test_51QaH7yG6jbOEPaM11ZpBfp7yhOTkkVSkYfiPUWJl7QABgz1htcWUb17xjk7IgIeTXNkuff5guocrc4moc5srepw400GoOU4qJi");

const Payment = ({ price, id }) => {
  return (
    <div className="payment-container">
      <h2 className="payment-title">Proceso de pago</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} id={id} />
      </Elements>
    </div>
  );
};

export default Payment;
