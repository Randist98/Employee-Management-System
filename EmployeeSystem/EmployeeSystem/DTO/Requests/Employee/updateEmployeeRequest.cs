namespace EmployeeSystem.DTO.Requests.Employee
{
    public class updateEmployeeRequest
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public string HomeAddress { get; set; }
        public IFormFile Photo { get; set; }
    }
}
