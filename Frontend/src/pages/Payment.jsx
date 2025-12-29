import { useLocation, Navigate } from "react-router-dom";
import PaymentLayout from "../components/payment/PaymentLayout";

function Payment() {
  const { state } = useLocation();

  // Guard: no direct access
  if (!state?.orderId || !state?.amount) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Helmet>
        <title>Payment | Raj Enterprise</title>
      </Helmet>
      <div>
        <PaymentLayout orderId={state.orderId} amount={state.amount} />
      </div>
    </>
  );
}

export default Payment;
