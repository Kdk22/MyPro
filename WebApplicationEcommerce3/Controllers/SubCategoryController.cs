using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class SubCategoryController : Controller
    {
        SubCategoryDB SubCategoryDB = new SubCategoryDB();
        // GET: SubCategory
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(SubCategoryDB.GetAllSubCategory(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(SubCategory SubCategory)
        {
            return Json(SubCategoryDB.Add(SubCategory), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int SubCategoryId)
        {
            var SubCategory = SubCategoryDB.GetAllSubCategory().Find(x => x.SubCategoryId.Equals(SubCategoryId));
            return Json(SubCategory, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(SubCategory SubCategory)
        {
            return Json(SubCategoryDB.Update(SubCategory), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int SubCategoryId)
        {
            return Json(SubCategoryDB.Delete(SubCategoryId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(SubCategory SubCategory)
        {
            return Json(SubCategoryDB.SearchSubCategory(SubCategory), JsonRequestBehavior.AllowGet);
        }
    }
}