import tl = require('azure-pipelines-task-lib/task');

export async function sendMail(SendGridAPIKey: string, senderEmailAddress: string, recipientEmailAddress: string[], emailSubject: string, emailBodyText: string) {
  try {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(SendGridAPIKey);

    console.log('Sending mail from:', senderEmailAddress);
    console.log('Sending mail to:', recipientEmailAddress);
    console.log('mail subject:', emailSubject);

    const msg = {
      to: recipientEmailAddress,
      from: senderEmailAddress,
      subject: emailSubject,
      html: emailBodyText
    };

    await sgMail.sendMultiple(msg);
    console.log('Mail sent successfully');
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
//    console.error('Failed to send mail:', err.message);
  }
}