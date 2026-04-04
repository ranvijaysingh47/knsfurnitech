// KNS Furnitech Admin Dashboard - Bulk Import Script
// Instructions: Paste this entire script into your browser's Developer Console (F12) while logged into the Admin Dashboard.
// It will utilize your active Firebase session to securely upload all 109 products through the UI cleanly.

(async function autoUpload() {
    const products = [
  {
    "name": "Cafeteria Chairs Cafeteria PL 02 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Cafeteria_PL_02_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Cafeteria_PL_02_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 10 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_10_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_10_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 02 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_02_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_02_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Lounge 06 - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Lounge_06_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Lounge_06_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Lounge 04 - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Lounge_04_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Lounge_04_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Fly - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Construction made of Polypropylene frame, finished with fabric of the structure of the net. This fabric provides superior aeration and back ventilation, preventing the excessive sweating.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Construction made of Polypropylene frame, finished with fabric of the structure of the net. This fabric provides ..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Fly_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Fly_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations NIRVANA - 811 - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>NIRVANA is a chair with ergonomic properties modern design and an array of individual settings with adjustable Nylon arm. The basic features of the chair include a fully upholstered backrest, two types of modern synchronous mechanisms multifunctional armrests.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | NIRVANA is a chair with ergonomic properties modern design and an array of individual settings with adjustable Ny..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/NIRVANA_-_811_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/NIRVANA_-_811_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations NIRVANA - 813 - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>NIRVANA is a chair with ergonomic properties modern design and an array of individual settings with fixed T, shape Arm. The basic features of the chair include a fully upholstered backrest, two types of modern synchronous mechanisms multifunctional armrests.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | NIRVANA is a chair with ergonomic properties modern design and an array of individual settings with fixed T, shap..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/NIRVANA_-_813_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/NIRVANA_-_813_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Robo HB - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>The chair is equipped with a number of adjustment mechanisms to increase its ergonomic value and make it ideally suited to the user's preferences. The backrest is designed for offering appropriate support for the lumbar section of the spine being particularly prone to defects due to long hours spent in the sitting position.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | The chair is equipped with a number of adjustment mechanisms to increase its ergonomic value and make it ideally ..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Robo_HB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Robo_HB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 12 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_12_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_12_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Danza MB - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Ergonomic design, Fixed armrests, Syncro single point locking mechanism, Class III Gas lift bifma standard, Nylon bifma standard base. As a result, the chair meets expectations of those who spend more than ten hours sitting at their desks.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Ergonomic design, Fixed armrests, Syncro single point locking mechanism, Class III Gas lift bifma standard, Nylon..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Danza_MB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Danza_MB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Elegant - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Elegant_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Elegant_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs MS 01 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/MS_01_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/MS_01_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 20 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_20_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_20_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Ultra H/B - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High back cushion backrest , Aluminum polish armrest, Multi locking synchronized mechanism, Class iii chrome gas lift for height adjustment, Aluminum polish base.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | High back cushion backrest , Aluminum polish armrest, Multi locking synchronized mechanism, Class iii chrome gas ..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/p6_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/p6_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 09 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_09_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_09_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 11 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_11_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_11_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Rider MB - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Modern smartly designed chair of a high user value for everyone. that's Alfa. Quality material, individual choice of mechanism, armrest and five star bases, and most importantly superb ergonomic feature. All these make Alfa an outstanding choice amongst mesh backrest chairs in this category.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Modern smartly designed chair of a high user value for everyone. that's Alfa. Quality material, individual choice..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Rider_MB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Rider_MB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Woodtech - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Woodtech_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Woodtech_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 13 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_13_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_13_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Jupiter - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>These are innovative chairs which ensures comfort, mobility and lightness of style. Optimizing your body posture, It significantly\u00a0 ncreases your concentration level. Apart from the fluent adjustments of the seat and backrest, the chairs are also having adjustable lumbar support.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | These are innovative chairs which ensures comfort, mobility and lightness of style. Optimizing your body posture,..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Jupiter_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Jupiter_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Lounge 07 - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Lounge_07_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Lounge_07_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Wi max Cushion - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Wi-max re-defines the class and aura of the executive seating. High upholstered backrest operator armchair, Fixed arm inbuilt in back, Multipoint Locking Synchro mechanism,</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Wi-max re-defines the class and aura of the executive seating. High upholstered backrest operator armchair, Fixed..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/p2_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/p2_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Daisy - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Daisy is Elegant chair, fully imported, Fixed aluminum arm, Knee tilt mechanism, Aluminum Polish base.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Daisy is Elegant chair, fully imported, Fixed aluminum arm, Knee tilt mechanism, Aluminum Polish base. | Daisy is..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Daisy_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Daisy_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Educational ED 04 - SS",
    "category": "Educational",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your educational with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Educational areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic educational, modular workstation, commercial furniture India, premium educational</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/ED_04_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/ED_04_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations NIRVANA - 812 - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>NIRVANA is a chair with ergonomic properties modern design and an array of individual settings with fixed Loop arm or adjustable. The basic features of the chair include a fully upholstered backrest, two types of modern synchronous mechanisms multifunctional armrests.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | NIRVANA is a chair with ergonomic properties modern design and an array of individual settings with fixed Loop ar..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/NIRVANA_-_812_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/NIRVANA_-_812_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Laura - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Laura_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Laura_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 05 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_05_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_05_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Puffy & Tables Tablet Chair - SS",
    "category": "Puffy & Tables",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your puffy & tables with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Puffy & Tables areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic puffy & tables, modular workstation, commercial furniture India, premium puffy & tables</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Tablet_Chair_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Tablet_Chair_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Minto H/B - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High back cushion backrest Fixed armrest, Centre tilt mechanism Multi locking backrest , Class III Gas Chrome Gas lift for height adjustment. Aluminum polish base. Available in High back and Mid Back. Its suitable for Meeting and Conference room. Minto HB</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | High back cushion backrest Fixed armrest, Centre tilt mechanism Multi locking backrest , Class III Gas Chrome Gas..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/p5_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/p5_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Ben - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Ben is created to satisfy individual comfort and preferences on the ergonomic mechanism. The various features of the armrest exude flexibility and accommodating to the individual needs. Its practicality has been accredited by every working environment.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Ben is created to satisfy individual comfort and preferences on the ergonomic mechanism. The various features of ..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Ben_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Ben_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 04 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_04_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_04_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Lounge 01 - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Lounge_01_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Lounge_01_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 16 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_16_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_16_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Mesh VI - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Mesh VI High back Chair available with headrest and without headrest in single point locking mechanism , Nylon adjustable arm with ABS top, Adjustable lumber support, Bifma standard class III Gas lift. Nylon curve base bifma standard.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Mesh VI High back Chair available with headrest and without headrest in single point locking mechanism , Nylon ad..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Mesh_VI_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Mesh_VI_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Puffy & Tables Wooden Cafe 01 - SS",
    "category": "Puffy & Tables",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your puffy & tables with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Puffy & Tables areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic puffy & tables, modular workstation, commercial furniture India, premium puffy & tables</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Wooden_Cafe_01_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Wooden_Cafe_01_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Respiro - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Beautifully Designed, Respiro chair proves that high design can be affordable. The chair is equipped modern mesh backrest. The comfortable ergonomic seat has a waterfall front and the height can be easily adjusted with a safety gas lift.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Beautifully Designed, Respiro chair proves that high design can be affordable. The chair is equipped modern mesh ..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Respiro_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Respiro_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Lounge 05 - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Lounge_05_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Lounge_05_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Luxor - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Dassel high back chair with Headrest , Fixed Aluminum arm , Multipoint Locking Mechanism, Aluminum polish base.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Dassel high back chair with Headrest , Fixed Aluminum arm , Multipoint Locking Mechanism, Aluminum polish base. |..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Luxor_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Luxor_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 07 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_07_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_07_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Oxford - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Oxford High Back with Adjustable Arm, Knee tilt mechanism, Aluminum Polish Base.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Oxford High Back with Adjustable Arm, Knee tilt mechanism, Aluminum Polish Base. | Oxford High Back with Adjustab..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Oxford_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Oxford_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Storm HB - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>The Storm collection offers a combination of unique design, impressive quality and superb ergonomic properties - qualities that stood at the birth and were present in the development of the Storm collection. It offers a wide selection of variously equipped models, in essence, it gives the opportunity to choose one own Storm.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | The Storm collection offers a combination of unique design, impressive quality and superb ergonomic properties - ..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Storm_HB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Storm_HB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Argon - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Argon Fully imported chair in Korean mesh with headrest, Adjustable arm with PU pad, Multipoint Locking Mechanism and aluminum polish base.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Argon Fully imported chair in Korean mesh with headrest, Adjustable arm with PU pad, Multipoint Locking Mechanism..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Argon_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Argon_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 09 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_09_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_09_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Dhira - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Dhira seating collection is for the discerning office environment, where sophistication of details, highly engineered and unmatched comfort are called for. The refinement and elegance of this executive series allows it to be ideal for prestigious office environments.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Dhira seating collection is for the discerning office environment, where sophistication of details, highly engine..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Dhira_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Dhira_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 07 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_07_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_07_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs Cafeteria PL 01 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Cafeteria_PL_01_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Cafeteria_PL_01_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 21 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_21_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_21_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Puffy & Tables Tablet Chair - SS",
    "category": "Puffy & Tables",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your puffy & tables with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Puffy & Tables areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic puffy & tables, modular workstation, commercial furniture India, premium puffy & tables</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Tablet_Chair3_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Tablet_Chair3_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Virgo - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Construction made of Nylon frame, finished with fabric of the structure of the net. VIRGO Lumber adjustable Its Imported mesh fabric from Taiwan provides superior aeration and back ventilation, preventing the excessive sweating. Adjustable & Fixed arm option available.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Construction made of Nylon frame, finished with fabric of the structure of the net. VIRGO Lumber adjustable Its I..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Virgo_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Virgo_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Marvel MB - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Back made of engineering grade of plastic chair of a high user value for everyone. that's Marvel. Quality material, individual choice of mechanism, armrest and five star bases, and most importantly superb ergonomic feature of adjustable lumber support.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Back made of engineering grade of plastic chair of a high user value for everyone. that's Marvel. Quality materia..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Marvel_MB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Marvel_MB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Dassel - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Dassel high back chair with Headrest , Fixed Aluminum arm , Multipoint Locking Mechanism, Aluminum polish base.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Dassel high back chair with Headrest , Fixed Aluminum arm , Multipoint Locking Mechanism, Aluminum polish base. |..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Dassel_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Dassel_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Sedna - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Not a mere working tool, Sedna promises the pleasure of perfect sitting comfort. It is visually and ergonomically exceptional which combines a maximum of technical elements and important individual settings and ergonomics while remaining an attractive item of d\u00e9cor for any office.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Not a mere working tool, Sedna promises the pleasure of perfect sitting comfort. It is visually and ergonomically..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Sedna_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Sedna_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs MSW 01 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/MSW_01_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/MSW_01_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 08 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_08_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_08_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Alfa - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>KNS's wellness philosophy. The noble polished aluminum distinguishes the high end character of this chair. ALFA is always an expression of maximum assurance of comfort and style..</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | KNS's wellness philosophy. The noble polished aluminum distinguishes the high end character of this chair. ALFA i..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Alfa_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Alfa_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Fabtech - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Fabtech1_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Fabtech1_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs MS 02 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/MS_02_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/MS_02_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs K01 - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>K01 High backrest President armchair Knee tilt Multipoint locking Gas lift mechanism Bifma Standard Class 3 and polished Aluminum base. Imported chair ideal for Director Seating, back tilt also can be lock at any position, Armrest covered with leather.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | K01 High backrest President armchair Knee tilt Multipoint locking Gas lift mechanism Bifma Standard Class 3 and p..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/product-1_big-640x480.png",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/product-1_big-640x480.png"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Lowa - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Lowa_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Lowa_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Vita MB - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Modern smartly designed chair of a high user value for everyone. that's Vita. Quality material, individual choice of mechanism, armrest and five star bases, and most importantly superb ergonomic feature. All these make Vita an outstanding choice amongst mesh backrest chairs in this category.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Modern smartly designed chair of a high user value for everyone. that's Vita. Quality material, individual choice..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Vita_MB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Vita_MB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Format - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>With the comfort it brings to your moments of rest and relaxation. Its elegance goes hand in hand with perfect functionality and sitting ergonomics. The design of this line is unmistakable, and will most certainly enrich the interior of any office or meeting room.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | With the comfort it brings to your moments of rest and relaxation. Its elegance goes hand in hand with perfect fu..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Format_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Format_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Educational ED 01 - SS",
    "category": "Educational",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your educational with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Educational areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic educational, modular workstation, commercial furniture India, premium educational</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/ED_01_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/ED_01_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Alfa MB - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Modern smartly designed chair of a high user value for everyone. that's Alfa. Quality material, individual choice of mechanism, armrest and five star bases, and most importantly superb ergonomic feature. All these make Alfa an outstanding choice amongst mesh backrest chairs in this category.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Modern smartly designed chair of a high user value for everyone. that's Alfa. Quality material, individual choice..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Alfa_MB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Alfa_MB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Educational ED 03 - SS",
    "category": "Educational",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your educational with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Educational areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic educational, modular workstation, commercial furniture India, premium educational</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/ED_03_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/ED_03_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs IEDA - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Ieda redefines the bionics of human body with adjustable lumber support. The combination of contoured edges and Nylon frame work offers the elegance as well as strength to the chair. Suitable for conference & meeting room.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Ieda redefines the bionics of human body with adjustable lumber support. The combination of contoured edges and N..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/IEDA_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/IEDA_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Educational ED 02 - SS",
    "category": "Educational",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your educational with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Educational areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic educational, modular workstation, commercial furniture India, premium educational</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/ED_02_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/ED_02_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Filo - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High back cushion chair with multi locking mechanism, Fixed Aluminum arm, Aluminum polish base.. Knee tilt Multipoint Locking Mechanism, User friendly adjustable back throw side lever. Available with headrest & Without headrest.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | High back cushion chair with multi locking mechanism, Fixed Aluminum arm, Aluminum polish base.. Knee tilt Multip..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/p4_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/p4_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Optima - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Optima High with Headrest and without headrest, Adjustable arm, Multipoint Locking Syncrotilt Mechanism, Adjustable Lumber Support. Nylon Base with Twin Wheel castor.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Optima High with Headrest and without headrest, Adjustable arm, Multipoint Locking Syncrotilt Mechanism, Adjustab..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Optima_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Optima_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Fabtech - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Fabtech_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Fabtech_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 04 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_04_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_04_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Storm MB - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>The Storm collection offers a combination of unique design, impressive quality and superb ergonomic properties - qualities that stood at the birth and were present in the development of the Storm collection. It offers a wide selection of variously equipped models, in essence, it gives the opportunity to choose one own Storm.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | The Storm collection offers a combination of unique design, impressive quality and superb ergonomic properties - ..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Storm_MB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Storm_MB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 10 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_10_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_10_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 06 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_06_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_06_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Astra - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Astra HB Laterite with adjustable 3 d Arm, Syncrotilt Mechanism Multipoint Locking, Chrome Gas lift, Aluminum Polish Base</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Astra HB Laterite with adjustable 3 d Arm, Syncrotilt Mechanism Multipoint Locking, Chrome Gas lift, Aluminum Pol..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Astra_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Astra_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Lounge 03 - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Lounge_03_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Lounge_03_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 03 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_03_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_03_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 11 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_11_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_11_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Kebel - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Construction made of PP frame, finished with fabric of the structure of the net. This fabric provides superior aeration and back ventilation, preventing the excessive sweating.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Construction made of PP frame, finished with fabric of the structure of the net. This fabric provides superior ae..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Kebel_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Kebel_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 08 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_08_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_08_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Barcelona - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/barcelona_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/barcelona_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs V \u2013 Mesh - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>V-Mesh is a family of traditionally styled board room chairs. The Aluminum polish arm matching with bifma standard aluminum polish base. This solution, coupled with the possibility to adjust seating height and back can be lock any position and suitably profiled sections, make it possible to fine-tune the seating position to the individual needs of each user.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | V-Mesh is a family of traditionally styled board room chairs. The Aluminum polish arm matching with bifma standar..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/V_-_Mesh_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/V_-_Mesh_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Robo MB - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Workstation Chair in Umbergaon. The chair is equipped with a number of adjustment mechanisms to increase its ergonomic value and make it ideally suited to the user's preferences. The backrest is designed for offering appropriate support for the lumbar section of the spine being particularly prone to defects due to long hours spent in the sitting position.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Workstation Chair in Umbergaon. The chair is equipped with a number of adjustment mechanisms to increase its ergo..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Robo_MB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Robo_MB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations EM -6064 - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Construction made of pp frame, finished with fabric of the structure of the net. This fabric provides superior aeration and back ventilation, preventing the excessive sweating.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Construction made of pp frame, finished with fabric of the structure of the net. This fabric provides superior ae..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/EM_-6064_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/EM_-6064_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 12 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_12_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_12_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs SIMlim Cushion H/B - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High back double cushion chair with fixed chrome arm , Centretilt mechanism single point locking , Bifma Standard Gas lift for height adjustment. Chrome base with bifma standard nylon castor. Idle for meeting and conference room.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | High back double cushion chair with fixed chrome arm , Centretilt mechanism single point locking , Bifma Standard..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/SIMlim_Cushion_HB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/SIMlim_Cushion_HB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Smart MB - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Smart MB back structure made of Nylon & used Taiwan imported nylon mesh . Quality material, individual choice of mechanism Centre tilt single & Multi locking , armrest and five star bases, Suitable for meeting Or conference room.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Smart MB back structure made of Nylon & used Taiwan imported nylon mesh . Quality material, individual choice of ..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Smart_MB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Smart_MB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations EINSTEIN MB - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Adopting the findings of research and study on human ergonomics, the EINSTEIN is angled and contoured to effective orthopedic comfort. Aesthetically enhanced by sleek and simplicity design; EINSTEIN makes a great choice for modern office and corporate image enhancement.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Adopting the findings of research and study on human ergonomics, the EINSTEIN is angled and contoured to effectiv..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/EINSTEIN_MB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/EINSTEIN_MB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Smart - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Smart redefines the bionics of human body with adjustable lumber support. The combination of contoured edges and Nylon frame work offers the elegance as well as strength to the chair. Suitable for conference & meeting room.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Smart redefines the bionics of human body with adjustable lumber support. The combination of contoured edges and ..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Smart_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Smart_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Orion HB - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Smarts redefines the bionics of human body with adjustable lumber support. The combination of contoured edges and Nylon frame work offers the elegance as well as strength to the chair. Suitable for conference & meeting room.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Smarts redefines the bionics of human body with adjustable lumber support. The combination of contoured edges and..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Orion_HB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Orion_HB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 19 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_19_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_19_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Puffy & Tables Tablet Chair - SS",
    "category": "Puffy & Tables",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your puffy & tables with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Puffy & Tables areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic puffy & tables, modular workstation, commercial furniture India, premium puffy & tables</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Tablet_Chair1_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Tablet_Chair1_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Skelton - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Skelton High Back is Pure ergonomic chair with proper support on Full backrest, Nylon base with Castor wheel.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Skelton High Back is Pure ergonomic chair with proper support on Full backrest, Nylon base with Castor wheel. | S..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Skelton_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Skelton_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Titan - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Modern and fully ergonomic office chair. This mesh back chair is the embodiment of dynamics, lightness, amiability and confidence. They are designed to guarantee a long term utility and aesthetic value.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Modern and fully ergonomic office chair. This mesh back chair is the embodiment of dynamics, lightness, amiabilit..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Titan_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Titan_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Steelo H/B - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Steelo H/B chair ideal for executive seating. High upholstered backrest Aluminum Polish Base, Synchro mechanism Multipoint locking, Fixed armrests..</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Steelo H/B chair ideal for executive seating. High upholstered backrest Aluminum Polish Base, Synchro mechanism M..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/p3_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/p3_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Tela - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Tela medium back chair with imported mesh backrest , Adjustable arm with PU pad , self adjustment synchronized mechanism multipoint locking, Bifma standard class iii gas lift, Nylon base with castor wheel. Suitable for meeting & conference room.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Tela medium back chair with imported mesh backrest , Adjustable arm with PU pad , self adjustment synchronized me..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Tela_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Tela_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Ergo-Mesh - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Ergonomic design, Nylon adjustable armrests with ABS Pad, Mesh Back, Seat height Adjustable, coupled with the synchro mechanism Single Point Locking with slider. Nylon Bifma standard curve base.As a result, the chair meets expectations of those who spend more than ten hours sitting at their desks.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Ergonomic design, Nylon adjustable armrests with ABS Pad, Mesh Back, Seat height Adjustable, coupled with the syn..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Ergo-Mesh_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Ergo-Mesh_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations Vista Visitor - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Construction made of PP frame, finished with fabric of the structure of the net. This fabric provides superior aeration and back ventilation, preventing the excessive sweating.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Construction made of PP frame, finished with fabric of the structure of the net. This fabric provides superior ae..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Vista_Visitor_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Vista_Visitor_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 18 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_18_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_18_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Sofa & Lounge Lounge 02 - SS",
    "category": "Sofa & Lounge",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your sofa & lounge with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Sofa & Lounge areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic sofa & lounge, modular workstation, commercial furniture India, premium sofa & lounge</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Lounge_02_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Lounge_02_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations YB - NET - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Construction made of metal frame, finished with fabric of the structure of the net. This fabric provides superior aeration and back ventilation, preventing the excessive sweating.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Construction made of metal frame, finished with fabric of the structure of the net. This fabric provides superior..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/YB_-_NET_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/YB_-_NET_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations EINSTEIN HB - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Adopting the findings of research and study on human ergonomics, the EINSTEIN is angled and contoured to effective orthopedic comfort. Aesthetically enhanced by sleek and simplicity design; EINSTEIN makes a great choice for modern office and corporate image enhancement.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Adopting the findings of research and study on human ergonomics, the EINSTEIN is angled and contoured to effectiv..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/EINSTEIN_HB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/EINSTEIN_HB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Marvel HB - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>The Marvel combines the style of the modern architecture with Soma's wellness philosophy. The noble polished aluminum distinguishes the high end character of this chair. ALFA is always an expression of maximum assurance of comfort and style..</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | The Marvel combines the style of the modern architecture with Soma's wellness philosophy. The noble polished alum..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Marvel_HB_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Marvel_HB_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Puffy & Tables Tablet Chair - SS",
    "category": "Puffy & Tables",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your puffy & tables with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Puffy & Tables areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic puffy & tables, modular workstation, commercial furniture India, premium puffy & tables</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Tablet_Chair2_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Tablet_Chair2_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations X- Mesh Small - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Construction made of Nylon frame, finished with fabric of the structure of the net. This fabric provides superior aeration and back ventilation, preventing the excessive sweating. Option of Fixed & adjustable arm available.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Construction made of Nylon frame, finished with fabric of the structure of the net. This fabric provides superior..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/X-_Mesh_Small_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/X-_Mesh_Small_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Bar Stools BS 01 - SS",
    "category": "Bar Stools",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your bar stools with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Bar Stools areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic bar stools, modular workstation, commercial furniture India, premium bar stools</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/BS_01_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/BS_01_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Cafeteria Chairs PL 03 - SS",
    "category": "Cafeteria Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your cafeteria chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>High-quality commercial furniture designed for longevity and comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Cafeteria Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic cafeteria chairs, modular workstation, commercial furniture India, premium cafeteria chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification"
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/PL_03_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/PL_03_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Workstations X Mesh - SS",
    "category": "Workstations",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your workstations with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>The X Mesh combines the style of the modern architecture with KNS'S wellness philosophy. The noble imported mesh distinguishes the high end character of this chair. X mesh is always an expression of maximum assurance of comfort and style..</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Workstations areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic workstations, modular workstation, commercial furniture India, premium workstations</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | The X Mesh combines the style of the modern architecture with KNS'S wellness philosophy. The noble imported mesh ..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/X_Mesh_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/X_Mesh_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  },
  {
    "name": "Executive Chairs Estel - SS",
    "category": "Executive Chairs",
    "material": "SS, Leather, Acrylic",
    "price": 10000,
    "mrp": 15000,
    "description": "Upgrade your executive chairs with our ergonomic and durable furniture. Made with SS, Leather, Acrylic, designed for comfort and commercial use in modern workspaces.",
    "longDescription": "<h2>Overview</h2><p>Estel is an expertly crafted seating range with matchless elegance.The backrest design, sophisticated seat shape and modern synchronous mechanism result in perfect ergonomics, ensuring a proper sitting position and great comfort.</p><h3>Key Features</h3><ul><li><strong>Ideal For:</strong> Executive Chairs areas, commercial spaces, and professional environments.</li><li><strong>Material Quality:</strong> Crafted using top-tier SS, Leather, Acrylic ensuring maximum durability.</li><li><strong>Comfort & Durability:</strong> Ergonomically optimized to provide superior support during long hours of use.</li></ul><p><small><strong>Tags:</strong> office furniture, ergonomic executive chairs, modular workstation, commercial furniture India, premium executive chairs</small></p>",
    "specs": {
      "Specifications": "Dimensions | Product Specification | Estel is an expertly crafted seating range with matchless elegance.The backrest design, sophisticated seat shape ..."
    },
    "dimensions": {},
    "colors": {},
    "image": "https://www.knsfurnitech.in/uploads/big/Estel_big-640x480.jpg",
    "images": [
      "https://www.knsfurnitech.in/uploads/big/Estel_big-640x480.jpg"
    ],
    "isNew": true,
    "badge": "New",
    "rating": 4.8
  }
];
    
    console.log(`Starting bulk import of ${products.length} products...`);
    let idx = 1;
    for (const p of products) {
        console.log(`[${idx}/${products.length}] Adding: ${p.name}`);
        await window.KNSData.addProduct(p);
        
        // Brief 150ms pause to prevent overwhelming Firefox/Chrome UI or Firebase Rate Limits
        await new Promise(r => setTimeout(r, 150));
        idx++;
    }
    
    console.log('✅ Bulk Import Completed Successfully! Refresh the page to see changes correctly.');
    if(window.refreshDashboard) refreshDashboard();
})();
