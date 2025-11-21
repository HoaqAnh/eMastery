namespace EngPractice.Domain
{
    public class Conversation
    {
        public string Question { get; set; } 
        public List<ChatMessage> ChatHistory { get; set; } = new List<ChatMessage>(); 
    }
}
