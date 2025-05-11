const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

const stripe = new Stripe("sk_test_51QTcWCRpjA9U7v3sVlpG7u0arKI1FXdYeutRz67tqdnruHY7DHzt5F8g1NiflkTv6ZNwXScVXiBEBheL1BdKXaTN006pnLIRl0");

// Create a payment intent
router.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    // Convert the amount to cents (Stripe uses smallest currency unit)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send({ error: "Failed to create payment intent" });
  }
});

module.exports = router;
