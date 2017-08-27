using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class OrderStatus
    {
        public int StatusId { get; set; }
        public int OrderId { get; set; }
        public string OSName { get; set; }
        public string Description { get; set; }
        public string Active { get; set; }
    }
}