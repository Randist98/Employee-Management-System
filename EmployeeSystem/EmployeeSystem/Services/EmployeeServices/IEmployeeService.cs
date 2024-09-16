using EmployeeSystem.Models;

namespace EmployeeSystem.Services.EmployeeServices
{
    public interface IEmployeeService
    {
        Task<Employee> addEmployee(string Name, string Email, string MobileNumber, string HomeAdress, IFormFile Photo);
        Task<List<Employee>> getEmployees();
        Task<Employee> getEmployeeById(Guid employeeId);
        Task<Employee> updateEmployee(Guid employeeId, string Name, string Email, string MobileNumber, string HomeAdress, IFormFile Photo);
        Task<bool> deleteEmployee(Guid employeeId);
    }
}
