/**
 * Solution catalog — source of truth for /solution and /solution/[slug].
 *
 * Same pattern and same asset rules as lib/catalog.ts: copy is transcribed
 * from the client's live WordPress site, `image.src` / `brochure.href` are
 * LOCAL paths under /public, and the `remote` on each asset is what
 * `node scripts/fetch-assets.mjs` downloads.
 *
 * Fleet Monitoring and Attendance Management used to have rows here with
 * `detail: false` (no page on the live site to transcribe). Both rows were
 * dropped per client request rather than left as link-less cards.
 */

import type { CatalogImage, Brochure, Section, Faq } from "./catalog";

export type Solution = {
  slug: string;
  /** Anchor id of this solution's row on /solution — matches SolutionRow styleId. */
  rowId: string;
  /** Row + card title. */
  name: string;
  /** 2–3 line row body on the index page. */
  desc: string;
  /**
   * False when the live site has no page for this solution, so nothing was
   * transcribed. The row renders without a link rather than pointing at a
   * stub — an empty page is worse for both the visitor and for SEO.
   */
  detail: boolean;
  /** H1 on the detail page. Falls back to `name`. */
  heading?: string;
  /** Standfirst under the H1. */
  tagline?: string;
  intro?: string[];
  sections?: Section[];
  gallery?: CatalogImage[];
  brochures?: Brochure[];
  faqs?: Faq[];
  /** YouTube embed URL, where the source page has one. */
  video?: string;
  seo: { title: string; description: string };
  source?: string;
};

const IMG = "/images/solutions";
const PDF = "/brochures";
const WP = "https://networktoll.com/wp-content/uploads";

export const solutions: Solution[] = [
  {
    slug: "toll-management",
    rowId: "toll",
    name: "Toll Management",
    desc: "Automate the full lane: FASTag RFID identification, ANPR backup, automatic vehicle classification and weigh-in-motion, all reporting to a single plaza server. Hybrid lanes keep cash and card working alongside electronic collection.",
    detail: true,
    heading:
      "Network Toll Solutions: Intelligent Toll Management Software for Efficient Revenue Collection",
    intro: [
      "Network Toll Solutions offers a comprehensive and secure Toll Management Software (TMS) to streamline toll collection, maximise revenue and ensure transparency. Our software caters to the specific needs of toll road projects in India, adhering to NHAI guidelines and integrating seamlessly with existing infrastructure.",
    ],
    sections: [
      {
        title: "Ensuring Smooth and Secure Transactions",
        body: [
          "At Network Toll Solutions, we understand the importance of security and efficiency in toll management. Our robust TMS features a powerful lane engine with integrated subsoftwares, enabling:",
        ],
        list: [
          "Fraud-free Transaction Management: Our software safeguards against fraud attempts, guaranteeing a steady, accurate and traceable financial flow.",
          "Multi-lane Control and Monitoring: Manage multiple toll plazas from a central control centre with real-time data and video tracking capabilities.",
        ],
      },
      {
        title: "Flexibility and Scalability for Today's Needs",
        body: [
          "Network Toll's TMS offers unparalleled flexibility and scalability to meet your evolving requirements:",
        ],
        list: [
          "Multiple Payment Options: Accept cash, smart cards and RFID tags for seamless toll collection.",
          "Electronic Toll Collection (ETC) Integration: Our software seamlessly integrates with ETC infrastructure, allowing faster and more convenient toll payments.",
          "Automatic and Semi-Automatic Operations: Choose between fully automatic lanes for high-speed traffic or semi-automatic lanes for specific needs.",
          "Easy Upgrade Path: Each lane can be effortlessly upgraded to ETC functionality as required, ensuring future-proof investment.",
        ],
      },
      {
        title: "Enhanced Efficiency and Revenue Optimisation",
        body: [
          "Network Toll's intelligent TMS boasts a range of features designed to optimise traffic flow, minimise revenue leakage and generate valuable insights:",
        ],
        list: [
          "Minimal Revenue Leakage: Our software reduces human error and ensures accurate toll collection.",
          "High-Performance Automatic Vehicle Classification (AVC): The software accurately classifies vehicles (98% accuracy) for appropriate toll charges.",
          "Integration with ATMS and Speed Enforcement: Streamline traffic management and enforce speed limits with integrated solutions.",
        ],
      },
      {
        title:
          "Network Toll Toll Management Software (ETMS): Advanced Subsoftwares for Superior Performance",
        body: [
          "Network Toll's ETMS goes beyond basic toll collection, offering a suite of integrated subsoftwares for unmatched performance:",
        ],
        list: [
          "Smooth Traffic Flow and Increased Revenue: Our software facilitates a smooth traffic flow, minimising congestion and maximising revenue generation.",
          "High Traffic Volume Management: The software can handle over 150,000 PCU (Passenger Car Units) per day, which is ideal for busy toll plazas.",
          "Fraud Detection and Risk Minimisation: The software proactively identifies and tackles fraudulent activities, ensuring operational ease and reduced risk.",
          "Automated Toll Charge Determination: With AVC technology, the software automatically determines the correct toll charge based on vehicle classification.",
          "Overweight Vehicle Detection: Detect overweight vehicles using Weigh-in-Motion (WIM) technology for enforcement.",
          "Faster Data Processing and Enforcement: Utilise Automatic Number Plate Recognition (ANPR) for swift data processing and integration with speed enforcement softwares.",
        ],
      },
      {
        title:
          "Choose Network Toll Solutions for a Secure and Efficient Toll Management Software",
        body: [
          "Network Toll Solutions' TMS is the ideal choice for toll road authorities seeking a comprehensive, secure and efficient solution. Contact us today to learn more about how our innovative software can streamline your toll collection operations and maximise revenue.",
        ],
      },
    ],
    video: "https://www.youtube.com/embed/4axSzYVqzz0",
    brochures: [
      {
        label: "NTS toll plaza profile",
        href: `${PDF}/nts-toll-plaza-profile.pdf`,
        remote: `${WP}/2025/08/Presentation-NTS-Toll-Plaza-Profile.pdf`,
      },
    ],
    seo: {
      title: "Toll Management Software",
      description:
        "Secure, NHAI-compliant toll management software (TMS) with multi-lane control, ETC integration, 98% accurate vehicle classification and fraud detection.",
    },
    source: "https://networktoll.com/toll-management-software/",
  },
  {
    slug: "anpr-monitoring",
    rowId: "anpr",
    name: "ANPR Monitering",
    desc: "Day-and-night number plate recognition for toll plazas, parking and highways. ANPR runs alongside FASTag as enforcement and fallback, catching vehicles with a missing, blocked or blacklisted tag.",
    detail: true,
    heading: "Automatic Number Plate Recognition System",
    intro: [
      "Our camera-based Automatic Number Plate Recognition (ANPR) system is built to make highway monitoring smarter, faster, and more efficient. Designed especially for highway and traffic management applications, it automatically detects and recognizes vehicle number plates in real time, even in high-speed traffic conditions.",
      "Driven by AI-powered Computer Vision and Machine Learning, the system accurately reads number plates and performs vehicle classification with high precision. It captures clear, high-quality images of vehicles and number plates, along with date and time stamps, ensuring reliable and traceable data for tolling, surveillance, traffic enforcement, and analytics.",
      "With its ability to work seamlessly in different lighting and weather conditions, this intelligent ANPR solution helps authorities improve traffic flow, enhance road safety, and make data-driven decisions for modern highway infrastructure.",
    ],
    gallery: [
      {
        src: `${IMG}/anpr-toll-management.png`,
        remote: `${WP}/2025/12/1.png`,
        alt: "ANPR for toll management systems",
        width: 1024,
        height: 683,
      },
      {
        src: `${IMG}/anpr-intelligent-traffic.png`,
        remote: `${WP}/2025/12/2.png`,
        alt: "ANPR for intelligent traffic solutions",
        width: 1024,
        height: 683,
      },
      {
        src: `${IMG}/anpr-parking-management.png`,
        remote: `${WP}/2025/12/3.png`,
        alt: "ANPR for parking management solutions",
        width: 1024,
        height: 683,
      },
    ],
    sections: [
      {
        title: "Key Features",
        list: [
          "Used for vehicle number plate detection & recognition which can be further utilized for various applications e.g., section speed detection, RADAR triggered for Spot Speed Detection, MSWIM integrated ANPR, etc.",
          "Capture number plate along with the vehicle image, real time detection and recognition (OCR) of number plates, recognition of two-line & non-standard number plates.",
          "Recognize vehicle class (Car/Bus/Truck/Bike), recognize Yellow/White number plate colour with light, hot-list vehicle alarms, etc.",
          "Easy to use auditing & reporting modules.",
          "Control room application integration for e-challan, ICCC, Vahaan, etc.",
          "Robust 24×7 operations, low maintenance.",
        ],
      },
      {
        title: "Core Functional Modules",
        list: [
          "Vehicle and plate detection: Detect moving vehicles in the video stream, localize the number plate region, and capture clear plate images.",
          "OCR and validation: Use ANPR/ALPR software to segment characters and convert the plate image into text, then validate format (e.g., Indian HSRP patterns) against rules or databases.",
          "Vehicle classification: Use deep-learning models (YOLO, CNN-based) to classify vehicle type (car, bus, truck, 2-wheeler, etc.) from the same video frames in real time.",
        ],
      },
    ],
    brochures: [
      {
        label: "ANPR system — vehicle detection & plate recognition",
        href: `${PDF}/anpr-system.pdf`,
        remote: `${WP}/2025/12/ANPR-SYSTEM-–-Vehicle-Detection-Plate-Recognition.pdf`,
      },
    ],
    faqs: [
      {
        q: "How does the ANPR system work on highways?",
        a: "The ANPR system uses AI-powered cameras to automatically capture vehicle images and recognize number plates in real time. Advanced Computer Vision and Machine Learning algorithms process the data instantly, making it ideal for high-speed highway environments.",
      },
      {
        q: "Can the ANPR system work in low light or bad weather conditions?",
        a: "Yes. The system is designed to perform reliably in various lighting and weather conditions, including low light, rain, and fog. It captures high-quality images with accurate timestamps to ensure consistent performance and data accuracy.",
      },
      {
        q: "What are the key applications of the ANPR system?",
        a: "The ANPR system is widely used for highway toll management, traffic monitoring, law enforcement, vehicle classification, access control, and data analytics, helping authorities improve road safety and operational efficiency.",
      },
    ],
    seo: {
      title: "Automatic Number Plate Recognition System",
      description:
        "AI-driven ANPR system for highways — real-time number plate detection, vehicle classification, high-quality image capture and reliable performance in all weather.",
    },
    source: "https://networktoll.com/automatic-number-plate-recognition-system/",
  },
  {
    slug: "smart-parking-management",
    rowId: "smart-parking",
    name: "Smart Parking Management",
    desc: "FASTag-based entry and exit, real-time bay counting and guidance displays, with boom barriers, CCTV and ANPR controlling access across the facility.",
    detail: true,
    heading: "Network Toll Solution: Simplify Parking with Automated Technology",
    intro: [
      "Network Toll Solution offers a comprehensive suite of parking management systems designed to streamline your parking operation and enhance the user experience. Our solutions leverage the latest automation and data management advancements to eliminate frustration and create a smooth, efficient parking experience.",
    ],
    sections: [
      {
        title: "Reduce Congestion, Enhance Experience",
        body: [
          "Finding a parking spot can be a time-consuming and stressful experience. Network Toll Solution's parking management system helps alleviate this pain point by providing real-time information on available parking spaces. This includes:",
        ],
        list: [
          "Traveller Information Systems: Digital displays that guide drivers to vacant spots, reducing time spent searching.",
          "Real-Time Vehicle Counting: Provides an accurate picture of parking availability at a glance.",
          "Real-Time Parking Guidance Displays: Digital signs that direct drivers to open spaces.",
        ],
      },
      {
        title: "Seamless Entry and Exit",
        body: [
          "Network Toll Solution's system eliminates the need for manual ticket dispensing and payment collection. Here's how:",
        ],
        list: [
          "Automated Entry/Exit with FASTag: Four-wheeled vehicles can seamlessly enter and exit the parking facility through FASTag integration. FASTag, a prepaid RFID sticker affixed to the windshield, automatically deducts the parking fee as the vehicle passes a designated reader.",
          "Fast and Easy Payment Options: Our system offers diverse payment options to ensure a convenient experience for all users.",
        ],
      },
      {
        title: "Security and Control",
        body: [
          "Network Toll Solution prioritises the safety and security of your parking facility. Our integrated system incorporates the following:",
        ],
        list: [
          "Access Control: Boom barriers and traffic signal lights manage vehicle flow and prevent unauthorised access.",
          "CCTV Surveillance: High-definition cameras provide constant monitoring to deter theft and vandalism.",
          "RFID and ANPR (Automatic Number Plate Recognition): These technologies ensure accurate vehicle identification and access control.",
        ],
      },
      {
        title: "Advanced Parking Guidance",
        body: ["Our parking guidance system takes the guesswork out of finding a spot. It comes in two forms:"],
        list: [
          "Internal Guidance: Digital displays within the parking facility direct drivers to open spaces, minimising searching time.",
          "External Guidance: Signage outside the parking area informs drivers of overall parking availability, helping them decide whether to enter.",
        ],
      },
      {
        title: "Integrated Parking Management System",
        body: [
          "Network Toll Solution's parking management system utilises a range of automated technologies to ensure smooth operation, including:",
        ],
        list: [
          "Radio Frequency Identification (RFID): RFID tags or stickers on vehicles allow for contactless identification and access control.",
          "Magnetic Strip Cards/Tickets: Provide an alternative payment method for users who don't have FASTag.",
          "Automatic Number Plate Recognition (ANPR): This technology captures and interprets vehicle license plates, streamlining data collection and access control.",
        ],
      },
      {
        title: "Transform your parking operation",
        body: [
          "We take the hassle out of parking, creating a smooth and efficient experience for parking facility operators and users. Contact us today to learn more about how our innovative solutions can transform your parking operation.",
        ],
      },
    ],
    gallery: [
      {
        src: `${IMG}/smart-parking-entry-exit.jpg`,
        remote: `${WP}/2025/05/parking-2.jpg`,
        alt: "Seamless FASTag entry and exit at a parking facility",
        width: 1024,
        height: 683,
      },
    ],
    video: "https://www.youtube.com/embed/Kz_9RlDBFqM",
    brochures: [
      {
        label: "Smart parking profile",
        href: `${PDF}/smart-parking-profile.pdf`,
        remote: `${WP}/2025/08/Presentation-smart-parking-profile.pdf`,
      },
    ],
    faqs: [
      {
        q: "What is an Automated Car Parking System and how does it work?",
        a: "An Automated Car Parking System is a technology-driven solution designed to manage parking operations without human intervention. It utilizes RFID readers, barriers, sensors, and software to control vehicle entry, exit, and payment, ensuring a seamless and efficient parking experience.",
      },
      {
        q: "What are the benefits of using Network Toll's Automated Car Parking Systems?",
        a: "Network Toll's Automated Car Parking Systems help reduce manual errors, save time, optimize space usage, and enable real-time monitoring. They support digital payments, RFID/QR code-based access, and generate reports for smooth operation and management.",
      },
      {
        q: "Can Automated Car Parking Systems be integrated with toll management and other access control solutions?",
        a: "Yes, Network Toll's Automated Car Parking Systems are fully integrated with the Toll Management System (TMS), RFID infrastructure, and access control systems. They enable unified data management, seamless operations, and improved security across facilities.",
      },
    ],
    seo: {
      title: "Smart Parking Management",
      description:
        "FASTag parking management and automated car parking systems — real-time bay counting, guidance displays, boom barriers, CCTV and ANPR access control.",
    },
    source: "https://networktoll.com/automated-car-parking-systems/",
  },
  {
    slug: "inventory-management",
    rowId: "inventory",
    name: "Inventory Management",
    desc: "Track stock at item level with UHF tags and fixed or handheld readers. Cycle counts that took a day take minutes, and shrinkage shows up in a report instead of at year end.",
    detail: true,
    heading: "Inventory Management System",
    intro: [
      "Network Toll Solutions' Inventory Management Solution is a smart, scalable, and intuitive platform built to help businesses track, monitor, and maintain their physical assets with precision and ease. Whether you're managing a warehouse, retail store, or manufacturing unit, our system provides real-time inventory tracking, ensuring complete visibility and control over your stock at all times.",
      "By focusing on inventory accuracy, the solution reduces manual errors, minimizes overstocking or stockouts, and enhances overall operational efficiency. Businesses can make informed decisions, optimize stock levels, and reduce unnecessary costs and waste, leading to smoother workflows and better resource allocation.",
      "With built-in features like real-time tracking, automated reporting, and intelligent stock insights, the solution is designed to boost productivity, prevent losses, and improve customer satisfaction. If you're looking to streamline inventory processes and grow smarter, Network Toll Solutions delivers the reliability and innovation you need.",
    ],
    gallery: [
      {
        src: `${IMG}/inventory-management.png`,
        remote: `${WP}/2025/08/Inventory-Management.png`,
        alt: "RFID inventory management solution dashboard",
        width: 1000,
        height: 500,
      },
    ],
    sections: [
      {
        title: "Common Challenges We Solve",
        list: [
          "Manual inventory errors",
          "Asset misplacement or theft",
          "Inaccurate reporting",
          "Inefficient audits",
          "Time-consuming tracking processes",
          "Stockouts and overstocking",
          "Inaccurate stock levels",
          "High labour cost",
          "Difficulty in demand forecasting",
          "Poor visibility across warehouses",
        ],
      },
      {
        title: "Components",
        list: [
          "RFID Tags (Passive/Active)",
          "RFID Readers",
          "Middleware/Software",
          "Barcode Tag",
          "Barcode Reader",
        ],
      },
      {
        title: "Workflow",
        list: [
          "Tagging: each asset is tagged with an RFID/Barcode chip",
          "Scanning: readers detect and capture asset data",
          "Data Processing: data is sent to central software",
          "Monitoring: live dashboard shows location, status, usage",
          "Reporting: automated reports and alerts",
        ],
      },
      {
        title: "System Architecture",
        list: [
          "Frontend: Web + Mobile Interface",
          "Backend: Database (MySQL/PostgreSQL)",
          "Integrations: ERP, Accounting Systems",
          "Cloud/On-Premise options",
        ],
      },
      {
        title: "Key Features",
        list: [
          "Inventory Tracking — real-time updates for incoming/outgoing stock",
          "Automated Reorder Points — avoid stockouts with minimum threshold alerts",
          "Reports & Analytics — daily, weekly, monthly reports",
          "Barcode/RFID Integration — for quick item scanning",
          "Multi-Location Support — centralized control across all warehouses/stores",
          "User Access Control — role-based dashboard",
          "Mobile App — on-the-go tracking and approvals",
        ],
      },
      {
        title: "RFID Asset Management Solution",
        list: [
          "Customizable tag encoding",
          "Scalable infrastructure",
          "Cloud-based or on-premise hosting",
          "Role-based access and multi-location support",
          "Alerts, analytics, and reports",
        ],
      },
      {
        title: "Deployment & Support",
        list: [
          "Site survey & tag planning",
          "Hardware procurement",
          "Software installation",
          "Training & support",
          "AMC & upgrades",
          "24×7 support and custom module development",
        ],
      },
    ],
    brochures: [
      {
        label: "Inventory management system datasheet",
        href: `${PDF}/inventory-management-system.pdf`,
        remote: `${WP}/2025/08/Inventory-Management-System-DataSheet.pdf`,
      },
    ],
    faqs: [
      {
        q: "How does Network Toll Solutions' Inventory Management System enhance stock visibility?",
        a: "Network Toll Solutions leverages RFID and real-time tracking to provide instant visibility of inventory across warehouses and retail floors. This ensures accurate stock counts, reduces shrinkage, and improves overall supply chain efficiency.",
      },
      {
        q: "Is the inventory system compatible with existing business software?",
        a: "Yes, the solution is built to integrate smoothly with leading ERP, POS, and warehouse management platforms, enabling businesses to manage their inventory with minimal disruption to existing workflows.",
      },
      {
        q: "What types of businesses can benefit from Network Toll Solutions' inventory product?",
        a: "From retail stores and warehouses to manufacturing units and healthcare facilities, any business that requires precise inventory tracking and automation can greatly benefit from this solution.",
      },
    ],
    seo: {
      title: "Inventory Management Solution",
      description:
        "RFID inventory management system with real-time stock tracking, automated reorder points, multi-location support and ERP integration.",
    },
    source: "https://networktoll.com/inventory-management-solution/",
  },
  {
    slug: "rfid-software-system",
    rowId: "rfid-software",
    name: "RFID Software System",
    desc: "Custom RFID platforms for gate automation, vehicle and personnel tracking, weighbridge automation, race timing and work-in-progress monitoring — with live dashboards and exportable reports.",
    detail: true,
    heading: "RFID Software Solutions",
    intro: [
      "At Network Toll Solutions, we specialize in delivering cutting-edge RFID software solutions that bring intelligence, automation, and visibility to your operations. As a technology-driven enterprise, we design and implement high-performance systems that combine RFID technology, smart sensors, and intelligent software to transform how businesses track, monitor, and manage assets in real time.",
      "Our RFID solutions are built to serve a wide range of industries — whether it's enhancing security, automating vehicle access, timing professional races, or optimizing logistics and supply chains. We also help organizations streamline inventory and asset management by offering customizable platforms that improve accuracy, reduce manual effort, and provide actionable insights.",
      "With our RFID software, you gain real-time visibility, better control over operations, and the ability to make faster, data-driven decisions. Our goal is to help businesses improve operational efficiency, reduce costs, prevent losses, and elevate overall performance. Whether you're looking to secure a facility, manage logistics, or automate workflows, Network Toll Solutions delivers smart, scalable, and reliable RFID systems tailored to your unique needs.",
    ],
    gallery: [
      {
        src: `${IMG}/rfid-software-toll.jpg`,
        remote: `${WP}/2025/05/solution-img-1.jpg`,
        alt: "Toll management system",
        width: 1024,
        height: 683,
      },
      {
        src: `${IMG}/rfid-software-traffic.jpg`,
        remote: `${WP}/2025/05/solution-img-3.jpg`,
        alt: "Intelligent traffic solution",
        width: 1024,
        height: 683,
      },
      {
        src: `${IMG}/rfid-software-parking.jpg`,
        remote: `${WP}/2025/05/solution-img-2.jpg`,
        alt: "Parking management solution",
        width: 1024,
        height: 683,
      },
    ],
    sections: [
      {
        title: "RFID Based Security and Gate Automation",
        list: [
          "Automatic boom barrier or gate access using RFID tags",
          "Vehicle & personnel entry-exit tracking",
          "Centralized control panel with real-time logs",
          "Visitor management integration",
          "Event-based alerts (unauthorized access, duplicate tag, etc.)",
          "Real-time tracking via RFID tags on vehicles",
          "Geo-fencing and movement monitoring",
          "Movement history, idle time, and trip reports",
          "Fuel theft prevention and GPS+RFID hybrid option",
          "Weighbridge automation with RFID application",
          "Tag-based access for authorized personnel or vehicles",
          "Secure authentication and entry/exit log reports",
        ],
      },
      {
        title: "RFID Racing / Marathon & Time Logging System",
        list: [
          "High-speed tag reading at checkpoints",
          "Accurate lap time & finish time recording",
          "Multi-lane race timing with millisecond precision",
          "Leader boards & live race dashboards",
          "RFID tags embedded in helmets, bikes, or bibs",
        ],
      },
      {
        title: "Work-in-Progress (WIP) Monitoring",
        list: [
          "Tracking production flow through different stages",
          "Automated data capture on item movement between workstations",
          "Downtime and delay alerts",
        ],
      },
      {
        title: "Personnel Tracking & Access Control",
        list: [
          "RFID-based ID cards or wearables",
          "Track employee movements in restricted zones",
          "Emergency roll-call and muster zones for safety compliance",
        ],
      },
      {
        title: "Custom Reporting & Analytics",
        list: [
          "Predefined and user-defined reports",
          "MIS reports, daily movement logs, event logs",
          "Export to PDF, Excel, and integration with external systems",
          "Auto-generated daily/weekly/monthly reports",
          "Custom filters (date range, item type, location, tag ID)",
          "Live dashboards showing movement history",
        ],
      },
    ],
    brochures: [
      {
        label: "RFID software solution",
        href: `${PDF}/rfid-software-solution.pdf`,
        remote: `${WP}/2025/08/RFID-Software-Solution.pdf`,
      },
    ],
    faqs: [
      {
        q: "What is RFID software and how does it work in my business?",
        a: "RFID (Radio Frequency Identification) software uses tags and readers to track and manage assets, inventory, or people in real time. At Network Toll Solutions, our RFID software integrates with sensors and intelligent systems to provide real-time data, automate processes, and improve visibility and control across your operations.",
      },
      {
        q: "Which industries can benefit from your RFID solutions?",
        a: "Our RFID solutions are highly versatile and serve multiple domains such as security, logistics, vehicle access control, race timing, asset tracking, and warehouse management. Whether you manage a logistics chain, a secure facility, or an event, our systems can be tailored to meet your specific needs.",
      },
      {
        q: "Can your RFID software be customized to fit our existing systems?",
        a: "Absolutely. At Network Toll Solutions, we specialize in custom-built RFID solutions that integrate seamlessly with your existing infrastructure. Whether you need to connect with ERP systems, security protocols, or IoT devices, our solutions are designed to be scalable, flexible, and easy to implement.",
      },
    ],
    seo: {
      title: "RFID Software System",
      description:
        "Custom RFID software solutions for gate automation, vehicle and personnel tracking, weighbridge automation, race timing and WIP monitoring.",
    },
    source: "https://networktoll.com/rfid-software-system/",
  },
  {
    slug: "plaza-center-database-server",
    rowId: "plaza",
    name: "Plaza Center & Database Server",
    desc: "The plaza server is where every lane reports. It consolidates transactions, incidents and images, reconciles revenue across lanes and shifts, and syncs to your central back office for audit and settlement.",
    detail: true,
    heading: "Plaza Center & Database Server",
    gallery: [
      {
        src: `${IMG}/plaza-center.jpg`,
        remote: `${WP}/2025/05/plaza-center.jpg`,
        alt: "Toll plaza control centre",
        width: 1024,
        height: 683,
      },
      {
        src: `${IMG}/database-server.jpg`,
        remote: `${WP}/2025/05/database-server.jpg`,
        alt: "Central database server rack",
        width: 1024,
        height: 683,
      },
    ],
    sections: [
      {
        title: "Plaza Center",
        list: [
          "Central Database Server",
          "Backup Server",
          "Monitoring Station",
          "Point of Sale",
          "Report Module",
          "Validation System",
          "Cash Up System",
          "HR Admin",
        ],
      },
      {
        title: "Central Database Server",
        list: [
          "Extensive administering and reporting functions",
          "High-quality server platform",
          "RAID technology",
          "Software licence MS Windows 2016 Server",
          "Requires: work station WS 120 incl. Win Operate",
          "Communication with the work station via Ethernet",
          "Controlling, administering and evaluating possible via several work stations",
          "Remote maintenance via ISDN modem or VPN without negative effects on the current operation",
        ],
      },
    ],
    faqs: [
      {
        q: "What is the role of the Plaza Center in toll operations?",
        a: "The Plaza Center acts as the centralized control hub for all toll lanes at a plaza. It monitors real-time toll transactions, lane equipment status, cash flow, and traffic data to ensure smooth, secure, and uninterrupted toll operations.",
      },
      {
        q: "What type of Database Server does Network Toll use for toll data management?",
        a: "Network Toll deploys high-performance, secure database servers to store and manage toll transaction data, vehicle records, audit trails, and system logs. These servers support real-time synchronization and enable centralized reporting, monitoring, and analytics.",
      },
      {
        q: "How do the Plaza Center and Database Server ensure data accuracy and system reliability?",
        a: "With real-time data syncing, backup protocols, and secure access control, Network Toll's Plaza Center and database server setup ensures data integrity, prevents loss, and enables fast recovery. This setup improves decision-making and enhances overall operational efficiency.",
      },
    ],
    seo: {
      title: "Plaza Center & Database Server",
      description:
        "Toll plaza control centre and central database server — monitoring station, point of sale, validation, cash-up and reporting with RAID and remote maintenance.",
    },
    source: "https://networktoll.com/plaza-center-database-server/",
  },
  {
    slug: "number-plate-detection",
    rowId: "number-plate-detection",
    name: "Number Plate Detection",
    desc: "Camera-based vehicle identification for gate automation — reads plates at speed, day or night, and drives entry and exit without an operator.",
    detail: true,
    heading: "Vehicle Number Plate Detection System",
    tagline: "Smart. Secure. Seamless Vehicle Identification.",
    intro: [
      "Network Toll Solution Pvt. Ltd. presents an advanced Vehicle Number Plate Detection System, designed to deliver accurate, real-time vehicle identification and monitoring. Built using high-performance cameras and intelligent recognition technology, the system automatically captures, reads, and records vehicle registration numbers with precision — even at high speeds and in challenging lighting conditions.",
      "Ideal for toll plazas, smart cities, parking management, residential townships, commercial complexes, and highway surveillance, our solution enhances security, automation, and operational efficiency.",
    ],
    gallery: [
      {
        src: `${IMG}/number-plate-detection.png`,
        remote: `${WP}/2026/02/2-Figure1-1-1024x532.png`,
        alt: "Vehicle number plate detection pipeline",
        width: 1024,
        height: 532,
      },
    ],
    sections: [
      {
        title: "Key Features & Benefits",
        list: [
          "High Accuracy Recognition — advanced AI-powered OCR ensures precise number plate reading.",
          "Real-Time Detection — instant vehicle capture and data processing for seamless operations.",
          "Day & Night Performance — infrared-enabled cameras for clear detection in low light and harsh weather conditions.",
          "Fast Vehicle Tracking — detects number plates even at high vehicle speeds.",
          "Centralized Monitoring — integrated dashboard for real-time monitoring and data analytics.",
          "Automated Entry & Exit Control — reduces manual intervention and enhances traffic flow.",
          "Data Storage & Reporting — secure data logging with customizable reports.",
          "Easy Integration — compatible with toll systems, parking systems, access control, and security networks.",
          "Enhanced Security — blacklist/whitelist vehicle alerts for improved safety management.",
        ],
      },
      {
        title: "Applications",
        list: [
          "Toll Plaza Automation",
          "Smart City Projects",
          "Parking Management Systems",
          "Gated Communities & Townships",
          "Industrial & Commercial Premises",
          "Highway Surveillance",
        ],
      },
    ],
    seo: {
      title: "Number Plate Detection for Gate Automation",
      description:
        "Camera-based vehicle number plate detection for gate automation, toll plazas, smart cities and townships — AI OCR, day/night IR, blacklist alerts.",
    },
    source: "https://networktoll.com/number-plate-detection/",
  },
  {
    // No live-site page for this — content written for the client per their
    // request, not transcribed. Combines RFID card and face-recognition
    // access control with attendance logging, an extension of the personnel-
    // tracking use case already mentioned on the RFID Software System page.
    slug: "face-attendance-system",
    rowId: "attendance",
    name: "Face Attendance\nSystem",
    desc: "RFID card and face-recognition attendance at the office entrance — one tap or one glance logs the visit, no separate biometric device or manual register.",
    detail: true,
    heading: "Face & RFID Attendance System",
    tagline: "One credential at the door, one clean attendance record.",
    intro: [
      "A combined RFID card and face-recognition terminal at the entrance replaces the punch machine, the manual register and the separate access-control reader with one device. Staff tap a card or look at the camera, the door unlocks, and the attendance record is written at the same moment — no second step, no separate system to reconcile at month end.",
      "Built on the same RFID backbone as the rest of our toll and access-control range, it extends naturally to canteen billing, visitor logging and restricted-zone access using the same card a staff member already carries.",
    ],
    gallery: [
      {
        src: "/images/real/solution-attendance.jpg",
        remote: "",
        alt: "Employee using face recognition attendance terminal at an office entrance",
        width: 1672,
        height: 941,
      },
    ],
    sections: [
      {
        title: "How it works",
        list: [
          "Staff present an RFID card or look at the terminal's camera at the entrance.",
          "The terminal matches the card or face against the enrolled staff list and unlocks the door.",
          "The event — who, where, and at what time — is logged automatically to the attendance system.",
          "Reports (daily attendance, late arrivals, hours worked) are generated without manual entry.",
        ],
      },
      {
        title: "Key Features",
        list: [
          "Dual credential: RFID card for speed, face recognition as a fallback or for higher-security doors.",
          "Real-time attendance log, viewable from a web dashboard rather than downloaded from the machine.",
          "One card doubles as building access, canteen payment and attendance credential.",
          "Works offline at the door if the network drops, syncing the log once connectivity returns.",
          "Exportable reports for payroll — no manual transcription from a punch machine.",
        ],
      },
      {
        title: "Applications",
        list: [
          "Corporate offices and factories",
          "Toll plaza and back-office staff attendance",
          "Canteen access and payment",
          "Visitor and contractor logging",
          "Restricted server rooms and stores",
        ],
      },
    ],
    faqs: [
      {
        q: "Does this replace our existing biometric attendance machine?",
        a: "Yes — the terminal handles both the door lock and the attendance log in one device, so a separate punch machine isn't needed. Existing RFID cards can usually be reused; new staff are enrolled directly on the terminal.",
      },
      {
        q: "What happens if the internet connection drops?",
        a: "The terminal keeps working offline using its local list of enrolled cards and faces, and queues the attendance log until the connection returns — no attendance is lost.",
      },
      {
        q: "Can one card be used for attendance, canteen and door access together?",
        a: "Yes. The same RFID card can be configured across all three, so staff carry one credential instead of separate cards for each system.",
      },
    ],
    seo: {
      title: "Face & RFID Attendance System",
      description:
        "Combined RFID card and face-recognition attendance system for offices and factories — one credential for door access, attendance logging and canteen payment.",
    },
  },
];

const bySlug = new Map(solutions.map((s) => [s.slug, s]));
const byRowId = new Map(solutions.map((s) => [s.rowId, s]));

export function getSolution(slug: string): Solution | undefined {
  return bySlug.get(slug);
}

/** Detail-page href for a /solution row, or undefined when there's no page. */
export function solutionHref(rowId: string): string | undefined {
  const s = byRowId.get(rowId);
  return s?.detail ? `/solution/${s.slug}` : undefined;
}

/** Only the solutions that have a real page — drives routing and the sitemap. */
export const solutionPages = solutions.filter((s) => s.detail);

/** Assets referenced by the solution catalog, for scripts/fetch-assets.mjs. */
export function allSolutionAssets(): { src: string; remote: string }[] {
  const out: { src: string; remote: string }[] = [];
  const push = (a?: { src: string; remote: string }) => {
    if (a && !out.some((e) => e.src === a.src)) out.push({ src: a.src, remote: a.remote });
  };
  for (const s of solutions) {
    s.gallery?.forEach(push);
    s.brochures?.forEach((b) => push({ src: b.href, remote: b.remote }));
  }
  return out;
}
