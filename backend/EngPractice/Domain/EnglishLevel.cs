using System.Text.Json.Serialization;

namespace EngPractice.Domain
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum EnglishLevel
    {
        A1, A2, B1, B2, C1, C2
    }
}
