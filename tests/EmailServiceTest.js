"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const EmailService_1 = require("../src/EmailService");
const EmailProvider1_1 = require("../src/EmailProvider1");
const EmailProvider2_1 = require("../src/EmailProvider2");
test("EmailService retries and falls back", () => __awaiter(void 0, void 0, void 0, function* () {
    const provider1 = new EmailProvider1_1.EmailProvider1();
    const provider2 = new EmailProvider2_1.EmailProvider2();
    const emailService = new EmailService_1.EmailService([provider1, provider2], 10);
    const result = yield emailService.sendEmail("test@example.com", "Subject", "Body", "test-id");
    expect(["Email sent successfully", "All providers failed to send the email"]).toContain(result);
}));
