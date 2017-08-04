using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class SupplierController : Controller
    {
        SupplierDB SupplierDB = new SupplierDB();
        // GET: Supplier
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(SupplierDB.GetAllSupplier(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Supplier Supplier)
        {
            return Json(SupplierDB.Add(Supplier), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int SupplierId)
        {
            var Supplier = SupplierDB.GetAllSupplier().Find(x => x.SupplierId.Equals(SupplierId));
            return Json(Supplier, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Supplier Supplier)
        {
            return Json(SupplierDB.Update(Supplier), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int SupplierId)
        {
            return Json(SupplierDB.Delete(SupplierId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(Supplier Supplier)
        {
            return Json(SupplierDB.SearchSupplier(Supplier), JsonRequestBehavior.AllowGet);
        }
    }
}