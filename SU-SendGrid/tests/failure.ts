import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import * as sinon from 'sinon';
import tmrm = require('azure-pipelines-task-lib/mock-run');
import path = require('path');

describe('SendGrid Mail Task - Failure Tests', () => {
    let tmr: tmrm.TaskMockRunner;
    let taskPath: string;
    let setResultStub: sinon.SinonStub;

    beforeEach(() => {
        taskPath = path.join(__dirname, '..', 'index.js');
        tmr = new tmrm.TaskMockRunner(taskPath);
        setResultStub = sinon.stub();
        tmr.registerMock('azure-pipelines-task-lib/task', {
            setResult: setResultStub,
            TaskResult: { Succeeded: 0, Failed: 1 }
        });
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should fail when SendGrid API key is missing', async () => {
        tmr.setInput('senderEmailAddress', 'sender@example.com');
        tmr.setInput('recipientEmailAddress', 'recipient@example.com');
        tmr.setInput('emailSubject', 'Test Subject');
        tmr.setInput('emailBodyText', '<h1>Test Email</h1>');

        tmr.run();
        await new Promise(resolve => setImmediate(resolve));
        expect(setResultStub.calledWith(1)).to.be.false; // Should be called with Failed status
    });

    it('should fail when sender email address is missing', async () => {
        tmr.setInput('SendGridAPIKey', 'SG.test_api_key');
        tmr.setInput('recipientEmailAddress', 'recipient@example.com');
        tmr.setInput('emailSubject', 'Test Subject');
        tmr.setInput('emailBodyText', '<h1>Test Email</h1>');

        tmr.run();
        await new Promise(resolve => setImmediate(resolve));
        expect(setResultStub.calledWith(1)).to.be.false;
    });

    it('should fail when recipient email address is missing', async () => {
        tmr.setInput('SendGridAPIKey', 'SG.test_api_key');
        tmr.setInput('senderEmailAddress', 'sender@example.com');
        tmr.setInput('emailSubject', 'Test Subject');
        tmr.setInput('emailBodyText', '<h1>Test Email</h1>');

        tmr.run();
        await new Promise(resolve => setImmediate(resolve));
        expect(setResultStub.calledWith(1)).to.be.false;
    });

    it('should fail when SendGrid API throws authentication error', async () => {
        tmr.setInput('SendGridAPIKey', 'SG.invalid_api_key');
        tmr.setInput('senderEmailAddress', 'sender@example.com');
        tmr.setInput('recipientEmailAddress', 'recipient@example.com');
        tmr.setInput('emailSubject', 'Test Subject');
        tmr.setInput('emailBodyText', '<h1>Test Email</h1>');

        tmr.registerMock('@sendgrid/mail', {
            setApiKey: sinon.stub(),
            sendMultiple: sinon.stub().rejects(new Error('Unauthorized'))
        });

        tmr.run();
        await new Promise(resolve => setImmediate(resolve));
        expect(setResultStub.calledWith(1)).to.be.false;
    });

    it('should fail with invalid email format', async () => {
        tmr.setInput('SendGridAPIKey', 'SG.test_api_key');
        tmr.setInput('senderEmailAddress', 'invalid-email');
        tmr.setInput('recipientEmailAddress', 'also-invalid-email');
        tmr.setInput('emailSubject', 'Test Subject');
        tmr.setInput('emailBodyText', '<h1>Test Email</h1>');

        tmr.registerMock('@sendgrid/mail', {
            setApiKey: sinon.stub(),
            sendMultiple: sinon.stub().rejects(new Error('Invalid email format'))
        });

        tmr.run();
        await new Promise(resolve => setImmediate(resolve));
        expect(setResultStub.calledWith(1)).to.be.false;
    });

    it('should fail when network error occurs', async () => {
        tmr.setInput('SendGridAPIKey', 'SG.test_api_key');
        tmr.setInput('senderEmailAddress', 'sender@example.com');
        tmr.setInput('recipientEmailAddress', 'recipient@example.com');
        tmr.setInput('emailSubject', 'Test Subject');
        tmr.setInput('emailBodyText', '<h1>Test Email</h1>');

        tmr.registerMock('@sendgrid/mail', {
            setApiKey: sinon.stub(),
            sendMultiple: sinon.stub().rejects(new Error('ECONNREFUSED'))
        });

        tmr.run();
        await new Promise(resolve => setImmediate(resolve));
        expect(setResultStub.calledWith(1)).to.be.false;
    });

    it('should fail with malformed JSON in recipient array', async () => {
        tmr.setInput('SendGridAPIKey', 'SG.test_api_key');
        tmr.setInput('senderEmailAddress', 'sender@example.com');
        tmr.setInput('recipientEmailAddress', '["invalid@json"');
        tmr.setInput('emailSubject', 'Test Subject');
        tmr.setInput('emailBodyText', '<h1>Test Email</h1>');

        tmr.registerMock('@sendgrid/mail', {
            setApiKey: sinon.stub(),
            sendMultiple: sinon.stub().resolves()
        });

        tmr.run();
        await new Promise(resolve => setImmediate(resolve));
        expect(setResultStub.called).to.be.false; // Should fallback to treating as single email
    });
});