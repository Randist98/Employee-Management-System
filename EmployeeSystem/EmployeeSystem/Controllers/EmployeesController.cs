using EmployeeSystem.DTO.Requests.Employee;
using EmployeeSystem.Services.EmployeeServices;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeSystem.Controllers
{
    [ApiController]
    [Route("/api")]
    public class EmployeesController : Controller
    {
        private readonly IEmployeeService _employeeService;

        public EmployeesController( IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpPost("employee")]
        public async Task<IActionResult> addEmployee([FromForm] addEmployeeRequest employeeDto)
        {

            try
            {
                if (employeeDto.Photo == null || employeeDto.Photo.Length == 0)
                {
                    return BadRequest("A photo is required.");
                }

                var employee = await _employeeService.addEmployee(
                    employeeDto.Name,
                    employeeDto.Email,
                    employeeDto.MobileNumber,
                    employeeDto.HomeAddress,
                    employeeDto.Photo
                );

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("employees")]
        public async Task<IActionResult> getAllEmployees()
        {
            var employees = await _employeeService.getEmployees();
            return Ok(employees);
        }

        [HttpGet("{employeeId}")]
        public async Task<IActionResult> getEmployeeById(Guid employeeId)
        {
            var employee = await _employeeService.getEmployeeById(employeeId);

            if (employee == null)
            {
                return NotFound(new { Message = $"Employee not found." });
            }

            return Ok(employee);
        }
        [HttpPut("employee/{employeeId}")]
        public async Task<IActionResult> updateEmployee(Guid employeeId, [FromForm] updateEmployeeRequest employeeDto)
        {
            try
            {
                var employee = await _employeeService.updateEmployee(
                    employeeId,
                    employeeDto.Name,
                    employeeDto.Email,
                    employeeDto.MobileNumber,
                    employeeDto.HomeAddress,
                    employeeDto.Photo
                );

                if (employee == null)
                {
                    return NotFound(new { Message = $"Employee not found." });
                }

                return Ok(employee);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{employeeId}")]
        public async Task<IActionResult> deleteEmployee(Guid employeeId)
        {
            try
            {
                var employee = await _employeeService.deleteEmployee(employeeId);

                if (employee == null)
                {
                    return NotFound(new { Message = "Employee not found" });
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
    }
