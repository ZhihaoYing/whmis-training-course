export type ContentBlock =
  | {
      type: "text";
      title: string;
      text: string;
    }
  | {
      type: "cards";
      title?: string;
      cards: {
        title: string;
        text: string;
        icon?: string;
      }[];
    }
  | {
      type: "bullets";
      title: string;
      items: string[];
    }
  | {
      type: "split";
      title: string;
      left: {
        title: string;
        subtitle?: string;
        items: string[];
      };
      right: {
        title: string;
        subtitle?: string;
        items: string[];
      };
    }
  | {
      type: "steps";
      title: string;
      steps: {
        number: number;
        title: string;
        text?: string;
      }[];
    }
  | {
      type: "visual";
      title: string;
      description: string;
      visualType:
        | "whmis-overview"
        | "hazard-groups"
        | "pictogram-grid"
        | "label-anatomy"
        | "sds-sections"
        | "ppe-overview"
        | "handling-checklist"
        | "storage-example"
        | "spill-flow"
        | "emergency-equipment"
        | "worker-rights";
    };

export type Module = {
  slug: string;
  label: string;
  title: string;
  subtitle: string;
  intro: string;

  blocks: ContentBlock[];

  interaction:
    | "single"
    | "multiple"
    | "matching"
    | "sorting"
    | "sequence"
    | "scenario"
    | "knowledge";

  remember: string;

  prev?: string;
  next?: string;
};

export const modules: Module[] = [
  /* =========================================================
     MODULE 1 — INTRODUCTION TO WHMIS
  ========================================================= */

  {
    slug: "module-1",
    label: "Module 1",
    title: "Introduction to WHMIS",
    subtitle: "What WHMIS is and why it matters",

    intro:
      "WHMIS stands for Workplace Hazardous Materials Information System. It is Canada's national system for communicating information about hazardous products used in workplaces.",

    blocks: [
      {
        type: "visual",
        title: "How WHMIS works",
        description:
          "WHMIS communicates safety information through three connected parts: Labels, Safety Data Sheets, and Worker Education & Training.",
        visualType: "whmis-overview",
      },

      {
        type: "cards",
        title: "The three main parts of WHMIS",
        cards: [
          {
            title: "Labels",
            text:
              "Identify hazardous products and provide pictograms, signal words, hazards, and precautions.",
            icon: "L",
          },
          {
            title: "Safety Data Sheets",
            text:
              "Provide detailed information about hazards, handling, storage, first aid, disposal, and emergency procedures.",
            icon: "S",
          },
          {
            title: "Education & Training",
            text:
              "Helps workers understand WHMIS and the hazardous products they may encounter in their workplace.",
            icon: "T",
          },
        ],
      },

      {
        type: "bullets",
        title: "WHMIS helps workers understand",
        items: [
          "Chemical hazards",
          "Physical hazards",
          "Safe handling",
          "Storage",
          "Disposal",
          "Emergency procedures",
        ],
      },

      {
        type: "bullets",
        title: "Why WHMIS is important",
        items: [
          "Workers may be injured when chemicals are used incorrectly",
          "Incompatible products may be mixed",
          "Proper PPE may not be used",
          "Workers may not know the correct emergency procedures",
        ],
      },

      {
        type: "bullets",
        title: "WHMIS helps prevent",
        items: [
          "Fires",
          "Explosions",
          "Poisoning",
          "Chemical burns",
          "Environmental damage",
          "Serious injury or death",
        ],
      },
    ],

    interaction: "single",

    remember:
      "WHMIS uses labels, Safety Data Sheets, and worker education and training to communicate hazardous-product safety information.",

    next: "module-2",
  },

  /* =========================================================
     MODULE 2 — RESPONSIBILITIES
  ========================================================= */

  {
    slug: "module-2",
    label: "Module 2",
    title: "Responsibilities",
    subtitle: "Supplier, employer, and worker responsibilities",

    intro:
      "WHMIS depends on suppliers, employers, and workers each carrying out different responsibilities.",

    blocks: [
      {
        type: "cards",
        title: "Who is responsible for what?",
        cards: [
          {
            title: "Supplier",
            text:
              "Classifies hazardous products, provides compliant labels, and supplies Safety Data Sheets.",
            icon: "S",
          },
          {
            title: "Employer",
            text:
              "Trains workers, maintains SDSs, ensures labels remain available, provides PPE, and develops safe work procedures.",
            icon: "E",
          },
          {
            title: "Worker",
            text:
              "Attends training, reads labels and SDSs, wears required PPE, and reports hazards, spills, or damaged labels.",
            icon: "W",
          },
        ],
      },

      {
        type: "bullets",
        title: "Worker responsibilities",
        items: [
          "Attend WHMIS training",
          "Read product labels",
          "Review the SDS before use",
          "Wear required PPE",
          "Report damaged labels",
          "Report spills or incidents immediately",
        ],
      },
    ],

    interaction: "matching",

    remember:
      "Suppliers provide hazard information, employers provide workplace controls and training, and workers use the information safely.",

    prev: "module-1",
    next: "module-3",
  },

  /* =========================================================
     MODULE 3 — HAZARD CLASSES
  ========================================================= */

  {
    slug: "module-3",
    label: "Module 3",
    title: "Hazard Classes",
    subtitle: "The two major WHMIS hazard groups",

    intro:
      "WHMIS hazards are organized into two major groups: Physical Hazards and Health Hazards.",

    blocks: [
      {
        type: "visual",
        title: "Two major hazard groups",
        description:
          "WHMIS Hazards divide into Physical Hazards and Health Hazards. This relationship should be shown as a large visual hierarchy before presenting individual classes.",
        visualType: "hazard-groups",
      },

      {
        type: "split",
        title: "WHMIS Hazard Groups",

        left: {
          title: "Physical Hazards",
          subtitle: "19 Classes",
          items: [
            "Flammable liquids",
            "Flammable gases",
            "Flammable aerosols",
            "Flammable solids",
            "Combustible dusts",
            "Gases under pressure",
            "Oxidizing liquids",
            "Oxidizing gases",
            "Oxidizing solids",
            "Self-reactive substances",
            "Substances which, in contact with water, emit flammable gases",
            "Organic peroxides",
            "Corrosive to metals",
            "Simple asphyxiants",
            "Pyrophoric liquids",
            "Pyrophoric solids",
            "Pyrophoric gases",
            "Self-heating substances",
            "Physical hazards not otherwise classified",
          ],
        },

        right: {
          title: "Health Hazards",
          subtitle: "12 Classes",
          items: [
            "Acute toxicity",
            "Skin corrosion / irritation",
            "Serious eye damage / eye irritation",
            "Respiratory or skin sensitizers",
            "Germ cell mutagenicity",
            "Carcinogenicity",
            "Reproductive toxicity",
            "Specific target organ toxicity — single exposure",
            "Specific target organ toxicity — repeated exposure",
            "Aspiration hazard",
            "Biohazardous infectious materials",
            "Health hazards not otherwise classified",
          ],
        },
      },
    ],

    interaction: "sorting",

    remember:
      "First identify whether a hazard is mainly a physical hazard or a health hazard, then look at the specific hazard class.",

    prev: "module-2",
    next: "module-4",
  },

  /* =========================================================
     MODULE 4 — WHMIS PICTOGRAMS
  ========================================================= */

  {
    slug: "module-4",
    label: "Module 4",
    title: "WHMIS Pictograms",
    subtitle: "Recognize the symbols that communicate hazard types",

    intro:
      "WHMIS pictograms provide a quick visual signal about the hazards associated with a hazardous product.",

    blocks: [
      {
        type: "visual",
        title: "WHMIS pictogram gallery",
        description:
          "Show the WHMIS pictograms prominently in a visual grid so workers can connect each symbol with its hazard meaning.",
        visualType: "pictogram-grid",
      },

      {
        type: "cards",
        cards: [
          {
            title: "Flame",
            text:
              "Flammable liquids, flammable gases, and some self-reactive chemicals.",
          },
          {
            title: "Flame Over Circle",
            text: "Oxidizers.",
          },
          {
            title: "Gas Cylinder",
            text: "Compressed gases.",
          },
          {
            title: "Corrosion",
            text:
              "Skin burns, serious eye damage, and corrosive effects on metals.",
          },
          {
            title: "Skull and Crossbones",
            text:
              "Acute toxicity that may cause serious illness or death after short exposure.",
          },
          {
            title: "Health Hazard",
            text:
              "Cancer, lung damage, reproductive hazards, or organ toxicity.",
          },
          {
            title: "Exclamation Mark",
            text:
              "Skin irritation, eye irritation, harmful effects, or respiratory irritation.",
          },
          {
            title: "Exploding Bomb",
            text:
              "Explosives, self-reactive substances, and some organic peroxides.",
          },
          {
            title: "Environment",
            text:
              "Hazardous to aquatic environments. This pictogram is optional in Canada.",
          },
          {
            title: "Biohazardous Infectious Materials",
            text:
              "Organisms or toxins capable of causing disease.",
          },
        ],
      },
    ],

    interaction: "matching",

    remember:
      "Pictograms provide a quick hazard signal, but workers should still read the complete label and SDS.",

    prev: "module-3",
    next: "module-5",
  },

  /* =========================================================
     MODULE 5 — LABELS
  ========================================================= */

  {
    slug: "module-5",
    label: "Module 5",
    title: "Labels",
    subtitle: "Supplier labels and workplace labels",

    intro:
      "Every hazardous product requires a label that communicates important safety information.",

    blocks: [
      {
        type: "visual",
        title: "Anatomy of a WHMIS label",
        description:
          "Use a large example label and visually identify its main required elements.",
        visualType: "label-anatomy",
      },

      {
        type: "bullets",
        title: "Supplier labels include",
        items: [
          "Product name",
          "Hazard pictograms",
          "Signal word",
          "Hazard statements",
          "Precautionary statements",
          "Supplier information",
        ],
      },

      {
        type: "cards",
        title: "Signal words",
        cards: [
          {
            title: "Danger",
            text: "Indicates the higher level of hazard.",
          },
          {
            title: "Warning",
            text: "Indicates a less severe hazard.",
          },
        ],
      },

      {
        type: "bullets",
        title: "When workplace labels are required",
        items: [
          "When a product is transferred to another container",
          "When the original label is damaged or missing",
        ],
      },

      {
        type: "bullets",
        title: "A workplace label must include",
        items: [
          "Product name",
          "Safe-handling information",
          "Reference to the SDS",
        ],
      },
    ],

    interaction: "scenario",

    remember:
      "Before using a hazardous product, make sure its label is present, readable, and understood.",

    prev: "module-4",
    next: "module-6",
  },

  /* =========================================================
     MODULE 6 — SAFETY DATA SHEETS
  ========================================================= */

  {
    slug: "module-6",
    label: "Module 6",
    title: "Safety Data Sheets (SDS)",
    subtitle: "Find detailed safety information",

    intro:
      "Every hazardous product has a Safety Data Sheet containing 16 standardized sections.",

    blocks: [
      {
        type: "visual",
        title: "The 16-section SDS structure",
        description:
          "Present all 16 SDS sections in a clear numbered visual rather than as one long paragraph.",
        visualType: "sds-sections",
      },

      {
        type: "bullets",
        title: "SDS sections",
        items: [
          "1 — Identification",
          "2 — Hazard Identification",
          "3 — Composition",
          "4 — First Aid",
          "5 — Fire Fighting",
          "6 — Accidental Release",
          "7 — Handling and Storage",
          "8 — Exposure Controls / PPE",
          "9 — Physical Properties",
          "10 — Stability and Reactivity",
          "11 — Toxicological Information",
          "12 — Ecological Information",
          "13 — Disposal Considerations",
          "14 — Transport Information",
          "15 — Regulatory Information",
          "16 — Other Information",
        ],
      },

      {
        type: "cards",
        title: "Sections workers often need quickly",
        cards: [
          {
            title: "Section 2",
            text: "Hazard Identification",
          },
          {
            title: "Section 4",
            text: "First Aid",
          },
          {
            title: "Section 6",
            text: "Accidental Release",
          },
          {
            title: "Section 7",
            text: "Handling and Storage",
          },
          {
            title: "Section 8",
            text: "Exposure Controls / PPE",
          },
        ],
      },

      {
        type: "text",
        title: "Know where to find the SDS",
        text:
          "Workers should know where SDSs are located in their workplace and how to access them when information is needed.",
      },
    ],

    interaction: "matching",

    remember:
      "You do not need to memorize every SDS section. You need to know how to find the information you need.",

    prev: "module-5",
    next: "module-7",
  },

  /* =========================================================
     MODULE 7 — PPE
  ========================================================= */

  {
    slug: "module-7",
    label: "Module 7",
    title: "Personal Protective Equipment (PPE)",
    subtitle: "Use protection appropriate for the hazard",

    intro:
      "Personal protective equipment helps protect workers from hazardous-product exposure.",

    blocks: [
      {
        type: "visual",
        title: "Common PPE",
        description:
          "Show common PPE visually around a worker or in a PPE equipment grid.",
        visualType: "ppe-overview",
      },

      {
        type: "cards",
        cards: [
          {
            title: "Eye & Face",
            text: "Safety glasses and face shields.",
          },
          {
            title: "Hands",
            text: "Protective gloves.",
          },
          {
            title: "Respiratory",
            text: "Respirators.",
          },
          {
            title: "Body",
            text: "Chemical-resistant clothing.",
          },
          {
            title: "Feet",
            text: "Steel-toe boots.",
          },
        ],
      },

      {
        type: "steps",
        title: "Three PPE rules",
        steps: [
          {
            number: 1,
            title: "Inspect",
            text: "Inspect PPE before use.",
          },
          {
            number: 2,
            title: "Replace",
            text: "Replace damaged PPE.",
          },
          {
            number: 3,
            title: "Select",
            text: "Use the correct PPE for the hazard.",
          },
        ],
      },
    ],

    interaction: "multiple",

    remember:
      "Inspect PPE before use, replace damaged equipment, and select PPE appropriate for the hazard.",

    prev: "module-6",
    next: "module-8",
  },

  /* =========================================================
     MODULE 8 — SAFE HANDLING
  ========================================================= */

  {
    slug: "module-8",
    label: "Module 8",
    title: "Safe Handling",
    subtitle: "Prepare before using hazardous products",

    intro:
      "Safe handling starts before the hazardous product is used.",

    blocks: [
      {
        type: "visual",
        title: "Before you begin",
        description:
          "Organize this module as a three-part safety checklist: Read, Inspect, Never.",
        visualType: "handling-checklist",
      },

      {
        type: "split",
        title: "Prepare before use",

        left: {
          title: "Read",
          items: [
            "Product label",
            "Safety Data Sheet",
            "Workplace procedures",
          ],
        },

        right: {
          title: "Inspect",
          items: [
            "Container",
            "PPE",
            "Ventilation",
          ],
        },
      },

      {
        type: "bullets",
        title: "Never",
        items: [
          "Mix chemicals unless instructed",
          "Eat while handling chemicals",
          "Remove labels",
          "Use damaged containers",
        ],
      },
    ],

    interaction: "sorting",

    remember:
      "Before handling hazardous products, read the safety information, inspect the work conditions, and avoid unsafe practices.",

    prev: "module-7",
    next: "module-9",
  },

  /* =========================================================
     MODULE 9 — STORAGE
  ========================================================= */

  {
    slug: "module-9",
    label: "Module 9",
    title: "Storage",
    subtitle: "Store hazardous products safely",

    intro:
      "Hazardous products must be stored according to their hazards, compatibility, and SDS recommendations.",

    blocks: [
      {
        type: "visual",
        title: "Safe storage area",
        description:
          "Use a workplace storage illustration showing correct and incorrect placement of hazardous products.",
        visualType: "storage-example",
      },

      {
        type: "bullets",
        title: "Safe storage practices",
        items: [
          "Use original containers when possible",
          "Keep labels visible",
          "Store away from incompatible materials",
          "Use ventilated areas",
          "Follow SDS recommendations",
        ],
      },

      {
        type: "bullets",
        title: "Never store together",
        items: [
          "Acids with bases",
          "Oxidizers with flammables",
          "Bleach with ammonia",
        ],
      },
    ],

    interaction: "sorting",

    remember:
      "Check compatibility and SDS storage recommendations before deciding where a hazardous product should be stored.",

    prev: "module-8",
    next: "module-10",
  },

  /* =========================================================
     MODULE 10 — SPILL RESPONSE
  ========================================================= */

  {
    slug: "module-10",
    label: "Module 10",
    title: "Spill Response",
    subtitle: "Respond safely when a hazardous spill occurs",

    intro:
      "Workers should follow a controlled sequence when responding to a hazardous-product spill.",

    blocks: [
      {
        type: "visual",
        title: "Spill response flow",
        description:
          "Show the response as a numbered visual sequence rather than a normal bullet list.",
        visualType: "spill-flow",
      },

      {
        type: "steps",
        title: "If a spill occurs",
        steps: [
          {
            number: 1,
            title: "Stop work",
          },
          {
            number: 2,
            title: "Warn others",
          },
          {
            number: 3,
            title: "Isolate the area",
          },
          {
            number: 4,
            title: "Notify your supervisor",
          },
          {
            number: 5,
            title: "Follow spill procedures",
          },
          {
            number: 6,
            title: "Wear appropriate PPE",
          },
          {
            number: 7,
            title: "Clean up only if trained",
          },
        ],
      },

      {
        type: "text",
        title: "Important",
        text:
          "Never clean up a hazardous spill unless you are trained and authorized to do so.",
      },
    ],

    interaction: "sequence",

    remember:
      "Protect yourself and others first. Clean up hazardous spills only when trained and authorized.",

    prev: "module-9",
    next: "module-11",
  },

  /* =========================================================
     MODULE 11 — EMERGENCY PROCEDURES
  ========================================================= */

  {
    slug: "module-11",
    label: "Module 11",
    title: "Emergency Procedures",
    subtitle: "Know your workplace emergency resources",

    intro:
      "Workers should know the location of emergency equipment and understand which incidents must be reported immediately.",

    blocks: [
      {
        type: "visual",
        title: "Know where emergency equipment is located",
        description:
          "Use workplace emergency-equipment icons or a simple workplace map-style visual.",
        visualType: "emergency-equipment",
      },

      {
        type: "bullets",
        title: "Know where to find",
        items: [
          "Emergency exits",
          "Fire extinguishers",
          "Eyewash stations",
          "Safety showers",
          "First aid kits",
          "Emergency contacts",
        ],
      },

      {
        type: "bullets",
        title: "Report immediately",
        items: [
          "Chemical exposure",
          "Fire",
          "Explosion",
          "Spill",
          "Missing labels",
        ],
      },
    ],

    interaction: "scenario",

    remember:
      "Know your emergency equipment, emergency contacts, and workplace reporting procedures before an emergency occurs.",

    prev: "module-10",
    next: "module-12",
  },

  /* =========================================================
     MODULE 12 — WORKER RIGHTS
  ========================================================= */

  {
    slug: "module-12",
    label: "Module 12",
    title: "Worker Rights",
    subtitle: "Know your workplace health and safety rights",

    intro:
      "Workers have important rights related to workplace health and safety.",

    blocks: [
      {
        type: "visual",
        title: "Three worker rights",
        description:
          "Show the three worker rights as three large equal visual cards.",
        visualType: "worker-rights",
      },

      {
        type: "cards",
        cards: [
          {
            title: "Right to Know",
            text:
              "Workers have the right to know about workplace hazards.",
          },
          {
            title: "Right to Participate",
            text:
              "Workers have the right to participate in health and safety programs.",
          },
          {
            title: "Right to Refuse",
            text:
              "Workers may refuse unsafe work in accordance with applicable occupational health and safety legislation.",
          },
        ],
      },
    ],

    interaction: "scenario",

    remember:
      "Workers have the right to know, participate, and refuse unsafe work according to applicable legislation.",

    prev: "module-11",
    next: "knowledge-check",
  },

  /* =========================================================
     KNOWLEDGE CHECK
  ========================================================= */

  {
    slug: "knowledge-check",
    label: "Knowledge Check",
    title: "Knowledge Check",
    subtitle: "Review the key WHMIS concepts",

    intro:
      "Complete this practice review before taking the Final Assessment.",

    blocks: [
      {
        type: "text",
        title: "Practice before the final assessment",
        text:
          "The Knowledge Check gives immediate feedback so you can review any topic you are unsure about.",
      },
    ],

    interaction: "knowledge",

    remember:
      "Use the Knowledge Check to identify areas you want to review before the Final Assessment.",

    prev: "module-12",
    next: "final-assessment",
  },
];

export const finalAssessmentConfig = {
  passingScore: 80,
  sourceQuestionCount: 10,
  title: "Final Assessment",
  description:
    "The Final Assessment covers the key WHMIS topics presented throughout the course.",
};

export const trainingSummary = {
  title: "Training Summary",

  items: [
    "Read the label before using any hazardous product",
    "Review the Safety Data Sheet",
    "Wear the required PPE",
    "Follow workplace procedures",
    "Report damaged labels, spills, or unsafe conditions immediately",
    "Never use a hazardous product unless you understand how to use it safely",
  ],
};

export const bySlug = (slug: string) =>
  modules.find((module) => module.slug === slug);