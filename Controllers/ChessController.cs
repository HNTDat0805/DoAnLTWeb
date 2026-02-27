using Microsoft.AspNetCore.Mvc;

namespace Boardgame.Controllers
{
    public class ChessController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
