using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class WishList
    {
        public int WishListId { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public DateTime InsertDate { get; set; }
        public string Image { get; set; }
    }
}