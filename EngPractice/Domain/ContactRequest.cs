using Microsoft.AspNetCore.Mvc;

namespace EngPractice.Domain
{
    public class ContactRequest 
    {
        public string Name { get; set; }
        public string Message { get; set; }
    }
}
