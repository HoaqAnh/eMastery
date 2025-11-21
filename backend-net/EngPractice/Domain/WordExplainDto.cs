using Microsoft.AspNetCore.Mvc;

namespace EngPractice.Domain
{
    public class WordExplanationDto
    {
        public string Pronunciation { get; set; }
        public string Meaning { get; set; }
        public string GrammarUsage { get; set; }
        public string PhrasesAndIdioms { get; set; }
        public string SynonymsAndAntonyms { get; set; }
        public string FunFactsAndTips { get; set; }
        public string Summary { get; set; }
    }
}
