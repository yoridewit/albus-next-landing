import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { naam, email, organisatie } = body

  if (!naam || !email || !organisatie) {
    return NextResponse.json({ error: 'Alle velden zijn verplicht' }, { status: 400 })
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Ongeldig e-mailadres' }, { status: 400 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'Albus Health Website <noreply@albus-hc.com>',
    to: 'info@albus-hc.com',
    subject: `Nieuwe demo aanvraag van ${esc(naam)}`,
    html: `
      <h2>Nieuwe demo aanvraag</h2>
      <p><strong>Naam:</strong> ${esc(naam)}</p>
      <p><strong>E-mail:</strong> ${esc(email)}</p>
      <p><strong>Organisatie:</strong> ${esc(organisatie)}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: 'E-mail versturen mislukt' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
