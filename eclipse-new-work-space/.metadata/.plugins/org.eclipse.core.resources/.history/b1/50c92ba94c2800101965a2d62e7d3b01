package com.woodconnectApp.woodconnectApp.controller;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stripe.model.PaymentIntent;
import com.woodconnectApp.woodconnectApp.dto.DeliveredDTO;
import com.woodconnectApp.woodconnectApp.dto.OrderDetailsDTO;
import com.woodconnectApp.woodconnectApp.dto.OrderRequest;
import com.woodconnectApp.woodconnectApp.dto.OrderTableDTO;
import com.woodconnectApp.woodconnectApp.entity.OrderDetails;
import com.woodconnectApp.woodconnectApp.entity.OrderTable;
import com.woodconnectApp.woodconnectApp.entity.Product;
import com.woodconnectApp.woodconnectApp.entity.Transaction;
import com.woodconnectApp.woodconnectApp.entity.User;
import com.woodconnectApp.woodconnectApp.repository.ProductRepository;
import com.woodconnectApp.woodconnectApp.repository.UserRepository;
import com.woodconnectApp.woodconnectApp.service.impl.OrderTableServiceImpl;


@RestController
@CrossOrigin(origins = "http://localhost:3000,http://localhost:8081", maxAge = 3600)
public class orderTableController {
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		

	}
	@Autowired
    private OrderTableServiceImpl orderTableServices;
	
	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/create-order")
    public Integer createOrderTable(@RequestBody OrderRequest  orderRequest) {
       OrderTable order = new OrderTable();
       order.setAdvanced_amount(orderRequest.getAdvanced_amount());
       order.setTotal_amount(orderRequest.getTotalAmount());
       order.setStatus(orderRequest.getOrderStatus());
       order.setOrderDate(orderRequest.getOrderDate());
       order.setPaymentStatus(orderRequest.getPaymentStatus());
//       User user =  userRepository.findById(orderRequest.getUserId()).get();
//       order.setUser(user);
       Product product = productRepository.findById(orderRequest.getProductId()).get();
       OrderDetails orderDetails = new OrderDetails(); 
       orderDetails.setQuantity(orderRequest.getQuantity());
       orderDetails.setOrderTable(order); // Set the order reference
       orderDetails.setProduct(product); // Set the product reference
       return orderTableServices.createOrderTable(order,orderDetails,orderRequest);
    }
	
	@PutMapping("/update-orderTable/{id}")
	public ResponseEntity<Void> updateOrderTableStatus(@PathVariable Integer id, @RequestParam("driver_id") Integer driver_id, @RequestParam(name="deliverydate",required = false) String deliverydate) {
    	
		orderTableServices.updateDriver(id,driver_id,deliverydate);
        return ResponseEntity.noContent().build();
    }
	
	@GetMapping("/get-orders")
	public ResponseEntity<List<OrderTableDTO>> getOders(){
		return ResponseEntity.ok(orderTableServices.getOrders());
	} 
	
	@GetMapping("/get-orderDetails")
    public OrderDetailsDTO getorderDetails(@RequestParam Integer id) {
        return orderTableServices.getOrderDetails(id);
    }
	
	@GetMapping("/get-orderId")
    public Integer getOrderId(@RequestParam Integer id) {
        return orderTableServices.getOrderId(id);
    }
	  
	@PutMapping("/update-status/{id}")
	public ResponseEntity<Void> updateOrderStatus(@PathVariable Integer id, @RequestParam("status") String status) {
    	
		orderTableServices.updateStatus(id,status);
        return ResponseEntity.noContent().build();
    }
	
	@PostMapping("/create-transaction")
    public Transaction createTransaction(@RequestParam("amount") Double amount) {
       System.out.print(amount+"PPPPPPPPPPPPPPPPPPPPPPPPPPpp");
       return orderTableServices.createTransaction(amount);
    }
	
	@PostMapping("/create-payment-intent")
    public ResponseEntity<?> createPaymentIntent(@RequestParam int amount) {
        try {
        	System.out.print("PPPPPP:"+amount);
            PaymentIntent paymentIntent = orderTableServices.createPaymentIntent(amount);

        	System.out.print("PPPPPP:"+paymentIntent);
            return ResponseEntity.ok(paymentIntent);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating payment intent: " + e.getMessage());
        }
    }
	
	@GetMapping("/get-delivered-orders")
	public ResponseEntity<List<DeliveredDTO>> getDeliveredOrder(){
//		LocalDate localDate = LocalDate.parse(startDate);
//		LocalDate localDate1 = LocalDate.parse(endDate);
		return ResponseEntity.ok(orderTableServices.getOrderDelivered());
	}
}
