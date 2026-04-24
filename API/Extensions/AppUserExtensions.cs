using API.Entities;
using DatingApp.API.Interfaces;

public static class AppUserExtensions
{
    public static UserDto ToDto(this AppUser user, ITokenService tokenService)
    {
        return new UserDto
        {
            Id = user.Id,
            DisplayName = user.DisplayName,
            Token = tokenService.CreateToken(user),
            ImageUrl =user.ImageUrl,
            Email = user.Email
        };
    }
}