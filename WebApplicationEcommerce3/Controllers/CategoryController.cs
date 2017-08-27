using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplicationEcommerce3.Models;

namespace WebApplicationEcommerce3.Controllers
{
    public class CategoryController : Controller
    {
        CategoryDB CategoryDB = new CategoryDB();
        // GET: Category
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult List()
        {
            return Json(CategoryDB.GetAllCategory(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Add(Category Category)
        {
            return Json(CategoryDB.Add(Category), JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetbyID(int CategoryId)
        {
            var Category = CategoryDB.GetAllCategory().Find(x => x.CategoryId.Equals(CategoryId));
            return Json(Category, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Update(Category Category)
        {
            return Json(CategoryDB.Update(Category), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int CategoryId)
        {
            return Json(CategoryDB.Delete(CategoryId), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Search(Category Category)
        {
            return Json(CategoryDB.SearchCategory(Category), JsonRequestBehavior.AllowGet);
        }

    }
}