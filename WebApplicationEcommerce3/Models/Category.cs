using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplicationEcommerce3.Models
{
    public class Category
    {
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public string Image { get; set; }
    }
}