using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class OrderController : Controller
    {

        OrderDB OrderDB = new OrderDB();
        // GET: Order
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(OrderDB.GetAllOrder(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Order Order)
        {
            return Json(OrderDB.Add(Order), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int OrderId)
        {
            var Order = OrderDB.GetAllOrder().Find(x => x.OrderId.Equals(OrderId));
            return Json(Order, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Order Order)
        {
            return Json(OrderDB.Update(Order), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int OrderId)
        {
            return Json(OrderDB.Delete(OrderId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(Order Order)
        {
            return Json(OrderDB.SearchOrder(Order), JsonRequestBehavior.AllowGet);
        }
    }
}