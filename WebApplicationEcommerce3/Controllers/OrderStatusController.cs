using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class OrderStatusController : Controller
    {
        OrderStatusDB OrderStatusDB = new OrderStatusDB();
        // GET: OrderStatus
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(OrderStatusDB.GetAllOrderStatus(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(OrderStatus OrderStatus)
        {
            return Json(OrderStatusDB.Add(OrderStatus), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int StatusId)
        {
            var OrderStatus = OrderStatusDB.GetAllOrderStatus().Find(x => x.StatusId.Equals(StatusId));
            return Json(OrderStatus, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(OrderStatus OrderStatus)
        {
            return Json(OrderStatusDB.Update(OrderStatus), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int StatusId)
        {
            return Json(OrderStatusDB.Delete(StatusId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(OrderStatus OrderStatus)
        {
            return Json(OrderStatusDB.SearchOrderStatus(OrderStatus), JsonRequestBehavior.AllowGet);
        }
    }
}