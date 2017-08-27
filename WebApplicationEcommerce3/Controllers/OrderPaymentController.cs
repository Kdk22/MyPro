using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Controllers.Models;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class OrderPaymentController : Controller
    {
        OrderPaymentDB OrderPaymentDB = new OrderPaymentDB();
        // GET: OrderPayment
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(OrderPaymentDB.GetAllOrderPayment(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(OrderPayment OrderPayment)
        {
            return Json(OrderPaymentDB.Add(OrderPayment), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int OPId)
        {
            var OrderPayment = OrderPaymentDB.GetAllOrderPayment().Find(x => x.OPId.Equals(OPId));
            return Json(OrderPayment, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(OrderPayment OrderPayment)
        {
            return Json(OrderPaymentDB.Update(OrderPayment), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int OPId)
        {
            return Json(OrderPaymentDB.Delete(OPId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(OrderPayment OrderPayment)
        {
            return Json(OrderPaymentDB.SearchOrderPayment(OrderPayment), JsonRequestBehavior.AllowGet);
        }
    }
}