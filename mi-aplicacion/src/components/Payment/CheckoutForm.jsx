import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import purchaseController from "../../utils/api/purchaseController";
const CheckoutForm = ({ price, id }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            alert("Stripe no está disponible");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            const response = await fetch("http://localhost:3000/api/payment/intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: price * 100 }), // Stripe usa centavos
            });


            const { clientSecret } = await response.json();
            console.log("ClientSecret recibido:", clientSecret);
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: "Cliente Ejemplo",
                    },
                },
            });

            if (result.error) {
                alert("Error en el pago: " + result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                alert("¡Pago realizado con éxito!");
                console.log("ID de la canción:", id);
                const songId = id; // Asegúrate de tener este valor disponible
                const user = localStorage.getItem("user"); // Obtén el userId desde el contexto o la sesión
                console.log("USUARIO", user);
                if (user) {
                    const userId = JSON.parse(user).id; // Suponiendo que el user guardado es un objeto JSON
                    const purchaseResponse = await purchaseController.createPurchase(userId, songId);
                    console.log("Respuesta de la compra:", purchaseResponse);
                }
                navigate("/purchases/user"); // Redirigir a la página de inicio
            }
        } catch (error) {
            console.error("Error procesando el pago:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="checkout-form">
            <div className="card-element-container">
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: "16px",
                                color: "#32325d",
                                "::placeholder": {
                                    color: "#aab7c4",
                                },
                            },
                            invalid: {
                                color: "#fa755a",
                                iconColor: "#fa755a",
                            },
                        },
                    }}
                />
            </div>
            <button type="submit" disabled={!stripe} className="pay-button">
                Pagar {price} €
            </button>
        </form>
    );
};

export default CheckoutForm;
