// Livspace-style features for Manish Interiors

export const priceCalculators = {
  fullHome: {
    title: 'Full Home Interior',
    description: 'Get estimate for complete home renovation',
    questions: [
      { id: 1, label: 'Carpet Area', type: 'range', min: 500, max: 5000, unit: 'sq ft' },
      { id: 2, label: 'Number of Bedrooms', type: 'select', options: ['1 BHK', '2 BHK', '3 BHK', '4+ BHK'] },
      { id: 3, label: 'Design Style', type: 'select', options: ['Modern', 'Contemporary', 'Minimalist', 'Traditional', 'Scandinavian'] },
      { id: 4, label: 'Budget Range', type: 'select', options: ['3-5L', '5-8L', '8-12L', '12-20L', '20L+'] },
    ],
    startingPrice: '3,57,000',
  },
  kitchen: {
    title: 'Modular Kitchen',
    description: 'Calculate your kitchen interior cost',
    questions: [
      { id: 1, label: 'Kitchen Length', type: 'range', min: 6, max: 20, unit: 'ft' },
      { id: 2, label: 'Layout Type', type: 'select', options: ['L-Shape', 'U-Shape', 'Straight', 'Island', 'Parallel'] },
      { id: 3, label: 'Door Type', type: 'select', options: ['Swing Door', 'Sliding Door', 'Push Open'] },
      { id: 4, label: 'Material Type', type: 'select', options: ['Plywood', 'PVC', 'Laminate', 'Acrylic'] },
    ],
    startingPrice: '1,49,000',
  },
  bedroom: {
    title: 'Master Bedroom',
    description: 'Estimate wardrobe and bedroom design',
    questions: [
      { id: 1, label: 'Wardrobe Length', type: 'range', min: 4, max: 12, unit: 'ft' },
      { id: 2, label: 'Wardrobe Type', type: 'select', options: ['2-Door', '3-Door', '4-Door', 'Walk-in Wardrobe'] },
      { id: 3, label: 'Door Type', type: 'select', options: ['Swing Door', 'Sliding Door'] },
      { id: 4, label: 'Accessories', type: 'select', options: ['Basic', 'Premium', 'Luxury'] },
    ],
    startingPrice: '1,37,000',
  },
}

export const designGallery = {
  categories: [
    { id: 1, name: 'Modular Kitchens', icon: '🍳', count: 45 },
    { id: 2, name: 'Master Bedrooms', icon: '🛏️', count: 38 },
    { id: 3, name: 'Living Rooms', icon: '🛋️', count: 52 },
    { id: 4, name: 'Wardrobes', icon: '👗', count: 41 },
    { id: 5, name: 'False Ceilings', icon: '🎨', count: 29 },
    { id: 6, name: 'Bathrooms', icon: '🚿', count: 34 },
    { id: 7, name: 'Dining Areas', icon: '🍽️', count: 27 },
    { id: 8, name: 'Home Offices', icon: '💼', count: 19 },
    { id: 9, name: 'Kids Rooms', icon: '🎮', count: 22 },
    { id: 10, name: 'Pooja Rooms', icon: '🙏', count: 16 },
    { id: 11, name: 'Balconies', icon: '🌿', count: 18 },
    { id: 12, name: 'Foyers', icon: '🚪', count: 14 },
  ],
  sampleDesigns: [
    { id: 1, category: 'Modular Kitchens', title: 'Modern White Kitchen', style: 'Contemporary', image: '/gallery/kitchen-1.jpg' },
    { id: 2, category: 'Master Bedrooms', title: 'Minimalist Bedroom', style: 'Minimalist', image: '/gallery/bedroom-1.jpg' },
    { id: 3, category: 'Living Rooms', title: 'Scandinavian Living', style: 'Scandinavian', image: '/gallery/living-1.jpg' },
    { id: 4, category: 'Wardrobes', title: 'Sleek Wardrobe Design', style: 'Modern', image: '/gallery/wardrobe-1.jpg' },
    { id: 5, category: 'False Ceilings', title: 'Geometric Ceiling', style: 'Contemporary', image: '/gallery/ceiling-1.jpg' },
  ],
}

export const processSteps = [
  {
    step: 1,
    title: 'Explore & Plan',
    description: 'Schedule a free consultation. Our designers visit your space and understand your vision.',
    icon: '📋',
    action: 'Book Consultation',
  },
  {
    step: 2,
    title: 'Secure Your Spot',
    description: 'Confirm booking with 10% advance or ₹25,000 (whichever is higher). This secures your designer.',
    icon: '✅',
    action: 'Book Now',
  },
  {
    step: 3,
    title: 'Design & Customize',
    description: 'Get 2D/3D designs. Select materials, finishes, and colors. Make interim payments as per project scope.',
    icon: '🎨',
    action: 'View Designs',
  },
  {
    step: 4,
    title: 'Execution Begins',
    description: 'Pay 60% and we start manufacturing and installation. Regular site visits and progress updates.',
    icon: '🔨',
    action: 'Track Progress',
  },
  {
    step: 5,
    title: 'Enjoy Your Home',
    description: 'Final payment upon completion. Move in and enjoy your dream space with our warranty support.',
    icon: '🏠',
    action: 'Celebrate',
  },
]

export const team = [
  {
    name: 'Manish Sharma',
    title: 'Founder & Chief Designer',
    bio: '20+ years of experience in luxury interiors',
    image: '/team/manish.jpg',
    specialization: 'Luxury Residential Design',
  },
  {
    name: 'Priya Verma',
    title: 'Lead Interior Architect',
    bio: 'Expert in space planning and modular design',
    image: '/team/priya.jpg',
    specialization: 'Space Planning',
  },
  {
    name: 'Rajesh Patel',
    title: 'Senior Project Manager',
    bio: 'Ensures timely execution and quality delivery',
    image: '/team/rajesh.jpg',
    specialization: 'Project Management',
  },
  {
    name: 'Sneha Kumar',
    title: 'Design Specialist',
    bio: 'Specializes in contemporary and minimalist designs',
    image: '/team/sneha.jpg',
    specialization: 'Contemporary Design',
  },
]

export const testimonialVideos = [
  {
    id: 1,
    name: 'Amit Kulkarni',
    location: 'Andheri, Mumbai',
    rating: 5,
    text: 'Manish Interiors transformed my apartment into a dream home. The quality of work exceeded expectations!',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    projectType: '3 BHK Apartment',
  },
  {
    id: 2,
    name: 'Sneha & Vikram',
    location: 'Bandra, Mumbai',
    rating: 5,
    text: 'The team delivered the project 15 days ahead of schedule. Highly professional and detail-oriented!',
    videoUrl: 'https://www.youtube.com/embed/9bZkp7q19f0',
    projectType: '2 BHK + Home Office',
  },
  {
    id: 3,
    name: 'Priyanka Singh',
    location: 'Powai, Mumbai',
    rating: 5,
    text: 'Best decision to hire Manish Interiors. The design process was collaborative and hassle-free.',
    videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
    projectType: 'Modular Kitchen',
  },
]

export const blogPosts = [
  {
    id: 1,
    title: '10 Space-Saving Kitchen Designs for Small Mumbai Apartments',
    author: 'Manish Sharma',
    date: '2026-04-15',
    category: 'Kitchen Design',
    excerpt: 'Discover innovative kitchen layouts that maximize space without compromising style.',
    image: '/blog/kitchen-tips.jpg',
  },
  {
    id: 2,
    title: 'Trending Interior Design Styles in 2026',
    author: 'Priya Verma',
    date: '2026-04-10',
    category: 'Design Trends',
    excerpt: 'From minimalism to maximalism, explore the hottest interior design trends.',
    image: '/blog/trends-2026.jpg',
  },
  {
    id: 3,
    title: 'The Complete Guide to Wardrobe Organization',
    author: 'Sneha Kumar',
    date: '2026-04-05',
    category: 'Storage Solutions',
    excerpt: 'Learn how to organize your wardrobe for maximum efficiency and style.',
    image: '/blog/wardrobe-guide.jpg',
  },
  {
    id: 4,
    title: 'Lighting Design: Brighten Your Space Intelligently',
    author: 'Rajesh Patel',
    date: '2026-03-30',
    category: 'Lighting',
    excerpt: 'Master the art of layered lighting to create the perfect ambiance.',
    image: '/blog/lighting-design.jpg',
  },
]

export const serviceOfferings = [
  {
    id: 1,
    name: 'Manish Select',
    description: 'Budget-friendly modular solutions for kitchens, wardrobes, and storage.',
    features: ['Affordable pricing', 'Quick delivery', 'Quality materials', 'Professional installation'],
    startingPrice: '2,50,000',
  },
  {
    id: 2,
    name: 'Manish Premium',
    description: 'Full-service interior design with premium materials and exclusive designs.',
    features: ['2D/3D design', 'Premium materials', 'Dedicated designer', 'Warranty support'],
    startingPrice: '5,00,000',
  },
  {
    id: 3,
    name: 'Manish Luxury',
    description: 'Bespoke luxury interiors with handpicked materials and unique designs.',
    features: ['Bespoke design', 'Imported materials', 'Personal designer', 'Lifetime support'],
    startingPrice: '10,00,000',
  },
]

export const guarantees = [
  { icon: '⏱️', title: '45-Day Installation', description: 'Quick move-in guarantee for modular projects' },
  { icon: '🏅', title: 'Lifetime Warranty', description: '10-year structural warranty + 1-year service warranty' },
  { icon: '✓', title: '100+ Quality Checks', description: 'Every project undergoes rigorous quality inspection' },
  { icon: '💰', title: 'Transparent Pricing', description: 'No hidden costs, itemized quote before work begins' },
  { icon: '👥', title: 'Dedicated Team', description: 'Your personal designer throughout the project' },
  { icon: '📱', title: 'Live Project Tracking', description: 'Real-time updates on WhatsApp and our app' },
]

export const faqExpanded = [
  {
    category: 'Pricing & Payment',
    questions: [
      { q: 'What is the minimum project value?', a: 'We handle projects starting from ₹2,50,000 onwards.' },
      { q: 'Do you offer flexible payment plans?', a: 'Yes, we offer EMI options and flexible milestone-based payments.' },
      { q: 'What happens if costs exceed the estimate?', a: 'We provide detailed costing breakdown upfront with no hidden charges.' },
    ],
  },
  {
    category: 'Project Timeline',
    questions: [
      { q: 'How long does a typical project take?', a: '45 days for modular projects, 60-90 days for full home renovation.' },
      { q: 'Can I rush the project?', a: 'Yes, we offer expedited timelines with additional charges.' },
      { q: 'What if my project gets delayed?', a: 'We follow strict timelines and communicate proactively if delays occur.' },
    ],
  },
  {
    category: 'Warranty & Support',
    questions: [
      { q: 'What warranty do you provide?', a: '10-year structural warranty on modular products + 1-year service warranty.' },
      { q: 'Is after-sales support available?', a: 'Yes, we provide dedicated after-sales support and maintenance services.' },
      { q: 'How do I file a warranty claim?', a: 'Contact our support team via WhatsApp or phone with documentation.' },
    ],
  },
  {
    category: 'Design & Customization',
    questions: [
      { q: 'Can I customize designs?', a: 'Absolutely! We create bespoke designs tailored to your preferences.' },
      { q: 'Do you provide 3D visualizations?', a: 'Yes, 2D/3D designs are provided before manufacturing begins.' },
      { q: 'Can I change designs mid-project?', a: 'Minor changes are possible; major changes may affect timeline and cost.' },
    ],
  },
]

export const credentials = {
  projectsCompleted: '5000+',
  happyClients: '4800+',
  designersTeam: '45+',
  citiesCovered: 5,
  yearsExperience: 20,
  awards: [
    { name: 'Best Interior Design Brand 2025', org: 'Interior Design Association' },
    { name: 'Customer Choice Award', org: 'Housing.com' },
    { name: 'Top 10 Designers in Mumbai', org: 'AD Design Awards' },
  ],
}
