import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { Base64EncodeMethod } from './utils.js';
import Axios from 'axios';
import { base64encode } from 'nodejs-base64';

const mpesaRouter = express.Router();

//Getting the M-PESA Auth Token
mpesaRouter.get(
    '/mp_access_token', expressAsyncHandler(
        async (req, res) => {
            const MPESA_AUTH_URL = process.env.M_PESA_AUTH;
            const basicauth = Base64EncodeMethod(process.env.CONSUMER_KEY, process.env.CONSUMER_SECRET);
            try {
                const response = await Axios.get(MPESA_AUTH_URL, {
                    headers: {
                        "Authorization": `Basic ${basicauth}`,
                    }
                });
                res.send(response.data);
            }
            catch (err) {
                res.send(err.response.data);
            }

        }
    ));


//Getting the M-PESA Auth Token
mpesaRouter.post(
    '/mp_register_url', expressAsyncHandler(
        async (req, res) => {
            const REGISTER_URL = process.env.MPESA_REGISTER_URL;
            try {
                const response = await Axios.post(
                    REGISTER_URL,
                    {
                        "ShortCode": 600990,
                        "ResponseType": "Completed",
                        "ConfirmationURL": "http://192.168.43.180:8000/api/mp/mp_confirmation_url",
                        "ValidationURL": "http://192.168.43.180:8000/api/mp/mp_validation_url"
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${req.body.access_token}`
                        }
                    });
                res.send(response.data);
            }
            catch (err) {
                res.send(err.response.data);
            }

        }
    ));


//M-PESA C2B
mpesaRouter.post(
    '/mp_c2b', expressAsyncHandler(
        async (req, res) => {
            const C2B_URL = process.env.MPESA_C2B_URL;
            try {
                const response = await Axios.post(
                    C2B_URL,
                    {
                        "ShortCode": "600383",
                        "CommandID": "CustomerPayBillOnline",
                        "Amount": "100",
                        "Msisdn": "254708374149",
                        "BillRefNumber": "TestAPI"
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${req.body.access_token}`
                        }
                    });
                res.send(response.data);
            }
            catch (err) {
                res.send(err.response.data);
            }

        }
    ));

//M-PESA Account Balance
mpesaRouter.post(
    '/mp_account_balance', expressAsyncHandler(
        async (req, res) => {
            const M_PESA_BALANCE = process.env.MPESA_BALANCE_URL;
            try {
                const response = await Axios.post(
                    M_PESA_BALANCE,
                    {
                        "Initiator": "apitest342",
                        "SecurityCredential": "Q9KEnwDV/V1LmUrZHNunN40AwAw30jHMfpdTACiV9j+JofwZu0G5qrcPzxul+6nocE++U6ghFEL0E/5z/JNTWZ/pD9oAxCxOik/98IYPp+elSMMO/c/370Joh2XwkYCO5Za9dytVmlapmha5JzanJrqtFX8Vez5nDBC4LEjmgwa/+5MvL+WEBzjV4I6GNeP6hz23J+H43TjTTboeyg8JluL9myaGz68dWM7dCyd5/1QY0BqEiQSQF/W6UrXbOcK9Ac65V0+1+ptQJvreQznAosCjyUjACj35e890toDeq37RFeinM3++VFJqeD5bf5mx5FoJI/Ps0MlydwEeMo/InA==",
                        "CommandID": "AccountBalance",
                        "PartyA": "601342",
                        "IdentifierType": "4",
                        "Remarks": "bal",
                        "QueueTimeOutURL": "http://197.248.86.122:801/bal_timeout",
                        "ResultURL": "http://197.248.86.122:801/bal_result"
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${req.body.access_token}`
                        }
                    });
                res.send(response.data);
            }
            catch (err) {
                res.send(err.response.data);
            }

        }
    ));

//M-PESA STK PUSH
mpesaRouter.post(
    '/mp_stk', expressAsyncHandler(
        async (req, res) => {
            const M_PESA_STK = process.env.MPESA_STK_URL;
            let date = new Date();
            const timestamp = Math.floor(date / 1000);
            const password = base64encode(`174379 + bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919 + ${timestamp}`);
            try {
                const response = await Axios.post(
                    M_PESA_STK,
                    {
                        "BusinessShortCode": "174379",
                        "Password": password,
                        "Timestamp": timestamp,
                        "TransactionType": "CustomerPayBillOnline",
                        "Amount": "1",
                        "PartyA": "254716437799",
                        "PartyB": "174379",
                        "PhoneNumber": "254716437799",
                        "CallBackURL": "http://192.168.43.180:8000/api/mpesa/mp_stk_callback",
                        "AccountReference": "Test",
                        "TransactionDesc": "TestPay"
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${req.body.access_token}`
                        }
                    });
                res.send(response.data);
            }
            catch (err) {
                res.send(err.response.data);
            }

        }
    ));


//M-PESA B2C
mpesaRouter.post(
    '/mp_b2c', expressAsyncHandler(
        async (req, res) => {
            const B2C_URL = process.env.MPESA_B2C_URL;
            try {
                const response = await Axios.post(
                    B2C_URL,
                    {
                        "InitiatorName": "apitest342",
                        "SecurityCredential": "Q9KEnwDV/V1LmUrZHNunN40AwAw30jHMfpdTACiV9j+JofwZu0G5qrcPzxul+6nocE++U6ghFEL0E/5z/JNTWZ/pD9oAxCxOik/98IYPp+elSMMO/c/370Joh2XwkYCO5Za9dytVmlapmha5JzanJrqtFX8Vez5nDBC4LEjmgwa/+5MvL+WEBzjV4I6GNeP6hz23J+H43TjTTboeyg8JluL9myaGz68dWM7dCyd5/1QY0BqEiQSQF/W6UrXbOcK9Ac65V0+1+ptQJvreQznAosCjyUjACj35e890toDeq37RFeinM3++VFJqeD5bf5mx5FoJI/Ps0MlydwEeMo/InA==",
                        "CommandID": "BusinessPayment",
                        "Amount": "200",
                        "PartyA": "601342",
                        "PartyB": "254708374149",
                        "Remarks": "please pay",
                        "QueueTimeOutURL": "http://192.168.43.180:8000/api/mpesa/mp_b2c_timeout_url",
                        "ResultURL": "http://192.168.43.180:8000/api/mpesa/mp_b2c_result_url",
                        "Occasion": "endmonth"
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${req.body.access_token}`
                        }
                    });
                res.send(response.data);
            }
            catch (err) {
                res.send(err.response.data);
            }

        }
    ));


//M-PESA Reverse
mpesaRouter.post(
    '/mp_reverse', expressAsyncHandler(
        async (req, res) => {
            const REVERSE_URL = process.env.MPESA_REVERSE_URL;
            try {
                const response = await Axios.post(
                    REVERSE_URL,
                    {
                        "Initiator": "apitest342",
                        "SecurityCredential": "Q9KEnwDV/V1LmUrZHNunN40AwAw30jHMfpdTACiV9j+JofwZu0G5qrcPzxul+6nocE++U6ghFEL0E/5z/JNTWZ/pD9oAxCxOik/98IYPp+elSMMO/c/370Joh2XwkYCO5Za9dytVmlapmha5JzanJrqtFX8Vez5nDBC4LEjmgwa/+5MvL+WEBzjV4I6GNeP6hz23J+H43TjTTboeyg8JluL9myaGz68dWM7dCyd5/1QY0BqEiQSQF/W6UrXbOcK9Ac65V0+1+ptQJvreQznAosCjyUjACj35e890toDeq37RFeinM3++VFJqeD5bf5mx5FoJI/Ps0MlydwEeMo/InA==",
                        "CommandID": "TransactionReversal",
                        "TransactionID": "NLJ11HAY8V",
                        "Amount": "100",
                        "ReceiverParty": "601342",
                        "RecieverIdentifierType": "11",
                        "ResultURL": "http://192.168.43.180:8000/api/mpesa/mp_reverse_result_url",
                        "QueueTimeOutURL": "http://192.168.43.180:8000/api/mpesa/mp_reverse_timeout_url",
                        "Remarks": "Wrong Num",
                        "Occasion": "sent wrongly"
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${req.body.access_token}`
                        }
                    });
                res.send(response.data);
            }
            catch (err) {
                res.send(err.response.data);
            }

        }
    ));

//http://192.168.43.180:8000/api/mpesa/mpesa_confirmation_url
//MPESA Confirmation URL
mpesaRouter.post(
    '/mp_confirmation_url', expressAsyncHandler(
        async (req, res) => {
            res.send(req.body);
        }
    ));

//http://192.168.43.180:8000/api/mpesa/mpesa_validation_url
//MPESA validation URL
mpesaRouter.post(
    '/mp_validation_url', expressAsyncHandler(
        async (req, res) => {
            res.send(req.body);
        }
    ));

//http://192.168.43.180:8000/api/mpesa/mp_reverse_result_url
//MPESA Reversal Result URL
mpesaRouter.post(
    '/mp_reverse_result_url', expressAsyncHandler(
        async (req, res) => {
            res.send(req.body);
        }
    ));

//http://192.168.43.180:8000/api/mpesa/mp_reverse_timeout_url
//MPESA Reversal Timeout URL
mpesaRouter.post(
    '/mp_reverse_timeout_url', expressAsyncHandler(
        async (req, res) => {
            res.send(req.body);
        }
    ));

//http://192.168.43.180:8000/api/mpesa/mp_b2c_result_url
//MPESA B2C Result URL
mpesaRouter.post(
    '/mp_b2c_result_url', expressAsyncHandler(
        async (req, res) => {
            res.send(req.body);
        }
    ));

//http://192.168.43.180:8000/api/mpesa/mp_b2c_timeout_url
//MPESA B2C Timeout URL
mpesaRouter.post(
    '/mp_b2c_timeout_url', expressAsyncHandler(
        async (req, res) => {
            res.send(req.body);
        }
    ));

//http://192.168.43.180:8000/api/mpesa/mp_stk_callback
//MPESA STK CALLBACK URL
mpesaRouter.post(
    '/mp_stk_callback', expressAsyncHandler(
        async (req, res) => {
            res.send(req.body);
        }
    ));

//http://192.168.43.180:8000/api/mpesa/mp_bal_result
//MPESA Balance Result URL
mpesaRouter.post(
    '/mp_bal_result', expressAsyncHandler(
        async (req, res) => {
            res.send(req.body);
        }
    ));

//http://192.168.43.180:8000/api/mpesa/mp_bal_timeout
//MPESA Balance Timeout URL
mpesaRouter.post(
    '/mp_bal_timeout', expressAsyncHandler(
        async (req, res) => {
            res.send(req.body);
        }
    ));

export default mpesaRouter;