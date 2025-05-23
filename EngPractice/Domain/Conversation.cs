namespace EngPractice.Domain
{
    public class Conversation
    {
        public string Question { get; set; } 
        public List<ChatMessage> ChatHistory { get; set; } = new List<ChatMessage>(); 
        public List<string>? ImagesAsBase64 { get; set; } 
    }
}
