import qp2QA from '../qp2-seminar-v4/qa';
import pharaziQA from '../pharazi-seminar/qa';

const pharaziIdMap: Record<string, string> = {
  '03-regulatory-floor': 'cs2-regulatory-floor',
  '04-market-moving': 'cs2-market-moving',
  '05-gap': 'cs2-gap',
  '06-transition': 'cs2-transition',
  '06-5-m2-begins': 'cs2-m2-begins',
  '06-6-foundation-overview': 'cs2-foundation-overview',
  '07-principle1': 'cs2-principle1',
  '08-principle2': 'cs2-principle2',
  '09-principle3': 'cs2-principle3',
  '10-principle4': 'cs2-principle4',
  '11-principle5': 'cs2-principle5',
  '11-5-foundation-audit': 'cs2-foundation-audit',
  '12-5-m3-begins': 'cs2-m3-begins',
  '13-transition-components': 'cs2-transition-components',
  '14-domain-data': 'cs2-domain1',
  '15-domain-nca': 'cs2-domain2',
  '16-domain-poppk': 'cs2-domain3',
  '17-domain-er': 'cs2-domain4',
  '18-domain-reg': 'cs2-domain5',
  '19-domain-audit': 'cs2-domain6',
  '19-5a-end-to-end': 'cs2-end-to-end',
  '19-5b-concurrent-use': 'cs2-concurrent-use',
};

// Map Pharazi QA to their new CS2 IDs
const mappedPharaziQA = Object.entries(pharaziQA).reduce((acc, [key, value]) => {
  if (pharaziIdMap[key]) {
    acc[pharaziIdMap[key]] = value;
  }
  return acc;
}, {} as Record<string, any>);

// Map Ivosidenib QA from qp2-seminar-v4 (where it was CS2) to CS3
const mappedIvosidenibQA = Object.entries(qp2QA).reduce((acc, [key, value]) => {
  if (key.startsWith('cs2-')) {
    acc[key.replace('cs2-', 'cs3-')] = value;
  }
  return acc;
}, {} as Record<string, any>);

// Merge all QA
const qa = {
  ...qp2QA, // Retains Intro, CS1, Closing, and all CS1 backups
  ...mappedIvosidenibQA, // Adds CS3 (Ivosidenib)
  ...mappedPharaziQA, // Adds CS2 (Pharazi)
};

export default qa;
