using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class ProductsController : Controller
    {
        ProductsDB ProductDB = new ProductsDB();
        // GET: Products
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(ProductDB.GetAllProducts(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Products Product)
        {
            return Json(ProductDB.Add(Product), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int ProductId)
        {
            var Product = ProductDB.GetAllProducts().Find(x => x.ProductId.Equals(ProductId));
            return Json(Product, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Products Product)
        {
            return Json(ProductDB.Update(Product), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int ProductId)
        {
            return Json(ProductDB.Delete(ProductId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(Products Product)
        {
            return Json(ProductDB.SearchProducts(Product), JsonRequestBehavior.AllowGet);
        }
    }
}