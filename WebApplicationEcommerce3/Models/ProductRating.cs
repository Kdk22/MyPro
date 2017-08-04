using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Controllers.Models
{
    public class ProductRating
    {
        public int ProductRatingId { get; set; }
        public int CustomerId { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Active { get; set; }
    }
}