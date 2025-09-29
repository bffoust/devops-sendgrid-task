import tl = require('azure-pipelines-task-lib/task');

export async function sendMail(SendGridAPIKey: string, senderEmailAddress: string, recipientEmailAddress: string[], ccEmailAddress:string[], bccEmailAddress: string[], emailSubject: string, emailBodyText: string, sendAsHTML: Boolean) {
  try {
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(SendGridAPIKey);

    console.log('Sending mail from:', senderEmailAddress);
    console.log('Sending mail to:', recipientEmailAddress);
    console.log('cc mail to:', ccEmailAddress);
    console.log('bcc mail to:', bccEmailAddress);
    console.log('mail subject:', emailSubject);

    const msg = {
      to: recipientEmailAddress,
      cc: ccEmailAddress,
      bcc: bccEmailAddress,
      from: senderEmailAddress,
      subject: emailSubject,
      ...(sendAsHTML ? { html: emailBodyText } : { text: emailBodyText })
    };

    await sgMail.sendMultiple(msg);
    console.log('Mail sent successfully');
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}