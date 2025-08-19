<!-- markdownlint-disable MD034 -->
<!-- markdownlint-disable MD041 -->
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/bffoust/devops-sendgrid-task/blob/rc/LICENSE.md)

# SendGrid E-mail Task

Easily send emails from your Azure DevOps pipelines using SendGrid. This task allows you to configure recipients, subject, and body content, with support for both HTML and plain text emails.

## Prerequisites

* A SendGrid account with an active plan. Learn more at the [SendGrid Official Website](https://sendgrid.com/pricing/).
* A SendGrid API Key. Generate one by following the [Official Documentation](https://app.sendgrid.com/settings/api_keys).

## Adding the SendGrid E-mail Task

Install the SendGrid E-mail Task in your Azure DevOps organization. Find it in the _Utility_ section of the task list and add it to your build or release pipeline.

## Configuration

### SendGrid Settings

* **SendGrid API Key**: Your SendGrid API Key. Generate it from the [SendGrid Portal](https://app.sendgrid.com/settings/api_keys). _(Required)_

### E-mail Settings

* **Sender Email Address**: The sender's email address. You may specify just the email (e.g., alex.johnson@example.com) or include a display name (e.g., Alex Johnson <alex.johnson@example.com>). _(Required)_
* **Recipient Email Addresses**: One or more recipient email addresses, separated by commas. You may also include display names. _(Required)_
* **Subject**: The subject line for the email. _(Required)_
* **Email Body**: The content of the email. You can provide the body in two ways:
  * **Text**: Enter the email body directly as text.
  * **Local File**: Specify a local file path to load the email body content from a file.
  To send HTML, enter your HTML here or in the file and check the _Send as HTML_ option. _(Required)_
* **Send as HTML**: Enable this option to send the email body as HTML. _(Optional)_
