using System.Threading.Tasks;

namespace Letsridein.Controllers
{
    public interface ISmsSender
    {
        string SendSmsAsync(string number, string message);
    }
}