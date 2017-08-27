using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Controllers.Models
{
    public class OrderPayment
    {
        public int OPId { get; set; }
        public int OrderId { get; set; }
        public int PaymentId { get; set; }
        public string PaymentType { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
    }
}