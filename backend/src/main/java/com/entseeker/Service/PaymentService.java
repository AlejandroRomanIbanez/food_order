package com.entseeker.Service;

import com.entseeker.model.Order;
import com.entseeker.request.OrderRequest;
import com.entseeker.response.PaymentResponse;
import com.stripe.exception.StripeException;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentService {

    public PaymentResponse createPaymentLink(OrderRequest req, Long totalPrice) throws StripeException;
}
