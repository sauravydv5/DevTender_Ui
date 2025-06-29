// src/api/paymentApi.js
import axios from "axios";
import { BASE_URL } from "../utils/constant";

export const createPayment = async (membershipType) =>
  axios.post(
    `${BASE_URL}/payment/create`,
    { membershipType },
    { withCredentials: true }
  );

export const verifyPayment = async (data) =>
  axios.post(`${BASE_URL}/payment/verify`, data, { withCredentials: true });

export const getPaymentByOrderId = async (orderId) =>
  axios.get(`${BASE_URL}/payment/${orderId}`, { withCredentials: true });
