using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class ShoppingCart
    {
        public int CartId { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public DateTime Date { get; set; }
        public int Quantity { get; set; }
        public int Price { get; set; }
    }
}