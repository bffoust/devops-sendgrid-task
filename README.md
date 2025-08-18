[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/bffoust/devops-sendgrid-task/blob/rc/LICENSE.md)
# SendGrid E-mail Task
SendGrid E-mail Task for Azure DevOps pipelines to send emails from a build/release definition

## Prerequisites
* You MUST have a SendGrid Account with an appropriate plan. You can learn more about SendGrid from the [SendGrid Official Website](https://sendgrid.com/pricing/).
* Obtain the API Key required to access the SendGrid API by following the instructions on the [Official Documentation](https://app.sendgrid.com/settings/api_keys).

### Add the SendGrid E-mail Task
Install the SendGrid E-mail Task in to your Azure DevOps account and search for the task in the available tasks. The task will appear in the _Utility_ section of the task list. Add it to your build/release task.

## Configure SendGrid Section
Configure SendGrid section has one required configuration you need to set.

### Available Options
* **SendGrid API Key** : API Key given by SendGrid. You can generate an API Key from the [SendGrid Portal](https://app.sendgrid.com/settings/api_keys) _*(Required)*_

## Configure E-mail Section
Configure E-mail section has 5 required configurations you need to set. Sender Email Address, Recipient Email Address(s), Subject and Email Body, Email Body text/File Path.

### Available Options
* **Sender Email Address** : Email address of the sender. The value can either be only the *Email Address* (Eg. alex.johnson@example.com)_ or the *Name* and the *Email Address* _(Eg. Alex Johnson <alex.johnson@example.com>)_ _*(Required)*_
* **Recipient Email Addresses** :  Email address(s) of the recipient(s). Use a comma (,) separated list if you have multiple email addresses. (Eg. alex.johnson@example.com, jamie.lee@example.com) or the Name and the Email Address (Eg. Alex Johnson <alex.johnson@example.com>, Jamie Lee <jamie.lee@example.com>)_ _*(Required)*_
* **Subject** : Subject of the email. _*(Required)*_
* **Email Body** : Contents of the email you want to send. To send HTML body add the HTML here and set the _Send as HTML_ checkbox. _*(Required)*_
* **Send as HTML** : Check this option if you want to send the contents of the email body as HTML. _*(Optional)*_