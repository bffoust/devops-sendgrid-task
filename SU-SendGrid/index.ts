import tl = require('azure-pipelines-task-lib/task');
import { sendMail } from './mail';

export async function getInputs() {
  try {
    const SendGridAPIKey: string | undefined = tl.getInput('SendGridAPIKey', true);
    const senderEmailAddress: string | undefined = tl.getInput('senderEmailAddress', true);
    const recipientEmailAddress: string | undefined = tl.getInput('recipientEmailAddress', true);
    const emailSubject: string | undefined = tl.getInput('emailSubject', true);
    const emailBody: string | undefined = tl.getInput('emailBody', true);


    if (!SendGridAPIKey || !senderEmailAddress || !recipientEmailAddress || !emailSubject || !emailBody) {
      throw new Error('One or more required inputs are missing.');
    }

    return { SendGridAPIKey, senderEmailAddress, recipientEmailAddress, emailSubject, emailBody };
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
    throw err;
  }
}

async function run() {
  try {
    const { SendGridAPIKey, senderEmailAddress, recipientEmailAddress, emailSubject, emailBody} = await getInputs();
    console.log('APIKey:', SendGridAPIKey);
    console.log('Send mail from:', senderEmailAddress);
    console.log('Send mail to:', recipientEmailAddress);
    console.log('mail subject:', emailSubject);
    console.log('mail body:', emailBody);

    // Call the sendMail function
    await sendMail(SendGridAPIKey, senderEmailAddress, recipientEmailAddress, emailSubject, emailBody);
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();