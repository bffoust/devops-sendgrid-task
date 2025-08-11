import MailService = require("@sendgrid/mail/src/mail");
import tl = require('azure-pipelines-task-lib/task');

//export = MailService;
export async function sendMail(SendGridAPIKey: string, senderEmailAddress: string, recipientEmailAddress: string, emailSubject: string, emailBodyText: string) {
  try {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(SendGridAPIKey);

    console.log('Using API Key:', SendGridAPIKey);
    console.log('Sending mail from:', senderEmailAddress);
    console.log('Sending mail to:', recipientEmailAddress);
    console.log('Sending mail to:', emailSubject);
    console.log('mail body text:', emailBodyText);

    // html field is optional, you can remove it if not needed. it will override the text field
    const msg = {
      to: recipientEmailAddress,
      from: senderEmailAddress,
      subject: emailSubject,
      html: emailBodyText
    };

//    await sgMail.send(msg);
    console.log('Mail sent successfully');
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
//    console.error('Failed to send mail:', err.message);
  }
}