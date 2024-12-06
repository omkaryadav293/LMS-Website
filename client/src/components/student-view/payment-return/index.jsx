

import React, { useEffect, useState } from 'react'
import { LiaPlaystation } from 'react-icons/lia';
import { useLocation } from 'react-router-dom';
import { captureAndFinalizePaymentService } from '../../../services';
import Header from '../home/header';

const PaypalPaymentReturnPage = () => {
 const location = useLocation();
 const params = new URLSearchParams(location.search);
 const paymentId = params.get("paymentId");
 const payerId = params.get("PayerID");
 
 

 useEffect(() => {
    
    if(paymentId && payerId){
        async function capturePayment() {
            const orderId= JSON.parse(sessionStorage.getItem("currentOrderId"));
            const response = await captureAndFinalizePaymentService(paymentId, payerId,orderId);
         
            if(response.success){
                sessionStorage.removeItem("currentOrderId");
                window.location.href = "/student-courses"
            }
        }
        capturePayment();
    }

 }, [paymentId, payerId])
 

  return (
    <div>
      <Header color/>
        <h2 style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height:"100vh"

        }}>Processing payment... Please wait</h2>
    </div>
  )
}

export default PaypalPaymentReturnPage
