import tl = require('azure-pipelines-task-lib/task');

async function run() {
  try {
    const inputString1: string | undefined = tl.getInput('SendGridAPIKey', true);
    if (inputString1 == 'bad') {
      tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
      return;
    }
    console.log('APIKey:', inputString1);
  }
  catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }

  try {
    const inputString2: string | undefined = tl.getInput('senderEmailAddress', true);
    if (inputString2 == 'bad') {
      tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
      return;
    }
    console.log('Send mail from:', inputString2);
  }
  catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }

  try {
    const inputString3: string | undefined = tl.getInput('recipientEmailAddress', true);
    if (inputString3 == 'bad') {
      tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
      return;
    }
    console.log('Send mail to:', inputString3);
  }
  catch (err: any) {
    tl.setResult(tl.TaskResult.Failed, err.message);
  }

}

run();