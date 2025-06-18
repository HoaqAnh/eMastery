using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace EngPractice.Service
{
    public class EmailService 
    {
        private readonly IConfiguration _configuration;
        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public async Task SendFeedbackAsync(string name, string messageContent)
        {
            var emailSettings = _configuration.GetSection("EmailSettings");

            var message = new MimeMessage();
            message.From.Add(new MailboxAddress(
                emailSettings["SenderName"],
                emailSettings["SenderEmail"]
            ));
            message.To.Add(new MailboxAddress("Admin", emailSettings["ReceiverEmail"]));
            message.Subject = "Góp ý từ người dùng";
            var htmlBody = $@"
                <html>
                    <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
                        <h2 style='color: #2e6c80;'>📬 Góp ý từ người dùng</h2>
                        <p><strong>👤 Người gửi:</strong> {System.Net.WebUtility.HtmlEncode(name)}</p>
                        <hr />
                        <p><strong>📝 Nội dung góp ý:</strong></p>
                        <div style='padding: 10px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 5px;'>
                            {System.Net.WebUtility.HtmlEncode(messageContent).Replace("\n", "<br />")}
                        </div>
                    </body>
                </html>";
            message.Body = new TextPart("html")
            {
                Text = htmlBody
            };

            using var smtp = new SmtpClient();
            await smtp.ConnectAsync(emailSettings["SmtpServer"], int.Parse(emailSettings["SmtpPort"]), SecureSocketOptions.StartTls);
            await smtp.AuthenticateAsync(emailSettings["SenderEmail"], emailSettings["SenderPassword"]);
            await smtp.SendAsync(message);
            await smtp.DisconnectAsync(true);
        }
    }
}
