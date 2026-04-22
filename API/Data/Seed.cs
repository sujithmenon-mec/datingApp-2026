using System.Text;
using System.Text.Json;
using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using API.DTOs;
using API.Entities; 


namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(AppDbContext context)
    {
        if (await context.Users.AnyAsync()) return;

        var memberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var members = JsonSerializer.Deserialize<List<SeedDto>>(memberData);

        if (members == null) return;

        foreach (var member in members)
        {
            using var hmac = new HMACSHA512();
            var user = new AppUser
            {
                Id = member.Id,
                DisplayName = member.DisplayName,
                Email = member.Email,
                ImageUrl = member.ImageUrl,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd")),
                PasswordSalt = hmac.Key,
                Member = new Member
                {
                    Id = member.Id,
                    DisplayName = member.DisplayName,
                    Description = member.Description,
                    DateOfBirth = member.DateOfBirth,
                    ImageUrl = member.ImageUrl,
                    Gender = member.Gender,
                    City = member.City,
                    Country = member.Country,
                    Created = member.Created,
                    LastActive = member.LastActive,
                }
            };

            user.Member.Photos.Add(new Photo
            {
                MemberId = member.Id,
                Url = member.ImageUrl,
            });
            context.Users.Add(user);
        }

        await context.SaveChangesAsync();
    }
}