using System.ComponentModel.DataAnnotations;

namespace EmployeeSystem.Models
{
    public class Entity
    {
        [Key]
        public Guid EmployeeId { get; set; } = Guid.NewGuid();
    }
}
