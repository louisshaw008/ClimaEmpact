export interface Report {
  id: string;
  title: string;
  date: string;
  type: 'Heatwave' | 'Flood' | 'Storm' | 'Drought' | 'Cold Spell' | 'Wildfire';
  location: string;
  summary: string;
  attribution: string; // e.g., "Very likely", "Likely", "Unlikely"
  imageUrl: string;
  source?: string; // ReliefWeb source reference
}

export const reports: Report[] = [
  {
    id: '1',
    title: 'Hurricane Beryl — Record-Breaking Early Season Category 5',
    date: '2024-07-01',
    type: 'Storm',
    location: 'Caribbean & Texas, USA',
    summary: 'Hurricane Beryl became the earliest Category 5 Atlantic hurricane on record in late June 2024, fueled by exceptionally warm sea surface temperatures. It devastated Carriacou, Grenada, and other Caribbean islands before making landfall in Texas. Wind speeds reached 270 km/h, destroying over 90% of structures on some islands. At least 11 people were killed across the Caribbean and the storm caused widespread power outages in Texas. The World Weather Attribution initiative found that climate change made Beryl\'s rapid intensification significantly more likely, with sea surface temperatures 1–2°C above the historical average in its path.',
    attribution: 'Very likely',
    imageUrl: 'https://images.unsplash.com/photo-1740880978241-1372300eba6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodXJyaWNhbmUlMjBjYXJpYmJlYW4lMjBkZXN0cnVjdGlvbiUyMHRyb3BpY2FsJTIwc3Rvcm0lMjBkYW1hZ2V8ZW58MXx8fHwxNzcyMDA0MTI5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'https://reliefweb.int/disaster/tc-2024-000094-lca',
  },
  {
    id: '2',
    title: 'Los Angeles Wildfires (Palisades & Eaton Fires)',
    date: '2025-01-07',
    type: 'Wildfire',
    location: 'Los Angeles County, USA',
    summary: 'Multiple devastating wildfires erupted across Los Angeles County in January 2025, driven by extreme Santa Ana winds exceeding 160 km/h. The Palisades Fire and Eaton Fire burned thousands of structures in Pacific Palisades and Altadena. At least 29 people died and over 180,000 were placed under evacuation orders. The fires became the most destructive in California history, with estimated damages exceeding $250 billion. Climate attribution studies linked the extreme fire conditions to prolonged drought and above-average temperatures.',
    attribution: 'Very likely',
    imageUrl: 'https://images.unsplash.com/photo-1648949300095-951d90397149?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb3MlMjBBbmdlbGVzJTIwd2lsZGZpcmUlMjBzbW9rZSUyMGhpbGxzaWRlJTIwaG9tZXN8ZW58MXx8fHwxNzcyMDAzODgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'https://reliefweb.int/disaster/wf-2025-000003-usa',
  },
  {
    id: '3',
    title: 'Spain DANA Flash Floods (Valencia)',
    date: '2024-10-29',
    type: 'Flood',
    location: 'Valencia, Spain',
    summary: 'An extreme DANA (Depresión Aislada en Niveles Altos) weather event brought unprecedented rainfall to the Valencia region of eastern Spain on 29 October 2024. Some areas received over 500mm of rain in 8 hours — a year\'s worth in a single day. Flash floods swept through towns south of Valencia city, killing over 220 people and destroying critical infrastructure. Thousands of vehicles were submerged. Climate attribution analysis by ClimAtter found the event was made approximately 12% more intense and twice as likely due to human-caused climate change.',
    attribution: 'Very likely',
    imageUrl: 'https://images.unsplash.com/photo-1649270944671-f1bbee1d41d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxWYWxlbmNpYSUyMFNwYWluJTIwZmxvb2QlMjBzdHJlZXRzJTIwY2FycyUyMHVuZGVyd2F0ZXJ8ZW58MXx8fHwxNzcyMDAzODgxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'https://reliefweb.int/disaster/fl-2024-000213-esp',
  },
  {
    id: '4',
    title: 'Super Typhoon Yagi (Typhoon Enteng)',
    date: '2024-09-07',
    type: 'Storm',
    location: 'Vietnam, Myanmar, Laos, Thailand',
    summary: 'Super Typhoon Yagi was the strongest typhoon to make landfall in Southeast Asia in decades. It struck northern Vietnam on 7 September 2024 with sustained winds of 234 km/h before moving inland. The storm triggered catastrophic flooding and landslides across Vietnam, Myanmar, Laos, and Thailand. Over 800 people were killed, with Vietnam alone reporting more than 300 deaths. Entire villages were buried by landslides, and the Phong Chau bridge collapsed. Rapid attribution analysis indicated that climate change intensified rainfall by approximately 12%.',
    attribution: 'Likely',
    imageUrl: 'https://images.unsplash.com/photo-1671591237949-e6a792806d40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0eXBob29uJTIwc3Rvcm0lMjBkYW1hZ2UlMjBTb3V0aGVhc3QlMjBBc2lhJTIwdmlsbGFnZXxlbnwxfHx8fDE3NzIwMDM4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'https://reliefweb.int/disaster/tc-2024-000145-vnm',
  },
  {
    id: '5',
    title: 'Brazil Rio Grande do Sul Floods',
    date: '2024-04-29',
    type: 'Flood',
    location: 'Rio Grande do Sul, Brazil',
    summary: 'Unprecedented flooding devastated the southern Brazilian state of Rio Grande do Sul in late April and May 2024. Continuous heavy rainfall caused rivers to reach record levels, submerging the state capital Porto Alegre and surrounding municipalities. At least 183 people died, over 800,000 were displaced, and nearly 2.4 million were affected. The Guaíba River reached a historic level of 5.35 meters. The World Weather Attribution initiative found that climate change made the heavy rainfall approximately twice as likely and 6–9% more intense.',
    attribution: 'Very likely',
    imageUrl: 'https://images.unsplash.com/photo-1643320511259-4add0c9f81f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCcmF6aWwlMjBmbG9vZGluZyUyMHN1Ym1lcmdlZCUyMGNpdHklMjBhZXJpYWwlMjB2aWV3fGVufDF8fHx8MTc3MjAwMzg4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'https://reliefweb.int/disaster/fl-2024-000072-bra',
  },
  {
    id: '6',
    title: 'Storm Daniel — Libya Catastrophic Floods (Derna)',
    date: '2023-09-10',
    type: 'Flood',
    location: 'Derna, Libya',
    summary: 'Mediterranean Storm Daniel brought extreme rainfall to northeastern Libya on 10 September 2023. Two dams above the city of Derna collapsed under the pressure, sending a massive wall of water through the city and washing entire neighborhoods into the sea. Over 11,000 people were killed and more than 10,000 remain missing. The death toll makes it one of the deadliest weather-related disasters in modern history. The storm previously caused severe flooding in Greece, Turkey, and Bulgaria. Attribution studies concluded that climate change made the extreme rainfall up to 50 times more likely and up to 50% more intense.',
    attribution: 'Very likely',
    imageUrl: 'https://images.unsplash.com/photo-1764818374545-8bfa2b06bea8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNZWRpdGVycmFuZWFuJTIwZmxvb2QlMjBkYW1hZ2UlMjBkZXN0cm95ZWQlMjBidWlsZGluZ3MlMjBjb2FzdGFsfGVufDF8fHx8MTc3MjAwMzg4NXww&ixlib=rb-4.1.0&q=80&w=1080',
    source: 'https://reliefweb.int/disaster/st-2023-000152-lby',
  },
];