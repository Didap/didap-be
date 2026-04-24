import { Resend } from 'resend';

export default {
    async send(ctx) {
        const { name, email, subject, message } = ctx.request.body;

        // Validate input
        if (!name || !email || !subject || !message) {
            return ctx.badRequest('All fields are required');
        }

        const apiKey = process.env.RESEND_API_KEY;
        if (!apiKey) {
            strapi.log.error('RESEND_API_KEY is not set');
            return ctx.internalServerError('Email service not configured');
        }

        try {
            const resend = new Resend(apiKey);

            await resend.emails.send({
                from: 'Didap Contact Form <onboarding@resend.dev>',
                to: ['info@didap.it'],
                replyTo: email,
                subject: `[Contatto] ${subject}`,
                html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0f172a;">Nuovo messaggio da ${name}</h2>
            <p style="color: #64748b;"><strong>Da:</strong> ${name} &lt;${email}&gt;</p>
            <p style="color: #64748b;"><strong>Oggetto:</strong> ${subject}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <div style="color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</div>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="color: #94a3b8; font-size: 12px;">Inviato dal form di contatto di didap.it</p>
          </div>
        `,
            });

            return ctx.send({ ok: true, message: 'Email sent successfully' });
        } catch (error) {
            strapi.log.error('Failed to send email:', error);
            return ctx.internalServerError('Failed to send email');
        }
    },
};
