package com.entseeker.Service;

import com.entseeker.model.Order;
import com.entseeker.request.OrderRequest;
import com.entseeker.response.PaymentResponse;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PaymentServiceImp implements PaymentService {

    @Autowired
    private OrderService orderService;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;
    @Override
    public PaymentResponse createPaymentLink(OrderRequest order, Long totalPrice) throws StripeException {

        Stripe.apiKey = stripeSecretKey;

        SessionCreateParams params = SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCancelUrl("http://localhost:3000/payment/fail")
                .setSuccessUrl("http://localhost:3000/payment/success/{CHECKOUT_SESSION_ID}")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("eur").setUnitAmount( totalPrice * 100)
                                .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("Alex's Food").build()
                                ).build()
                        ).build()
                ).build();

        Session session = Session.create(params);

        orderService.storeOrderRequest(session.getId(), order);

        PaymentResponse response = new PaymentResponse();
        response.setPaymentUrl(session.getUrl());
        response.setPaymentId(session.getId());

        return response;
    }
}
