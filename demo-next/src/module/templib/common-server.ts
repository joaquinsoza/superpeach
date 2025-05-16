import { PasskeyServer } from "passkey-kit";

export const passkeyServer = new PasskeyServer({
    rpcUrl: "https://soroban-testnet.stellar.org",
    launchtubeUrl: "https://testnet.launchtube.xyz",
    launchtubeJwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4N2VkM2YxNzcwYjUxMjUxZTg5NGZmYWY2MmFkMzkzYjExZGU2MzQ2NzIxMzlkZDIxMjhlOGU3OTNjZDc4MTYxIiwiZXhwIjoxNzU0NTA5ODMzLCJjcmVkaXRzIjoxMDAwMDAwMDAwLCJpYXQiOjE3NDcyNTIyMzN9.8BnSLIYxATW39YVICHqoTz_7jGk1KLJVhE1V75ckLj0",
    mercuryProjectName: "smart-wallets-next-dima",
    mercuryUrl: "https://api.mercurydata.app",
    mercuryJwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiZ29vZ2xlb2F1dGgyMTA3NTA1MDU2NTI2NDkzNzAwNjU2IiwiZXhwIjoxNzQ5ODQ0MzUxLCJ1c2VyX2lkIjoyMDQsInVzZXJuYW1lIjoiam9hcXVpbnNvemFnQGdtYWlsLmNvbSIsImlhdCI6MTc0NzI1MjM1MCwiYXVkIjoicG9zdGdyYXBoaWxlIiwiaXNzIjoicG9zdGdyYXBoaWxlIn0.EtKHbpAzEZhuTsPLkB-SHu84bmmUBF3BYc4dC7r96O4",
});