/** @jest-environment node */
import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'

jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn().mockResolvedValue({ data: { id: 'mock-id' }, error: null }),
    },
  })),
}))

function makeRequest(body: object): NextRequest {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/contact', () => {
  it('returns 400 when naam is missing', async () => {
    const res = await POST(makeRequest({ email: 'test@test.com', organisatie: 'Test' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(makeRequest({ naam: 'Test', organisatie: 'Test' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when organisatie is missing', async () => {
    const res = await POST(makeRequest({ naam: 'Test', email: 'test@test.com' }))
    expect(res.status).toBe(400)
  })

  it('returns 200 with all valid fields', async () => {
    const res = await POST(
      makeRequest({ naam: 'Test', email: 'test@test.com', organisatie: 'Ziekenhuis' })
    )
    expect(res.status).toBe(200)
  })
})
