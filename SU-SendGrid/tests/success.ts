import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

describe('SendGrid Mail Task - Success Tests', () => {
    let tmr: tmrm.TaskMockRunner;
    let taskPath: string;

    beforeEach(() => {
        taskPath = path.join(__dirname, '..', 'index.js');
        tmr = new tmrm.TaskMockRunner(taskPath);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should send mail successfully with single recipient', async () => {
        // Set valid inputs for SendGrid task
        tmr.setInput('SendGridAPIKey', 'SG.test_api_key');
        tmr.setInput('senderEmailAddress', 'sender@example.com');
        tmr.setInput('recipientEmailAddress', 'recipient@example.com');
        tmr.setInput('emailSubject', 'Test Subject');
        tmr.setInput('emailBodyText', '<h1>Test Email</h1>');

        // Mock SendGrid module
        tmr.registerMock('@sendgrid/mail', {
            setApiKey: sinon.stub(),
            sendMultiple: sinon.stub().resolves()
        });

        // Mock task completion
        const setResultStub = sinon.stub();
        tmr.registerMock('azure-pipelines-task-lib/task', {
            setResult: setResultStub,
            TaskResult: { Succeeded: 0, Failed: 1 }
        });

        tmr.run();

        // Verify task completed successfully
        expect(setResultStub.called).to.be.false; // No failure should be called
    });

    it('should send mail successfully with multiple recipients as JSON array', async () => {
        tmr.setInput('SendGridAPIKey', 'SG.test_api_key');
        tmr.setInput('senderEmailAddress', 'sender@example.com');
        tmr.setInput('recipientEmailAddress', '["recipient1@example.com", "recipient2@example.com"]');
        tmr.setInput('emailSubject', 'Test Subject');
        tmr.setInput('emailBodyText', '<h1>Test Email</h1>');

        tmr.registerMock('@sendgrid/mail', {
            setApiKey: sinon.stub(),
            sendMultiple: sinon.stub().resolves()
        });

        const setResultStub = sinon.stub();
        tmr.registerMock('azure-pipelines-task-lib/task', {
            setResult: setResultStub,
            TaskResult: { Succeeded: 0, Failed: 1 }
        });

        tmr.run();

        expect(setResultStub.called).to.be.false;
    });

    it('should handle empty email body gracefully', async () => {
        tmr.setInput('SendGridAPIKey', 'SG.test_api_key');
        tmr.setInput('senderEmailAddress', 'sender@example.com');
        tmr.setInput('recipientEmailAddress', 'recipient@example.com');
        tmr.setInput('emailSubject', 'Test Subject');
        tmr.setInput('emailBodyText', '');

        tmr.registerMock('@sendgrid/mail', {
            setApiKey: sinon.stub(),
            sendMultiple: sinon.stub().resolves()
        });

        const setResultStub = sinon.stub();
        tmr.registerMock('azure-pipelines-task-lib/task', {
            setResult: setResultStub,
            TaskResult: { Succeeded: 0, Failed: 1 }
        });

        tmr.run();

        expect(setResultStub.called).to.be.false;
    });
});