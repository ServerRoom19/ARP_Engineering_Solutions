'use server'

import { Resend } from 'resend'

const resend = new Resend(process.env.NEXT_API_KEY)

export async function sendContactEmail(formData: FormData) {
  const fullName = formData.get('fullName') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const company = formData.get('company') as string
  const inquiryType = formData.get('inquiryType') as string
  const message = formData.get('message') as string

  try {
    const { data, error } = await resend.emails.send({
      from: 'ARP Website <onboarding@resend.dev>', // Use this for testing, replace with your domain later
      to: ['asharma192@gmail.com'],
      subject: `New ${inquiryType} Inquiry from ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #334155;">Contact Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #1e293b;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td>
                <td style="padding: 8px 0; color: #1e293b;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td>
                <td style="padding: 8px 0; color: #1e293b;">
                  <a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Company:</td>
                <td style="padding: 8px 0; color: #1e293b;">${company || 'Not provided'}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #475569;">Inquiry Type:</td>
                <td style="padding: 8px 0; color: #1e293b;">
                  <span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                    ${inquiryType}
                  </span>
                </td>
              </tr>
            </table>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px;">
            <h3 style="margin-top: 0; color: #334155;">Message</h3>
            <div style="background: white; padding: 15px; border-radius: 6px; border-left: 4px solid #2563eb;">
              <p style="white-space: pre-wrap; margin: 0; line-height: 1.6; color: #374151;">${message}</p>
            </div>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #dbeafe; border-radius: 8px; text-align: center;">
            <p style="margin: 0; color: #1e40af; font-size: 14px;">
              📧 This email was sent from the ARP Engineering Solutions website contact form
            </p>
            <p style="margin: 5px 0 0 0; color: #64748b; font-size: 12px;">
              Sent on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST
            </p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Email error:', error)
      return { success: false, error: 'Failed to send email' }
    }

    return { success: true, message: 'Email sent successfully!' }
  } catch (error) {
    console.error('Server error:', error)
    return { success: false, error: 'Server error occurred' }
  }
}