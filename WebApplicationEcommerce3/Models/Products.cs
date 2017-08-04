using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class Products
    {
        public int ProductId { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public int SupplierId { get; set; }
        public string ProductName { get; set; }
        public int PurchasePrice { get; set; }
        public int SalesPrice { get; set; }
        public int Quantity { get; set; }
        public int ReorderLevel { get; set; }
        public int DiscountAvailable { get; set; }
        public string Color { get; set; }
        public string Size { get; set; }
        public int Stock { get; set; }
        public String Other1 { get; set; }
        public string Other2 { get; set; }

        public string Image { get; set; }


    }
}