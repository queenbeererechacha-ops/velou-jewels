
const products = [
  {
    id: 1,
    name: 'Solenne Pendant',
    category: 'Necklaces',
    price: 690,
    desc: 'A delicate pendant with a sculptural silhouette, designed to catch the light without asking for attention.',
    material: '18k gold vermeil · freshwater pearl',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 2,
    name: 'Étoile Ring',
    category: 'Rings',
    price: 540,
    desc: 'A softly irregular ring inspired by the shape of a falling star. Wear it alone or stack it.',
    material: '18k gold vermeil · cubic zirconia',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1603561596112-db3e9a2f0a3d?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1598560917807-1bae44bd7be8?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 3,
    name: 'Lune Hoops',
    category: 'Earrings',
    price: 470,
    desc: 'Polished hoops with a softly rounded profile. The pair you reach for without thinking.',
    material: 'Gold-plated stainless steel',
    images: [
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 4,
    name: 'Aurelia Cuff',
    category: 'Bracelets',
    price: 620,
    desc: 'A clean, weighty cuff that sits beautifully on its own and even better beside a watch.',
    material: '18k gold vermeil',
    images: [
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 5,
    name: 'Noa Chain',
    category: 'Necklaces',
    price: 780,
    desc: 'A slightly bolder chain with luminous links and an effortless drape.',
    material: '18k gold vermeil',
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 6,
    name: 'Mira Signet',
    category: 'Rings',
    price: 590,
    desc: 'A minimal signet with a smooth face made for initials, tiny details, or nothing at all.',
    material: '925 sterling silver · gold plating',
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1603561596112-db3e9a2f0a3d?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 7,
    name: 'Celeste Pearl',
    category: 'Earrings',
    price: 560,
    desc: 'Freshwater pearls framed by slim golden curves for a soft, luminous finish.',
    material: 'Freshwater pearl · gold vermeil',
    images: [
      'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 8,
    name: 'Seren Chain Bracelet',
    category: 'Bracelets',
    price: 510,
    desc: 'Fine links with just enough presence. A perfect base for stacking.',
    material: '18k gold vermeil',
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 9,
    name: 'Sol Ring Set',
    category: 'Rings',
    price: 730,
    desc: 'Three slim bands designed to be worn together or scattered across your hands.',
    material: '18k gold vermeil',
    images: [
      'https://images.unsplash.com/photo-1598560917807-1bae44bd7be8?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1603561596112-db3e9a2f0a3d?auto=format&fit=crop&w=1000&q=85'
    ]
  },
  {
    id: 10,
    name: 'Amour Lariat',
    category: 'Necklaces',
    price: 840,
    desc: 'A long, fluid lariat necklace with a delicate drop that frames the collarbone.',
    material: '18k gold vermeil · cubic zirconia',
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=85',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85'
    ]
  }
];
