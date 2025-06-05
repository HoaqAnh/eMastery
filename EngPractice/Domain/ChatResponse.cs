namespace EngPractice.Domain
{
    public class ChatResponse
    {
        public string MessageInMarkdown { get; set; }
        public List<string> Suggestions { get; set; }
    }
}
