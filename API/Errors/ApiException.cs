namespace API.Errors;

public class ApiException
{
    public ApiException(int statusCode, string message = null, string details = null)
    {
        StatusCode = statusCode;
        Message = message ?? GetDefaultMessageForStatusCode(statusCode);
        Details = details;
    }

    public int StatusCode { get; }
    public string Message { get; }
    public string Details { get; }

    private string GetDefaultMessageForStatusCode(int statusCode)
    {
        return statusCode switch
        {
            400 => "A bad request was made.",
            401 => "Unauthorized access.",
            404 => "The requested resource was not found.",
            500 => "An internal server error occurred.",
            _ => "An unexpected error occurred."
        };
    }
}   