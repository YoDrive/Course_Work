using Microsoft.AspNetCore.Mvc;

namespace YoDrive.Helpers;

public static class ImageHelper
{
    public static byte[] GetImage(string? imageName)
    {
        try
        {
            if (imageName == null) return null;
            var currentDirectory = Directory.GetCurrentDirectory();
            var folderPath = Path.Combine(currentDirectory, "../yo_drive_store");
            var filePath = Path.Combine(folderPath, imageName);

            if (File.Exists(filePath))
            {
                return File.ReadAllBytes(filePath);
            }
            return null;
        }
        catch (Exception e)
        {
            return null;
        }
    }
}