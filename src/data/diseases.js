export const diseases = [
  {
    id: 1,
    name: 'Hypertension',
    description: 'High blood pressure is a common condition that affects the body\'s arteries. It\'s also called hypertension.',
    symptoms: [
      'Severe headaches',
      'Nosebleed',
      'Fatigue or confusion',
      'Vision problems',
      'Chest pain',
      'Difficulty breathing',
      'Irregular heartbeat',
      'Blood in the urine',
      'Pounding in your chest, neck, or ears'
    ],
    causes: [
      'High salt intake',
      'Obesity',
      'Stress',
      'Genetics',
      'Age',
      'Lack of physical activity',
      'Smoking',
      'Excessive alcohol consumption'
    ],
    treatments: [
      'Lifestyle changes',
      'Regular exercise',
      'Healthy diet',
      'Medication (ACE inhibitors, beta-blockers, etc.)',
      'Stress management',
      'Regular monitoring'
    ],
    prevention: [
      'Maintain a healthy weight',
      'Exercise regularly',
      'Eat a balanced diet',
      'Reduce salt intake',
      'Limit alcohol consumption',
      'Quit smoking',
      'Manage stress'
    ],
    severity: 'High',
    contagious: false,
    category: 'Cardiovascular',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 2,
    name: 'Type 2 Diabetes',
    description: 'A chronic condition that affects how your body metabolizes glucose, your body\'s main source of energy.',
    symptoms: [
      'Increased thirst',
      'Frequent urination',
      'Increased hunger',
      'Unintended weight loss',
      'Fatigue',
      'Blurred vision',
      'Slow-healing sores',
      'Frequent infections'
    ],
    causes: [
      'Genetics',
      'Lifestyle factors',
      'Obesity',
      'Physical inactivity',
      'Poor diet',
      'Age',
      'Race/ethnicity'
    ],
    treatments: [
      'Blood sugar monitoring',
      'Insulin therapy',
      'Oral medications',
      'Diet and exercise',
      'Weight management',
      'Regular check-ups'
    ],
    prevention: [
      'Maintain a healthy weight',
      'Exercise regularly',
      'Eat a balanced diet',
      'Regular health check-ups',
      'Monitor blood sugar levels',
      'Manage stress'
    ],
    severity: 'High',
    contagious: false,
    category: 'Endocrine',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 3,
    name: 'Asthma',
    description: 'A condition in which your airways narrow and swell and may produce extra mucus.',
    symptoms: [
      'Shortness of breath',
      'Chest tightness or pain',
      'Wheezing when exhaling',
      'Trouble sleeping',
      'Coughing attacks',
      'Rapid breathing',
      'Fatigue'
    ],
    causes: [
      'Genetics',
      'Environmental factors',
      'Allergies',
      'Respiratory infections',
      'Air pollution',
      'Exercise',
      'Stress'
    ],
    treatments: [
      'Inhalers',
      'Bronchodilators',
      'Anti-inflammatory medications',
      'Allergy medications',
      'Lifestyle changes',
      'Avoiding triggers'
    ],
    prevention: [
      'Identify and avoid triggers',
      'Use air filters',
      'Regular check-ups',
      'Follow treatment plan',
      'Keep rescue inhaler handy',
      'Monitor symptoms'
    ],
    severity: 'Medium',
    contagious: false,
    category: 'Respiratory',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 4,
    name: 'Arthritis',
    description: 'Inflammation of one or more joints, causing pain and stiffness that can worsen with age.',
    symptoms: [
      'Joint pain',
      'Stiffness',
      'Swelling',
      'Redness',
      'Decreased range of motion',
      'Fatigue',
      'Fever',
      'Weight loss'
    ],
    causes: [
      'Age',
      'Genetics',
      'Injury',
      'Obesity',
      'Autoimmune disorders',
      'Infection',
      'Metabolic disorders'
    ],
    treatments: [
      'Pain relievers',
      'Anti-inflammatory drugs',
      'Physical therapy',
      'Exercise',
      'Weight management',
      'Surgery (in severe cases)'
    ],
    prevention: [
      'Maintain healthy weight',
      'Exercise regularly',
      'Protect joints',
      'Eat anti-inflammatory foods',
      'Stay hydrated',
      'Regular check-ups'
    ],
    severity: 'Medium',
    contagious: false,
    category: 'Musculoskeletal',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 5,
    name: 'COVID-19',
    description: 'A contagious respiratory illness caused by the SARS-CoV-2 virus.',
    symptoms: [
      'Fever or chills',
      'Cough',
      'Shortness of breath',
      'Fatigue',
      'Muscle or body aches',
      'Headache',
      'Loss of taste or smell',
      'Sore throat'
    ],
    causes: [
      'Viral infection',
      'Person-to-person contact',
      'Airborne transmission',
      'Surface contact'
    ],
    treatments: [
      'Rest',
      'Hydration',
      'Fever reducers',
      'Oxygen therapy (if needed)',
      'Antiviral medications (in severe cases)',
      'Hospitalization (if needed)'
    ],
    prevention: [
      'Vaccination',
      'Mask wearing',
      'Social distancing',
      'Hand hygiene',
      'Regular testing',
      'Stay home when sick'
    ],
    severity: 'High',
    contagious: true,
    category: 'Infectious',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
  },
];

export const diseaseCategories = [
  'All',
  'Cardiovascular',
  'Endocrine',
  'Respiratory',
  'Musculoskeletal',
  'Infectious',
  'Neurological',
  'Digestive',
  'Mental Health',
]; 