import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/commonService.service';
import Razorpay from 'razorpay';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {


  @ViewChild('paypal', { static: true }) paymentRef!: ElementRef;
  id: any;
  constructor(private router: Router, private commonService: AuthenticationService, private route: ActivatedRoute) {
    
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    console.log(window.paypal);
    window.paypal.Buttons({
      style: {
        layout: 'horizontal',
        color: 'blue',
        shape: 'rect',
        label: 'paypal'
      },
      createOrder: (data: any, action: any) => {
        return action.order.create({
          purchase_units: [
            {
              amount: {
                value: "5",
                currency_code: "USD"
              }
            }
          ]
        })
      },
      onApprove: (data: any, action: any) => {
        return action.order.capture().then((details: any) => {
          console.log(details)
          if (details.status == "COMPLETED")
            this.router.navigate(["/success"])
        });
      },
      onError: (error: any) => {
        console.log(error)
      }
    }
    ).render(this.paymentRef.nativeElement);
  };
 

  payNow() {
    let currrent = this;
    this.commonService.createOrder(500).subscribe((data: any) => {
      console.log(data, "order")
      const options = {
        key: 'rzp_test_hLoSbQq7gnxAJY', // Your Razorpay Key ID
        amount: 500,
        currency: 'INR',
        name: 'Payment of your booking',
        description: 'Transaction',
        order_id: data.orderId,
        handler: function (response: any) {
          console.log('Payment ID:', response.razorpay_payment_id);
          console.log('Order ID:', response.razorpay_order_id);
          console.log('Signature:', response.razorpay_signature);
          currrent.updatePaymentStatus();
          
        },
        prefill: {
          name: 'Rivya',
          email: 'rivya@gmail..com',
          contact: '9999999999',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    })
   
  
}

  updatePaymentStatus() {
    this.commonService.updatePaymentStatus(this.id).subscribe((data) => {
      console.log(data)
      this.router.navigate(["/success"])
    })
  }
  back() { }
}
