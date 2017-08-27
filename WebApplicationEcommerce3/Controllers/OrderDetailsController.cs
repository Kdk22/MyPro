using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Controllers.Models;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class OrderDetailsController : Controller
    {
        OrderDetailsDB OrderDetailsDB = new OrderDetailsDB();
        // GET: OrderDetails
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(OrderDetailsDB.GetAllOrderDetails(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(OrderDetails OrderDetails)
        {
            return Json(OrderDetailsDB.Add(OrderDetails), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int OrderDetailId)
        {
            var OrderDetails = OrderDetailsDB.GetAllOrderDetails().Find(x => x.OrderDetailId.Equals(OrderDetailId));
            return Json(OrderDetails, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(OrderDetails OrderDetails)
        {
            return Json(OrderDetailsDB.Update(OrderDetails), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int OrderDetailId)
        {
            return Json(OrderDetailsDB.Delete(OrderDetailId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(OrderDetails OrderDetails)
        {
            return Json(OrderDetailsDB.SearchOrderDetails(OrderDetails), JsonRequestBehavior.AllowGet);
        }
    }
}