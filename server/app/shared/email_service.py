import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask import current_app

class EmailService:
    def send_email(self, to_email, subject, html_content):
        msg = MIMEMultipart()
        msg['From'] = current_app.config['SMTP_USERNAME']
        msg['To'] = to_email
        msg['Subject'] = subject

        msg.attach(MIMEText(html_content, 'html'))
        
        try:
            # Connect to Gmail SMTP server using TLS
            with smtplib.SMTP(current_app.config['SMTP_SERVER'], current_app.config['SMTP_PORT']) as server:
                server.ehlo()
                server.starttls()
                server.ehlo()
                server.login(current_app.config['SMTP_USERNAME'], current_app.config['SMTP_PASSWORD'])
                server.send_message(msg)
        except Exception as e:
            current_app.logger.error(f"Failed to send email to {to_email}: {e}")
            raise e
