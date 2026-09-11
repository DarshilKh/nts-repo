/**
 * Product catalog — single source of truth for /products and /products/[slug].
 *
 * Copy is transcribed from the client's live WordPress site
 * (https://networktoll.com) so the new build carries the exact same
 * product wording, model numbers, specs, FAQs and brochure PDFs. Each
 * entry records its `source` URL so any future copy change can be
 * diffed against the page it came from.
 *
 * IMAGES / BROCHURES
 * ------------------
 * `image.src` and `brochure.href` are LOCAL paths under /public. The
 * matching `remote` URL on each asset is where the file is fetched from.
 * Run `node scripts/fetch-assets.mjs` once to download every remote asset
 * into /public — after that the site has zero runtime dependency on the
 * old WordPress install, which matters because networktoll.com is the
 * domain this site will replace.
 */

export type CatalogImage = {
  /** Local path under /public, used by next/image. */
  src: string;
  /** Origin the file is downloaded from by scripts/fetch-assets.mjs. */
  remote: string;
  alt: string;
  width: number;
  height: number;
};

export type Brochure = {
  label: string;
  /** Local path under /public/brochures. */
  href: string;
  remote: string;
};

export type ProductModel = {
  /** Model heading exactly as it appears on the source page. */
  name: string;
  /** Free-text paragraphs for this model. */
  body?: string[];
  /** Bulleted spec lines. `label` is bolded on the source page. */
  specs?: { label?: string; value: string }[];
  image?: CatalogImage;
  brochure?: Brochure;
};

export type Faq = { q: string; a: string };

/** A titled prose/bullet block, e.g. "Function", "Features". */
export type Section = {
  title: string;
  /** Paragraphs. */
  body?: string[];
  /** Bulleted lines. */
  list?: string[];
};

/**
 * A spec table. With `headers` it renders as a real multi-column table; without
 * them each row is a label/value pair. A row containing a single cell is a
 * group heading (e.g. "Performance") spanning the table.
 */
export type SpecTable = {
  title?: string;
  headers?: string[];
  rows: string[][];
  /** Footnotes rendered under the table. */
  notes?: string[];
};

export type ProductGroup =
  | "tag"
  | "card-wristband"
  | "reader"
  | "camera"
  | "radar"
  | "toll-plaza-equipment";

export type Product = {
  slug: string;
  /** Display name. `\n` marks the line break used on the card grid. */
  name: string;
  category: "tags" | "toll";
  /**
   * Finer-grained grouping than `category` — drives the categorised
   * sections on /products and the "Products" nav dropdown. `category`
   * stays as the broad tags-vs-toll-plaza split used for the JSON-LD
   * schema.org category label.
   */
  group: ProductGroup;
  /** 1–2 line summary shown on the product card. */
  desc: string;
  /** Optional highlight bullets shown on the card. */
  bullets?: string[];
  /** Card + detail hero image. */
  image: CatalogImage;
  /** H1 on the detail page. Falls back to `name` when absent. */
  heading?: string;
  /** Lead paragraphs, word-for-word from the source page. */
  intro?: string[];
  /** Standfirst under the H1. */
  tagline?: string;
  models?: ProductModel[];
  /** Titled prose/bullet blocks rendered after the models. */
  sections?: Section[];
  /** Full-width spec tables rendered after the sections. */
  specTables?: SpecTable[];
  /** Extra photos rendered as a strip under the hero. */
  gallery?: CatalogImage[];
  /** Closing paragraph after the model list. */
  outro?: string[];
  faqs?: Faq[];
  brochures?: Brochure[];
  seo: { title: string; description: string };
  /** Live-site page this content was transcribed from. */
  source?: string;
};

const IMG = "/images/products";
const PDF = "/brochures";
const WP = "https://networktoll.com/wp-content/uploads";

export const products: Product[] = [
  // ---------------------------------------------------------------- toll
  {
    slug: "rfid-integrated-reader",
    name: "RFID Integrated\nReader",
    category: "toll",
    group: "reader",
    desc: "Reader and antenna combined in one weatherproof unit for logistics, warehousing, access control and asset tracking.",
    bullets: ["Impinj E510/E710 chipset", "Up to 6m read range", "IP66 die-cast housing"],
    image: {
      src: `${IMG}/rfid-integrated-reader.png`,
      remote: `${WP}/2025/06/integrated-Reader-931x1024.png`,
      alt: "NTS UHF RFID integrated reader",
      width: 931,
      height: 1024,
    },
    heading: "Network Toll Solution: Offering the Best-in-Class RFID Integrated Reader",
    intro: [
      "Network Toll Solution offers a range of high-performance RFID integrated readers designed to meet the diverse needs of various applications, including logistics, warehouse management, access control and asset tracking. These readers combine an RFID reader and antenna into a single unit, offering a compact and easy-to-deploy solution.",
      "Introducing the Network Toll Solutions' RFID Integrated Reader Series. Our RFID-integrated readers have advanced features to ensure reliable and efficient data capture.",
    ],
    models: [
      {
        name: "UHF Integrated Reader, Model-NTS-IR-05",
        body: [
          "Impinj IndyE510/E710 (Optional) chipset offer high performance Aluminum casting / waterproof housing apply to all weather industrial scenarios Various communication / software Interfaces helps faster application system Different developing languages SDK meet different developer needs Excellent communication protocol architecture support faster data processing algorithm",
          "Integrated design supports better deploy /installation / engineering / wiring",
          "Special application projects customized interfaces / data transferring prolongable",
          "Seamlessly compatible with RFID middleware for rapid implementation of large projects",
          "Widely used in E-parking, garbage truck, feeding vehicle, access control and so on",
        ],
        image: {
          src: `${IMG}/rfid-integrated-reader.png`,
          remote: `${WP}/2025/06/integrated-Reader-931x1024.png`,
          alt: "UHF Integrated Reader Model NTS-IR-05",
          width: 931,
          height: 1024,
        },
        brochure: {
          label: "NTS-IR-05 brochure",
          href: `${PDF}/nts-ir-05.pdf`,
          remote: `${WP}/2025/05/NTS-IR-05-2.pdf`,
        },
      },
      {
        name: "UHF Integrated Reader, Model-NTS-IR-01",
        body: [
          "NTS-IR 01 is a sleek and compact next generation RFID reader powered with 9 dbi linear polarized integrated antenna to facilitate fast and accurate tag identification process. It works on global UHF frequency (865-868MHz, 902-928 MHz) standards and has a read range of up to 6 meters. It is a cost-effective high-performance reader and is most widely used in applications like vehicle tracking in parking lots, access control for flap/ boom barriers, event management, projects related to R&D etc. where required read range is medium in nature. The product is IP 66 rated and has an inbuilt LED and buzzer for tag identification. It comes with mounting accessories, adapter and SDK for configuration and integration with third party software.",
        ],
        image: {
          src: `${IMG}/rfid-integrated-reader-nts-ir-01.png`,
          remote: `${WP}/2025/08/NTS-IR-01-931x1024.png`,
          alt: "UHF Integrated Reader Model NTS-IR-01",
          width: 931,
          height: 1024,
        },
        brochure: {
          label: "NTS-IR-01 brochure",
          href: `${PDF}/nts-ir-01.pdf`,
          remote: `${WP}/2025/08/UHF-Reader-NTS-IR-01.pdf`,
        },
      },
    ],
    outro: [
      "RFID Integrated Readers by Network Toll Solutions offer a powerful and versatile solution for various applications. Reach out to us today to discuss your specific needs and choose the reader that best suits your requirements.",
    ],
    faqs: [
      {
        q: "What is an RFID Integrated Reader and how does it function in toll plazas?",
        a: "An RFID Integrated Reader is a compact device that combines both the reader and antenna to automatically identify vehicles via FASTag RFID tags. As a vehicle approaches, the reader captures the tag data for seamless toll deduction without requiring a stop.",
      },
      {
        q: "What are the key advantages of using RFID Integrated Readers in tolling systems?",
        a: "Network Toll's RFID Integrated Readers offer high-speed tag detection, robust performance in outdoor environments, and compatibility with national ETC standards. They reduce manual intervention, ensure faster vehicle throughput, and enhance toll plaza efficiency.",
      },
      {
        q: "Can RFID Integrated Readers be easily installed and integrated with existing systems?",
        a: "Yes, these readers are designed for plug-and-play integration with existing Toll Management Systems (TMS). Their compact design and standard communication protocols make them easy to deploy across new and existing toll lane infrastructure.",
      },
    ],
    seo: {
      title: "RFID Integrated Reader",
      description:
        "High-performance UHF RFID integrated readers combining reader and antenna in one IP66 unit — for tolling, parking, access control, warehousing and asset tracking.",
    },
    source: "https://networktoll.com/rfid-integrated-reader/",
  },
  {
    slug: "rfid-desktop-reader",
    name: "RFID Desktop\nReader",
    category: "toll",
    group: "reader",
    desc: "Counter-top UHF, Mifare and NFC readers for tag issuance, registration, encoding and quick authentication.",
    bullets: ["865–867 MHz / 13.56 MHz", "Up to 40cm read range", "LAN, RS232, USB"],
    image: {
      src: `${IMG}/rfid-desktop-reader.png`,
      remote: `${WP}/2025/05/Untitled-design-2025-05-27T160308.042.png`,
      alt: "UHF desktop tag reader and writer, model NWS-RD 01",
      width: 1024,
      height: 1024,
    },
    heading: "RFID Desktop Reader",
    models: [
      {
        name: "UHF Desktop Tag Reader & Writer (Model: NWS-RD 01 )",
        specs: [
          { label: "Frequency", value: "UHF 865 – 867 MHz" },
          { label: "Read Range", value: "Approx. 40 cm" },
          { label: "LED & Buzzer", value: "Integrated" },
          { label: "Interface", value: "LAN, RS232" },
          {
            label: "Application",
            value:
              "Data Encoding, Issue & blocking of tags, Quick tag Authentication, Tag / Card Registration , Canteen Payment Management, RFID R&D projects",
          },
        ],
        image: {
          src: `${IMG}/rfid-desktop-reader.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T160308.042.png`,
          alt: "UHF desktop tag reader and writer, model NWS-RD 01",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "UHF Tag Registration Reader & Writer (Model: NWS-RD 04)",
        specs: [
          { label: "Frequency", value: "UHF 865 – 867 MHz" },
          { label: "Read Range", value: "Up to 40 cm LED & Buzzer: Integrated" },
          { label: "Low Cost", value: "and Easy to Carry (10 x 7 x 1 cm)" },
          { label: "Interface", value: "USB" },
          {
            label: "Application",
            value:
              "Data Encoding, Issue & blocking of tags, Quick tag Authentication, Tag / Card Registration , Canteen Payment Management",
          },
        ],
        image: {
          src: `${IMG}/rfid-desktop-reader-nws-rd-04.jpg`,
          remote: `${WP}/2025/05/UHF-Tag-Registration-Reader-Writer.jpg`,
          alt: "UHF tag registration reader and writer, model NWS-RD 04",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "Multi Protocol Mifare Reader and Writer (Model: NWS-RD 11 (13.56 MHz ))",
        specs: [
          { label: "Frequency", value: "13.56 MHz" },
          { label: "Read Range", value: "10 cm" },
          { label: "Interface", value: "Mini USB/ RS232" },
          { label: "OS Support", value: "WinXP, Win7, LINUX | LED & Buzzer" },
          { label: "Application", value: "Library, Events, Cashless Payments etc." },
          {
            label: "Support Card/ Tag",
            value: "13.56 MHz – Mifare(S50, S70, Ntag 203, Ultralight, Icode 2, ISO 15693",
          },
        ],
        image: {
          src: `${IMG}/rfid-desktop-reader-nws-rd-11.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T160748.627.png`,
          alt: "Multi protocol Mifare reader and writer, model NWS-RD 11",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "NFC Smart Card / Tag Reader (Model: NWS-RD 12)",
        specs: [
          { label: "Make", value: "ACS" },
          { label: "NFC", value: "Compliant (Near Field Communication)" },
          { label: "Interface", value: "Mini USB" },
          { label: "Integrated", value: "LED & Buzzer" },
          { label: "Application", value: "POS Terminal, Vending Machine etc" },
          { label: "SDK", value: "Available for development" },
          { label: "Dimension", value: "9.8 x 6.5 x 1.2 cm | Weight: 70 grams" },
        ],
        image: {
          src: `${IMG}/rfid-desktop-reader-nfc.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T161005.545.png`,
          alt: "NFC smart card and tag reader, model NWS-RD 12",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "Display Based NFC & Mifare Reader (Model: NWS-RD 12)",
        specs: [
          {
            label: "Standalone RFID Reader",
            value: "with high speed MCU & excellent card processing speed. | 2 Line graphic LCD",
          },
          { label: "Support Ca", value: "14443A, 14443B, ISO 15693, ISO 7816" },
          { label: "Read Range", value: "10 cm | Interface: Mini USB" },
          { label: "Battery backup.", value: "User controllable Buzzer & 4 LED's" },
          { label: "OS", value: "Win7, Win8, Mac, Linux, Android 3.1 & above" },
          {
            label: "Application",
            value: "E Payment, Transportation, Loyalty program, Access Control.",
          },
        ],
        image: {
          src: `${IMG}/rfid-desktop-reader-display-nfc.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T161015.760.png`,
          alt: "Display based NFC and Mifare reader",
          width: 1024,
          height: 1024,
        },
      },
    ],
    faqs: [
      {
        q: "What is an RFID Desktop Reader and where is it used in toll operations?",
        a: "An RFID Desktop Reader is a compact, USB-powered device used to read FASTag RFID cards or tags at administrative offices, back offices, or support counters. It helps in verifying, activating, or registering FASTags outside the toll lane environment.",
      },
      {
        q: "What are the key features of Network Toll's RFID Desktop Reader?",
        a: "Network Toll's RFID Desktop Reader offers fast and accurate tag reading, user-friendly operation, plug-and-play connectivity with Windows systems, and compatibility with standard FASTag formats. It is ideal for customer service and support functions.",
      },
      {
        q: "How does the RFID Desktop Reader enhance toll management efficiency?",
        a: "By enabling quick tag verification and backend processing, the RFID Desktop Reader supports smooth FASTag issuance, troubleshooting, and validation. It reduces lane-side delays by handling pre-verification and administrative tasks more effectively.",
      },
    ],
    seo: {
      title: "RFID Desktop Reader",
      description:
        "UHF, Mifare and NFC desktop RFID readers and writers for FASTag issuance, tag registration, data encoding and cashless payment applications.",
    },
    source: "https://networktoll.com/rfid-desktop-reader/",
  },
  {
    slug: "rfid-desktop-mobile-reader",
    name: "RFID Desktop/\nMobile Reader",
    category: "toll",
    group: "reader",
    desc: "Plug-and-play desktop and phone-mounted RFID readers for FASTag issuance, verification and field troubleshooting.",
    bullets: ["125 KHz or 13.56 MHz", "8–10cm read range", "Android, Windows & Linux"],
    image: {
      src: `${IMG}/rfid-desktop-mobile-reader.png`,
      remote: `${WP}/2025/05/Untitled-design-2025-05-27T161155.787.png`,
      alt: "Micro USB phone RFID reader, model NWS-RD 10",
      width: 1024,
      height: 1024,
    },
    heading: "RFID Desktop/Mobile Reader",
    models: [
      {
        name: "Micro USB Phone Reader (Model: NWS-RD 10 (125 KHz / 13.56 MHz))",
        specs: [
          { label: "Frequency", value: "Choose between 125 KHz or 13.56 MHz" },
          { label: "Read Range", value: "8 cm | Interface: Mini USB" },
          { label: "OS Support", value: "Android (Samsung, Sony)" },
          {
            label: "Attach to your phone",
            value: "Open Notes / SMS editor/ memo – Tap the card, – card ID wil reflect",
          },
          {
            label: "Support Card/ Tag",
            value:
              "125 KHz – EM 4100, TK 4100, SMC 4001; 13.56 MHz – Mifare, Fudan, Icode2, UL, Ntag",
          },
        ],
        image: {
          src: `${IMG}/rfid-desktop-mobile-reader.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T161155.787.png`,
          alt: "Micro USB phone RFID reader, model NWS-RD 10",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "Small USB Reader for Android / PC (Model: NWS-RPA 04 (125 KHz / 13.56 MHz))",
        specs: [
          { value: "Frequency: Choose between 125 KHz or 13.56 MHz" },
          { value: "Read Range: 10 cm | Interface: USB | LED Indicator" },
          { value: "OS Support: Android, Windows, LINUX" },
          { value: "Plug & Play. Does not need any development." },
          { value: "Support Card/ Tag: 125 KHz – TK 4100, EM 4200; 13.56 MHz – Mifare 1K, 4K" },
        ],
        image: {
          src: `${IMG}/rfid-desktop-mobile-reader-nws-rpa-04.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T161205.511.png`,
          alt: "Small USB RFID reader for Android and PC, model NWS-RPA 04",
          width: 1024,
          height: 1024,
        },
      },
    ],
    faqs: [
      {
        q: "What is the purpose of RFID Desktop/Mobile Readers in toll operations?",
        a: "RFID Desktop/Mobile Readers are versatile devices used for reading FASTag RFID tags in both stationary (desktop) and portable (mobile) environments. They support toll operators in tasks like tag issuance, verification, and troubleshooting away from the toll lane.",
      },
      {
        q: "What are the differences between Desktop and Mobile RFID Readers?",
        a: "Desktop RFID Readers are typically used at fixed counters or back-office setups and connect via USB, while Mobile RFID Readers are handheld, battery-powered devices designed for on-the-go use, offering flexibility for field operations and spot checks.",
      },
      {
        q: "Are Network Toll's RFID Desktop/Mobile Readers compatible with FASTag systems?",
        a: "Yes, both types of readers are fully compliant with national FASTag standards and seamlessly integrate with Toll Management Systems (TMS), ensuring accurate tag reading, data synchronization, and support for real-time processing.",
      },
    ],
    seo: {
      title: "RFID Desktop/Mobile Reader",
      description:
        "Compact USB and phone-mounted RFID readers supporting 125 KHz and 13.56 MHz cards on Android, Windows and Linux — plug and play, no development needed.",
    },
    source: "https://networktoll.com/rfid-desktop-mobile-reader/",
  },
  {
    slug: "bluetooth-reader",
    name: "Bluetooth Reader",
    category: "toll",
    group: "reader",
    desc: "Wireless UHF readers — pocket, wearable and pistol-grip — for on-the-go FASTag and asset scanning via mobile app.",
    bullets: ["865–867 MHz UHF", "3–10m read range", "3–8hr battery life"],
    image: {
      src: `${IMG}/bluetooth-reader.png`,
      remote: `${WP}/2025/05/Untitled-design-2025-05-27T162003.293.png`,
      alt: "UHF Bluetooth reader, model NWS-RB 01",
      width: 1024,
      height: 1024,
    },
    heading: "Bluetooth Reader",
    models: [
      {
        name: "UHF Bluetooth Reader (Range: 3 Mt) (Model: NWS-RB 01)",
        specs: [
          { label: "Frequency", value: "UHF 865 – 867 MHz" },
          { label: "Read Range", value: "Up To 3 Meters. 3 dBi circular antenna" },
          { label: "Supports", value: "18000 6C (EPC C1G2) protocol tag." },
          { label: "OS", value: "Fully supports Windows, Android & IOS" },
          { value: "3000 mAh battery. Works Up To 7 hours cont. use" },
          { value: "Integrated Buzzer and LED." },
          { value: "Dimension: 13 x 8 x 2 cm. 90 grams. Pocket Carry" },
        ],
        image: {
          src: `${IMG}/bluetooth-reader.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T162003.293.png`,
          alt: "UHF Bluetooth reader, model NWS-RB 01",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "UHF Wearable Watch Reader",
        specs: [
          { label: "Frequency", value: "UHF 865 – 867 MHz" },
          { label: "Read Range", value: "Up To 1 Meters." },
          { label: "Supports", value: "18000 6C (EPC C1G2) protocol tag." },
          { label: "OS", value: "Fully supports Windows, Android & IOS" },
          { value: "550 mAh battery. Works Up To 3 hours cont. use" },
          { value: "Power, Bluetooth & Status Indicator" },
          {
            value:
              "Can be used as watch, hang around neck or can be used with a telescopic rod (Included) to reach high place. It can also be attached to back side of phone.",
          },
        ],
        image: {
          src: `${IMG}/bluetooth-reader-wearable-watch.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T162028.948.png`,
          alt: "UHF wearable watch RFID reader",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "Ultra High Long Range Bluetooth Reader (Model: NWS-RB 03)",
        specs: [
          { label: "Frequency", value: "UHF 865 – 867 MHz" },
          { label: "Impinj", value: "R2000 Module. 4 dBi Circular Antenna" },
          { label: "Read Range", value: "Up to 10 meters." },
          { value: "Supports 18000 6C (EPC C1G2) protocol tag." },
          { label: "OS", value: "Fully supports most Android OS Devices." },
          { label: "5000 mAh battery.", value: "Works Up To 8 hours cont. use" },
          { value: "Smart Pistol grip . USB Cable, LED and Speaker" },
          { value: "1D & 2D Barcode scanner | 400 grams." },
        ],
        image: {
          src: `${IMG}/bluetooth-reader-nws-rb-03.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T162203.524.png`,
          alt: "Ultra high long range Bluetooth reader, model NWS-RB 03",
          width: 1024,
          height: 1024,
        },
      },
    ],
    faqs: [
      {
        q: "What is a Bluetooth Reader and how is it used in toll operations?",
        a: "A Bluetooth Reader is a wireless device that reads FASTag RFID tags using Bluetooth connectivity, allowing toll operators or field staff to access vehicle tag data through mobile apps or handheld terminals without a wired connection.",
      },
      {
        q: "What are the advantages of using Network Toll's Bluetooth Reader?",
        a: "Network Toll's Bluetooth Reader offers wireless flexibility, portability, and ease of use. It enables quick and accurate FASTag scans from a distance, reduces hardware clutter, and is ideal for mobile verification, temporary lanes, or enforcement scenarios.",
      },
      {
        q: "Is the Bluetooth Reader compatible with Android or other mobile systems?",
        a: "Yes, the Bluetooth Reader is fully compatible with Android devices and Network Toll's mobile tolling applications. It connects easily via Bluetooth and supports secure, real-time data transfer for seamless integration with the Toll Management System (TMS).",
      },
    ],
    seo: {
      title: "Bluetooth RFID Reader",
      description:
        "Wireless UHF Bluetooth RFID readers with 3m to 10m read range, Impinj R2000 module and up to 8 hours of continuous use on Android, Windows and iOS.",
    },
    source: "https://networktoll.com/bluetooth-reader/",
  },
  {
    slug: "rfid-uhf-reader-antenna",
    name: "RFID UHF Reader\nand Antenna",
    category: "toll",
    group: "reader",
    desc: "Zebra FX9600 fixed UHF reader paired with 8 dBi or 12 dBi circular antennas for long-range, high-density reading.",
    bullets: ["Up to 8 monostatic RF ports", "+33 dBm RF power", "Up to 15m with 12 dBi antenna"],
    image: {
      src: `${IMG}/rfid-antenna-12dbi.jpg`,
      remote: `${WP}/2025/05/12-dBi-Antenna.jpg`,
      alt: "12 dBi circular polarized RFID antenna for the RFID UHF reader and antenna system",
      width: 1024,
      height: 1024,
    },
    heading: "RFID UHF Reader & Antenna",
    models: [
      {
        // Swapped from the Impinj R2000 4-Port Reader (NWS-4P 01) per client
        // request. Specs are real, sourced from Zebra's own spec sheet
        // (zebra.com/us/en/products/spec-sheets/rfid/rfid-readers/fx9600.html)
        // and reseller listings, not invented. No product photo: per the
        // client, the FX9600's own photo should not be used here since NTS
        // is not Zebra and doesn't want to present a competitor's product
        // shot as its own catalog image. Antennas below are unchanged.
        name: "Zebra FX9600 Fixed UHF Reader",
        specs: [
          { label: "Ports", value: "4-port or 8-port monostatic RF ports (model dependent)" },
          { label: "RF Power", value: "Up to +33 dBm transmit power" },
          { label: "Protocol", value: "EPC Gen2 V2 / ISO 18000-63" },
          { label: "Frequency", value: "Region-dependent band plan; 865–867 MHz for India" },
          { label: "Power", value: "Power over Ethernet (PoE/PoE+) or external supply" },
          { label: "Housing", value: "IP53 sealed, MIL-STD-810G rugged rating" },
          {
            label: "Interfaces",
            value: "10/100 Ethernet (RJ45), USB Host/Client, Serial (DB9), optically isolated GPIO",
          },
          {
            label: "Application",
            value: "Warehouse and dock-door portals, logistics, inventory management, RFID gates",
          },
        ],
      },
      {
        name: "8 dBi Antenna (Model: NWS-4A 02)",
        specs: [
          { value: "Circular Polarized" },
          { value: "N Female connector (Included)" },
          { value: "Read Range: Up To 8 Meters with single Antenna." },
          { value: "Front to Back Ratio: >=20" },
          { value: "Half Power Beam Width: Horizontal and Vertical 65." },
          { value: "IP 66 Rated | Material: UV & ABS" },
          { value: "Colour: White | Mounting: Included" },
        ],
        image: {
          src: `${IMG}/rfid-antenna-8dbi.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T162404.945.png`,
          alt: "8 dBi circular polarized RFID antenna, model NWS-4A 02",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "12 dBi Antenna (Model: NWS-4A 01)",
        specs: [
          { value: "Circular Polarized" },
          { value: "N Female connector (Included)" },
          { value: "Read Range: Up To 15 Meters with single Antenna." },
          { value: "Front to Back Ratio: >=25" },
          { value: "Half Power Beam Width: Horizontal and Vertical 40." },
          { value: "IP 66 Rated | Material: UV & ABS" },
          { value: "Colour: White | Mounting: Included" },
        ],
        image: {
          src: `${IMG}/rfid-antenna-12dbi.jpg`,
          remote: `${WP}/2025/05/12-dBi-Antenna.jpg`,
          alt: "12 dBi circular polarized RFID antenna, model NWS-4A 01",
          width: 1024,
          height: 1024,
        },
      },
    ],
    // NOTE: the live site repeats the RFID Desktop Reader FAQ block verbatim on
    // this page — three questions that never mention the UHF reader or antenna.
    // Duplicate FAQ blocks across URLs are a real SEO liability (and Google will
    // not award a FAQ rich result to copy that doesn't match the page), so these
    // are rewritten to actually answer this product. Flagged for client sign-off.
    faqs: [
      {
        q: "What is the difference between an RFID UHF reader and an integrated reader?",
        a: "An integrated reader combines the reader and antenna in a single housing, while a fixed UHF reader like the FX9600 is a standalone unit with several antenna ports. That lets one reader cover several lanes, gates or zones at once, and lets you choose 8 dBi or 12 dBi antennas per position based on the read range each one needs.",
      },
      {
        q: "How far can the reader detect tags?",
        a: "Read range depends on the antenna. A single 8 dBi antenna reads up to 8 metres, and a single 12 dBi antenna reads up to 15 metres. Both are circular polarized and IP 66 rated, so tag orientation and outdoor exposure have little effect on performance.",
      },
      {
        q: "Where are fixed UHF readers typically deployed?",
        a: "They suit logistics and warehouse management, dock-door portals, RFID tunnels and gates, and inventory management — anywhere large numbers of tags pass a fixed point. The FX9600 supports up to 8 antenna ports at up to +33 dBm, with PoE power and a rugged IP53 housing.",
      },
    ],
    seo: {
      title: "RFID UHF Reader & Antenna",
      description:
        "Zebra FX9600 fixed UHF RFID reader with 8 dBi and 12 dBi circular polarized antennas — up to 15m read range, IP66/IP53 rated, PoE powered.",
    },
    source: "https://networktoll.com/rfid-uhf-reader-antenna/",
  },
  {
    slug: "toll-boom-barrier",
    name: "Toll Boom Barrier",
    category: "toll",
    group: "toll-plaza-equipment",
    desc: "3-metre automatic barrier with BLDC stepper drive, 0.6-second opening and 5 million assured operations.",
    bullets: ["0.6s boom opening time", "24V / 48V BLDC motor", "5 million operations assured"],
    image: {
      src: `${IMG}/toll-boom-barrier.jpg`,
      remote: `${WP}/2025/05/toll-boom-barrier.jpg`,
      alt: "Toll boom barrier, normal and extra lane",
      width: 1024,
      height: 1024,
    },
    heading: "Boom Barrier ( Normal & Extra Lane)",
    models: [
      {
        name: "Boom Barrier ( Normal & Extra Lane)",
        specs: [
          { value: "3 Meter Boom" },
          { value: "24V / 48V BLDC Stepper Motor & Driver (Japanese)" },
          { value: "Boom Opening Time 0.6 Second" },
          { value: "Red & Green Light Output" },
          { value: "Assured 5 Million Operation" },
          { value: "Left to Right / Right To Left Interchangeable" },
          { value: "2 Wiegand Input Port" },
          { value: "Port Manual Opening Switch" },
          { value: "2 Inductive Loop Detector Input" },
          { value: "3 mm MS Powder Coated Structure" },
          { value: "1.4 GHz Processor" },
          { value: "4 GB RAM & 8 GB Memory" },
          { value: "TCP/IP" },
          { value: "Sleek Design : 36 inches(h) x 12 Inches (L) x 9 inches (w)" },
          { value: "230V Input" },
          { value: "Blue / Orange / Yellow / Black Colors Available" },
        ],
        image: {
          src: `${IMG}/toll-boom-barrier.jpg`,
          remote: `${WP}/2025/05/toll-boom-barrier.jpg`,
          alt: "Toll boom barrier, normal and extra lane",
          width: 1024,
          height: 1024,
        },
      },
    ],
    brochures: [
      {
        label: "Boom barrier data sheet",
        href: `${PDF}/boom-barrier.pdf`,
        remote: `${WP}/2025/06/boom-barrier.pdf`,
      },
    ],
    faqs: [
      {
        q: "What is a Toll Boom Barrier and how does it work in toll plazas?",
        a: "A Toll Boom Barrier is an automated gate system installed at toll lanes to control vehicle movement. It opens or closes based on FASTag verification or manual toll collection, ensuring secure and efficient lane operations.",
      },
      {
        q: "What are the key features of Network Toll's Boom Barriers?",
        a: "Network Toll's Boom Barriers are designed for high durability, fast opening/closing speed, integration with RFID/ANPR systems, and reliable performance in extreme weather conditions. They ensure smooth traffic flow and effective lane control.",
      },
      {
        q: "Can Boom Barriers be integrated with other tolling equipment?",
        a: "Yes, Network Toll's Boom Barriers are fully integrated with Toll Management Systems (TMS), RFID readers, Automatic Number Plate Recognition (ANPR), and Vehicle Classification Systems for synchronized and automated toll processing.",
      },
    ],
    seo: {
      title: "Toll Boom Barrier",
      description:
        "Automatic 3-metre toll boom barrier with Japanese BLDC stepper drive, 0.6 second opening, Wiegand and loop-detector inputs, and 5 million assured operations.",
    },
    source: "https://networktoll.com/boom-barrier-india/",
  },
  {
    slug: "user-fare-display",
    name: "User Fare Display",
    category: "toll",
    group: "toll-plaza-equipment",
    desc: "Two-line super-bright LED display that shows the payable toll, vehicle class, low-balance warnings and safety messages.",
    bullets: ["1024 LEDs at 8000 mcd", "IP65, 5°C to +70°C", "RS232 / Ethernet"],
    image: {
      src: `${IMG}/user-fare-display.png`,
      remote: `${WP}/2025/06/RFID-Integrated-Reader-5-300x300.png`,
      alt: "User fare display unit for toll lanes",
      width: 1024,
      height: 1024,
    },
    heading: "User Fare Display",
    sections: [
      {
        title: "Function",
        body: [
          "UFD is used to indicate the payable toll fare to the road user and when the payment has been made, the publicity message can be shown.",
          "The main function of User Fare Display is to inform the driver of the vehicle classification entered by the toll collector and the toll to be paid.",
          "It shall also convey low balance warnings, traffic safety messages, public relations and seasonal messages.",
        ],
      },
      {
        title: "Features",
        list: [
          "Synchronize with Toll Lane Computer",
          "Message visibility and legibility are excellent even under bright ambient lighting conditions.",
          "Uses super Bright Red LEDs",
          "Uses powder coated mild steel Housing",
        ],
      },
    ],
    specTables: [
      {
        title: "Technical Specification",
        rows: [
          ["LED Color", "Red"],
          ["No. of LED", "1024"],
          ["LED Size", "5 mm"],
          ["Intensity", "8000 mcd"],
          ["Viewing Angle", "30°"],
          ["Size", "640 mm (W) × 160 mm (H)"],
          [
            "Characters",
            "Number of Lines: 2 Lines, Character per line: 13 characters, Minimum Character Height: 70 mm, Minimum Character Width: 50 mm",
          ],
          ["Pixel Pitch", "10 mm"],
          ["Communication", "RS232 / Ethernet (both options available)"],
          ["Power Supply", "230V AC / 50Hz"],
          ["Power Consumption", "50W"],
          ["LED Reliability", "> 100000 hours"],
          ["Dimension", "642 mm (W) × 162 mm (H) × 80 mm (D) ± 8%"],
          ["Mounting Arrangement", "Swivel type from bottom or Pole Mounting"],
          ["Weight", "5 kg approx."],
          ["Operating Temperature", "5°C to +70°C"],
          ["IP Rating Enclosure", "IP65"],
          ["Make", "Nwtech Solutions"],
          ["Model Number", "SE-1002"],
        ],
        notes: [
          "Additional custom and tuned modes are available upon request based on customer requirements.",
          "Only available on the Long range variant.",
        ],
      },
    ],
    brochures: [
      {
        label: "User fare display data sheet",
        href: `${PDF}/user-fare-display.pdf`,
        remote: `${WP}/2025/06/user-fare-display.pdf`,
      },
    ],
    seo: {
      title: "User Fare Display",
      description:
        "Two-line 1024-LED user fare display for toll lanes — 8000 mcd super-bright red LEDs, IP65 housing, RS232 or Ethernet, readable in direct sunlight.",
    },
    source: "https://networktoll.com/user-fare-display/",
  },
  {
    slug: "toll-lane-controller",
    name: "Toll Lane Controller",
    category: "toll",
    group: "toll-plaza-equipment",
    desc: "Industrial lane computer that interfaces with the AVC, drives revenue logic and reports every transaction to the plaza server.",
    bullets: ["Interfaces with AVC & TMS", "Opto-isolated 16-in / 8-out I/O", "IP-rated industrial enclosure"],
    image: {
      src: `${IMG}/toll-lane-controller.png`,
      remote: `${WP}/2025/06/RFID-Integrated-Reader-8-1024x1024.png`,
      alt: "Toll lane controller industrial enclosure",
      width: 1024,
      height: 1024,
    },
    heading: "Toll Lane Controller",
    sections: [
      {
        title: "Function",
        body: [
          "The TLC System includes the software and hardware components. Toll Lane Controller is the interfacing with AVC. These lane controllers in turn are connected to Toll Management Server (TMS) located in Plaza. They store all the relevant transactional data, incidents & events occurring in the lane area. In better terms it is used to control the revenue logic, collection process & vehicle passage.",
        ],
      },
      {
        title: "Following are the Major Components of TLC",
        list: [
          "Industrial Motherboard",
          "Industrial Power supply",
          "Memory",
          "Hard Drive",
          "USB & serial Ports",
          "Power Distribution",
          "Surge & Lightning Protection",
          "Industrial I/O Device",
          "Cooling Fan",
          "IP rated Enclosure",
        ],
      },
      {
        title: "Technical Specification",
        body: ["As per client requirement."],
      },
      {
        title: "Features",
        list: [
          "DIN rail mounted circuit breakers and terminal blocks.",
          "Opto-isolated Digital I/O Ports and Relays Board",
          "16 input 8 output I/O Board",
        ],
      },
    ],
    gallery: [
      {
        src: `${IMG}/toll-lane-controller-diagram.png`,
        remote: `${WP}/2025/06/RFID-Integrated-Reader-7-1-1024x566.png`,
        alt: "Toll lane controller system diagram",
        width: 1024,
        height: 566,
      },
    ],
    brochures: [
      {
        label: "Toll lane controller data sheet",
        href: `${PDF}/toll-lane-controller.pdf`,
        remote: `${WP}/2025/06/Toll-lane-controller.pdf`,
      },
    ],
    seo: {
      title: "Toll Lane Controller",
      description:
        "Industrial toll lane controller (TLC) interfacing with AVC and the plaza Toll Management Server — controls revenue logic, collection and vehicle passage.",
    },
    source: "https://networktoll.com/toll-lane-controller/",
  },
  {
    slug: "traffic-light",
    name: "Traffic Lights",
    category: "toll",
    group: "toll-plaza-equipment",
    desc: "Two-aspect red/green lane signal driven by the TLC, telling drivers whether their toll transaction cleared.",
    bullets: ["200mm aspect with visor", ">100m visibility", "IP65, 8W per aspect"],
    image: {
      src: `${IMG}/traffic-light.jpg`,
      remote: `${WP}/2025/06/Light.jpg`,
      alt: "Two aspect red and green toll lane traffic light",
      width: 1024,
      height: 1024,
    },
    heading: "Traffic Light",
    sections: [
      {
        title: "Function",
        body: [
          "The traffic light is used to control the flow of vehicles through the toll lane before and after toll has been collected. The traffic light shall display a red or green light to the motorists indicating the status of their transaction and indicating either to stop or proceed.",
        ],
      },
    ],
    specTables: [
      {
        title: "LED Display Technical Specification",
        rows: [
          ["Technology", "LED Based"],
          ["Type", "2 aspect red / green"],
          ["Installation Location", "At the toll lane towards the exit side"],
          ["Controlled by", "TLC"],
          ["Mounting", "On pole, 2 meter above the road"],
          ["Side", "On the right side of each lane"],
          ["Size of the display", "200mm dia with visor"],
          ["Visibility", ">100 meters under normal condition"],
          ["LED", "2 aspect red / green"],
          ["Housing", "MS"],
          ["Dimensions", "200mm diameter of Red LEDs Aspect and 200mm diameter for Green LEDs Aspect"],
          ["Weight", "3 kg approx."],
          ["LED Intensity", "(Red) Min 3000 cd/m², (Green) Min 4000 cd/m²"],
          ["Wavelength", "630 nm (red), 526 nm (green)"],
          ["Operating Temperature", "-5°C to +70°C"],
          ["Power Supply", "230V AC / 50Hz"],
          ["Humidity", "95% RH"],
          ["Power Consumption", "8 W per aspect"],
          ["Interface", "2 separate 230V AC input for Red and Green, screw-type terminals"],
          ["MTBF / MTRR", "100,000 Hrs / 30 minutes exchange"],
          ["Enclosure Environmental Protection", "IP 65"],
          ["Make", "NWTECH SOLUTIONS"],
        ],
      },
    ],
    brochures: [
      {
        label: "Traffic light data sheet",
        href: `${PDF}/traffic-light.pdf`,
        remote: `${WP}/2025/06/Traffic-Light.pdf`,
      },
    ],
    seo: {
      title: "Toll Lane Traffic Light",
      description:
        "Two-aspect LED toll lane traffic light controlled by the TLC — 200mm red/green aspects, over 100m visibility, IP65 housing, 8W per aspect.",
    },
    source: "https://networktoll.com/traffic-light/",
  },
  {
    slug: "ohls",
    name: "OHLS",
    category: "toll",
    group: "toll-plaza-equipment",
    desc: "Overhead lane status signal showing a red cross or green arrow so drivers can see which lanes are open from 300 metres.",
    bullets: ["300m visibility", "IP66 sealed retrofit kit", "Optional night dimming"],
    image: {
      src: `${IMG}/ohls.jpg`,
      remote: `${WP}/2025/06/OHLS.jpg`,
      alt: "Overhead lane status signal showing red cross and green arrow",
      width: 1024,
      height: 1024,
    },
    heading: "OHLS — Overhead Lane Status",
    sections: [
      {
        title: "Features",
        list: [
          "Synchronize with TLC",
          "IP 66 Rating",
          "Weather-proof housing with a sunshade or visor",
          "Automatic night dimming feature (Optional)",
          "Size: 100/200 mm",
          "Color: Red, Green, Both",
          "Body material: Polycarbonate",
        ],
      },
    ],
    specTables: [
      {
        title: "Specification",
        rows: [
          ["Technology", "LED"],
          ["Colors", "Red, Green"],
          ["Red LEDs Intensity", "8000 mcd"],
          ["Green LEDs Intensity", "10000 mcd"],
          ["Visibility", "300 m"],
          ["Wavelength", "Red – 625 nm, Green – 505 nm"],
          ["Enclosure Dimensions", "Polycarbonate 300 mm dia LED Aspect"],
          ["Lane Closed Indication", "Red Cross"],
          ["Lane Open Indication", "Green Arrow"],
          ["Enclosure Environmental Protection", "IP 66 (LEDs sealed Retrofit Kit)"],
          ["Electronic Components", "Industrial grade components and connectors"],
          ["Power Consumption", "10 W approx."],
          [
            "Interfacing Details",
            "Two different Lines (L) for Green Arrow & Red Cross. Neutral & Earth are common.",
          ],
          ["Size", "300 x 300 mm"],
          ["Power Supply", "230V AC"],
        ],
      },
    ],
    brochures: [
      {
        label: "Overhead lane signal data sheet",
        href: `${PDF}/ohls.pdf`,
        remote: `${WP}/2025/06/Overhead-Lane-signal-ohls.pdf`,
      },
    ],
    seo: {
      title: "OHLS — Overhead Lane Status Signal",
      description:
        "Overhead lane status (OHLS) signal with red cross and green arrow aspects, 300m visibility, IP66 polycarbonate housing and optional automatic night dimming.",
    },
    source: "https://networktoll.com/ohls/",
  },
  {
    slug: "automatic-vehicle-classifier",
    name: "Automatic Vehicle\nClassifier",
    category: "toll",
    group: "toll-plaza-equipment",
    desc: "Profiler-based AVC that reads axle count, dimensions and weight to assign the correct toll class automatically.",
    bullets: ["30mm / 60mm beam spacing", "12m range", "High environmental immunity"],
    image: {
      src: `${IMG}/automatic-vehicle-classifier.jpg`,
      remote: `${WP}/2025/05/automatic-vehicle-classifier.jpg`,
      alt: "Automatic vehicle classifier profiler at a toll lane",
      width: 1024,
      height: 1024,
    },
    heading: "Automatic Vehicle Classifier",
    intro: [
      "An automatic vehicle classification may need to determine vehicle height, number of axles, presence of dual tires, and vehicle weight to distinguish between vehicles and assign the correct class.",
    ],
    sections: [
      {
        title: "Determinants of vehicle class may include",
        list: [
          "Number of axles and/or tires of a vehicle.",
          "Dimensions (e.g., height, length, wheelbase, height over first axle) of a vehicle.",
          "Weight of a vehicle.",
          "Number of occupants in a vehicle (e.g., a special class assigned to commuter pools with a minimum number of occupants).",
        ],
      },
      {
        title: "Features",
        list: [
          "Wide range of options",
          "High immunity against environmental changes",
          "Compact Housing",
          "Beam spacing 30 mm / 60 mm",
          "Range 12 m",
        ],
      },
    ],
    brochures: [
      {
        label: "2D profiler based AVC data sheet",
        href: `${PDF}/automatic-vehicle-classifier.pdf`,
        remote: `${WP}/2025/06/2D-Profiler-Based-Automatic-Vehicle.pdf`,
      },
    ],
    faqs: [
      {
        q: "What is an Automatic Vehicle Classifier (AVC) system?",
        a: "An Automatic Vehicle Classifier (AVC) is an intelligent system that identifies and classifies vehicles based on their type (e.g., car, truck, bus) using sensors and axle-counting technology. Network Toll's AVC system ensures accurate toll calculation based on vehicle category.",
      },
      {
        q: "How does Network Toll's AVC system improve toll operations?",
        a: "Network Toll's AVC system enhances operational accuracy by automating vehicle classification, reducing manual errors, and speeding up the tolling process. It integrates with the toll management system to ensure correct toll charges and real-time data reporting.",
      },
      {
        q: "Is the AVC system compatible with both manual and ETC toll lanes?",
        a: "Yes, Network Toll's AVC system is fully compatible with both manual and Electronic Toll Collection (ETC) lanes. It can be seamlessly integrated into hybrid toll environments to support automated classification regardless of the payment method used.",
      },
    ],
    seo: {
      title: "Automatic Vehicle Classifier",
      description:
        "2D profiler based Automatic Vehicle Classifier (AVC) for toll plazas — axle count, dimensions and weight based classification with 12m range and 30/60mm beam spacing.",
    },
    source: "https://networktoll.com/automatic-vehicle-classifier/",
  },
  {
    slug: "ms-weigh-in-motion",
    name: "MS Weighing In\nMotion",
    category: "toll",
    group: "toll-plaza-equipment",
    desc: "Bending-plate weigh-in-motion systems that capture axle and gross weight at up to 60 km/h without stopping traffic.",
    bullets: ["OIML Accuracy Class 5", "Up to 60 km/h passing speed", "IP68 plate, 6-hour install"],
    image: {
      src: `${IMG}/ms-weigh-in-motion.jpg`,
      remote: `${WP}/2025/05/hybrid-weigh-in-motion-1.jpg`,
      alt: "Hybrid weigh in motion bending plate installed in a toll lane",
      width: 1024,
      height: 1024,
    },
    heading: "MS Weigh in Motion",
    models: [
      {
        name: "Hybrid Weigh in Motion",
        body: [
          "Hybrid Weigh-in-Motion or Hybrid WIM system can accurately weigh vehicles at speeds upto 25 km/h. These systems are accurate, robust for high volumes. Hybrid Weigh-in-Motion (WIM) solutions are cost effective means of measuring truck axle and gross weights without affecting the flow of traffic. These scales are routinely used in commercial weight enforcement to enforce trucks entering a weight station/ toll gate.",
        ],
        image: {
          src: `${IMG}/ms-weigh-in-motion.jpg`,
          remote: `${WP}/2025/05/hybrid-weigh-in-motion-1.jpg`,
          alt: "Hybrid weigh in motion bending plate installed in a toll lane",
          width: 1024,
          height: 1024,
        },
        specs: [
          { label: "General information", value: "Type: BENDING PLATE based WIM" },
          { value: "Weighing Capacity 30 / 40 / 50 ton / individual Axle" },
          { value: "Each Load cell capacity 20 Ton" },
          { value: "Ambient temperature 50 °C | Humidity 95%" },
          { value: "Normal Lane 3.2 meter | Wide Lane 4.2 meter" },
          { label: "Weigh bridge", value: "MSWIM – Bending plate based, Straun gauge load cell" },
          { value: "Type of weighing: Individual axle based | Weighing speed 20 kmph" },
          { value: "Axle load 40 Ton (Maximum) / axle | Calibration Automatic | Increment 50 kg" },
          { value: "Accuracy (+/-) 0.1% FSR @ STATIC, (+/-) 5% up to 30 km/h" },
          { value: "Power Supply 230 V +/- 10% Single phase 50 Hz" },
          { label: "Features", value: "Simple transportation and fast set up time" },
          { value: "Weigh all Vehicles from simple van to articulated trucks" },
          { value: "Light weight Low Profile | Multiple Power sources | Reduced weight Transfer" },
          { value: "Advanced Data Management (optional) | Bright bold Graphical display" },
          { value: "Laptop and modem communication port (Optional)" },
          {
            value:
              "Telemetry output module for Data download via mobile telephone work (optional)",
          },
          { value: "Classification of over 100 unique vehicle type | Vehicle by vehicle data storage" },
          { value: "RS232 Communication Port (Default) | TCP/IP Communication port (Optional)" },
          {
            value:
              "Incorporates tested high speed micro controller & very high speed monolithic AD Converter",
          },
          {
            value:
              "Highly efficient and highly immune RF & infra red sensor for vehicle classification",
          },
          { label: "Structure", value: "WIM Structure Dimension 1500mm x 510mm x 25mm" },
          { value: "Bending plate material P 20 / EN 19 Alloy steel | Capacity 40 Ton" },
          { value: "Accuracy in static (+/-) 0.1% verified gross weight" },
          { value: "In motion accuracy (+/-) 7% up to 50 kmph | Rated axle load ≤ 40 Ton" },
          { value: "Safe Overload 150% | Ultimate Overload 300% | Max passing speed 50 kmph" },
          { value: "Static Accuracy OIML CLASS 5 | Dynamic Accuracy (+/-) 7%" },
          { value: "Operating speed 1 to 50 kmph | Operating Temperature -29 °F to 165 °F" },
          { value: "Power Source 240V AC and 12V AC | Relative Moisture 95% RH" },
          {
            value:
              "Controlling device protection class IP 65 | Weighing load cell protection class IP 67",
          },
        ],
      },
      {
        name: "Bending Plate Weigh-in-Motion",
        body: [
          "Bending Plate Weigh-in-Motion (WIM) System can accurately weigh vehicles at speeds upto 60 km/h. These systems utilize plates with strain gauges bonded to the underside. The system records the strain measured by strain gauges and calculates the dynamic load. This state-of-art Medium Speed Weigh-in-Motion (MSWIM) system is ideal for dynamic vehicle weighing suitable for Indian Toll Plaza scenario wherein stop & go & free-flow traffic conditions persist. Bending Plate WIM (MSWIM) is a proven technology which is highly reliable, and its durable & ultra slim profile is easier to install with minimal civil work required at the road surface. This Medium Speed WIM (MSWIM) system has a unique functionality of generating Axle Count, Axle Weight, Axle Speed, Vehicle Weight, Tire count, Vehicles Height and width as a single system without any dependency on Toll Plaza or similar alibi technologies.",
        ],
        image: {
          src: `${IMG}/ms-weigh-in-motion-bending-plate.jpg`,
          remote: `${WP}/2025/05/hybrid-weigh-in-motion-2.jpg`,
          alt: "Bending plate weigh in motion system",
          width: 1024,
          height: 1024,
        },
        specs: [
          { label: "Features", value: "Intelligent Sensor Weigh-in-Motion" },
          { value: "Speed Up to 60 km/h | Accuracy Class 5 OIML" },
          { value: "6 Hours Installation | Minimal Civil Installation | No Speed Breakers" },
          { value: "Minimal Lane Closures | Preventive Maintenance – 30 Minutes" },
          { value: "Most Economical replacement | No Mechanical Wears & Tears" },
          { value: "Optional Alibi – Vehicle Height, Width, Tyre Counter" },
        ],
      },
    ],
    specTables: [
      {
        title: "Technical Specifications — Bending Plate WIM",
        rows: [
          [
            "Structure",
            "Plate – MS Duly carbon steel with vulcanized rubber certified for structural analysis and design (STADD) – III complying BIS 2062",
          ],
          ["Stationary Accuracy", "= 0.1% FSR"],
          ["In-Motion Accuracy", "±5% OIML Accuracy Class – 5 FSR up to speed 50 km/h"],
          ["Maximum Passing Speed", "60 Km/h"],
          ["Overload Capacity of the Platform", "150% or rated capacity"],
          ["Protection Class", "IP 68, Operational Temp -10 to +65 °C"],
          [
            "Vehicle Separator",
            "IR based curtain with minimum 24 sensors housed in Stainless steel pillars with proper scaling",
          ],
          ["Controller Housing", "Water/Weather proof with anti-rust coating, IP-65 rated"],
          [
            "Approval/Certification",
            "Weights and Measure Approved Model, duly stamped & sealed by W&M department, BIS & OIML certified",
          ],
          ["Design", "IIT Structure Approved, CRRI Approved"],
          ["Re-calibration / Stamping & Verification", "Every 12 (twelve) months"],
          ["Functionality", "Can work independently without any dependency on Toll System"],
        ],
      },
    ],
    brochures: [
      {
        label: "MS weigh-in-motion data sheet",
        href: `${PDF}/ms-weigh-in-motion.pdf`,
        remote: `${WP}/2025/06/MSWeigh-in-Motion.pdf`,
      },
    ],
    faqs: [
      {
        q: "What is the MS Weigh in Motion system and how does it function?",
        a: "MS Weigh in Motion (WIM) is a high-precision system that measures the axle load and gross vehicle weight of moving vehicles without requiring them to stop. It helps in detecting overloaded vehicles in real-time as they pass over the weigh sensors.",
      },
      {
        q: "What are the benefits of using Network Toll's MS WIM system?",
        a: "Network Toll's MS WIM system ensures traffic flow is uninterrupted while still maintaining legal compliance with axle load regulations. It enhances road safety, protects highway infrastructure, and supports data-driven enforcement and toll classification.",
      },
      {
        q: "Is the MS WIM system integrated with toll collection and monitoring systems?",
        a: "Yes, Network Toll's MS Weigh in Motion system is fully integrated with the Toll Management System (TMS) and Central Monitoring Software. It enables real-time alerts, automatic classification adjustments, and reporting for better traffic and revenue management.",
      },
    ],
    seo: {
      title: "MS Weigh in Motion",
      description:
        "Bending plate and hybrid weigh-in-motion systems for Indian toll plazas — OIML Class 5 accuracy up to 60 km/h, IP68 plate, BIS certified, 6-hour installation.",
    },
    source: "https://networktoll.com/ms-weigh-in-motion/",
  },
  {
    // Sourced from Eco Track Systems (ETS), a separate Delhi RFID
    // manufacturer, to fill a genuine gap: pedestrian access control at a
    // plaza's staff/visitor entrance, distinct from the vehicle boom barrier
    // above. ETS's own site (etsrfid.com) has since been taken over by an
    // unrelated third party, so no photo could be sourced from it — this
    // entry is text-only until a real photo is available. Content reflects
    // what was actually described, not invented specifications.
    slug: "flap-barrier-turnstile",
    name: "Flap Barrier &\nTurnstile",
    category: "toll",
    group: "toll-plaza-equipment",
    desc: "Pedestrian access control for plaza and campus entrances — motorised flap barrier or tripod turnstile, both RFID-gated.",
    bullets: ["Bi-directional, self-service entry", "TCP/IP or RS-485 controller", "Sliding, swinging or rotating-arm options"],
    image: {
      // No photo exists for this product on networktoll.com (it has no page
      // for it at all) or on etsrfid.com (site no longer belongs to the RFID
      // company — see the note above). Branded placeholder used so the grid
      // has no visible hole; swap this line when a real photo is supplied.
      src: "/images/placeholders/product-generic-placeholder.webp",
      remote: "",
      alt: "Flap barrier and tripod turnstile pedestrian access gate",
      width: 870,
      height: 860,
    },
    heading: "Flap Barrier & Tripod Turnstile",
    intro: [
      "Pedestrian entry control for staff and visitor lanes at a toll plaza office, depot or corporate campus — complementing the vehicle boom barrier rather than replacing it. Both gate types are RFID-credentialed, so the same card or tag used for vehicle access can also clear the pedestrian lane.",
    ],
    models: [
      {
        name: "Flap Barrier",
        body: [
          "Motorised sliding or swinging barrier panels built around optical sensing for self-service, bi-directional entry control. Designed to blend into a lobby or prominent entryway while still enforcing controlled access at high throughput.",
        ],
      },
      {
        name: "Tripod Turnstile",
        body: [
          "A rotating three-arm barrier for lower-traffic or cost-sensitive entrances. Controller supports both TCP/IP and RS-485 communication, with an auto-discovery tool for setting network parameters during installation.",
        ],
      },
    ],
    seo: {
      title: "Flap Barrier & Tripod Turnstile",
      description:
        "RFID-gated flap barrier and tripod turnstile for pedestrian access control at toll plaza offices, depots and campuses — bi-directional, self-service entry.",
    },
  },
  {
    slug: "uhf-mobile-device",
    name: "UHF Mobile Device",
    category: "toll",
    group: "reader",
    desc: "Chainway C72 rugged Android handheld with Impinj R2000 UHF RFID, 8000mAh battery and optional barcode, iris and NFC.",
    bullets: [">25m read range (circular)", ">200 tags/s", "IP65, 1.5m drop rated"],
    image: {
      src: `${IMG}/uhf-mobile-device.png`,
      remote: `${WP}/2025/06/RFID-Integrated-Reader-11-1024x1024.png`,
      alt: "Chainway C72 rugged Android UHF RFID handheld",
      width: 1024,
      height: 1024,
    },
    heading: "UHF Mobile Device",
    models: [
      {
        name: "Android Device",
        body: [
          "Chainway C72 is an Android rugged mobile computer. It features powerful processor, 8000mAh battery and superb UHF RFID capability. It can be equipped with R2000 linearly or circularly polarized antenna. That it can read tags in bulk from long distance enables it to be deployed in asset management, retail, warehousing, fleet management and etc.",
        ],
        image: {
          src: `${IMG}/uhf-mobile-device.png`,
          remote: `${WP}/2025/06/RFID-Integrated-Reader-11-1024x1024.png`,
          alt: "Chainway C72 rugged Android UHF RFID handheld",
          width: 1024,
          height: 1024,
        },
      },
    ],
    gallery: [
      {
        src: `${IMG}/uhf-mobile-device-2.png`,
        remote: `${WP}/2025/06/RFID-Integrated-Reader-12-1024x1024.png`,
        alt: "Chainway C72 handheld, side view",
        width: 1024,
        height: 1024,
      },
      {
        src: `${IMG}/uhf-mobile-device-3.png`,
        remote: `${WP}/2025/06/RFID-Integrated-Reader-13-1024x1024.png`,
        alt: "Chainway C72 handheld, rear view",
        width: 1024,
        height: 1024,
      },
    ],
    specTables: [
      {
        title: "Specification",
        rows: [
          ["Performance"],
          ["CPU (Quad-core)", "Cortex-A53 Quad-core 1.45GHz"],
          ["RAM + ROM (Quad-core)", "2GB + 16GB"],
          ["Expansion", "Supports up to 128 GB Micro SD card"],
          ["Operating System (Quad-core)", "Android 6.0"],
          ["CPU (Octa-core)", "Cortex-A53 Octa-core 2.5GHz"],
          ["RAM + ROM (Octa-core)", "3GB + 32GB"],
          ["Operating System (Octa-core)", "Android 8.1"],
          ["Communication"],
          ["WLAN (Quad-core)", "IEEE802.11 a/b/g/n, 2.4G/5G dual-band"],
          ["WLAN (Octa-core)", "IEEE802.11 a/b/g/n/ac, 2.4G/5G dual-band"],
          [
            "WWAN (China)",
            "2G: 900/1800MHz; 3G: 900/1900/2000/2100MHz; 4G: B1, B3, B5, B38, B39, B40, B41",
          ],
          [
            "WWAN (Europe)",
            "2G: 850/900/1800/1900MHz; 3G: 850/900/1900/2100MHz; 4G: B1, B3, B5, B7, B8, B20, B40",
          ],
          [
            "WWAN (America)",
            "2G: 850/900/1800/1900MHz; 3G: 850/900/1700/1900MHz; 4G: B2, B4, B7, B12, B17",
          ],
          ["Bluetooth", "Bluetooth 4.0 BLE (Quad-core); v2.1+EDR / v3.0+HS / v4.1+HS (Octa-core)"],
          ["GNSS", "GPS/AGPS, GLONASS, BeiDou, internal antenna"],
          ["Physical Characteristics"],
          ["Dimensions", "164.2 x 80.0 x 24.3mm / 6.46 x 3.15 x 0.96in"],
          ["Weight", "654g / 23.07oz"],
          ["Display", '5.2" IPS FHD 1920×1080'],
          ["Touch Panel", "Corning Gorilla Glass, multi-touch, gloves & wet hands support"],
          ["Battery", "Li-ion 8000mAh. Standby: 500+ hrs, Usage: 12+ hrs, Charging: 3–4 hrs"],
          ["Expansion Slot", "1 SIM, 1 SIM or TF card slot"],
          ["Interfaces"],
          ["USB", "USB 2.0 Type-C, OTG"],
          ["Audio", "Speaker, 2 microphones"],
          ["Keypad", "4 front keys, 1 power key, 2 scan keys, 1 multifunctional key"],
          ["Sensors", "Gravity, light, proximity sensors"],
          ["User Environment"],
          ["Operating Temp.", "-20°C to 50°C"],
          ["Storage Temp.", "-40°C to 70°C"],
          ["Humidity", "5%RH – 95%RH (non-condensing)"],
          ["Drop Spec", "Multiple 1.5m drops (20x) across temperature range"],
          ["Tumble Spec", "1000 × 0.5m falls"],
          ["Sealing", "IP65"],
          ["ESD", "±15kV (air), ±6kV (contact)"],
          ["Developing Environment"],
          ["SDK", "Chainway Software Development Kit"],
          ["Language", "Java"],
          ["Tools", "Eclipse / Android Studio"],
          ["Data Collection"],
          ["Camera", "13MP Autofocus with Flash"],
          ["RFID (Optional)"],
          ["Engine", "CM2000-1 (Impinj Indy R2000)"],
          ["Frequency", "865-868 MHz / 902-928 MHz"],
          ["Protocol", "EPC C1 GEN2 / ISO18000-6C"],
          ["Antenna", "Linear (1.8dBi), Circular (4dBi)"],
          ["Power", "1W (adjustable +5dBm to +30dBm)"],
          [
            "Read Range",
            ">25m (circular indoor), >10m (circular outdoor), >21m (linear indoor), >7m (linear outdoor)",
          ],
          ["Reading Rate", ">200 tags/s"],
          ["Barcode Scanning (Optional)"],
          ["1D Linear Scanner", "Zebra SE965 / Honeywell N4313"],
          ["1D Symbologies", "UPC/EAN, Code128, Code39, Code93, etc."],
          ["2D Imager (Quad-core)", "Zebra SE4710 / SE4750 / Honeywell N6603"],
          ["2D Imager (Octa-core)", "Zebra SE4750 / SE4750MR"],
          ["2D Symbologies", "PDF417, QR, Aztec, USPS, etc."],
          ["Iris (Optional)"],
          ["Rate", "< 150ms"],
          ["Range", "20–40 cm"],
          ["FAR", "1/10000000"],
          ["Protocol", "ISO/IEC 19794-6, GB/T 20979-2007"],
          ["NFC (Optional)"],
          ["Frequency", "13.56 MHz"],
          ["Accessories"],
          ["Standard", "AC Adaptor, USB Cable"],
          ["Optional", "Cradle, Holster"],
        ],
      },
    ],
    brochures: [
      {
        label: "Chainway C72 data sheet",
        href: `${PDF}/uhf-mobile-device-c72.pdf`,
        remote: `${WP}/2025/06/C72-EN20190320-data-sheet.pdf`,
      },
    ],
    seo: {
      title: "UHF Mobile Device",
      description:
        "Chainway C72 rugged Android UHF RFID handheld with Impinj R2000 engine, over 25m read range, 200+ tags per second, 8000mAh battery and IP65 sealing.",
    },
    source: "https://networktoll.com/uhf-mobile-device/",
  },
  {
    slug: "nt-pulse",
    name: "NT-Pulse",
    category: "toll",
    group: "radar",
    desc: "Long-range, ultra high resolution software-defined imaging radar delivering dense 4D point clouds in rain, fog, dust and snow.",
    bullets: ["1.5° static angular resolution", "800m car detection (LR)", "IP68, automotive Ethernet or PoE"],
    image: {
      src: `${IMG}/nt-pulse.png`,
      remote: `${WP}/2025/06/RFID-Integrated-Reader-4-1024x1024.png`,
      alt: "NT-Pulse imaging radar unit",
      width: 1024,
      height: 1024,
    },
    heading: "NT-Pulse",
    tagline: "Long-Range, Ultra High Resolution Software Defined Imaging Radar",
    intro: [
      "NT-Pulse enables next-generation radar sensing systems by providing a breakthrough combination of resolution, range, point density, size, cost and software flexibility.",
      "NT-Pulse delivers highly dense 4D point clouds with excellent performance in a compact size for radar-based perception, classification, mapping, tracking, and autonomous navigation. Its rugged solid-state architecture allows reliable operation in rain, fog, dust, snow, and other harsh environments.",
    ],
    sections: [
      {
        title: "Highlights",
        list: [
          "Industry leading resolution without compromise to doppler or range performance",
          "1.5° static angular resolution with 2nd-gen advanced beamformer",
          "Zadar SDK supports dynamic radar reconfiguration and performance optimization",
          "Robust against in-band interference",
          "Optional automotive ethernet or PoE",
        ],
      },
      {
        title: "Mobile Applications (77GHz)",
        list: [
          "Next-gen ADAS",
          "Fully autonomous driving",
          "Mining and construction",
          "Industrial and agricultural",
        ],
      },
    ],
    specTables: [
      {
        title: "Configuration Options",
        headers: [
          "Power & Interface",
          "Long range antenna — 120° × 24° FOV, 800m car detection",
          "Wide FOV antenna — 120° × 50° FOV, 350m car detection",
          "Ultra-wide FOV antenna — 120° × 90° FOV, 250m car detection",
        ],
        rows: [
          [
            "12V DC / 1000 BASE-T1 — automotive and robotics",
            "NT-Pulse-T1-LR",
            "NT-Pulse-T1-W",
            "NT-Pulse-T1-U",
          ],
          [
            "Power over Ethernet / RJ45 — infrastructure and evaluation",
            "NT-Pulse-POE-LR",
            "NT-Pulse-POE-W",
            "NT-Pulse-POE-U",
          ],
        ],
      },
      {
        title: "Radar Detection Performance",
        headers: ["Antenna Configuration", "Long range", "Wide FOV", "Ultra wide FOV"],
        rows: [
          ["Field of View (H × V)", "120° × 24°", "120° × 50°", "120° × 90°"],
          ["Static Angular Resolution", "1.5°", "1.5°", "1.5°"],
          ["Angular Accuracy (H × V)", "±0.25°", "±0.25°", "±0.25°"],
          ["Truck Detection", ">400 m", ">400 m", ">250 m"],
          ["Car Detection", ">400 m", ">350 m", ">250 m"],
          ["Human Detection", ">200 m", ">130 m", ">85 m"],
          ["Instrumented Range Max.", "0.1 – 400 m", "0.1 – 400 m", "0.1 – 250 m"],
          ["Range Resolution Min.", "0.033 m", "0.033 m", "0.033 m"],
          ["Range Accuracy Min.", "0.01 m", "0.01 m", "0.01 m"],
          [
            "Doppler Ambiguity Max.",
            "143.4 m/s (516 km/h)",
            "143.4 m/s (516 km/h)",
            "143.4 m/s (516 km/h)",
          ],
          ["Doppler Resolution Min.", "0.08 m/s", "0.08 m/s", "0.08 m/s"],
          ["Frame Time", "40 ms / 25 Hz", "40 ms / 25 Hz", "40 ms / 25 Hz"],
        ],
        notes: [
          "Field of view is based on 6dB antenna beamwidth in azimuth and elevation.",
          "Truck detection range: 28 dBsm typical pickup truck RCS in obstruction-free real-world scenario, >90% detectability. Car detection range: 20 dBsm typical sedan RCS, >90% detectability. Pedestrian detection range: -2 dBsm typical human RCS, >90% detectability.",
          "Custom radar operational modes can be applied upon request to increase the maximum instrumented range beyond the advertised limits.",
          "Range resolution and accuracy are for high point cloud density optimized modes; doppler ambiguity and resolution are for doppler optimized modes.",
        ],
      },
      {
        title: "Hardware Specifications",
        headers: ["Configuration", "12V / 1000BASE-T1 Edition", "PoE / RJ45 Edition"],
        rows: [
          ["Frequency", "77–81 GHz Worldwide", "77–81 GHz Worldwide"],
          ["Certification", "FCC Part 15 pending", "FCC Part 15 pending"],
          [
            "Radio Principle",
            "Cascaded SDIR with RF-FMCW modulation and 2nd gen HiRes Beamformer",
            "Cascaded SDIR with RF-FMCW modulation and 2nd gen HiRes Beamformer",
          ],
          ["Dimensions", "100 × 78 × 35 mm", "100 × 78 × 35 mm"],
          ["Weight (Preliminary)", "200 g (7.0 oz)", "240 g (8.5 oz)"],
          [
            "Mounting (Preliminary)",
            "Back: 4× M4 screws; Top: 2× M2.5 screws, 2× locating 2mm pin holes",
            "Back: 4× M4 screws; Top: 2× M2.5 screws, 2× locating 2mm pin holes",
          ],
          [
            "Material",
            "Polycarbonate + 6061-T6 Aluminum Black Anodized",
            "Polycarbonate + 6061-T6 Aluminum Black Anodized",
          ],
          ["Operating Temperature", "-40° – 85°C", "-40° – 85°C"],
          ["Storage Temperature", "-40° – 95°C", "-40° – 95°C"],
          ["Weather Sealing", "IP68 2-meter", "IP67"],
          ["Interface", "1000BASE-T1", "1000BASE-T over RJ45"],
          ["Connector", "6-pin JAE MX44 Automotive Header", "Sealed RJ45"],
          ["Power Supply", "+9–24 V DC, 12 V nominal", "802.3bt Type 3 (PoE++)"],
          ["Power Consumption", "10 W average, 15 W peak", "10 W average, 15 W peak"],
          ["Synchronization", "IEEE 1588 PTP, gPTP", "IEEE 1588 PTP, gPTP"],
          [
            "IMU Output",
            "3 axis gyro, 3 axis accelerometer, 208 Hz sampling (STMicroelectronics ASM330LHH)",
            "3 axis gyro, 3 axis accelerometer, 208 Hz sampling (STMicroelectronics ASM330LHH)",
          ],
        ],
        notes: ["Each edition is available in three antenna types: Long Range, Wide FOV and Ultra-wide FOV."],
      },
      {
        title: "Modes For Dynamic Platforms",
        headers: ["Mode Configuration", "2", "3", "5", "7"],
        rows: [
          ["Max Range", "30 m", "85 m", "250 m", "400 m"],
          ["Minimum Range", "0.05 m", "0.1 m", "0.3 m", "0.5 m"],
          ["Range Resolution", "3.3 cm", "8.9 cm", "26.2 cm", "41.9 cm"],
          ["Doppler Ambiguity", "74.4 m/s", "143.4 m/s", "143.4 m/s", "143.4 m/s"],
          ["Doppler Resolution", "0.079 m/s", "0.145 m/s", "0.145 m/s", "0.145 m/s"],
          ["Static Angular Resolution", "1.5°", "1.5°", "1.5°", "1.5°"],
          ["Angular Accuracy", "±0.25°", "±0.25°", "±0.25°", "±0.25°"],
          ["Frame Time", "50 ms", "50 ms", "50 ms", "50 ms"],
        ],
        notes: [
          "Field of view per antenna: 120° × 24° (LR), 120° × 50° (W), 120° × 90° (U).",
          "The platform speed needs to be less than ¼ of the provided range for Doppler Ambiguity, otherwise the reported platform velocity might be folded. Modes 7 and 8 are unavailable for the ultra-wide FOV.",
        ],
      },
    ],
    seo: {
      title: "NT-Pulse Imaging Radar",
      description:
        "NT-Pulse long-range software defined imaging radar — 1.5° angular resolution, dense 4D point clouds, 77–81 GHz, IP68, automotive Ethernet or PoE.",
    },
    source: "https://networktoll.com/nt-pulse/",
  },
  {
    slug: "nt-prime",
    name: "NT-Prime",
    category: "toll",
    group: "radar",
    desc: "High-resolution traffic monitoring radar with object list, tracking and vehicle classification output up to 800 metres.",
    bullets: ["0.35° static angular resolution", "800m vehicle detection", "Object list, tracking & classification"],
    image: {
      src: `${IMG}/nt-prime.png`,
      remote: `${WP}/2025/06/RFID-Integrated-Reader-3-1024x1024.png`,
      alt: "NT-Prime traffic monitoring radar unit",
      width: 1024,
      height: 1024,
    },
    heading: "NT Prime — Traffic Monitoring Radar",
    tagline: "Long-Range, Ultra High-Resolution Software-Defined Imaging Radar",
    intro: [
      "Prime enables next-generation radar sensing systems by providing a breakthrough combination of resolution, range, point density, size, and software flexibility.",
      "Prime delivers highly dense 4D point clouds with excellent performance for radar-based perception, classification, mapping, tracking, and autonomous navigation. Its rugged solid-state architecture allows reliable operation in rain, fog, dust, snow, and other harsh environments.",
    ],
    sections: [
      {
        title: "Highlights",
        list: [
          "Industry leading resolution without compromise to doppler or range performance",
          "0.35° static angular resolution with 2nd-gen advanced beamformer",
          "Radar SDK supports dynamic radar reconfiguration and performance optimization",
          "Robust against in-band interference",
          "Optional automotive ethernet or PoE",
          "Provide object list and tracking info, as well as classification output.",
        ],
      },
      {
        title: "Mobile Applications (77GHz)",
        list: [
          "Fully autonomous driving",
          "Mining and construction",
          "Industrial and agricultural",
        ],
      },
      {
        title: "Stationary Applications (60GHz)",
        list: [
          "Perimeter security and surveillance",
          "Traffic management and smart infrastructure",
          "UAV navigation and obstacle avoidance",
        ],
      },
      {
        title: "Advanced Radar Technology for Modern Traffic Needs",
        body: [
          "At Network Toll, we are committed to building intelligent traffic management solutions that make roads safer, faster, and more efficient. Our flagship innovation, the NT Prime – Traffic Monitoring Radar, is designed to enable next-generation radar sensing systems that redefine the way traffic is monitored and managed.",
          "The NT Prime offers a breakthrough combination of high resolution, extended range, superior point density, compact size, and software flexibility. This makes it a powerful solution for monitoring high-speed highways, busy city intersections, and toll plazas with unmatched precision.",
        ],
      },
    ],
    specTables: [
      {
        title: "NT-Prime Performance",
        headers: ["Parameter", "Default Modes", "250m", "400m", "800m"],
        rows: [
          [
            "Field of View (H × V)",
            "Long range: 120° × 24°; Wide field: 120° × 50°",
            "—",
            "—",
            "—",
          ],
          [
            "Angular Resolution, Static (H × V)",
            "Long range: 0.35° × 0.4°; Wide field: 0.35° × 0.9°",
            "—",
            "—",
            "—",
          ],
          ["Angular Accuracy (H × V)", "0.1°", "—", "—", "—"],
          ["Maximum Range", "—", "250 m", "400 m", "800 m"],
          ["Minimum Range", "—", "0.3 m", "0.5 m", "1 m"],
          ["Range Resolution", "—", "0.26 m", "0.4 m", "0.8 m"],
          ["Vehicle Detection", "—", "250 m", "400 m", "800 m"],
          ["Pedestrian Detection", "—", ">200 m", ">200 m", ">200 m"],
          ["Doppler Ambiguity", "72 m/s", "—", "—", "—"],
          ["Doppler Resolution", "0.14 m/s", "—", "—", "—"],
          ["Doppler Accuracy", "0.05 m/s", "—", "—", "—"],
          ["Frame Rate", "10 Hz", "—", "—", "—"],
        ],
        notes: [
          "Additional custom and tuned modes are available upon request based on customer requirements.",
          "The 800m mode is only available on the Long range variant.",
        ],
      },
      {
        title: "Specifications",
        headers: ["Parameter", "Automotive Configuration", "Infrastructure Configuration"],
        rows: [
          ["Frequency", "76-77 or 76-81 GHz", "60-64 GHz"],
          ["Interface", "1000BASE-T1", "1000BASE-T"],
          ["Connections", "6-pin automotive", "Waterproof RJ45"],
          ["Power Supply", "+9-24V DC", "802.3bt Type 3 (PoE++)"],
          [
            "Power Consumption",
            "22W avg, 34W peak based on transmit duty cycle",
            "22W avg, 34W peak based on transmit duty cycle",
          ],
          ["Synchronization", "IEEE 1588 PTP, gPTP", "IEEE 1588 PTP, gPTP"],
          ["Operating Temperature", "-40° to 85°C", "-40° to 85°C"],
          ["Ingress Protection", "IP68 2-meter", "IP68 2-meter"],
          ["Dimensions", "140 x 103 x 30 mm", "140 x 103 x 30 mm"],
          ["Weight", "490 g", "490 g"],
          [
            "Material",
            "Polycarbonate black, 6061 aluminum black anodized",
            "Polycarbonate black, 6061 aluminum black anodized",
          ],
        ],
      },
    ],
    seo: {
      title: "NT-Prime Traffic Monitoring Radar",
      description:
        "NT-Prime traffic monitoring radar with 0.35° static angular resolution, 800m vehicle detection, object tracking and classification output, IP68 rated.",
    },
    source: "https://networktoll.com/traffic-monitoring-radar/",
  },
  // ---------------------------------------------------------------- tags
  {
    slug: "rfid-tag",
    name: "RFID Tag",
    category: "tags",
    group: "tag",
    desc: "A full range of UHF RFID tags and labels — anti-metal, asset, laundry, cylinder, pallet, tyre, PCB and fully customised inlays.",
    bullets: ["EPC Class 1 Gen 2 / ISO 18000-6C", "Read ranges from 10cm to 12m", "IP67 / IP68 options"],
    image: {
      src: `${IMG}/rfid-tag.png`,
      remote: `${WP}/2025/08/3-931x1024.png`,
      alt: "RFID anti metal tag, model NTS-RT 15",
      width: 931,
      height: 1024,
    },
    heading: "Network Toll — Leading RFID/UHF Tags Suppliers",
    intro: [
      "Looking for reliable, high-quality RFID tags in India? At Network Toll Solutions, we specialize in providing advanced UHF RFID tags, RFID labels, and RFID jewellery tags designed to help businesses track, secure, and manage their assets with ease and accuracy.",
      "Whether you're running a retail store, managing warehouse inventory, or handling high-value items like gold and diamonds, our RFID tags offer the perfect mix of performance and reliability. We supply durable, long-range UHF RFID tags for logistics and access control, easy-to-apply RFID labels for packaging and product tracking, and tamper-evident RFID jewellery tags trusted by showrooms and exporters across India.",
      "As a leading RFID tag supplier, we don't just sell products — we deliver solutions that simplify your workflow, reduce manual errors, and give you real-time visibility into your operations. Our goal is to help you save time, cut costs, and operate smarter in today's fast-moving digital world.",
    ],
    models: [
      {
        name: "RFID Anti Metal Tag (Model: NTS-RT 15)",
        body: [
          "NTS-RT 15 is a RFID Anti Metal Tag that is used for application on machinery items and metal items that are made of iron, steel, copper, brass etc. It works on global UHF Frequency (865-868 MHz & 902-928 MHz) and is fully compliant with EPC Class 1 Gen 2 standards. The tag has an inbuilt NXP G2 Chip designed and encapsulated in such a format that the tag provides a read range of up to 0-12 mt.",
          "The tag can either be pasted (comes with attached 3M gum sheet) or can be attached using screw.",
          "The tag can resist high temperature and is free from any damage caused due to water, chemicals etc.",
        ],
        image: {
          src: `${IMG}/rfid-tag.png`,
          remote: `${WP}/2025/08/3-931x1024.png`,
          alt: "RFID anti metal tag, model NTS-RT 15",
          width: 931,
          height: 1024,
        },
        brochure: {
          label: "Anti metal tag NTS-RT 15",
          href: `${PDF}/anti-metal-tag-nts-rt-15.pdf`,
          remote: `${WP}/2025/08/Anti-Metal-Tag-NTS-RT-15.pdf`,
        },
      },
      {
        name: "RFID Asset UHF Reusable Tags (Model: NTS-RT 40)",
        specs: [
          { value: "Reusable. Can be read and write for 100000 transactions." },
          { value: "Printing: Optional. Barcode, Tag ID, Unique Numbers, Text, Logo etc." },
          {
            value:
              "High and stable performance for a wide range of applications like warehouse material tracking, garments, etc.",
          },
          { value: "Unique TID and pre-serialized EPC number which is worldwide unique." },
          { value: "Stick strong: we use strong adhesive glue ensures that the tags are durable." },
          { value: "ISO 9001:2008 Quality Management System" },
        ],
        image: {
          src: `${IMG}/rfid-tag-nts-rt-40.png`,
          remote: `${WP}/2025/08/2-931x1024.png`,
          alt: "RFID asset UHF reusable tag, model NTS-RT 40",
          width: 931,
          height: 1024,
        },
        brochure: {
          label: "Reusable tag NTS-RT 40",
          href: `${PDF}/nts-rt-40-reusable-tag.pdf`,
          remote: `${WP}/2025/08/NTS-RT-40-Reusabel-Tag.pdf`,
        },
      },
      {
        name: "RFID Label (Alien 9640)",
        body: [
          "Powered by Alien's break-through Higgs 3 UHF RFID IC and innovative Squiggle antenna design, the ALN-9640 delivers industry leading EPC Gen 2 performance and reliability at competitive prices. ALN-9640 inlays are World Tag compliant, enabling consistent operation across the diverse frequencies of the Americas, Europe, Middle East, Asia, and Africa. With its Higgs-3 core, the Squiggle delivers unprecedented performance and a rich feature set including a 32-bit TID, a 64-bit Unique TID for authentication and serialization applications, an extensible EPC memory bank, 512-bits of user memory for distributed data applications, and password protected read and write support capabilities to prevent unauthorized viewing and modification of the tag's data. Typical applications for the Squiggle include, but are not limited to, corrugate cases, pallet placards, apparel hang tags, baggage tags, shipping labels, asset management, and file folder labels.",
        ],
        image: {
          src: `${IMG}/rfid-tag-alien-9640.png`,
          remote: `${WP}/2025/08/1-931x1024.png`,
          alt: "Alien 9640 RFID label inlay",
          width: 931,
          height: 1024,
        },
        brochure: {
          label: "Alien 9640 RFID label",
          href: `${PDF}/alien-9640-rfid.pdf`,
          remote: `${WP}/2025/08/Alien-9640-RFID.pdf`,
        },
      },
      {
        name: "Outdoor Tag for Waste Bin Tracking and Smart City Applications (Model: NTS-RT 62)",
        image: {
          src: `${IMG}/rfid-tag-nts-rt-62.png`,
          remote: `${WP}/2025/08/waste-Bin-1-931x1024.png`,
          alt: "Outdoor RFID waste bin tag, model NTS-RT 62",
          width: 931,
          height: 1024,
        },
        specs: [
          { label: "Model Number", value: "NTS-RT 62" },
          {
            label: "Application",
            value: "Outdoor tag for application on wall / waste bin for smart city projects",
          },
          { label: "Material encasement", value: "PC / ABS high Impact" },
          { label: "Tag Type / Chip Type", value: "UHF (Ultra High Frequency)" },
          { label: "Frequency", value: "865 MHz – 868 MHz (ETSI) and 902-928 MHz" },
          { label: "Protocol Standard", value: "EPC Class 1 Gen 2; ISO 18000-6C protocol compliant" },
          { label: "Operation Mode", value: "Fixed or FHSS programmable by software" },
          { label: "Memory of IC", value: "32 bits TID, 96 bits EPC number, 512 bits user memory" },
          { label: "Read Range", value: ">12 mt (Reader and Environment dependant)" },
          { label: "Write Range", value: ">6 mt" },
          { label: "Dimensions", value: "12 cm x 2 cm x 0.4 cm" },
        ],
      },
      {
        name: "RFID Silicon Laundry Tag (Model: NWS-RT 07 B)",
        specs: [
          { label: "Project", value: "Laundry Tracking & Identification." },
          { label: "Frequency", value: "UHF | Material: Silicon | Colour: White" },
          { label: "Size", value: "55 x 11 x 2.5 mm | Read Range: 6 MT" },
          { label: "Wash Cycle", value: "180" },
          { value: "Suitable for washing, dying & ironing of linen, garments" },
          { label: "Chip", value: "Alien Higgs 3" },
          {
            value:
              "Withstands high temperatures and washing cycles, perfect for laundry applications",
          },
        ],
        image: {
          src: `${IMG}/rfid-tag-silicon-laundry.jpg`,
          remote: `${WP}/2025/05/RFID-Silicon-Laundry-Tag.jpg`,
          alt: "RFID silicon laundry tag, model NWS-RT 07 B",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID Fabric Laundry Tag (Model: NWS-RT 07 C)",
        specs: [
          { label: "Project", value: "Laundry, Garment Tracking." },
          { label: "Frequency", value: "865-867 MHz | Material: Flexible textile cloth | Colour: White" },
          { label: "Size", value: "70 x 15 x 14.4 mm | Read Range: 2-3 MT" },
          { label: "Wash Cycles", value: "220" },
          { value: "Suitable for Hotels, Hospitals, commercial laundry applications." },
          { label: "Chip", value: "Philips UCODE 7" },
          { value: "Flexible and comfortable for garment tracking" },
        ],
        image: {
          src: `${IMG}/rfid-tag-fabric-laundry.png`,
          remote: `${WP}/2025/05/9.png`,
          alt: "RFID fabric laundry tag, model NWS-RT 07 C",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID Garment Hang Tag (Model: NWS-RT 07 D)",
        specs: [
          { label: "Project", value: "Apparel management in retail & production" },
          { label: "Frequency", value: "UHF | Material: PET/Paper" },
          {
            label: "Colour",
            value: "Customize printing as required — barcode, text, logo, size, model etc.",
          },
          { label: "Size", value: "Customize | Read Range: 6-7 MT" },
          { value: "Suitable for manufacturer, retailer, e-commerce" },
          { value: "Customisable with branding and information display printing options" },
        ],
        image: {
          src: `${IMG}/rfid-tag-garment-hang.png`,
          remote: `${WP}/2025/05/8-1.png`,
          alt: "RFID garment hang tag, model NWS-RT 07 D",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID Cylinder Tag",
        specs: [
          {
            label: "Project",
            value:
              "Gas cylinder tracking for manufacturers & distributors, oil tankers and storage vessels.",
          },
          { label: "Frequency", value: "UHF | Chip: Impinj Monza | Read Range: Up to 6 MT" },
          { label: "Attachment", value: "Very strong 3M adhesive provided at back side." },
          { label: "Dimension", value: "6.2 x 3.2 x 0.8 cm | Material: ABS | Protection: IP 68" },
          { value: "Specifically designed for tracking material which has a cylindrical shape" },
        ],
        image: {
          src: `${IMG}/rfid-tag-cylinder.png`,
          remote: `${WP}/2025/05/3-1.png`,
          alt: "RFID cylinder tag",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID Key fob Tag (Model: NWS-RT 14)",
        specs: [
          {
            label: "Project",
            value: "Access control for lockers in gyms, hotel locks, club houses, banks, schools / colleges etc.",
          },
          { label: "Frequency", value: "HF 13.56 (Mifare), LF 125 (TK 4100)" },
          { label: "Read Range", value: "10 cm | IP 67 protection" },
          { value: "Read & write up to 1 million transactions" },
          { label: "Material", value: "High quality PVC ABS" },
          { label: "Colour", value: "Various colours & customize printing option" },
          { value: "Water proof and dust proof." },
        ],
        image: {
          src: `${IMG}/rfid-tag-key-fob.jpg`,
          remote: `${WP}/2025/05/RFID-Key-fob-Tag.jpg`,
          alt: "RFID key fob tag, model NWS-RT 14",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID + EAS Tag (Model: NWS-RT 19)",
        specs: [
          {
            value:
              "Cloth security, anti theft, apparel / garment tracking & security, inventory management.",
          },
          {
            label: "Frequency",
            value: "EAS + UHF RFID 865-867 MHz + 8.2 MHz / 58 KHz | Read Range: 8 – 9 MT",
          },
          { label: "Material", value: "ABS | IP 54 | Weight: 12.5 gram" },
          {
            label: "Chip",
            value: "Impinj Monza R6P | Memory: 128 bit, User Memory 32 bit | IP54 protected",
          },
          { value: "Re-write up to 100000 times. 10 years warranty." },
        ],
        image: {
          src: `${IMG}/rfid-tag-eas.png`,
          remote: `${WP}/2025/05/11.png`,
          alt: "RFID plus EAS tag, model NWS-RT 19",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID Cable Tie Tag (Model: NWS-RT 03)",
        specs: [
          {
            label: "Project",
            value:
              "Asset tracking, inventory tracking, protecting pilferage of items stored in sacks, door lock for transportation vehicles etc.",
          },
          { label: "Frequency", value: "UHF | Chip: Alien Higgs 3 / Monza" },
          { label: "Read Range", value: "Up to 8 MT | Material: PVC" },
          { value: "Anti collision with excellent accuracy" },
          { value: "Tail size and base can be customized along with colors and printing options." },
        ],
        image: {
          src: `${IMG}/rfid-tag-cable-tie.jpg`,
          remote: `${WP}/2025/05/RFID-Cable-Tie-Tag.jpg`,
          alt: "RFID cable tie tag, model NWS-RT 03",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID Pallet Tag (Model: NWS-RT 51)",
        specs: [
          {
            label: "Project",
            value: "Pallet tracking, asset management, warehouse movement tracking etc.",
          },
          { label: "Frequency", value: "UHF | Chip: Alien Higgs 3 / Higgs 4 / Monza" },
          { label: "Read Range", value: "Up to 10 – 12 MT" },
          { label: "Attachment", value: "Rivet / adhesive at back | IP 67 protection" },
          { label: "Dimension", value: "12 x 15 x 3 mm | Anti collision" },
          {
            label: "Material",
            value:
              "High quality ABS double coated and laminated for long life, or soft PVC (choose)",
          },
          {
            value:
              "Water proof, dust proof, chemical resistant. Designed for rough & harsh environments.",
          },
          { value: "96 bit TID, 512 bit user memory." },
        ],
        image: {
          src: `${IMG}/rfid-tag-pallet.png`,
          remote: `${WP}/2025/05/5-1.png`,
          alt: "RFID pallet tag, model NWS-RT 51",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID Tyre Tag (Model: NWS-RT 51)",
        specs: [
          {
            label: "Project",
            value:
              "Tyre identification & tracking for transportation & cab companies. Best suited to cars, buses, heavy trucks etc.",
          },
          { label: "Frequency", value: "UHF (865 – 867 MHz)" },
          { label: "Protocol", value: "ISO / IEC 18000 6C Class 1 Gen 2" },
          { label: "Read Range", value: "3-4 MT | IP 68, tamper proof design" },
          { label: "Chip", value: "Alien Higgs 3 / Monza | Dimension: 130 x 85 x 3.5 mm" },
          { label: "Material", value: "Tyre rubber | Memory: 512 bits | Colour: Black" },
          { label: "Temp. Resistance", value: "-40 to +85 °C | Attachment: high quality adhesive" },
        ],
        image: {
          src: `${IMG}/rfid-tag-tyre.jpg`,
          remote: `${WP}/2025/05/RFID-Tyre-Tag-1.jpg`,
          alt: "RFID tyre tag, model NWS-RT 51",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID PCB Tag (Model: NWS-RT 52)",
        specs: [
          {
            label: "Project",
            value:
              "Warehouse logistics management, asset / inventory management, industrial component material tracking etc.",
          },
          {
            value: "Primarily for application on metal items and high temp. up to 280 °C.",
          },
          { label: "Frequency", value: "UHF (865 – 867 MHz)" },
          { label: "Protocol", value: "ISO / IEC 18000 6C Class 1 Gen 2" },
          { label: "Read Range", value: "Up to 3 MT (depends on tag size and reader)" },
          { value: "IP 68, tamper proof design" },
          { label: "Chip", value: "Alien Higgs 3 / Monza | Dimension: 130 x 85 x 3.5 mm" },
          { label: "Material", value: "PCB / FR4 | Colour: Black | Attachment: 3M adhesive / rivet" },
        ],
        image: {
          src: `${IMG}/rfid-tag-pcb.png`,
          remote: `${WP}/2025/05/6-2.png`,
          alt: "RFID PCB tag, model NWS-RT 52",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID Inlay / Label & Fully Customized",
        specs: [
          {
            label: "Project",
            value:
              "General purpose asset tracking — furniture, packing boxes, plastic items, finished goods (non metal), item identification.",
          },
          { label: "Frequency", value: "UHF, HF, NFC" },
          {
            label: "Chip",
            value: "Alien Higgs 3 & 4, Impinj Monza, Smartrac, Philips NXP, Mifare, NTAG, Fudan",
          },
          { label: "Material", value: "Paper, coated paper, PET | Memory size depends on chip" },
          { label: "Size & Printing", value: "As per requirement" },
          { label: "Adhesive", value: "3M, normal adhesive etc." },
          { value: "10 years data retention warranty. Read & write. Anti collision." },
          { value: "Reusable (with hole for hanging) or one time use (with adhesive)" },
          { label: "Temp", value: "-5 to +60 °C" },
        ],
        image: {
          src: `${IMG}/rfid-tag-custom-inlay.jpg`,
          remote: `${WP}/2025/05/Fully-Customized.jpg`,
          alt: "Fully customized RFID inlay and label",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID Mount on Metal Tag (Model: NWS-RT 135)",
        specs: [
          { label: "Chip", value: "Alien Higgs 3" },
          { label: "Frequency", value: "UHF ISO 18000 6C EPC Gen2" },
          { label: "Range", value: "8-10 metres | Size: 135 x 22 x 5 mm" },
          { label: "Material", value: "High quality ABS | IP 67" },
          { label: "Apply", value: "Adhesive / screw fix" },
          { label: "Operating Temp", value: "-25 to +80 °C" },
          { value: "Available in two sizes for easy attachment to metal surfaces" },
        ],
        image: {
          src: `${IMG}/rfid-tag-mount-on-metal.png`,
          remote: `${WP}/2025/05/7-2.png`,
          alt: "RFID mount on metal tag, model NWS-RT 135",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID Mount on Metal Tag — compact (Model: NWS-RT 135)",
        specs: [
          { label: "Chip", value: "Alien Higgs 3" },
          { label: "Frequency", value: "UHF ISO 18000 6C EPC Gen2" },
          { label: "Read Range", value: "6-7 metres" },
          { label: "Material", value: "High quality ABS | IP 67" },
          { label: "Apply", value: "Adhesive / rivet" },
        ],
        image: {
          src: `${IMG}/rfid-tag-mount-on-metal-compact.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T165823.332.png`,
          alt: "Compact RFID mount on metal tag",
          width: 1024,
          height: 1024,
        },
      },
    ],
    sections: [
      {
        title: "Benefits of Choosing Network Toll Solutions",
        list: [
          "Extensive product range — we offer diverse RFID tags to suit various applications.",
          "High quality and durability — our tags are built to last, ensuring reliable performance in harsh environments.",
          "Customisation options — we provide custom solutions to meet your specific needs.",
          "Expert support — our knowledgeable team is always available to assist you in choosing the right RFID solution for your application.",
        ],
      },
    ],
    outro: [
      "Contact Network Toll Solutions today to discuss your RFID requirements and discover how we can help you streamline your operations, enhance security and improve efficiency.",
    ],
    faqs: [
      {
        q: "What is an RFID Tag and how is it used in toll operations?",
        a: "An RFID Tag is a small electronic device that uses radio frequency signals for wireless identification of vehicles at toll plazas. It stores unique identification data and is typically affixed to the windshield or license plate of a vehicle to enable automated toll collection.",
      },
      {
        q: "What are the benefits of using Network Toll's RFID Tags?",
        a: "Network Toll's RFID Tags provide fast, contactless toll payments, reduce congestion at toll lanes, and ensure seamless integration with national FASTag standards. They are durable, tamper-resistant, and compatible with toll management and traffic monitoring systems.",
      },
      {
        q: "Are Network Toll's RFID Tags compliant with government regulations and FASTag standards?",
        a: "Yes, all RFID Tags provided by Network Toll adhere to the National Electronic Toll Collection (NETC) FASTag guidelines, ensuring smooth interoperability across all toll plazas and compliance with regulatory standards.",
      },
    ],
    seo: {
      title: "RFID Tags & Labels",
      description:
        "UHF RFID tags and labels from Network Toll Solutions — anti-metal, asset, laundry, garment, cylinder, pallet, tyre, PCB and fully customised inlays.",
    },
    source: "https://networktoll.com/rfid-tags-supplier/",
  },
  {
    slug: "library-tag",
    name: "Library Tag",
    category: "tags",
    group: "tag",
    desc: "ISO 15693 HF tag for books, files and journals — fast check-in/check-out, stock audits and anti-theft in one label.",
    bullets: ["13.56 MHz, ISO 15693", "Up to 1m read range", "15 year data retention warranty"],
    image: {
      src: `${IMG}/library-tag.jpg`,
      remote: `${WP}/2025/05/Library-Tags.jpg`,
      alt: "RFID library tag, model NWS-RT 01",
      width: 1024,
      height: 1024,
    },
    heading: "Library Tags — Model: NWS-RT 01",
    models: [
      {
        name: "Library Tag (Model: NWS-RT 01)",
        specs: [
          { label: "Project", value: "Library Automation" },
          { label: "Frequency", value: "(HF) 13.56 MHz | Size: 80 x 50 mm" },
          { label: "Chip", value: "Philips NXP ICODE SLIX | ISO 15693 compliant" },
          { label: "Read Range", value: "Up to 1 meter." },
          { label: "Memory", value: "1024 bits | 32 bit password protection" },
          { value: "15 years data retention warranty." },
          { label: "Apply", value: "On books, files, journals, documents" },
        ],
        image: {
          src: `${IMG}/library-tag.jpg`,
          remote: `${WP}/2025/05/Library-Tags.jpg`,
          alt: "RFID library tag, model NWS-RT 01",
          width: 1024,
          height: 1024,
        },
      },
    ],
    brochures: [
      {
        label: "Library tag automation",
        href: `${PDF}/library-tag-automation.pdf`,
        remote: `${WP}/2025/08/Library-tag-automation-1.pdf`,
      },
    ],
    faqs: [
      {
        q: "What are Library Tags and how are they used?",
        a: "Library Tags are RFID-based labels or cards used to track and manage books and other resources within institutional libraries. These tags allow for quick identification, easy check-in/check-out, and real-time inventory tracking.",
      },
      {
        q: "What are the benefits of using RFID Library Tags in academic institutions?",
        a: "RFID Library Tags streamline the entire library process by enabling faster scanning, reducing manual errors, minimizing book losses, and improving inventory audits. They also support self-service kiosks and automated return systems.",
      },
      {
        q: "Can Network Toll's Library Tags be integrated with existing library management software?",
        a: "Yes, Network Toll's RFID Library Tags are fully compatible with most Library Management Systems (LMS). They can be easily integrated to enhance cataloging, circulation, and asset tracking functions with minimal system changes.",
      },
    ],
    seo: {
      title: "RFID Library Tags",
      description:
        "ISO 15693 RFID library tags (NWS-RT 01) with NXP ICODE SLIX chip, 1m read range and 15-year data retention for book, file and journal tracking.",
    },
    source: "https://networktoll.com/library-tags/",
  },
  {
    slug: "windshield-tag",
    name: "Windshield Tag",
    category: "tags",
    group: "tag",
    desc: "Tamper-proof PET windshield tag reading at up to 15 metres for gate automation, parking and vehicle in-out tracking.",
    bullets: ["15m read range", "865–867 MHz, ISO 18000-6C", "Tamper proof, 3M adhesive"],
    image: {
      src: `${IMG}/windshield-tag.jpg`,
      remote: `${WP}/2025/05/Windshield-Tag-1.jpg`,
      alt: "RFID windshield tag, model NWS-RT 01",
      width: 1024,
      height: 1024,
    },
    heading: "Windshield Tag (Model: NWS-RT 01)",
    models: [
      {
        name: "Windshield Tag (Model: NWS-RT 01)",
        specs: [
          {
            label: "Project",
            value: "Gate Automation, Vehicle In – Out Movement Tracking, Parking Management",
          },
          { label: "Frequency", value: "865 – 867 MHz, ISO/IEC 18000 6C" },
          { label: "Size", value: "100 x 25 mm. Round sleek corners. PET" },
          { label: "Chip", value: "Alien Higgs 3, Monza" },
          { value: "Compatible with all UHF readers across the globe" },
          { label: "Read Range", value: "15 metres. Excellent performance." },
          { value: "Tamper proof design with strong 3M adhesive" },
          { value: "Water proof, dust proof. PET material. Glossy look" },
          { label: "Printing", value: "Customized front side / back side printing" },
        ],
        image: {
          src: `${IMG}/windshield-tag.jpg`,
          remote: `${WP}/2025/05/Windshield-Tag-1.jpg`,
          alt: "RFID windshield tag, model NWS-RT 01",
          width: 1024,
          height: 1024,
        },
      },
    ],
    faqs: [
      {
        q: "What is a Windshield Tag and how is it used in toll operations?",
        a: "A Windshield Tag is a tamper-proof RFID tag that is affixed to the inside of a vehicle's windshield. It is scanned by RFID readers at toll plazas for automatic vehicle identification and seamless toll deduction under the FASTag program.",
      },
      {
        q: "What are the key benefits of using Network Toll's Windshield Tags?",
        a: "Network Toll's Windshield Tags offer secure, non-transferable identification, quick tag reading even at high speeds, and high durability under sunlight and varying weather conditions. They ensure fast and contactless toll transactions.",
      },
      {
        q: "Are Windshield Tags compliant with national FASTag standards?",
        a: "Yes, Network Toll's Windshield Tags are fully compliant with the National Electronic Toll Collection (NETC) FASTag specifications mandated by NHAI and NPCI, ensuring compatibility across all toll plazas in India.",
      },
    ],
    seo: {
      title: "RFID Windshield Tag",
      description:
        "Tamper-proof UHF RFID windshield tag (NWS-RT 01) with 15m read range, Alien Higgs 3 or Monza chip and customised printing for tolling and parking.",
    },
    source: "https://networktoll.com/windshield-tag/",
  },
  {
    slug: "solar-panel-tag",
    name: "Solar Panel Tag",
    category: "tags",
    group: "tag",
    desc: "MNRE-compliant tag for solar PV module tracking, built to survive extreme heat, rain, wind and dust for the life of the panel.",
    bullets: ["6–7m read range", "Designed to MNRE guidelines", "Tamper proof, 3M glue"],
    image: {
      src: `${IMG}/solar-panel-tag.jpg`,
      remote: `${WP}/2025/05/Solar-Panel-Tag.jpg`,
      alt: "RFID solar panel tag, model NWS-RT 01",
      width: 1024,
      height: 1024,
    },
    heading: "RFID Solar Panel Tags",
    models: [
      {
        name: "Solar Panel Tag (Model: NWS-RT 01)",
        specs: [
          { label: "Project", value: "Solar PV Module Tracking" },
          { label: "Frequency", value: "865 – 867 MHz ISO/IEC 18000 6C" },
          { label: "Chip", value: "Alien Higgs 3" },
          { label: "Read Range", value: "6-7 metres (reader dependent)" },
          { value: "Tamper proof design with strong 3M glue" },
          { label: "Material", value: "Coated paper | PET" },
          {
            value:
              "Rugged design to withstand extreme high & low temperature, rain, wind, dust etc.",
          },
          { label: "Printing", value: "Customized design as per requirement" },
          { value: "Fully designed as per guidelines of MNRE." },
        ],
        image: {
          src: `${IMG}/solar-panel-tag.jpg`,
          remote: `${WP}/2025/05/Solar-Panel-Tag.jpg`,
          alt: "RFID solar panel tag, model NWS-RT 01",
          width: 1024,
          height: 1024,
        },
      },
    ],
    sections: [
      {
        title: "RFID Solar Panel Tags — Smart Tracking for Long-Term Solar Performance",
        body: [
          "At Network Toll Solutions, we bring you high-quality, durable RFID Solar Panel Tags designed specifically for the solar energy industry. Built using premium coated paper or PET material and equipped with strong 3M adhesive backing, these tags ensure secure and long-lasting attachment to solar panels — even in tough outdoor conditions.",
          "Whether you're tracking panels across a rooftop installation or managing a large-scale solar farm, our RFID tags make identification and data management seamless. These smart tags help you monitor assets, manage warranties, and maintain accurate inventory records with ease and accuracy.",
          "Designed for efficiency and built for endurance, our solar panel RFID tags offer reliable scanning, quick integration, and real-time visibility — making them a smart choice for solar companies looking to streamline operations and embrace future-ready technology.",
        ],
      },
    ],
    faqs: [
      {
        q: "What is a Solar Panel Tag and how is it used?",
        a: "A Solar Panel Tag is an RFID-based identification tag specifically designed for solar panel transportation or inventory tracking. It helps toll systems and monitoring authorities identify and classify vehicles carrying solar equipment for compliance and concession tracking.",
      },
      {
        q: "What are the benefits of using Solar Panel Tags in transport vehicles?",
        a: "These tags enable faster processing at toll plazas by pre-classifying solar cargo vehicles, ensuring correct toll charges and facilitating government exemptions or benefits where applicable. They also improve transparency and reduce manual verification.",
      },
      {
        q: "Are Solar Panel Tags compatible with the Toll Management System (TMS)?",
        a: "Yes, Network Toll's Solar Panel Tags are integrated with the Toll Management System (TMS) and RFID infrastructure, allowing for automatic identification, data logging, and reporting across the toll network.",
      },
    ],
    seo: {
      title: "RFID Solar Panel Tags",
      description:
        "Durable UHF RFID solar panel tags designed to MNRE guidelines — 6-7m read range, Alien Higgs 3 chip, tamper proof 3M adhesive, built for outdoor solar farms.",
    },
    source: "https://networktoll.com/rfid-solar-panel-tags/",
  },
  {
    slug: "rfid-card",
    name: "RFID Card",
    category: "tags",
    group: "card-wristband",
    desc: "Mifare, UHF, LF proximity, dual-frequency and magnetic cards in ultra high quality PVC with fully customised printing.",
    bullets: ["125 KHz / 13.56 MHz / 865–867 MHz", "IP68, 85.5 x 54 mm standard", "10 year data retention warranty"],
    image: {
      src: `${IMG}/rfid-card.jpg`,
      remote: `${WP}/2025/05/Proximity-Card.jpg`,
      alt: "RFID proximity card",
      width: 1024,
      height: 1024,
    },
    heading: "RFID Card",
    models: [
      {
        name: "Mifare Card (Model: NWS-RC 01)",
        specs: [{ label: "Frequency", value: "13.56 MHz" }],
      },
      {
        name: "UHF Card (Model: NWS-RC 02)",
        specs: [{ label: "Frequency", value: "865–867 MHz" }],
      },
      {
        name: "LF / Proximity Card (Model: NWS-RC 03)",
        specs: [{ label: "Frequency", value: "125 KHz" }],
        image: {
          src: `${IMG}/rfid-card.jpg`,
          remote: `${WP}/2025/05/Proximity-Card.jpg`,
          alt: "LF proximity RFID card, model NWS-RC 03",
          width: 1024,
          height: 1024,
        },
        brochure: {
          label: "RFID proximity card",
          href: `${PDF}/rfid-proximity-card.pdf`,
          remote: `${WP}/2025/08/RFID-Proximity-Card.pdf`,
        },
      },
      {
        name: "Blank Card (Model: NWS-RC 04)",
        specs: [{ value: "Paste any chip | Print" }],
      },
      {
        name: "Dual Frequency Card (Model: NWS-RC 05)",
        specs: [{ label: "Frequency", value: "Mix of 2 frequencies" }],
      },
      {
        name: "Magnetic / Loyalty Card (Model: NWS-RC 06)",
        specs: [{ value: "Hotel key card" }],
      },
    ],
    sections: [
      {
        title: "Chip Options",
        list: [
          "Mifare: Mifare 1K Classic S50, Mifare 4K S70, Mifare Ultralight, ICODE SLI",
          "UHF: Alien Higgs 3, Impinj Monza",
          "LF / Proximity: TK4100, EM4102, EM4305, T5577, HID Chips.",
          "Dual Frequency: UHF + HF | UHF + LF | LF + HF",
          "Magnetic Strip Card: HICO & LOCO",
          "Material: Ultra high quality PVC. Water proof, dust proof. IP 68",
          "Size: Standard 85.5 x 54 mm | Thickness: 0.85 mm (±0.02)",
          "Glossy / matt finish as required",
        ],
      },
      {
        title: "Printing Options",
        list: [
          "One side / double side thermal printing.",
          "Unique ID / barcode / QR code / logo, photo / content",
          "Hologram embossing",
          "Silkscreen print gold/silver",
          "Pre-printed cards for further printing",
          "Fully customized printing as required",
          "Double side filming lamination for scratch proof finish.",
          "Clean die cut edges & round corners give excellent mirror like look and feel",
          "10 years data retention warranty.",
        ],
      },
    ],
    faqs: [
      {
        q: "What types of cards are used in Network Toll's system?",
        a: "Network Toll supports various types of smart cards, including prepaid toll cards, staff ID cards, and service vehicle access cards. These cards are embedded with RFID chips and are used for identification, access control, and transaction processing at toll plazas.",
      },
      {
        q: "How do toll cards work in the toll management system?",
        a: "Toll cards are scanned using RFID or smart card readers at toll booths. Once read, the system authenticates the card and deducts the toll fare or grants access based on the card type, ensuring a cashless and efficient tolling process.",
      },
      {
        q: "Can smart cards be recharged or monitored in real time?",
        a: "Yes, Network Toll's smart card system allows for easy recharge, balance tracking, and usage monitoring through integrated back-office systems or web portals. Real-time synchronization ensures accurate and secure toll transactions.",
      },
    ],
    seo: {
      title: "RFID Card",
      description:
        "Mifare, UHF, LF proximity, dual-frequency and magnetic RFID cards in IP68 PVC with hologram, silkscreen and full-colour printing options.",
    },
    source: "https://networktoll.com/card/",
  },
  {
    slug: "wristband",
    name: "Wristband",
    category: "tags",
    group: "card-wristband",
    desc: "Paper, silicon, fabric and disposable RFID wristbands for crowd management, cashless payment and patient tracking.",
    bullets: ["UHF, HF and LF options", "Touch-and-go to 6m read range", "Single use or issue-and-return"],
    image: {
      src: `${IMG}/wristband.jpg`,
      remote: `${WP}/2025/05/Paper-Wristband.jpg`,
      alt: "RFID paper wristband, model NWS-RT 09",
      width: 1024,
      height: 1024,
    },
    heading: "RFID Wristband",
    models: [
      {
        name: "Paper Wristband (Model: NWS-RT 09)",
        specs: [
          {
            label: "Project",
            value:
              "Crowd management in hospitals, events, conferences, amusement parks and festivals",
          },
          { label: "Frequency", value: "865–867 MHz UHF | Material: Coated paper | PET" },
          { label: "Size", value: "Customization available | Chip: Alien Higgs 3" },
          { label: "Read Range", value: "Up to 6 metres" },
          { label: "Printing", value: "Various colours available with customized print option." },
          { value: "One time use only" },
        ],
        image: {
          src: `${IMG}/wristband.jpg`,
          remote: `${WP}/2025/05/Paper-Wristband.jpg`,
          alt: "RFID paper wristband, model NWS-RT 09",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "Silicon Wristband (Model: NWS-RT 12)",
        specs: [
          {
            label: "Project",
            value:
              "Amusement park, conference, events, entry-exit, payment management etc. Frequency: LF / HF",
          },
          { label: "Material", value: "Soft silicon, stretchable | Size: Generic for all age groups" },
          { label: "Chip", value: "Mifare / NTAG | Read Range: Touch and go" },
          { label: "Printing", value: "Various colours available with customized print option." },
          { value: "Multiple time use. Issue & return" },
        ],
        image: {
          src: `${IMG}/wristband-silicon.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T170022.992.png`,
          alt: "RFID silicon wristband, model NWS-RT 12",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "Fabric Wristband (Model: NWS-RT 10)",
        specs: [
          {
            label: "Project",
            value: "Crowd management in festivals, events, exhibitions, payment management",
          },
          { label: "Frequency", value: "UHF / HF (Alien, Mifare)" },
          {
            label: "Material",
            value:
              "PVC chip part (for printing logo, text, QR etc.) and fabric ribbon band (for printing event name)",
          },
          { label: "Colors", value: "Fully customized colours available as required." },
          { label: "Read Range", value: "2 m UHF, 10 cm Mifare" },
          { value: "Choose one time use or multiple use" },
        ],
        image: {
          src: `${IMG}/wristband-fabric.png`,
          remote: `${WP}/2025/05/Untitled-design-2025-05-27T170033.939.png`,
          alt: "RFID fabric wristband, model NWS-RT 10",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "Disposable Band (Model: NWS-RT 42)",
        specs: [
          { label: "Project", value: "Patient tracking in hospitals" },
          { label: "Frequency", value: "LF / HF / UHF | Material: Soft PVC or paper" },
          {
            label: "Size",
            value: "Adjustable — multiple holes available for various age groups.",
          },
          { label: "Chip", value: "Alien Higgs 3, Mifare" },
          { label: "Read Range", value: "10 cm – 6 MT as per chip type. Reader dependent." },
          { label: "Printing", value: "Various colours available with customized print option." },
          { value: "Tuck button for locking. Multiple time use. Issue & return" },
        ],
        image: {
          src: `${IMG}/wristband-disposable.jpg`,
          remote: `${WP}/2025/05/Disposable-Band.jpg`,
          alt: "RFID disposable band, model NWS-RT 42",
          width: 1024,
          height: 1024,
        },
      },
    ],
    faqs: [
      {
        q: "What is an RFID Wristband and how is it used in toll or access control operations?",
        a: "An RFID Wristband is a wearable band embedded with an RFID chip that can be used for access control, identification, and secure payment processing. In toll or event environments, it allows staff, contractors, or special personnel to be identified and granted access to restricted areas.",
      },
      {
        q: "What are the benefits of using Network Toll's RFID Wristbands?",
        a: "Network Toll's RFID Wristbands provide a secure, contactless solution for personnel identification and access management. They are durable, water-resistant, and ideal for scenarios where hands-free operation is required, such as during vehicle checks or lane operations.",
      },
      {
        q: "Can RFID Wristbands be integrated with toll systems and event management software?",
        a: "Yes, Network Toll's RFID Wristbands are fully compatible with Toll Management Systems (TMS) and access control software, allowing for seamless tracking, entry/exit management, and secure data capture across multiple sites.",
      },
    ],
    seo: {
      title: "RFID Wristband",
      description:
        "Paper, silicon, fabric and disposable RFID wristbands for events, amusement parks, hospitals and cashless payment — UHF, HF and LF options.",
    },
    source: "https://networktoll.com/wristband/",
  },
  {
    slug: "soft-metal-tag",
    name: "Soft Metal Tag",
    category: "tags",
    group: "tag",
    desc: "Flexible on-metal label for IT equipment and assets where a hard tag will not fit, readable at 3–5 metres.",
    bullets: ["3–5m read range on metal", "40×20mm / 50×13mm / custom", "100,000 rewrite cycles"],
    image: {
      src: `${IMG}/soft-metal-tag.jpg`,
      remote: `${WP}/2025/05/Soft-Metal-Labl.jpg`,
      alt: "Soft metal RFID label, model NWS-RT 25",
      width: 1024,
      height: 1024,
    },
    heading: "Soft Metal Label / Tag (Model: NWS-RT 25)",
    models: [
      {
        name: "Soft Metal Label / Tag (Model: NWS-RT 25)",
        specs: [
          {
            label: "Project",
            value: "Asset tracking for IT equipment where hard tags cannot be applied.",
          },
          { label: "Frequency", value: "UHF | Chip: Alien Higgs 3" },
          { label: "Read Range", value: "3-5 MT (depends on size & reader)" },
          { label: "Material", value: "Coated glossy paper with foam sheet" },
          { value: "Re-write up to 100000 times." },
          { label: "Available Size", value: "40 x 20 mm / 50 x 13 mm / customize" },
          { label: "Printing", value: "Customize printing — logo, barcode, QR, serial no." },
        ],
        image: {
          src: `${IMG}/soft-metal-tag.jpg`,
          remote: `${WP}/2025/05/Soft-Metal-Labl.jpg`,
          alt: "Soft metal RFID label, model NWS-RT 25",
          width: 1024,
          height: 1024,
        },
      },
    ],
    faqs: [
      {
        q: "What is a Soft Metal Label/Tag and how is it used in toll operations?",
        a: "A Soft Metal Label/Tag is an RFID tag designed for use on metallic surfaces, such as vehicles or containers, where standard RFID tags may not work effectively. It enables accurate identification and tracking of metallic assets during toll operations or logistics processes.",
      },
      {
        q: "What are the advantages of using Network Toll's Soft Metal Labels/Tags?",
        a: "Network Toll's Soft Metal Labels/Tags are lightweight, flexible, and designed for long-range readability even on metal surfaces. They are weather-resistant, easy to install, and ensure reliable performance in demanding toll and transport environments.",
      },
      {
        q: "Are Soft Metal Labels/Tags compatible with RFID systems and tolling infrastructure?",
        a: "Yes, Network Toll's Soft Metal Labels/Tags are fully compatible with RFID readers, Toll Management Systems (TMS), and national FASTag standards. They integrate seamlessly with existing RFID infrastructure for efficient vehicle identification and tracking.",
      },
    ],
    seo: {
      title: "Soft Metal Label / Tag",
      description:
        "Flexible UHF on-metal RFID label (NWS-RT 25) for IT asset tracking — 3-5m read range, Alien Higgs 3 chip, 100,000 rewrites, custom printing.",
    },
    source: "https://networktoll.com/soft-metal-label-tag/",
  },
  {
    slug: "multi-purpose-tag",
    name: "Multi Purpose Tag",
    category: "tags",
    group: "tag",
    desc: "ISO 18000-6C hang tag for retail, inventory, packets, clothing and jewellery, with a 10-year rated PVC build.",
    bullets: ["3–4m read range", "IP66, -20 to +60°C", "100,000 read/write cycles"],
    image: {
      src: `${IMG}/multi-purpose-tag.jpg`,
      remote: `${WP}/2025/05/Multi-Purpose-Hang-Tag.jpg`,
      alt: "Multi purpose RFID hang tag, model NWS-RT 24",
      width: 1024,
      height: 1024,
    },
    heading: "Multi Purpose Hang Tag (Model: NWS-RT 24)",
    models: [
      {
        name: "Multi Purpose Hang Tag (Model: NWS-RT 24)",
        specs: [
          {
            label: "Project",
            value:
              "Retail product management, inventory management, packets & pouches, clothes, jewellery, issue and return etc.",
          },
          { label: "Protocol", value: "ISO / IEC 18000 6C Class 1 Gen 2" },
          { label: "Read Range", value: "3-4 m. Reader dependent" },
          { label: "Protection", value: "IP 66 | Chip: Alien Higgs 3" },
          { value: "100000 times read & write." },
          { label: "Dimension", value: "30 x 85 x 15 mm | Material: PVC" },
          { label: "Memory", value: "512 bits" },
          { label: "Temp. Resistance", value: "-20 to +60 °C" },
          { label: "Colour", value: "White. Customized printing as required." },
          { label: "Attachment", value: "Use with thread or hook." },
        ],
        image: {
          src: `${IMG}/multi-purpose-tag.jpg`,
          remote: `${WP}/2025/05/Multi-Purpose-Hang-Tag.jpg`,
          alt: "Multi purpose RFID hang tag, model NWS-RT 24",
          width: 1024,
          height: 1024,
        },
      },
    ],
    faqs: [
      {
        q: "What is a Multi Purpose Tag and how is it used in toll and transport operations?",
        a: "A Multi Purpose Tag is an RFID-based tag designed for a variety of applications such as vehicle identification, cargo tracking, access control, and inventory management. It enables seamless identification and data capture across multiple use cases within toll and logistics environments.",
      },
      {
        q: "What are the key benefits of using Network Toll's Multi Purpose Tag?",
        a: "Network Toll's Multi Purpose Tags offer versatility, high read range, durability, and compatibility with a wide range of RFID readers and systems. They are ideal for vehicles, equipment, and goods tracking, reducing the need for multiple tags for different applications.",
      },
      {
        q: "Are Multi Purpose Tags compatible with the Toll Management System (TMS) and FASTag standards?",
        a: "Yes, Multi Purpose Tags from Network Toll are fully compliant with FASTag and NETC standards and integrate seamlessly with the Toll Management System (TMS) for smooth, automated toll collection and data management.",
      },
    ],
    seo: {
      title: "Multi Purpose Hang Tag",
      description:
        "ISO 18000-6C multi purpose RFID hang tag (NWS-RT 24) for retail, inventory and jewellery — 3-4m read range, IP66, 100,000 read/write cycles.",
    },
    source: "https://networktoll.com/multi-purpose-tag/",
  },
  {
    slug: "animal-tag",
    name: "Animal Tag",
    category: "tags",
    group: "tag",
    desc: "Tamper-evident TPU ear tags for livestock — visual, LF (ISO 11784/85) and UHF variants for the lifetime of the animal.",
    bullets: ["Visual, 134.2 KHz LF and UHF", "Up to 8m read range (UHF)", "IP68, -40 to +80°C"],
    image: {
      src: `${IMG}/animal-tag.jpg`,
      remote: `${WP}/2025/06/Visual-Animal-Tag-4.jpg`,
      alt: "Visual animal ear tag, model ETS-RT 05",
      width: 1024,
      height: 1024,
    },
    heading: "Animal Tags",
    models: [
      {
        name: "Visual Animal Tag (Model: ETS-RT 05)",
        body: [
          "ETS-RT 05 Animal ear tags are identification markers attached to the ears of animals, particularly in the livestock industry. These tags are used for various purposes, including individual identification, tracking, and management. Commonly used for cattle, sheep, goats, pigs, and other livestock, ear tags provide a quick and visible means of identifying animals. The tag is made with high quality TPU material which is also UV resistant and is attached to the animal's ears using a tag applicator. Laser engraving is done to mark the unique ID number / QR code / barcode etc and is guaranteed to last for the lifespan of the animal.",
          "The tag is tamper-evident (cannot be removed) and available in 3 different sizes and colours depending on the requirement of the project.",
        ],
        image: {
          src: `${IMG}/animal-tag.jpg`,
          remote: `${WP}/2025/06/Visual-Animal-Tag-4.jpg`,
          alt: "Visual animal ear tag, model ETS-RT 05",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "LF Animal Tag (Model: ETS-RT 05 LF)",
        body: [
          "ETS-RT 05 LF is a specially designed tag made with high quality TPU (Thermoplastic Polyurethane) material used for management of livestock and animal identification. It is fully compliant with international standard ISO 11784/11785. It is highly rugged and suitable for outdoor environment conditions and has a maximum read range of 30cm. This tag provides unparalleled performance on application to ears of the animal. It is widely used in dairy farms, slaughter houses, animal insurance companies, semen collection houses etc. The tag can also be printed and encoded as per the requirement of the project. The tag is attached to the animal ears using an applicator. The tag consists of 2 parts – male and female – and is fully suitable for all breeds of animals including cow, pig, buffalo, sheep, goat etc.",
        ],
        image: {
          src: `${IMG}/animal-tag-lf.jpg`,
          remote: `${WP}/2025/06/Animal-Ear-Tag-LF-3-768x768.jpg`,
          alt: "LF animal ear tag, model ETS-RT 05 LF",
          width: 768,
          height: 768,
        },
        specs: [
          { label: "Features", value: "134.2 KHz | Range up to 80 cm" },
          { value: "Water resistant | Chemical proof | IP68 | Highly durable" },
          { label: "Product Advantage", value: "Easy management and real time livestock identification" },
          { value: "Giving unique ID of the livestock | Stable distance recognition" },
          { value: "Anti-animal bite structure and colour design | Waterproof make" },
          { value: "Small size, light weight | Anti freezing and anti ultraviolet" },
        ],
      },
      {
        name: "UHF Animal Tag (Model: ETS-RT 05 UHF)",
        body: [
          "ETS-RT 05 UHF is a special purpose UHF tag that is designed for application on animal ears especially for the purpose of livestock management. It is applied to the ears of the animals by which they can be identified and tracked using long range readers and handheld terminals. Traditional methods of livestock management are becoming more and more tedious, outdated and inefficient, which creates a great demand for RFID based animal tracking systems. These tags can be used for identifying sick animals, vaccination schedules, location, food management, breeding, blood groups, health history, DOB etc.",
          "These tags are known for their robust performance and high read range even in the harshest environmental conditions. It works on UHF (865-928 MHz) frequency and is fully compliant with ISO 18000 6C standard protocol. The tag's EPC compliance enables excellent performance in applications that demand high anti-collision rates and its IP68 rating ensures that it can withstand harsh environments. These uniquely designed tags fully meet all major requirements in terms of heat, pressure, chemical resistance and durability for the applications related to livestock tracking that includes rough handling in daily usage.",
          "The tag is attached to the animal ears using an applicator. The tag consists of 2 parts – male and female – and is fully suitable for all breeds of animals including cow, buffalo, sheep, goat etc.",
        ],
        image: {
          src: `${IMG}/animal-tag-uhf.png`,
          remote: `${WP}/2025/06/RFID-Integrated-Reader-10.png`,
          alt: "UHF animal ear tag, model ETS-RT 05 UHF",
          width: 1024,
          height: 1024,
        },
        specs: [
          { label: "Features", value: "865 MHz – 928 MHz | EPC Gen2 ISO 18000-6C" },
          { value: "Range up to 8 MT | Water resistant | Chemical proof | IP68 | Highly durable" },
        ],
      },
    ],
    sections: [
      {
        title: "Application Areas",
        list: [
          "Livestock management",
          "Sheep, pig and dog tracking",
          "Intelligent cow management",
          "Semen collection centers",
          "Breeding centers",
          "Slaughter houses and dairies",
          "Insurance companies",
        ],
      },
      {
        title: "Tag Usage",
        list: [
          "Individual identification — in agriculture, tags uniquely identify individual animals within a herd, keeping records of health, breeding history and ownership. Researchers use them to track specific animals in behaviour, ecology and migration studies.",
          "Ownership and traceability — tags are crucial for traceability in the food supply chain, tracking the origin, movement and ownership of livestock.",
          "Health monitoring — tags carry information about vaccinations, medical treatments or specific health conditions, aiding veterinarians and livestock owners.",
          "Population monitoring — used in wildlife research to monitor populations, migration patterns and behaviours for conservation efforts.",
          "Lost and found identification — collar tags with identification information help reunite lost pets with their owners.",
          "Experimental studies — used to identify individual animals in laboratory settings for research purposes.",
          "Data collection — used to collect data on animal behaviour, movements and interactions for ecological and behavioural studies.",
          "Population control — used in programs aimed at controlling populations of feral or invasive species.",
          "Breeding programs — used to keep detailed records tracking parentage, genetic information and performance data.",
        ],
      },
    ],
    specTables: [
      {
        title: "Technical Specification — Visual Tag (ETS-RT 05)",
        headers: ["Specification", "Variant 1", "Variant 2", "Variant 3"],
        rows: [
          ["Product Dimensions", "100 x 74 x 1.6 mm", "58 x 64 x 1.6 mm", "60 x 55 x 1.6 mm"],
          ["Weight", "10.7 gram", "4.8 gram", "5.5 gram"],
          ["Material", "TPU (Thermoplastic Polyurethane)", "—", "—"],
          ["Form", "UV resistant and anti freezing", "—", "—"],
          ["Packing Size", "100 pcs/bag", "—", "—"],
          ["Tamper Proofing", "Yes, impossible to open", "—", "—"],
          [
            "Customization",
            "Logo, colour, printing, encoding, barcode, QR code",
            "—",
            "—",
          ],
          ["Attachment Mode", "Applicator", "—", "—"],
          ["Compatibility", "Male pin (28mm dia, 2 grams)", "—", "—"],
          ["Temperature", "-35 to 75 °C", "—", "—"],
          ["Chemical Resistance", "Resistant to chemical solvent and moisture", "—", "—"],
          ["Printing Method", "Laser engraving", "—", "—"],
          ["Quality Assurance", "100% quality tested", "—", "—"],
        ],
      },
      {
        title: "Technical Specification — LF Tag (ETS-RT 05 LF)",
        rows: [
          ["Electrical Specifications"],
          ["Air Interface Protocol", "ISO/IEC 11784/85, Animal Mode, FDX, HDX"],
          ["Operational Frequency", "134.2 KHz"],
          [
            "Chip",
            "SIC 7999 HDX — R/W user data memory of 6×32 (192 bits) for database management, extended read range HDX, factory unique ROM (UID) preventing cloning, direct access/write mode, read-only Animal ID section when no command received, read/write or OTP configuration",
          ],
          ["Read Range", "80 cm"],
          ["Operating Temperature", "-40°C to +80°C"],
          ["Storage Temperature", "-40°C to +120°C"],
          ["Ingress Protection Rating", "IP67"],
          ["Attachment", "Male pin by applicator"],
          ["Expected Lifetime", "Up to 5 years in normal operating conditions"],
          ["Physical and Mechanical Specifications"],
          ["Model", "Close cap"],
          ["Diameter", "Ø30.4 mm (variant 1), Ø3.4 mm (variant 2)"],
          ["Height", "15.50 mm (variant 1), 12 mm (variant 2)"],
          ["Weight", "7.2 g (variant 1), 7 g (variant 2)"],
          ["Encasement", "TPU"],
          ["Colour", "Yellow"],
          ["Quality Assurance", "100% reader tested"],
          ["Chemical Resistance"],
          ["Salt Water Resistance", "Resistant to continuous exposure to salt water for 2 hours"],
          ["Motor Oil Resistance", "Resistant to continuous exposure to motor oil for 2 hours"],
          ["Abrasion Resistance", "Abrasion resistant against HCL and IPA"],
          ["Additional Services"],
          ["Pre-encoding", "On request"],
          ["Customization", "Logo / text printing on request"],
        ],
      },
      {
        title: "Technical Specification — UHF Tag (ETS-RT 05 UHF)",
        rows: [
          ["Model Number", "ETS-RT 05 UHF"],
          ["Application", "Animal tracking"],
          ["Frequency", "865 MHz – 928 MHz"],
          ["Protocol", "ISO 18000-6C (EPC-Gen2)"],
          ["Working Mode", "Read and write"],
          ["Read Range", "0–8 meters (with recommended reader / reader dependent)"],
          ["Data Retention", "10 years"],
          ["Anti-Collision", "Yes"],
          ["Dimension", "58 mm x 69 mm, 28 mm (dia)"],
          ["Base Material", "PU"],
          ["Protection", "IP68"],
          ["Colour", "Yellow"],
          ["Operating Temperature", "-20°C to +80°C"],
          ["Weight per Piece", "7 grams"],
          ["Packing per Packet", "100 qty male + 100 qty female"],
          ["Printing", "Unique encoding, barcode, logo, text, etc."],
        ],
      },
    ],
    seo: {
      title: "RFID Animal Tags",
      description:
        "Tamper-evident TPU animal ear tags in visual, LF (ISO 11784/85) and UHF variants for livestock identification, breeding, dairy and traceability.",
    },
    source: "https://networktoll.com/animal-tags/",
  },
  {
    slug: "jewellery-tag",
    name: "Jewellery Tag",
    category: "tags",
    group: "tag",
    desc: "High-performance UHF tags for watches, rings and high-value retail — hang, reusable and fully tamper-proof variants.",
    bullets: ["Up to 4m read range", "PET / PVC, glossy or matte", "100,000 programming cycles"],
    image: {
      src: `${IMG}/jewellery-tag.jpg`,
      remote: `${WP}/2025/06/RFID-UHF-Jewellery-3.jpg`,
      alt: "UHF RFID jewellery tag, model ETS-RT 06 A",
      width: 1024,
      height: 1024,
    },
    heading: "Jewellery Tags",
    models: [
      {
        name: "Model No: ETS-RT 06 A",
        body: [
          "ETS-RT 06 A is a uniquely designed high performance UHF tag meant for application in jewellery items. It works on global UHF frequency 865 – 928 MHz and is fully compliant with ISO/IEC 18000-6C, EPC Global C1G2 standards. Its wide read range of up to 4 mt and accurate performance makes it one of the best tags for tracking and identification of high value items on shelf like watches, necklaces, rings, earrings, bracelets etc.",
          "These tags are strategically designed to be hung on items and meant for one time use only. The antenna and chip are embedded in high grade PET material to make it durable and look elegant with a glossy shine on its surface. Combined with an RFID reader, the jewellery tag delivers exceptional reliability in a smaller form factor at competitive pricing.",
        ],
        image: {
          src: `${IMG}/jewellery-tag.jpg`,
          remote: `${WP}/2025/06/RFID-UHF-Jewellery-3.jpg`,
          alt: "UHF RFID jewellery tag, model ETS-RT 06 A",
          width: 1024,
          height: 1024,
        },
        specs: [
          { label: "Features", value: "UHF | Thick PET material | Glossy look | Custom printing" },
          {
            value:
              "Water resistant | Chemical proof | EPC Class 1 Gen2, ISO 18000-6B,C | Range 4 MT",
          },
        ],
      },
      {
        name: "Model No: ETS-RT 06 B",
        body: [
          "ETS-RT 06 B is a PVC based reusable RFID tag meant for expensive item identification and tracking in premium high end retail stores and jewellery shops. It can easily be attached to assets using nylon threads which can later be taken off after billing for next use. These tags are small in size, lightweight and have a smooth glossy surface which can be used for printing logo, barcode etc.",
          "The tag delivers seamless performance and excellent accuracy when used with handheld terminals to track and manage bulk inventory within a fraction of a second. It has a read range of up to 3 meters and is fully compliant with ISO/IEC 18000-6C, EPC Global C1G2 standard protocols.",
        ],
        image: {
          src: `${IMG}/jewellery-tag-reusable.jpg`,
          remote: `${WP}/2025/06/Reausable-Jewellery-5-768x768.jpg`,
          alt: "Reusable RFID jewellery tag, model ETS-RT 06 B",
          width: 768,
          height: 768,
        },
        specs: [
          { label: "Features", value: "UHF | Thick PET material | Glossy look | Custom printing" },
          {
            value:
              "Water resistant | Chemical proof | EPC Class 1 Gen2, ISO 18000-6B,C | Range up to 3 metres",
          },
        ],
      },
      {
        name: "Model No: ETS-RT 06 C",
        body: [
          "ETS-RT 06 C is a one time use tamper proof RFID UHF jewellery tag which works on 865 – 928 MHz frequency and is fully compliant with ISO/IEC 18000-6C, EPC Global C1G2 standards. The antenna and chip are embedded in high grade PET material to make it durable and elegant. The tag is available in glossy / matt finish. Combined with an RFID reader, the jewellery tag delivers exceptional reliability in a smaller form factor at competitive pricing. Its wide read range of up to 4 mt and accurate performance makes it one of the best tags for tracking and identification of high value items on shelf like watches, necklaces, rings, earrings, bracelets etc.",
          "The tag is fully tamper proof from all sides — once it is applied on any item it is impossible to re-use the same tag on another item. The strategically placed slits on the tag surface tamper the antenna and its tail.",
          "We use high quality adhesive to ensure that the glue does not leave even the slightest imprint on the item to which it is attached.",
        ],
        image: {
          src: `${IMG}/jewellery-tag-tamper-proof.png`,
          remote: `${WP}/2025/06/2-1-2.png`,
          alt: "Tamper proof RFID jewellery tag, model ETS-RT 06 C",
          width: 1024,
          height: 1024,
        },
        specs: [
          { label: "Features", value: "UHF | Range 4 MT | Thick PET material | Glossy look" },
          {
            value:
              "Tamper proof | Water resistant | Chemical proof | EPC Class 1 Gen2, ISO 18000-6B,C | Custom printing",
          },
        ],
      },
    ],
    sections: [
      {
        title: "Application Areas",
        list: [
          "Watches",
          "Earrings",
          "Bracelets",
          "Rings",
          "Wallets and handbags",
          "Jewellery retail workshop",
        ],
      },
    ],
    specTables: [
      {
        title: "Technical Specification — ETS-RT 06 A",
        headers: ["Parameter", "70 mm x 36 mm", "96 mm x 23 mm"],
        rows: [
          ["Chip", "Monza M730 / Alien H9 / R6-P", "NXP UCODE 9 / UCODE 9xe"],
          ["Frequency", "UHF 865-868 MHz, 902-928 MHz", "UHF 865-868 MHz, 902-928 MHz"],
          ["Protocol", "ISO/IEC 18000-6C, EPC Global C1G2", "ISO/IEC 18000-6C, EPC Global C1G2"],
          [
            "Read distance",
            "0-4 m (depends on reader/environment)",
            "0-4 m (depends on reader/environment)",
          ],
          ["Memory", "Depends on chip used", "Depends on chip used"],
          ["Antenna", "Aluminium", "Aluminium"],
          ["Working Mode", "Read and write", "Read and write"],
          ["Base Material", "PET (glossy or matte)", "PET (glossy or matte)"],
          ["Data Retention", "10 years", "10 years"],
          ["Programming Cycle", "100,000 times", "100,000 times"],
          ["Operating Temp", "-25°C to +70°C", "-25°C to +70°C"],
          ["Storage Temp", "-20°C to +65°C", "-20°C to +65°C"],
          ["Adhesive", "High grade industrial adhesive", "High grade industrial adhesive"],
          ["Weight per tag", "1 gram", "1.2 gram"],
          ["Colour", "White", "White"],
          ["Protection Grade", "Resistant to chemical, water", "Resistant to chemical, water"],
          [
            "Custom Printing",
            "Yes. Can print logo, text, barcode",
            "Yes. Can print logo, text, barcode",
          ],
        ],
      },
      {
        title: "Technical Specification — ETS-RT 06 B",
        rows: [
          ["Model Number", "ETS-RT 06 B"],
          [
            "Application",
            "Jewellery products and other premium & luxury items like bags, watches etc.",
          ],
          ["Chip", "Alien Higgs 9 / Monza R6 / Monza R6P / UCODE 7 / UCODE 8"],
          ["Frequency", "UHF 865-868 MHz, 902-928 MHz"],
          ["Protocol", "ISO/IEC 18000-6C, EPC Global C1G2"],
          ["Dimensions", "35 x 15 x 0.85 mm / 28 x 15 x 0.85 mm"],
          ["Read distance", "Up to 3 mt (dependent on reader and environment)"],
          ["Memory", "Depends on chip used"],
          ["Antenna", "Embedded inside 2 layers of high-grade PVC"],
          ["Working Mode", "Read and write"],
          ["Base Material", "PVC"],
          ["Data Retention", "10 years"],
          ["Programming cycle", "100,000 times"],
          ["Operating Temp", "-25°C to +70°C"],
          ["Storage Temp.", "-20°C to +65°C"],
          ["Application Type", "Hang using nylon thread"],
          ["Packing size", "500 tags per packet"],
          ["Weight per tag", "2 gram"],
          ["Colour", "White"],
          ["Protection Grade", "Resistant to chemical, water exposure"],
          ["Custom Printing", "Yes. Can print logo, text, barcode etc"],
        ],
      },
      {
        title: "Technical Specification — ETS-RT 06 C",
        rows: [
          ["Size", "70 mm x 36 mm"],
          ["Chip", "Monza M730 / Alien H9 / R6-P"],
          ["Frequency", "UHF 865-868 MHz, 902-928 MHz"],
          ["Protocol", "ISO/IEC 18000-6C, EPC Global C1G2"],
          ["Read distance", "0-4 mt (dependent on reader and environment)"],
          ["Memory", "Depends on chip used"],
          ["Antenna", "Aluminium"],
          ["Working Mode", "Read and write"],
          ["Base Material", "PET (available in glossy or matt finish)"],
          ["Data Retention", "10 years"],
          ["Programming cycle", "100,000 times"],
          ["Operating Temp", "-25°C to +70°C"],
          ["Storage Temp.", "-20°C to +65°C"],
          ["Adhesive", "High grade industrial adhesive"],
          ["Weight per tag", "1 gram"],
          ["Colour", "White"],
          ["Protection Grade", "Resistant to chemical, water exposure"],
          ["Custom Printing", "Yes. Can print logo, text, barcode etc"],
        ],
      },
    ],
    seo: {
      title: "RFID Jewellery Tags",
      description:
        "UHF RFID jewellery tags for watches, rings, bracelets and luxury retail — hang, reusable and tamper-proof variants with up to 4m read range.",
    },
    source: "https://networktoll.com/jewellery-tags/",
  },
  {
    slug: "racing-tag",
    name: "Racing & Sports\nTiming Tag",
    category: "tags",
    group: "tag",
    desc: "Disposable and reusable shoe, bib and sports timing tags for marathon, cycling and endurance events, read at up to 8m with 100% accuracy.",
    bullets: ["865–928 MHz, ISO 18000-6C", "3m (shoe) / 8m (bib) range", "One-time and reusable options"],
    image: {
      src: `${IMG}/racing-tag-shoe.png`,
      remote: `${WP}/2025/05/4-2.png`,
      alt: "RFID shoe tag for race timing, model NWS-RT 08 B",
      width: 1024,
      height: 1024,
    },
    heading: "Racing & Sports Timing Tags — Shoe, Bib & Reusable",
    models: [
      {
        name: "RFID Shoe Tag (Model: NWS-RT 08 B)",
        specs: [
          { label: "Project", value: "Race, marathon, cycling, sports time tracking." },
          {
            label: "Use With",
            value:
              "Excellent read range. Suggested usage with RFID floor mat antenna only. 100% accuracy.",
          },
          {
            label: "Frequency",
            value: "865 – 867 MHz ISO/IEC 18000 6C Gen 1 | Chip: Alien Higgs 3",
          },
          { value: "Anti collision. Range: 3 MT." },
          { label: "Material", value: "Non tearable coated paper. Waterproof design." },
          { label: "Customize", value: "Print with race applicant number, race name, sponsor etc." },
          { label: "Size", value: "162 x 30 mm. Standard to fit all sizes." },
          { label: "Apply", value: "Tie to shoe laces." },
        ],
        image: {
          src: `${IMG}/racing-tag-shoe.png`,
          remote: `${WP}/2025/05/4-2.png`,
          alt: "RFID shoe tag for race timing, model NWS-RT 08 B",
          width: 1024,
          height: 1024,
        },
      },
      {
        name: "RFID Bib Tag (Model: NWS-RT 08 A)",
        specs: [
          { label: "Project", value: "Time tracking — race, marathon, sports events, selections." },
          { value: "Paste on pre-printed bib paper that has participant & race details." },
          { value: "Excellent read range and performance." },
          {
            label: "Use With",
            value:
              "12 dBi integrated circular polarized reader / 4 port reader. Reader can be mounted on an L-shape pole on top of the track or sideways.",
          },
          {
            label: "Frequency",
            value:
              "865 – 867 MHz ISO/IEC 18000 6C Gen 1 | Chip: Smartrac Impinj Monza R6P / Alien Higgs 3",
          },
          { value: "Anti collision. One time use only." },
          { label: "Material", value: "RFID chip on foam base." },
          { label: "Range", value: "8 MT with 100% accuracy." },
        ],
        image: {
          src: `${IMG}/racing-tag-bib.jpg`,
          remote: `${WP}/2025/05/RFID-Bib-Tag.jpg`,
          alt: "RFID bib tag for race timing, model NWS-RT 08 A",
          width: 1024,
          height: 1024,
        },
      },
      {
        // Sourced from Eco Track Systems (ETS), a separate Delhi RFID
        // manufacturer — not networktoll.com. ETS's own site (etsrfid.com)
        // has been taken over by an unrelated third party since this was
        // researched, so no photo could be pulled from it; content here
        // comes from the product description as previously indexed by
        // search engines, kept to what was actually stated.
        name: "Reusable Sports Timing Tag (Model: ETS-RT 08 B)",
        body: [
          "A reusable alternative to the disposable bib tag above. Worn on a lanyard around the neck or pinned to the T-shirt, it uses a Smartrac Dogbone inlay for high accuracy and reliability across marathon and race events. Built on UHF 865–928 MHz and fully compliant with ISO/IEC 18000-6C, the chip's anti-collision feature records multiple runners simultaneously at speed. Used with RFID readers positioned at checkpoints, it logs each participant's time in real time for live results, published rankings and certificates.",
        ],
        specs: [
          { label: "Frequency", value: "UHF 865–928 MHz, ISO/IEC 18000-6C" },
          { label: "Inlay", value: "Smartrac Dogbone" },
          { label: "Wear", value: "Lanyard around neck, or pinned to T-shirt" },
          { value: "Reusable across multiple events" },
        ],
      },
    ],
    seo: {
      title: "RFID Racing & Sports Timing Tags",
      description:
        "RFID shoe, bib and reusable sports timing tags for marathon, cycling and endurance events — 865-928 MHz, anti-collision, up to 8m range with 100% read accuracy.",
    },
    source: "https://networktoll.com/rfid-tags-supplier/",
  },
  {
    slug: "file-tag",
    name: "File Tag",
    category: "tags",
    group: "tag",
    desc: "Slim UHF label for file, folder and document tracking — locate any physical record from metres away.",
    bullets: ["EPC Gen 2 / ISO 18000-6C", "512-bit user memory", "Password protected read/write"],
    image: {
      src: `${IMG}/file-tag.png`,
      remote: `${WP}/2025/08/1-931x1024.png`,
      alt: "RFID file and folder label",
      width: 931,
      height: 1024,
    },
    heading: "File Tag",
    intro: [
      "File tags turn every physical folder into a scannable asset. Paired with a UHF reader or handheld, a whole shelf of records can be inventoried in seconds instead of read spine by spine — which is why they are used across records rooms, legal departments, hospitals and government offices.",
    ],
    models: [
      {
        name: "File / Folder Label (Alien 9640 based)",
        body: [
          "Powered by Alien's Higgs 3 UHF RFID IC and Squiggle antenna design, this inlay delivers EPC Gen 2 performance with a 32-bit TID, a 64-bit unique TID for authentication and serialization, an extensible EPC memory bank, 512 bits of user memory, and password protected read and write support to prevent unauthorized viewing or modification of the tag's data. File folder labels are one of its primary applications, alongside shipping labels and asset management.",
        ],
        image: {
          src: `${IMG}/file-tag.png`,
          remote: `${WP}/2025/08/1-931x1024.png`,
          alt: "RFID file and folder label",
          width: 931,
          height: 1024,
        },
        brochure: {
          label: "Alien 9640 RFID label",
          href: `${PDF}/alien-9640-rfid.pdf`,
          remote: `${WP}/2025/08/Alien-9640-RFID.pdf`,
        },
      },
    ],
    sections: [
      {
        title: "Reading files in bulk",
        body: [
          "For shelf-level file tracking, the Zebra FX9600 fixed UHF reader is the usual pairing — it supports up to 8 antenna ports at up to +33 dBm for high-density reading. For spot checks and audits away from a fixed reader, the Chainway C72 handheld reads over 200 tags per second at up to 25 metres indoors.",
        ],
      },
    ],
    seo: {
      title: "RFID File Tags",
      description:
        "UHF RFID file and folder labels for document tracking — EPC Gen 2, 512-bit user memory, password protected, readable in bulk with fixed or handheld readers.",
    },
    // The live site has no dedicated File Tag page. This entry is assembled from
    // the Alien 9640 label spec (which names file folder labels as a primary
    // application) and the reader pages that list file tracking. Confirm the
    // exact model number and dimensions with the client before launch.
    source: "https://networktoll.com/rfid-tags-supplier/",
  },
  {
    // Sourced from Eco Track Systems (ETS), a separate Delhi RFID
    // manufacturer, not networktoll.com. NTS's own RFID Tag product already
    // includes a waste-bin tag as one model (NTS-RT 62); this is a dedicated
    // product for the same application, kept separate at the client's
    // request rather than merged into that entry. ETS's own site
    // (etsrfid.com) has since been taken over by an unrelated third party,
    // so no photo could be sourced from it — text-only until one exists.
    slug: "waste-tag",
    name: "Waste Tag",
    category: "tags",
    group: "tag",
    desc: "IP67 outdoor tag for household and municipal waste bin tracking, scanned by collection vehicles or handheld readers.",
    bullets: ["IP67, outdoor rated", "Vehicle or handheld scanning", "Made in India"],
    image: {
      src: "/images/placeholders/product-generic-placeholder.webp",
      remote: "",
      alt: "RFID waste bin tracking tag",
      width: 870,
      height: 860,
    },
    heading: "Waste Management Tag",
    models: [
      {
        name: "Waste Management Tag (Model: ETS-RT 14)",
        body: [
          "Fitted outside houses or bins for household waste management, this tag is automatically scanned by readers mounted on the waste collection vehicle or carried by collectors on a handheld device. Each scan marks the collection of waste from that location and sends the data in real time to municipal or government servers for monitoring and analysis — which agencies then use to optimise collection routes and track bin locations. Made in India and IP67 rated to withstand rain, dust, heat and cold.",
        ],
        specs: [
          { label: "Application", value: "Household and municipal waste collection tracking" },
          { label: "Protection", value: "IP67, outdoor rated" },
          { label: "Read by", value: "Vehicle-mounted reader or handheld mobile device" },
        ],
      },
    ],
    seo: {
      title: "RFID Waste Management Tag",
      description:
        "IP67 outdoor RFID tag for household and municipal waste bin tracking — scanned by collection vehicles or handheld readers, real-time route optimisation.",
    },
  },
  {
    slug: "anpr-camera",
    name: "ANPR Camera",
    category: "toll",
    group: "camera",
    desc: "Number plate capture camera feeding the ANPR engine — day and night recognition for tolling, parking and enforcement.",
    image: {
      // Client-supplied photo (no remote URL — it isn't sourced from the
      // live site, so there's nothing for fetch-assets.mjs to download).
      src: "/images/products/anpr-camera.jpg",
      remote: "",
      alt: "ANPR number plate recognition camera",
      width: 800,
      height: 800,
    },
    heading: "ANPR Camera",
    intro: [
      "The ANPR camera is the capture layer of Network Toll's Automatic Number Plate Recognition system. It images every vehicle as it enters the lane, and the recognition engine reads the plate and passes it to the Toll Management System for classification, barrier control and enforcement — with or without a working FASTag on the vehicle.",
      "Camera model, lens and mounting are specified per site, because plate capture depends on lane width, approach speed, gantry height and ambient light. Talk to us with your lane drawings and we will size the camera and illuminator for the installation.",
    ],
    seo: {
      title: "ANPR Camera",
      description:
        "ANPR number plate capture cameras for toll plazas, parking and highway enforcement — day and night recognition integrated with the Toll Management System.",
    },
    // NO SOURCE PAGE. The live site sells ANPR as a solution but has no ANPR
    // Camera product page, so there is no model number or spec table to
    // carry over. Copy here is written from the ANPR solution positioning and
    // deliberately avoids inventing specifications. Photo supplied directly
    // by the client (see image.src) — still needs a spec datasheet before launch.
  },
  {
    slug: "ptz-camera",
    name: "PTZ Camera",
    category: "toll",
    group: "camera",
    desc: "Pan-tilt-zoom camera for wide-area plaza surveillance, incident review and remote lane monitoring.",
    image: {
      // Client-supplied photo (no remote URL — it isn't sourced from the
      // live site, so there's nothing for fetch-assets.mjs to download).
      src: "/images/products/ptz-camera.jpg",
      remote: "",
      alt: "PTZ surveillance camera",
      width: 425,
      height: 425,
    },
    heading: "PTZ Camera",
    intro: [
      "PTZ cameras give the plaza control room a single moveable eye over the whole site — sweeping the approach, zooming onto a disputed transaction, or following a vehicle across lanes without needing a camera per position.",
      "They complement the fixed ANPR cameras rather than replacing them: ANPR reads plates in a fixed capture zone, while the PTZ covers everything between and around those zones for surveillance and incident review.",
    ],
    seo: {
      title: "PTZ Camera",
      description:
        "Pan-tilt-zoom surveillance cameras for toll plazas — wide-area monitoring, remote lane inspection and incident review alongside fixed ANPR capture.",
    },
    // NO SOURCE PAGE. Same situation as the ANPR Camera above: listed in the
    // new design's product grid but with no product page or spec on
    // networktoll.com, and no camera products at all on etsrfid.com. Photo
    // supplied directly by the client (see image.src) — still needs a spec
    // datasheet before launch.
  },
];

/**
 * Category metadata for the grouped sections on /products and the
 * "Products" nav dropdown. Order here is display order — explicit rather
 * than derived from `products` order so the page/dropdown can be
 * re-ordered for merchandising without moving entries around above.
 */
export const PRODUCT_GROUPS: { id: ProductGroup; label: string; blurb: string }[] = [
  { id: "tag", label: "Tags", blurb: "RFID tags for vehicles, assets and access credentials." },
  { id: "card-wristband", label: "Cards & Wristbands", blurb: "Card and wearable-format RFID credentials." },
  { id: "reader", label: "Readers", blurb: "Fixed, desktop, mobile and Bluetooth RFID readers." },
  { id: "camera", label: "Cameras", blurb: "ANPR and PTZ cameras for plaza surveillance." },
  { id: "radar", label: "Radar", blurb: "Radar sensors for traffic monitoring." },
  {
    id: "toll-plaza-equipment",
    label: "Toll Plaza Equipment",
    blurb: "Boom barriers, displays, controllers, signals, classification and weigh-in-motion.",
  },
];

/** Products grouped for display, in `PRODUCT_GROUPS` order. Empty groups are dropped. */
export function productsByGroup(): { id: ProductGroup; label: string; blurb: string; products: Product[] }[] {
  return PRODUCT_GROUPS.map((g) => ({ ...g, products: products.filter((p) => p.group === g.id) })).filter(
    (g) => g.products.length > 0
  );
}

/** Anchor id of a group's section on /products — shared by ProductGrid and the Header nav dropdown. */
export function productGroupSectionId(id: ProductGroup | string) {
  return `products-${id}`;
}

const bySlug = new Map(products.map((p) => [p.slug, p]));

export function getProduct(slug: string): Product | undefined {
  return bySlug.get(slug);
}

/** Plain-text name with the card's line break removed. */
export function productTitle(p: Product): string {
  return p.name.replace(/\n/g, " ");
}

/**
 * Every asset the site expects on disk, for scripts/fetch-assets.mjs.
 * Entries with an empty `remote` have no upstream file and need one supplied
 * by the client — the script reports these rather than failing.
 */
export function allAssets(): { src: string; remote: string }[] {
  const out: { src: string; remote: string }[] = [];
  const push = (a?: { src: string; remote: string }) => {
    if (a && !out.some((e) => e.src === a.src)) out.push({ src: a.src, remote: a.remote });
  };
  for (const p of products) {
    push(p.image);
    p.gallery?.forEach(push);
    p.brochures?.forEach((b) => push({ src: b.href, remote: b.remote }));
    p.models?.forEach((m) => {
      push(m.image);
      if (m.brochure) push({ src: m.brochure.href, remote: m.brochure.remote });
    });
  }
  return out;
}

/**
 * Slim projection used by the product grid. The full catalog entries carry
 * every spec table and FAQ; serialising all of that into the client bundle
 * for a card that shows four lines would be wasteful, so the grid gets this
 * instead.
 *
 * `search` is a pre-built lowercase haystack so the grid's filter matches on
 * things buyers actually type — model numbers ("NTS-IR-05"), chip names
 * ("Impinj"), and applications ("laundry") — not just the card title.
 */
export type ProductCardData = {
  slug: string;
  name: string;
  desc: string;
  bullets?: string[];
  image: CatalogImage;
  search: string;
};

export function toCardData(p: Product): ProductCardData {
  const haystack = [
    p.name,
    p.desc,
    p.seo.title,
    p.seo.description,
    ...(p.bullets ?? []),
    ...(p.models?.map((m) => m.name) ?? []),
    ...(p.models?.flatMap((m) => m.specs?.map((s) => `${s.label ?? ""} ${s.value}`) ?? []) ?? []),
    ...(p.sections?.map((s) => s.title) ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return {
    slug: p.slug,
    name: p.name,
    desc: p.desc,
    bullets: p.bullets,
    image: p.image,
    search: haystack,
  };
}
