<!-- markdownlint-disable MD034 -->
<!-- markdownlint-disable MD041 -->
[![Visual Studio Marketplace](https://img.shields.io/badge/Visual%20Studio%20Marketplace-install-brightgreen.svg?style=flat-square)](https://marketplace.visualstudio.com/items?itemName=BFoust.su-sendgrid)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/bffoust/devops-sendgrid-task/blob/rc/LICENSE.md)

# SendGrid E-mail Task

Easily send e-mails from your Azure DevOps pipelines using SendGrid. This task allows you to configure recipients, subject, and body content, with support for both HTML and plain text e-mails.

## Prerequisites

* A SendGrid account with an active plan. Learn more at the [SendGrid Official Website](https://sendgrid.com/pricing/).
* A SendGrid API Key. Generate one by following the [Official Documentation](https://app.sendgrid.com/settings/api_keys).

## Adding the SendGrid E-mail Task

Install the SendGrid E-mail Task in your Azure DevOps organization. Find it in the _Utility_ section of the task list and add it to your build or release pipeline.

![Add SendGrid E-mail Task](https://github.com/bffoust/devops-sendgrid-task/blob/rc/images/AddTask.png)

## Configuration

### SendGrid Settings

* **SendGrid API Key**: Your SendGrid API Key. Generate it from the [SendGrid Portal](https://app.sendgrid.com/settings/api_keys). _(Required)_

### E-mail Settings

* **Sender Email Address**: The sender's e-mail address. You may specify just the e-mail (e.g., alex.johnson@example.com) or include a display name (e.g., Alex Johnson <alex.johnson@example.com>). _(Required)_
* **Recipient Email Addresses**: One or more recipient e-mail addresses, separated by commas. You may also include display names. _(Required)_
* **Subject**: The subject line for the e-mail. _(Required)_
* **Email Body**: The content of the e-mail. You can provide the body in two ways:
  * **Text**: Enter the e-mail body directly as text.
  * **Local File**: Specify a local file path to load the e-mail body content from a file.
  To send HTML, enter your HTML here or in the file and check the _Send as HTML_ option. _(Required)_
* **Send as HTML**: Enable this option to send the e-mail body as HTML. _(Optional)_

![Add SendGrid E-mail Task](https://github.com/bffoust/devops-sendgrid-task/blob/rc/images/Configure.png)
