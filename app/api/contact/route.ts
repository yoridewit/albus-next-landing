import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { naam, email, organisatie } = body

  if (!naam || !email || !organisatie) {
    return NextResponse.json({ error: 'Alle velden zijn verplicht' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Albus Health Website <noreply@albus-hc.com>',
    to: 'info@albus-hc.com',
    subject: `Nieuwe demo aanvraag van ${naam}`,
    html: `
      <h2>Nieuwe demo aanvraag</h2>
      <p><strong>Naam:</strong> ${naam}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Organisatie:</strong> ${organisatie}</p>
    `,
  })

  if (error) {
    return NextResponse.json({ error: 'E-mail versturen mislukt' }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}
