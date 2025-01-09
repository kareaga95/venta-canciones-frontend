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

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Verificar si el usuario ha iniciado sesión
        if (!user) {
            alert("Debes iniciar sesión para realizar una compra.");
            return;
        }
    
        if (!stripe || !elements) {
            alert("Stripe no está disponible");
            return;
        }
    
        const cardElement = elements.getElement(CardElement);
    
        try {
            // Llamada al backend para crear un PaymentIntent
            const response = await fetch("http://localhost:3000/api/payment/intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: price * 100 }), // Stripe usa centavos
            });
    
            const { clientSecret } = await response.json();
    
            // Confirmar el pago con el clientSecret
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: user.username,
                    },
                },
            });
    
            if (result.error) {
                alert("Error en el pago: " + result.error.message);
            } else if (result.paymentIntent.status === "succeeded") {
                alert("¡Pago realizado con éxito!");
    
                // Registrar la compra en el sistema
                const userId = user.id; // El id del usuario
                const songId = id; // El id de la canción
                const purchaseResponse = await purchaseController.createPurchase(userId, songId);
                console.log("Compra registrada:", purchaseResponse);
    
                // Redirigir a la página de compras del usuario
                navigate("/purchases/user");
            }
        } catch (error) {
            console.error("Error procesando el pago:", error);
            alert("Hubo un error al procesar el pago. Intenta nuevamente.");
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
