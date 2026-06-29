import type { Metadata } from 'next'
import OverstappenHero from '@/components/overstappen/OverstappenHero'
import Voordelen from '@/components/overstappen/Voordelen'
import NieuweFeatures from '@/components/overstappen/NieuweFeatures'
import Testomgeving from '@/components/overstappen/Testomgeving'
import WatBlijftHetzelfde from '@/components/overstappen/WatBlijftHetzelfde'
import EersteKeerInloggen from '@/components/overstappen/EersteKeerInloggen'
import FeedbackContact from '@/components/overstappen/FeedbackContact'
import AfsluitendeCta from '@/components/overstappen/AfsluitendeCta'

export const metadata: Metadata = {
  title: 'Albus Next komt eraan — test nu alvast',
  description:
    'Na de zomer stappen we over naar Albus Next. De testomgeving staat klaar. Ontdek de voordelen, nieuwe features en hoe je de eerste keer inlogt.',
  robots: { index: false, follow: false },
}

export default function OverstappenPage() {
  return (
    <main>
      <OverstappenHero />
      <Voordelen />
      <NieuweFeatures />
      <Testomgeving />
      <WatBlijftHetzelfde />
      <EersteKeerInloggen />
      <FeedbackContact />
      <AfsluitendeCta />
    </main>
  )
}
