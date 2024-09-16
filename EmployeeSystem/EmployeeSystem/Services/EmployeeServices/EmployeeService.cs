using EmployeeSystem.Data;
using EmployeeSystem.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeSystem.Services.EmployeeServices
{
    public class EmployeeService : IEmployeeService
    {
        private readonly EmployeeContext _employeeContext;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _environment;

        public EmployeeService(EmployeeContext employeeContext, IConfiguration configuration, IWebHostEnvironment environment)
        {
            _employeeContext = employeeContext;
            _configuration = configuration;
            _environment = environment;
        }

        public async Task<Employee> addEmployee(string Name, string Email, string MobileNumber, string HomeAdress, IFormFile Photo)
        {
            if (Photo == null)
            {
                throw new ArgumentNullException(nameof(Photo), "Photo cannot be null");
            }
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(Photo.FileName);
            var filePath = Path.Combine(_environment.WebRootPath, _configuration["System:FilePath"], uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await Photo.CopyToAsync(fileStream);
            }

            var fileUrl = $"{_configuration["System:FileUrl"]}{uniqueFileName}";

            var employee = new Employee
            {
                Name = Name,
                Email = Email,
                MobileNumber = MobileNumber,
                HomeAddress = HomeAdress,
                Photo = fileUrl,
            };

            await _employeeContext.AddAsync(employee);
            await _employeeContext.SaveChangesAsync();

            return employee;
        }


        public async Task<bool> deleteEmployee(Guid employeeId)
        {
            var employee = await _employeeContext.Employees.FirstOrDefaultAsync(e => e.EmployeeId == employeeId);

            if (employee == null)
            {
                return false;
            }

            _employeeContext.Employees.Remove(employee);
            _employeeContext.SaveChanges();

            return true;
        }

        public async Task<Employee> getEmployeeById(Guid employeeId)
        {
            return await _employeeContext.Employees.FirstOrDefaultAsync(e => e.EmployeeId == employeeId);
        }

        public async Task<List<Employee>> getEmployees()
        {
            return await _employeeContext.Employees.ToListAsync();
        }

        public async Task<Employee> updateEmployee(Guid employeeId, string Name, string Email, string MobileNumber, string HomeAdress, IFormFile Photo)
        {
            var employee = await _employeeContext.Employees.FirstOrDefaultAsync(e => e.EmployeeId == employeeId);

            if (employee == null)
            {
                return null;
            }

            if (Photo != null && Photo.Length > 0)
            {
                var uniqueFileName = Guid.NewGuid().ToString() + "_" + Photo.FileName;
                var filePath = Path.Combine(_environment.WebRootPath, "uploads", uniqueFileName);
                var filesPath = _configuration["System:FilePath"];
                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await Photo.CopyToAsync(fileStream);
                }
                employee.Photo = $"{filesPath}{uniqueFileName}";
            }

            employee.Name = Name;
            employee.Email = Email;
            employee.MobileNumber = MobileNumber;
            employee.HomeAddress = HomeAdress;

            _employeeContext.Employees.Update(employee);
            await _employeeContext.SaveChangesAsync();

            return employee;
        }

    }
}
