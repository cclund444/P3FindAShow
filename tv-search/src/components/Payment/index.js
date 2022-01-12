// import React, {useEffect} from 'react'
// import { loadStripe } from '@stripe/stripe-js';
// import { useLazyQuery } from '@apollo/client';
// import { QUERY_CHECKOUT } from '../../utils/queries';


// const stripePromise = loadStripe('pk_test_51KHAiCJK2oG8PDOHa0lyWOB99AreQf4PLpJBXKAxtuQc09ZWqzQCnWVl35phiDG0JAqDAW1dcOCjo3CclHlozE1S00tlEYrCuE');

// const Payment = () => {
// const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);


// useEffect(() => {
//     stripePromise.then((res) => {
//         res.redirectToCheckout({ sessionId: data.checkout.session})
//     })
//  });

// function checkout() {
//     getCheckout({
//         variables: { donation: donationId }
//     })
// }


 

//  return (
//      <div>
//          <button onClick={checkout}>DONATE!</button>
//      </div>
//  )

// }

// export default Payment;