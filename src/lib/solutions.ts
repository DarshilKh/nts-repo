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

export type SolutionGroup =
  | "toll-traffic"
  | "rfid-facility"
  | "vision-gate-vehicle"
  | "vision-warehouse-yard"
  | "vision-safety";

export type Solution = {
  slug: string;
  /** Anchor id of this solution's row on /solution — matches SolutionRow styleId. */
  rowId: string;
  /** Category for the grouped, multi-column Solutions nav dropdown — see SOLUTION_GROUPS. */
  group: SolutionGroup;
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
    group: "toll-traffic",
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
    group: "toll-traffic",
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
    group: "toll-traffic",
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
    group: "rfid-facility",
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
    group: "rfid-facility",
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
    group: "toll-traffic",
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
    group: "toll-traffic",
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
    group: "rfid-facility",
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
  {
    // Original copy written for this request — not transcribed from any
    // networktoll.com page (none exists for this) and not copied from the
    // third-party vision-AI product deck that specified the feature set.
    // Every paragraph below is written fresh in NTS's own voice; only the
    // capability list itself was taken as a brief. Four items from that
    // brief were dropped per instruction: yard parking occupancy, CHE
    // tracking, digital twin yard view, and conveyor object counting.
    slug: "gate-in-gate-out-automation",
    rowId: "gate-automation",
    group: "vision-gate-vehicle",
    name: "Gate In & Gate\nOut Automation",
    desc: "Every vehicle and container is logged automatically at the gate — plate, container ID, ISO code and weight read straight off the camera feed in under two seconds, no manual entry.",
    detail: true,
    heading: "Gate In & Gate Out Automation",
    intro: [
      "Every vehicle and container gets logged automatically as it crosses the gate — container ID, number plate, ISO code and weight markings are all read straight off the camera feed, with the full record captured in under two seconds. Entry and exit are timestamped without a guard needing to key anything in, and vehicle or container turnaround time is tracked end to end.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-gate-in-gate-out.png`,
        remote: "",
        alt: "Camera-based gate automation reading a container truck's ID and plate",
        width: 800,
        height: 579,
      },
    ],
    faqs: [
      {
        q: "Does this replace our boom barrier and existing gate hardware?",
        a: "No — it works alongside what's already there. The cameras handle identification and logging; your boom barrier, RFID reader or manual gate operation keeps controlling physical access.",
      },
      {
        q: "What happens if a plate or container ID can't be read clearly?",
        a: "The system flags the record for manual review rather than silently failing, so a dirty or damaged plate doesn't create a gap in the log.",
      },
    ],
    seo: {
      title: "Gate In & Gate Out Automation",
      description:
        "Automated gate logging for trucks and containers — plate, container ID, ISO code and weight read from the camera feed in under two seconds, with full entry-exit timestamps.",
    },
  },
  {
    slug: "anpr-vehicle-identification",
    rowId: "anpr-vehicle-id",
    group: "vision-gate-vehicle",
    name: "ANPR & Vehicle\nIdentification",
    desc: "Real-time plate detection with blacklist/whitelist alerts, searchable entry-exit records, vehicle classification by type, and multi-gate visibility on the CCTV you already run.",
    detail: true,
    heading: "ANPR & Vehicle Identification",
    intro: [
      "Plates are read in real time at every gate the system covers, with each entry and exit logged to a searchable record. Vehicles on a blacklist or whitelist trigger an alert automatically, and every vehicle is classified by type as it passes — car, truck, taxi, two-wheeler — so the same feed doubles as an access-control layer and a traffic log. Works with the CCTV already installed; no camera swap needed.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-anpr-vehicle-identification.png`,
        remote: "",
        alt: "ANPR system detecting and identifying a truck at a warehouse gate",
        width: 2650,
        height: 2050,
      },
    ],
    faqs: [
      {
        q: "Can this cover multiple gates or sites from one dashboard?",
        a: "Yes. Records from every gate feed into one centralised, searchable dashboard, so a vehicle's full movement history across sites is visible in one place.",
      },
      {
        q: "How is a blacklisted vehicle handled once detected?",
        a: "The system raises an immediate alert to the dashboard (and, depending on setup, SMS or email) the moment a blacklisted plate is read, so security can respond before the vehicle reaches the gate.",
      },
    ],
    seo: {
      title: "ANPR & Vehicle Identification",
      description:
        "Real-time automatic number plate recognition with blacklist/whitelist alerts, vehicle classification, searchable records and multi-gate visibility on existing CCTV.",
    },
  },
  {
    slug: "ai-damage-detection",
    rowId: "damage-detection",
    group: "vision-gate-vehicle",
    name: "AI Damage\nDetection",
    desc: "Five-sided automated container inspection — dents, holes, rust, bends and seal condition checked at the gate, with a timestamped photo as proof for every inspection.",
    detail: true,
    heading: "AI Damage Detection & Visual Proof",
    intro: [
      "Containers are inspected from all five visible sides — top, front, back, left and right — as they pass through the gate, checking for dents, holes, rust, bends and a missing or broken seal. Every inspection is backed by a timestamped image, so a damage dispute at handover has actual visual proof attached to it rather than a driver's word against a clerk's.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-ai-damage-detection.png`,
        remote: "",
        alt: "Overhead gantry scanning a container truck for damage on five sides",
        width: 2580,
        height: 1410,
      },
    ],
    faqs: [
      {
        q: "What kind of damage does the system actually catch?",
        a: "Dents, holes, bends, rust, and a missing or broken seal are checked on each of the five visible sides as the container passes through.",
      },
      {
        q: "Is the inspection image kept on file for later disputes?",
        a: "Yes — every inspection is backed by a timestamped image, so a handover dispute can be settled by pulling up the actual photo instead of relying on memory.",
      },
    ],
    seo: {
      title: "AI Damage Detection & Visual Proof",
      description:
        "Automated five-sided container damage inspection at the gate — dents, holes, rust, bends and seal condition checked, with timestamped photo evidence for every pass.",
    },
  },
  {
    slug: "vehicle-speed-monitoring",
    rowId: "speed-monitoring",
    group: "vision-gate-vehicle",
    name: "Vehicle Speed\nMonitoring",
    desc: "Zone-wise speed limits with real-time over-speed alerts, each backed by a timestamp, vehicle ID and video clip — a documented incident, not just a warning light.",
    detail: true,
    heading: "Vehicle Speed Monitoring",
    intro: [
      "Speed limits can be set per zone — slower through a loading area, normal through open yard — and the system raises a real-time alert the moment a vehicle goes over. Every over-speed event comes with a timestamp, the vehicle's ID and a video clip, so it's a documented incident rather than just a warning light.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-vehicle-speed-monitoring.png`,
        remote: "",
        alt: "Camera tracking a forklift's speed in a warehouse aisle with a warning alert",
        width: 2930,
        height: 1980,
      },
    ],
    faqs: [
      {
        q: "Can different zones have different speed limits?",
        a: "Yes — each zone (loading bay, open yard, pedestrian crossing) can be configured with its own limit, so the alert threshold matches what's actually safe for that area.",
      },
      {
        q: "What evidence is kept for an over-speed event?",
        a: "Every alert comes with a timestamp, the vehicle's ID and a video clip of the event, so it can be reviewed or used for a safety conversation after the fact.",
      },
    ],
    seo: {
      title: "Vehicle Speed Monitoring",
      description:
        "Camera-based vehicle speed monitoring with configurable zone-wise limits, real-time over-speed alerts, and timestamped video evidence for every incident.",
    },
  },
  {
    slug: "dock-space-visualization",
    rowId: "dock-visualization",
    group: "vision-warehouse-yard",
    name: "Dock Space\nVisualization",
    desc: "Live 2D layout of every dock — occupied or available at a glance, with load/unload duration, turnaround time and a time-stamped activity log per bay.",
    detail: true,
    heading: "Dock Space Visualization",
    intro: [
      "A live 2D layout shows every dock position as occupied or available at a glance, with load and unload duration tracked automatically per dock. Turnaround time and a time-stamped activity log for each bay make it easy to see which docks are actually the bottleneck instead of guessing from a whiteboard.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-dock-space-visualization.png`,
        remote: "",
        alt: "Overhead camera view showing occupied and available loading docks",
        width: 3010,
        height: 2130,
      },
    ],
    faqs: [
      {
        q: "How does the system know a dock is occupied versus just has a trailer parked nearby?",
        a: "Each dock position is mapped individually, so occupancy is read from that specific bay's camera zone rather than inferred from general yard activity.",
      },
      {
        q: "Can we see historical dock usage, not just the live view?",
        a: "Yes — load/unload duration, turnaround time and a time-stamped activity log are kept per dock, so trends over a shift or a week are visible, not just the current snapshot.",
      },
    ],
    seo: {
      title: "Dock Space Visualization",
      description:
        "Live 2D dock occupancy visualization — real-time occupied/available status, load and unload duration, turnaround tracking and time-stamped activity logs per bay.",
    },
  },
  {
    slug: "real-time-container-search",
    rowId: "container-search",
    group: "vision-gate-vehicle",
    name: "Real-Time\nContainer Search",
    desc: "Search a container ID and get its exact yard location instantly — QR-based scan, search and navigate from a handheld, typically under ten seconds per lookup.",
    detail: true,
    heading: "Real-Time Container Search",
    intro: [
      "Type in a container ID and the system shows its exact position in the yard — no walking the rows to find it. A QR-based lookup lets yard staff scan, search and navigate straight to a container from a handheld device, typically finding any box in under ten seconds.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-container-search.png`,
        remote: "",
        alt: "Operator searching a container ID and viewing its location on a yard map",
        width: 2000,
        height: 870,
      },
    ],
    faqs: [
      {
        q: "Does this need every container to be tagged or scanned in first?",
        a: "The container's ID is captured automatically at the gate when it enters, so its location is already in the system by the time it's placed in the yard — no separate tagging step.",
      },
      {
        q: "Can yard staff use this from a phone rather than a desktop?",
        a: "Yes — the QR-based scan, search and navigate flow is built for a handheld device, so staff can look up a container from wherever they are in the yard.",
      },
    ],
    seo: {
      title: "Real-Time Container Search",
      description:
        "Search any container ID and get its exact yard location instantly — QR-based scan and navigate from a handheld device, typical lookup time under ten seconds.",
    },
  },
  {
    slug: "gauge-reefer-monitoring",
    rowId: "gauge-reefer",
    group: "vision-warehouse-yard",
    name: "Gauge & Reefer\nMonitoring",
    desc: "Cameras read analogue and digital gauges — temperature, pressure, reefer displays — the way a person would, with an instant alert on any deviation.",
    detail: true,
    heading: "Gauge & Reefer Monitoring",
    intro: [
      "Cameras read analogue and digital gauges — temperature, pressure, reefer displays — the same way a person would, without needing an IoT sensor retrofitted to every unit. Readings are logged automatically, and a temperature deviation on a reefer container raises an immediate alert instead of being caught on the next manual round.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-gauge-reefer-monitoring.png`,
        remote: "",
        alt: "Camera reading a reefer container's temperature and gauge display",
        width: 2420,
        height: 2380,
      },
    ],
    faqs: [
      {
        q: "Do we need to install sensors on every reefer unit for this to work?",
        a: "No — the camera reads the existing display or gauge visually, the same way a person doing a manual round would, so there's no per-unit sensor to install or maintain.",
      },
      {
        q: "How fast is a temperature deviation flagged?",
        a: "As soon as the camera reads a value outside the set range, an alert goes out immediately rather than waiting for the next scheduled manual check.",
      },
    ],
    seo: {
      title: "Gauge & Reefer Monitoring",
      description:
        "Camera-based reading of temperature, pressure and reefer gauge displays with automatic logging and instant alerts on deviation — no sensor retrofit required.",
    },
  },
  {
    slug: "quality-inspection-label-reading",
    rowId: "quality-inspection",
    group: "vision-warehouse-yard",
    name: "Quality Inspection\n& Label Reading",
    desc: "Automatic label and barcode OCR on the line, with surface damage flagged and image evidence captured the moment a defect is detected.",
    detail: true,
    heading: "Quality Inspection & Label Reading",
    intro: [
      "Shipping labels, barcodes and QR codes are read automatically as packages move down the line, with OCR pulling the tracking number, destination and item details straight off the label for instant search and retrieval. Surface damage on a package is flagged the moment it's detected, with an image captured as evidence.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-quality-inspection-label.png`,
        remote: "",
        alt: "Conveyor line camera reading package labels and flagging a damaged box",
        width: 2920,
        height: 1980,
      },
    ],
    faqs: [
      {
        q: "What label information is actually extracted?",
        a: "Tracking number, destination and item details are read via OCR straight off the label, and stored so a package can be found by that information later.",
      },
      {
        q: "What happens when the system flags a damaged package?",
        a: "It's flagged the moment the damage is detected on the line, with an image captured automatically as evidence — so it can be pulled aside before it ships rather than discovered at the customer's end.",
      },
    ],
    seo: {
      title: "Quality Inspection & Label Reading",
      description:
        "Automatic OCR-based label and barcode reading on the conveyor line with real-time surface damage detection and image evidence for every flagged package.",
    },
  },
  {
    slug: "pallet-classification-counting",
    rowId: "pallet-counting",
    group: "vision-warehouse-yard",
    name: "Pallet Classification\n& Counting",
    desc: "Automatic pallet detection and counting by type — wood, plastic, CHEP — with a live category-wise count feeding straight into inventory reporting.",
    detail: true,
    heading: "Pallet Classification & Counting",
    intro: [
      "Pallets are detected and counted by type as they move through — wood, plastic, CHEP or others — giving a live, category-wise count instead of an end-of-shift tally. That feeds straight into inventory reporting and stock-movement visibility without anyone walking the floor with a clipboard.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-pallet-classification.png`,
        remote: "",
        alt: "Camera detecting and classifying different pallet types being loaded",
        width: 2920,
        height: 1980,
      },
    ],
    faqs: [
      {
        q: "What pallet types can the system tell apart?",
        a: "Wood, plastic and CHEP pallets are distinguished automatically, with counts kept separately by category rather than lumped into one total.",
      },
      {
        q: "Is this count available in real time or only at shift end?",
        a: "Live — the category-wise count updates as pallets move through, rather than requiring an end-of-shift manual tally.",
      },
    ],
    seo: {
      title: "Pallet Classification & Counting",
      description:
        "Automatic pallet detection and counting by type (wood, plastic, CHEP) with live category-wise counts feeding directly into inventory and stock reporting.",
    },
  },
  {
    slug: "inventory-stack-height-monitoring",
    rowId: "stack-height",
    group: "vision-warehouse-yard",
    name: "Inventory Stack\nHeight Monitoring",
    desc: "Per-zone safe height thresholds watched continuously, with an SMS, email or dashboard alert the moment a stack crosses the line.",
    detail: true,
    heading: "Inventory Stack Height Monitoring",
    intro: [
      "Each storage zone gets its own safe height threshold, and the system watches stack height against it continuously. Cross the line and an alert goes out by SMS, email or straight to the dashboard — catching an overstacking risk before it becomes a collapsed pallet or a safety incident.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-stack-height-monitoring.png`,
        remote: "",
        alt: "Warehouse camera flagging a pallet stack that has exceeded its safe height limit",
        width: 2950,
        height: 1980,
      },
    ],
    faqs: [
      {
        q: "Can different storage zones have different height limits?",
        a: "Yes — each zone is configured with its own safe height threshold, so a high-bay racking area and a floor-stacking zone can each have limits that actually suit them.",
      },
      {
        q: "How quickly does an overstacking alert reach someone?",
        a: "The moment a stack crosses its threshold, an alert is sent by SMS, email or to the dashboard — not held for a scheduled report.",
      },
    ],
    seo: {
      title: "Inventory Stack Height Monitoring",
      description:
        "Camera-based stack height monitoring with configurable per-zone safety thresholds and instant SMS, email or dashboard alerts on overstacking risk.",
    },
  },
  {
    slug: "workstation-occupancy",
    rowId: "workstation-occupancy",
    group: "vision-warehouse-yard",
    name: "Workstation\nOccupancy",
    desc: "Live occupied-or-idle status for packing tables, machine stations and QC benches, with a timestamped usage log and a multi-site dashboard.",
    detail: true,
    heading: "Workstation Occupancy",
    intro: [
      "Packing tables, machine stations and QC benches all show live occupied-or-idle status, with a timestamped usage log kept per station. Across multiple sites, one dashboard shows utilisation everywhere at once — useful for spotting an underused line before it shows up in the numbers.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-workstation-occupancy.png`,
        remote: "",
        alt: "Cameras tracking occupancy at packing, machine and QC workstations",
        width: 1260,
        height: 690,
      },
    ],
    faqs: [
      {
        q: "What counts as a station being 'occupied' versus 'idle'?",
        a: "Occupancy is read from operator presence and activity at that specific station, giving a real-time occupied-or-idle status rather than an inferred guess.",
      },
      {
        q: "Can this cover stations across more than one site?",
        a: "Yes — a single dashboard brings together workstation status from multiple locations, so utilisation can be compared site to site.",
      },
    ],
    seo: {
      title: "Workstation Occupancy Monitoring",
      description:
        "Real-time occupied/idle tracking for packing, machine and QC workstations, with timestamped usage logs and a multi-location dashboard for utilisation visibility.",
    },
  },
  {
    slug: "ocr-document-data-extraction",
    rowId: "document-extraction",
    group: "vision-warehouse-yard",
    name: "OCR-Based Document\nData Extraction",
    desc: "Booking documents, gate passes, invoices, challans and LR copies digitised and read automatically — searchable text instead of a folder of scans.",
    detail: true,
    heading: "OCR-Based Document Data Extraction",
    intro: [
      "Booking documents, Form 6, gate passes, invoices, delivery challans and LR copies are digitised and read automatically, with the extracted data stored for instant search instead of sitting in a folder of scanned PDFs. What used to mean digging through a filing cabinet becomes a text search.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-document-data-extraction.png`,
        remote: "",
        alt: "Scanning a booking document with a phone for automatic data extraction",
        width: 2700,
        height: 2120,
      },
    ],
    faqs: [
      {
        q: "Which document types does this handle?",
        a: "Booking documents, Form 6, gate passes, invoices, delivery challans and LR copies are all supported — the common paperwork that moves through a gate or back office.",
      },
      {
        q: "Where does the extracted data end up?",
        a: "It's stored digitally and indexed for instant search, so finding a specific document later is a text search rather than a manual file search.",
      },
    ],
    seo: {
      title: "OCR-Based Document Data Extraction",
      description:
        "Automatic OCR data extraction for booking documents, gate passes, invoices, delivery challans and LR copies — digitised, indexed and instantly searchable.",
    },
  },
  {
    slug: "forklift-operator-monitoring",
    rowId: "forklift-monitoring",
    group: "vision-safety",
    name: "Forklift Operator\n& Activity Monitoring",
    desc: "Operator presence and helmet detection on every forklift, with alerts for an empty seat, missing helmet, extended idle time or a fork raised while moving.",
    detail: true,
    heading: "Forklift Operator & Activity Monitoring",
    intro: [
      "The system checks whether a forklift has an operator on board and whether that operator is wearing a helmet, alongside the vehicle's own movement status. An empty seat, a missing helmet, extended idle time, or a fork raised while the vehicle is moving all trigger their own alert, each logged with a timestamp.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-forklift-monitoring.png`,
        remote: "",
        alt: "Camera detecting a forklift operator and confirming helmet use",
        width: 2540,
        height: 1830,
      },
    ],
    faqs: [
      {
        q: "What specific forklift safety events does this catch?",
        a: "An empty operator seat, a missing helmet, extended idle time, and a fork raised while the vehicle is moving are each detected and logged as their own event.",
      },
      {
        q: "Is there a record kept of these events for safety audits?",
        a: "Yes — every alert is timestamped and logged, giving a documented history to review during a safety audit rather than relying on incident reports alone.",
      },
    ],
    seo: {
      title: "Forklift Operator & Activity Monitoring",
      description:
        "Camera-based forklift safety monitoring — operator presence, helmet detection, idle time and fork-raised-while-moving alerts, each logged with a timestamp.",
    },
  },
  {
    slug: "ppe-safety-compliance-monitoring",
    rowId: "ppe-compliance",
    group: "vision-safety",
    name: "Safety Compliance\nMonitoring (PPE)",
    desc: "Vests, glasses, shoes, gloves and helmets checked automatically per zone, with a live compliance percentage and timestamped evidence on every violation.",
    detail: true,
    heading: "Safety Compliance Monitoring (PPE)",
    intro: [
      "Vests, safety glasses, safety shoes, gloves and helmets are checked automatically against whatever PPE the zone requires, with a live compliance percentage on the dashboard. A missing item raises a real-time alert backed by a timestamped image — useful both for catching a gap in the moment and for showing an auditor the trend over time.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-ppe-safety-compliance.png`,
        remote: "",
        alt: "Warehouse camera checking workers for PPE compliance with missing-item alerts",
        width: 2930,
        height: 1980,
      },
    ],
    faqs: [
      {
        q: "Which PPE items can the system check for?",
        a: "Safety vest, safety glasses, safety shoes, gloves and helmet are each checked individually against whatever a given zone requires.",
      },
      {
        q: "Can compliance data be pulled for a safety audit?",
        a: "Yes — the live compliance percentage and every violation event, backed by a timestamped image, gives a documented trend to show an auditor rather than a spot-check impression.",
      },
    ],
    seo: {
      title: "Safety Compliance Monitoring (PPE)",
      description:
        "Automatic PPE compliance monitoring — vest, glasses, shoes, gloves and helmet detection, live compliance percentage, and timestamped evidence for every violation.",
    },
  },
  {
    slug: "fire-smoke-detection",
    rowId: "fire-detection",
    group: "vision-safety",
    name: "Fire & Smoke\nDetection",
    desc: "Continuous camera-based fire and smoke detection, catching the early signs well before a heat sensor typically trips, with instant SMS, email or dashboard alerts.",
    detail: true,
    heading: "Fire & Smoke Detection",
    intro: [
      "Cameras watch continuously for the early signs of fire or smoke and raise an alert the moment something looks wrong, well before a heat or smoke sensor would typically trip. Every alert comes with timestamped image and video evidence, and notifications go out by SMS, email or dashboard so the response doesn't depend on someone happening to be watching that feed.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-fire-smoke-detection.png`,
        remote: "",
        alt: "Early fire and smoke detection inside an industrial facility",
        width: 2930,
        height: 1980,
      },
    ],
    faqs: [
      {
        q: "How is this different from a standard smoke detector?",
        a: "A camera can pick up visible smoke or flame earlier than a heat or particle-based sensor typically trips, and it captures image and video evidence of the event at the same time.",
      },
      {
        q: "Who gets notified when fire or smoke is detected?",
        a: "Alerts go out by SMS, email or straight to the dashboard, so the response isn't dependent on someone actively watching that camera feed at the time.",
      },
    ],
    seo: {
      title: "Fire & Smoke Detection",
      description:
        "Continuous camera-based fire and smoke detection with early warning, timestamped image and video evidence, and instant SMS, email or dashboard alerts.",
    },
  },
  {
    slug: "operator-perimeter-monitoring",
    rowId: "perimeter-monitoring",
    group: "vision-safety",
    name: "Operator Presence &\nPerimeter Monitoring",
    desc: "Automatic staff-presence tracking at required posts, plus perimeter intrusion detection on user-defined zones with a time-stamped video record for every event.",
    detail: true,
    heading: "Operator Presence & Perimeter Monitoring",
    intro: [
      "Staff presence at a post is tracked automatically, with an alert if a required position goes unmanned. Around the perimeter, user-defined zones flag an unauthorised entry or boundary breach in real time, with a time-stamped video record kept for every event.",
    ],
    gallery: [
      {
        src: `${IMG}/vision-perimeter-monitoring.png`,
        remote: "",
        alt: "Night-vision camera detecting a perimeter intrusion and an unmanned guard post",
        width: 2520,
        height: 1900,
      },
    ],
    faqs: [
      {
        q: "How does the system define which zones count as 'perimeter'?",
        a: "Monitoring zones are user-defined, so a fence line, restricted gate or any other boundary can be set up as an area to watch for intrusion.",
      },
      {
        q: "What happens if a guard post is left unmanned?",
        a: "An alert is raised automatically if a required position goes unmanned, rather than that gap only being noticed on the next patrol.",
      },
    ],
    seo: {
      title: "Operator Presence & Perimeter Monitoring",
      description:
        "Automatic operator presence tracking and perimeter intrusion detection with user-defined monitoring zones and time-stamped video records for every event.",
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

/**
 * Category metadata for the grouped, multi-column "Solutions" nav dropdown
 * — mirrors PRODUCT_GROUPS in lib/catalog.ts. Order here is display order.
 */
export const SOLUTION_GROUPS: { id: SolutionGroup; label: string }[] = [
  { id: "toll-traffic", label: "Toll & Traffic" },
  { id: "rfid-facility", label: "RFID & Facility Software" },
  { id: "vision-gate-vehicle", label: "Gate & Vehicle" },
  { id: "vision-warehouse-yard", label: "Warehouse & Yard" },
  { id: "vision-safety", label: "Safety & Security" },
];

/** Solutions grouped for display, in SOLUTION_GROUPS order. Empty groups are dropped. */
export function solutionsByGroup(): { id: SolutionGroup; label: string; solutions: Solution[] }[] {
  return SOLUTION_GROUPS.map((g) => ({
    ...g,
    solutions: solutionPages.filter((s) => s.group === g.id),
  })).filter((g) => g.solutions.length > 0);
}

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
