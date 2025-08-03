import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

async function getAccessToken() {
  const { data } = await axios({
    url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
    method: "post",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_SECRET,
    },
    data: "grant_type=client_credentials",
  });

  return data.access_token;
}

router.post("/verify", async (req, res) => {
  const { orderID } = req.body;
  try {
    const token = await getAccessToken();

    const { data } = await axios.get(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderID}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.status === "COMPLETED") {
      return res.status(200).json({ success: true, message: "Payment verified", data });
    } else {
      return res.status(400).json({ success: false, message: "Payment not completed" });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
});

export default router;
