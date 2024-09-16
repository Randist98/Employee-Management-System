using System.ComponentModel.DataAnnotations;

namespace EmployeeSystem.Models
{
    public class Employee: Entity
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

        [Required]
        public string Photo { get; set; }
    }
}
