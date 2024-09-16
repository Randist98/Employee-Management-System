using System.ComponentModel.DataAnnotations;

namespace EmployeeSystem.DTO.Requests.Employee
{
    public class addEmployeeRequest
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [Phone]
        public string MobileNumber { get; set; }

        [Required]
        public string HomeAddress { get; set; }

        public IFormFile Photo { get; set; }
    }
}
