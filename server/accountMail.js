import nodemailer from "nodemailer";

export function accountMailConfigured(env) {
  if (!env.AUTH_PUBLIC_ORIGIN || !env.AUTH_EMAIL_FROM) return false;
  if (env.AUTH_MAIL_PROVIDER === "gmail") return Boolean(env.GMAIL_APP_PASSWORD?.replace(/\s/g, ""));
  return Boolean(env.EMAIL?.send);
}

export function gmailTransportOptions(env) {
  return {
    host: "smtp.gmail.com", port: 465, secure: true,
    auth: { user: env.AUTH_EMAIL_FROM, pass: env.GMAIL_APP_PASSWORD.replace(/\s/g, "") },
    tls: { minVersion: "TLSv1.2", rejectUnauthorized: true },
    connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 15000,
    dnsTimeout: 8000, pool: false, logger: false, debug: false,
    disableFileAccess: true, disableUrlAccess: true,
  };
}

export async function sendAccountMail(env, message, createTransport = nodemailer.createTransport) {
  if (!accountMailConfigured(env)) throw Error("Account mail unavailable");
  if (env.AUTH_MAIL_PROVIDER !== "gmail") return env.EMAIL.send(message);
  const transport = createTransport(gmailTransportOptions(env));
  try {
    const info = await transport.sendMail({
      ...message,
      from: { name: "Atoma Engineering Labs", address: env.AUTH_EMAIL_FROM },
      replyTo: env.AUTH_EMAIL_REPLY_TO || env.AUTH_EMAIL_FROM,
      disableFileAccess: true, disableUrlAccess: true,
    });
    if (!info.messageId || !info.accepted?.includes(message.to)) throw Error("Account email not accepted");
    return { messageId: info.messageId };
  } finally { transport.close(); }
}
