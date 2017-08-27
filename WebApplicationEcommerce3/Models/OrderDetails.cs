using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Controllers.Models
{
    public class OrderDetails
    {
        public int OrderDetailId { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int ProductPrice { get; set; }
        public int Quantity { get; set; }
        public int Discount { get; set; }
        public int Tax { get; set; }
        public int Total { get; set; }
        public string Active { get; set; }
       
    }
}