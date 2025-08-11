import tl = require('azure-pipelines-task-lib/task');
import { sendMail } from './mail';
import * as fs from 'fs';

export async function getInputs() {
  try {
    const SendGridAPIKey: string | undefined = tl.getInput('SendGridAPIKey', true);
    const senderEmailAddress: string | undefined = tl.getInput('senderEmailAddress', true);
    const recipientEmailAddress: string | undefined = tl.getInput('recipientEmailAddress', true);
    const emailSubject: string | undefined = tl.getInput('emailSubject', true);
    const emailBody: string | undefined = tl.getInput('emailBody', true);
    const emailBodyText: string | undefined = tl.getInput('emailBodyText', false);
    const emailBodyFilePath: string | undefined = tl.getInput('emailBodyFile', false);
    let bodyText = '';

    if (!SendGridAPIKey || !senderEmailAddress || !recipientEmailAddress || !emailSubject || !emailBody) {
      throw new Error('One or more required inputs are missing.');
    }

    const normalizedEmailBody = emailBody.toLowerCase();

    if (normalizedEmailBody === 'file' && emailBodyFilePath) {
      bodyText = fs.readFileSync(emailBodyFilePath, 'utf8');
    } else if (normalizedEmailBody === 'text' && emailBodyText) {
      bodyText = emailBodyText;
    } else {
      throw new Error('Email body is required but not provided.');
    }

    return { SendGridAPIKey, senderEmailAddress, recipientEmailAddress, emailSubject, bodyText };
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
    throw err;
  }
}

async function run() {
  try {
    const { SendGridAPIKey, senderEmailAddress, recipientEmailAddress, emailSubject, bodyText } = await getInputs();
    // Call the sendMail function
    await sendMail(SendGridAPIKey, senderEmailAddress, recipientEmailAddress, emailSubject, bodyText);
  } catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }
}

run();