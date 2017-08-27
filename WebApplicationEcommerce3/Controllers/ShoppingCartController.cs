using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class ShoppingCartController : Controller
    {
        // GET: ShoppingCart
        ShoppingCartDB ShoppingCartDB = new ShoppingCartDB();
        // GET: ShoppingCarts
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(ShoppingCartDB.GetAllShoppingCart(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(ShoppingCart ShoppingCart)
        {
            return Json(ShoppingCartDB.Add(ShoppingCart), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int CartId)
        {
            var ShoppingCart = ShoppingCartDB.GetAllShoppingCart().Find(x => x.CartId.Equals(CartId));
            return Json(ShoppingCart, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(ShoppingCart ShoppingCart)
        {
            return Json(ShoppingCartDB.Update(ShoppingCart), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int CartId)
        {
            return Json(ShoppingCartDB.Delete(CartId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(ShoppingCart ShoppingCart)
        {
            return Json(ShoppingCartDB.SearchShoppingCart(ShoppingCart), JsonRequestBehavior.AllowGet);
        }
    }
}