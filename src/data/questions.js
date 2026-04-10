// Question bank for "Vivre ensemble au Grand-Duché de Luxembourg"
// 20+ questions per module (60 total)

export const questions = [
  // ─────────────────────────────────────────────────────────────
  // MODULE 1 – Fundamental Rights (20 questions)
  // Topics: 1848 Constitution, ECHR, Constitutional Court
  // ─────────────────────────────────────────────────────────────
  {
    id: 1,
    module: 1,
    question: "In which year was Luxembourg's first Constitution adopted?",
    options: ["1815", "1839", "1848", "1868"],
    answer: 2,
    explanation: "Luxembourg's first Constitution was adopted in 1848, following the revolutions that swept Europe that year."
  },
  {
    id: 2,
    module: 1,
    question: "The current Luxembourg Constitution in force dates from which year?",
    options: ["1848", "1856", "1868", "1919"],
    answer: 2,
    explanation: "The current Luxembourg Constitution dates from 1868 and has been amended many times since."
  },
  {
    id: 3,
    module: 1,
    question: "Which fundamental principle is enshrined in Article 11 of the Luxembourg Constitution?",
    options: ["The right to vote", "Equality before the law", "Freedom of the press", "The right to education"],
    answer: 1,
    explanation: "Article 11 of the Constitution guarantees equality before the law for all Luxembourgers."
  },
  {
    id: 4,
    module: 1,
    question: "The European Convention on Human Rights (ECHR) was adopted in which year?",
    options: ["1945", "1948", "1950", "1953"],
    answer: 2,
    explanation: "The ECHR was adopted in Rome on 4 November 1950 under the auspices of the Council of Europe."
  },
  {
    id: 5,
    module: 1,
    question: "Which institution enforces the European Convention on Human Rights at the international level?",
    options: ["The European Court of Justice", "The European Court of Human Rights", "The United Nations Human Rights Committee", "The International Criminal Court"],
    answer: 1,
    explanation: "The European Court of Human Rights (ECtHR) in Strasbourg is the judicial body that enforces the ECHR."
  },
  {
    id: 6,
    module: 1,
    question: "In which city is the European Court of Human Rights located?",
    options: ["Brussels", "Luxembourg City", "Geneva", "Strasbourg"],
    answer: 3,
    explanation: "The European Court of Human Rights is located in Strasbourg, France."
  },
  {
    id: 7,
    module: 1,
    question: "The Luxembourg Constitutional Court was established by a law dated:",
    options: ["1868", "1945", "1997", "2004"],
    answer: 2,
    explanation: "The Constitutional Court was established by a law of 27 July 1997, making it relatively recent in Luxembourg's legal history."
  },
  {
    id: 8,
    module: 1,
    question: "What is the primary role of the Luxembourg Constitutional Court?",
    options: [
      "To try criminal cases involving government ministers",
      "To rule on the constitutionality of laws",
      "To manage elections and electoral disputes",
      "To advise the Grand Duke on legislative matters"
    ],
    answer: 1,
    explanation: "The Constitutional Court rules on the conformity of laws with the Constitution, upon referral from ordinary courts."
  },
  {
    id: 9,
    module: 1,
    question: "Who can refer a question to the Luxembourg Constitutional Court?",
    options: [
      "Any citizen directly",
      "Only the Grand Duke",
      "Any ordinary or administrative court",
      "Only the Chamber of Deputies"
    ],
    answer: 2,
    explanation: "Only courts (ordinary or administrative) can refer a question of constitutionality to the Constitutional Court; citizens cannot do so directly."
  },
  {
    id: 10,
    module: 1,
    question: "Which article of the ECHR guarantees the right to a fair trial?",
    options: ["Article 2", "Article 5", "Article 6", "Article 10"],
    answer: 2,
    explanation: "Article 6 of the ECHR guarantees the right to a fair and public hearing within a reasonable time by an independent and impartial tribunal."
  },
  {
    id: 11,
    module: 1,
    question: "Freedom of expression in Luxembourg is guaranteed by:",
    options: [
      "Only European Union law",
      "The Luxembourg Constitution and the ECHR",
      "Only the Criminal Code",
      "A Grand-Ducal regulation"
    ],
    answer: 1,
    explanation: "Freedom of expression is protected by both Article 24 of the Luxembourg Constitution and Article 10 of the ECHR."
  },
  {
    id: 12,
    module: 1,
    question: "The right to life is enshrined in which article of the European Convention on Human Rights?",
    options: ["Article 1", "Article 2", "Article 3", "Article 4"],
    answer: 1,
    explanation: "Article 2 of the ECHR protects the right to life and sets strict conditions under which it may be limited."
  },
  {
    id: 13,
    module: 1,
    question: "The prohibition of torture and inhuman treatment is covered by which ECHR article?",
    options: ["Article 2", "Article 3", "Article 5", "Article 8"],
    answer: 1,
    explanation: "Article 3 of the ECHR absolutely prohibits torture, inhuman or degrading treatment or punishment."
  },
  {
    id: 14,
    module: 1,
    question: "How many judges sit on the Luxembourg Constitutional Court?",
    options: ["3", "5", "9", "15"],
    answer: 2,
    explanation: "The Luxembourg Constitutional Court is composed of 9 judges."
  },
  {
    id: 15,
    module: 1,
    question: "The 1848 Constitution of Luxembourg was influenced primarily by:",
    options: [
      "The American Declaration of Independence",
      "The Belgian Constitution of 1831",
      "The French Civil Code of 1804",
      "The German Basic Law of 1848"
    ],
    answer: 1,
    explanation: "Luxembourg's 1848 Constitution was heavily inspired by the Belgian Constitution of 1831, itself a model liberal constitution."
  },
  {
    id: 16,
    module: 1,
    question: "Which right is NOT guaranteed by the Luxembourg Constitution?",
    options: [
      "The right to work",
      "Freedom of religion",
      "The right to bear arms",
      "The right to assemble peacefully"
    ],
    answer: 2,
    explanation: "The right to bear arms is not a constitutional right in Luxembourg. The Constitution does guarantee freedom of religion, the right to work, and the right to peaceful assembly."
  },
  {
    id: 17,
    module: 1,
    question: "The Council of Europe, which drafted the ECHR, was founded in:",
    options: ["1945", "1949", "1951", "1957"],
    answer: 1,
    explanation: "The Council of Europe was founded in 1949 in Strasbourg. It is distinct from the European Union."
  },
  {
    id: 18,
    module: 1,
    question: "How many member states currently belong to the Council of Europe?",
    options: ["27", "36", "46", "57"],
    answer: 2,
    explanation: "The Council of Europe has 46 member states (as of 2023, following Russia's exclusion)."
  },
  {
    id: 19,
    module: 1,
    question: "Under Luxembourg's Constitution, which branch of government holds legislative power?",
    options: ["The Grand Duke", "The Chamber of Deputies", "The State Council", "The Government"],
    answer: 1,
    explanation: "Legislative power is exercised by the Chamber of Deputies (Chambre des Députés)."
  },
  {
    id: 20,
    module: 1,
    question: "The constitutional principle of the 'rule of law' (État de droit) means that:",
    options: [
      "The state can act without legal basis if it is for public benefit",
      "All state actions must be based on and limited by law",
      "Laws are only valid once approved by referendum",
      "The Grand Duke has supreme authority over all laws"
    ],
    answer: 1,
    explanation: "The rule of law means that all state actions, including those of government, must have a legal basis and comply with existing law."
  },

  // ─────────────────────────────────────────────────────────────
  // MODULE 2 – State & Municipal Institutions (20 questions)
  // Topics: Role of Grand Duke, 3 branches of power, 1918/19 crisis
  // ─────────────────────────────────────────────────────────────
  {
    id: 21,
    module: 2,
    question: "What form of government does Luxembourg have?",
    options: ["Presidential republic", "Parliamentary republic", "Constitutional monarchy", "Federal monarchy"],
    answer: 2,
    explanation: "Luxembourg is a constitutional monarchy where the Grand Duke is head of state but power is exercised by an elected government."
  },
  {
    id: 22,
    module: 2,
    question: "The current Grand Duke of Luxembourg is:",
    options: ["Grand Duke Jean", "Grand Duke Henri", "Grand Duke Guillaume", "Grand Duke Adolphe"],
    answer: 1,
    explanation: "Grand Duke Henri has been the reigning Grand Duke since 7 October 2000, when he succeeded his father, Grand Duke Jean."
  },
  {
    id: 23,
    module: 2,
    question: "Under the Luxembourg Constitution, who formally appoints the Prime Minister?",
    options: ["The Chamber of Deputies by a vote", "The Grand Duke", "The State Council", "The Constitutional Court"],
    answer: 1,
    explanation: "The Grand Duke formally appoints the Prime Minister (and other ministers) following parliamentary elections."
  },
  {
    id: 24,
    module: 2,
    question: "What is the name of the upper advisory chamber in Luxembourg's legislative system?",
    options: ["The Senate", "The State Council (Conseil d'État)", "The Federal Council", "The Republic Council"],
    answer: 1,
    explanation: "The State Council (Conseil d'État) is Luxembourg's advisory body that reviews legislation but has no direct legislative power."
  },
  {
    id: 25,
    module: 2,
    question: "How many deputies are elected to the Luxembourg Chamber of Deputies?",
    options: ["40", "50", "60", "75"],
    answer: 2,
    explanation: "The Chamber of Deputies (Chambre des Députés) has 60 members elected by proportional representation."
  },
  {
    id: 26,
    module: 2,
    question: "How long is the term of office for members of the Luxembourg Chamber of Deputies?",
    options: ["3 years", "4 years", "5 years", "6 years"],
    answer: 2,
    explanation: "Deputies serve five-year terms and elections take place every five years."
  },
  {
    id: 27,
    module: 2,
    question: "The political crisis of 1918–1919 in Luxembourg was triggered by:",
    options: [
      "A military coup attempt",
      "Questions about collaboration during WWI and Grand Duchess Marie-Adélaïde's role",
      "A territorial dispute with France",
      "A financial collapse of the state"
    ],
    answer: 1,
    explanation: "After WWI, Luxembourg faced a political crisis questioning Grand Duchess Marie-Adélaïde's perceived pro-German sympathies; she abdicated in 1919 in favour of Charlotte."
  },
  {
    id: 28,
    module: 2,
    question: "Who succeeded Grand Duchess Marie-Adélaïde following the 1919 political crisis?",
    options: ["Grand Duke William IV", "Grand Duchess Charlotte", "Grand Duke Jean", "Grand Duke Henri"],
    answer: 1,
    explanation: "Grand Duchess Charlotte succeeded her sister Marie-Adélaïde on 9 January 1919 and reigned until 1964."
  },
  {
    id: 29,
    module: 2,
    question: "The 1919 referendum in Luxembourg asked the population to vote on:",
    options: [
      "Whether to join France or Belgium",
      "The form of government and the dynasty",
      "Introducing women's suffrage",
      "Joining the newly formed League of Nations"
    ],
    answer: 1,
    explanation: "The 1919 referendum asked Luxembourgers to choose between maintaining the monarchy or adopting a republic, and whether to favour economic union with France or Belgium."
  },
  {
    id: 30,
    module: 2,
    question: "The three traditional branches of power in a democratic state are:",
    options: [
      "Legislative, executive, and military",
      "Legislative, executive, and judicial",
      "Executive, administrative, and judicial",
      "Parliamentary, presidential, and judicial"
    ],
    answer: 1,
    explanation: "The doctrine of separation of powers identifies the legislative (makes laws), executive (implements laws), and judicial (interprets laws) branches."
  },
  {
    id: 31,
    module: 2,
    question: "In Luxembourg, the executive power is exercised by:",
    options: [
      "The Chamber of Deputies alone",
      "The Grand Duke and the Government (Council of Ministers)",
      "The Constitutional Court",
      "The State Council"
    ],
    answer: 1,
    explanation: "Executive power is vested in the Grand Duke and the Government (Council of Ministers), though in practice the government holds effective power."
  },
  {
    id: 32,
    module: 2,
    question: "Judicial power in Luxembourg is exercised by:",
    options: [
      "The Grand Duke",
      "The Government",
      "The independent courts and tribunals",
      "The State Council"
    ],
    answer: 2,
    explanation: "Judicial power is exercised by independent courts and tribunals. Judges are independent and irremovable."
  },
  {
    id: 33,
    module: 2,
    question: "Luxembourg is divided into how many cantons?",
    options: ["6", "10", "12", "16"],
    answer: 2,
    explanation: "Luxembourg is divided into 12 cantons for administrative and electoral purposes."
  },
  {
    id: 34,
    module: 2,
    question: "The head of a Luxembourg commune (municipality) is called:",
    options: ["The Mayor (Bourgmestre)", "The Prefect", "The Burgrave", "The Canton Chief"],
    answer: 0,
    explanation: "The head of a Luxembourg commune is called the Bourgmestre (Burgomaster/Mayor), who is part of the communal college of aldermen (Schöffenrat)."
  },
  {
    id: 35,
    module: 2,
    question: "How many communes (municipalities) does Luxembourg currently have (approx.)?",
    options: ["48", "102", "116", "243"],
    answer: 1,
    explanation: "Following mergers, Luxembourg now has approximately 102 communes (the number has been reduced through mergers over the years)."
  },
  {
    id: 36,
    module: 2,
    question: "The Grand Duke's role in the legislative process is to:",
    options: [
      "Draft all laws",
      "Sanction and promulgate laws passed by the Chamber",
      "Veto any law he disagrees with permanently",
      "Attend all parliamentary debates"
    ],
    answer: 1,
    explanation: "The Grand Duke sanctions (approves) and promulgates laws passed by the Chamber of Deputies, giving them legal force."
  },
  {
    id: 37,
    module: 2,
    question: "In 2008, a constitutional crisis arose because Grand Duke Henri threatened to refuse to sign which law?",
    options: [
      "The law on same-sex marriage",
      "The law on euthanasia",
      "The law on abortion",
      "The law on immigration"
    ],
    answer: 1,
    explanation: "In 2008, Grand Duke Henri stated he could not conscientiously sign the euthanasia law. This led to a constitutional amendment removing his power to refuse legislation, leaving him only the role of promulgation."
  },
  {
    id: 38,
    module: 2,
    question: "Which body provides non-binding advisory opinions on draft legislation in Luxembourg?",
    options: [
      "The Constitutional Court",
      "The State Council (Conseil d'État)",
      "The Administrative Tribunal",
      "The Chamber of Commerce"
    ],
    answer: 1,
    explanation: "The State Council (Conseil d'État) gives advisory opinions on draft laws but its opinions are not binding."
  },
  {
    id: 39,
    module: 2,
    question: "What is the minimum voting age for national elections in Luxembourg?",
    options: ["16", "18", "21", "25"],
    answer: 1,
    explanation: "Citizens must be at least 18 years old to vote in national elections in Luxembourg."
  },
  {
    id: 40,
    module: 2,
    question: "The principle of 'separation of powers' was notably developed by which philosopher?",
    options: ["Jean-Jacques Rousseau", "Voltaire", "Montesquieu", "John Locke"],
    answer: 2,
    explanation: "Montesquieu formulated the doctrine of separation of powers in his work 'The Spirit of the Laws' (1748), distinguishing legislative, executive, and judicial powers."
  },

  // ─────────────────────────────────────────────────────────────
  // MODULE 3 – History & European Integration (20 questions)
  // Topics: 963 Lucilinburhuc, 1839 independence, Steel industry, Schengen
  // ─────────────────────────────────────────────────────────────
  {
    id: 41,
    module: 3,
    question: "The first written mention of Luxembourg's existence dates to:",
    options: ["843 AD", "963 AD", "1054 AD", "1214 AD"],
    answer: 1,
    explanation: "In 963 AD, Count Siegfried of the Ardennes acquired a rocky promontory called 'Lucilinburhuc' (Little Fortress), which is considered the founding act of Luxembourg."
  },
  {
    id: 42,
    module: 3,
    question: "What does 'Lucilinburhuc' mean?",
    options: ["Great fortress", "Little fortress", "River crossing", "Royal castle"],
    answer: 1,
    explanation: "'Lucilinburhuc' is an old Germanic term meaning 'little fortress' or 'small castle', referring to the rocky stronghold acquired by Count Siegfried."
  },
  {
    id: 43,
    module: 3,
    question: "Count Siegfried acquired the rock of Lucilinburhuc by exchanging it with:",
    options: [
      "The King of France",
      "The Abbey of Saint-Maximin in Trier",
      "The Holy Roman Emperor",
      "The Bishop of Metz"
    ],
    answer: 1,
    explanation: "Count Siegfried obtained the rock from the Abbey of Saint-Maximin in Trier (Trèves) in exchange for other lands."
  },
  {
    id: 44,
    module: 3,
    question: "Luxembourg gained its full independence and permanent neutrality in which year?",
    options: ["1815", "1830", "1839", "1867"],
    answer: 2,
    explanation: "The Treaty of London of 19 April 1839 recognised Luxembourg as an independent, neutral state and defined its territory (which was reduced by the cession of the larger western part to Belgium)."
  },
  {
    id: 45,
    module: 3,
    question: "The Treaty of London of 1839 resulted in:",
    options: [
      "Luxembourg gaining new territories from Germany",
      "Luxembourg losing its western French-speaking part to Belgium",
      "Luxembourg becoming part of the Netherlands",
      "Luxembourg joining the German Confederation"
    ],
    answer: 1,
    explanation: "The 1839 Treaty of London split the historic Duchy: the larger, French-speaking western part became the Belgian province of Luxembourg, while the smaller eastern part became the independent Grand Duchy."
  },
  {
    id: 46,
    module: 3,
    question: "After which major European event was Luxembourg's permanent neutrality and independence confirmed by the Treaty of London 1867?",
    options: [
      "The Franco-Prussian War",
      "The Austro-Prussian War and Luxembourg Crisis",
      "The Congress of Vienna",
      "The First World War"
    ],
    answer: 1,
    explanation: "Following the 1866 Austro-Prussian War and the 1867 Luxembourg Crisis (a dispute between France and Prussia), the Treaty of London 1867 guaranteed Luxembourg's perpetual neutrality and the demolition of its fortress."
  },
  {
    id: 47,
    module: 3,
    question: "Luxembourg's steel industry (iron and steel) developed primarily because of:",
    options: [
      "Deposits of coal found in the north of the country",
      "Iron ore deposits in the south ('Minette' region)",
      "Foreign investment from British companies",
      "Water power from the Moselle River"
    ],
    answer: 1,
    explanation: "Rich iron ore deposits (called 'Minette') in the southern region (the 'red lands' / terres rouges) made Luxembourg one of Europe's major steel producers from the late 19th century."
  },
  {
    id: 48,
    module: 3,
    question: "At its peak, Luxembourg was one of the world's largest producers of:",
    options: ["Coal", "Steel", "Aluminium", "Copper"],
    answer: 1,
    explanation: "Thanks to its iron ore deposits, Luxembourg became one of the world's largest per-capita steel producers, particularly in the late 19th and early 20th centuries."
  },
  {
    id: 49,
    module: 3,
    question: "The major Luxembourg steel company, founded in 1911, is known as:",
    options: ["ArcelorMittal", "ARBED (Aciéries Réunies de Burbach-Eich-Dudelange)", "Thyssen-Krupp", "Sidmar"],
    answer: 1,
    explanation: "ARBED (Aciéries Réunies de Burbach-Eich-Dudelange) was founded in 1911 and became one of the largest steel companies in Europe. It eventually merged into Arcelor, then ArcelorMittal."
  },
  {
    id: 50,
    module: 3,
    question: "The Schengen Agreement was signed on:",
    options: ["14 June 1985", "1 January 1993", "26 March 1995", "2 October 1997"],
    answer: 0,
    explanation: "The Schengen Agreement was signed on 14 June 1985 on a boat on the Moselle River near the village of Schengen, Luxembourg."
  },
  {
    id: 51,
    module: 3,
    question: "The Schengen Agreement was signed near which Luxembourg village?",
    options: ["Echternach", "Vianden", "Schengen", "Remich"],
    answer: 2,
    explanation: "The agreement was signed near the small wine-producing village of Schengen in southern Luxembourg, on the border with France and Germany."
  },
  {
    id: 52,
    module: 3,
    question: "The original signatories of the Schengen Agreement in 1985 were:",
    options: [
      "France, Germany, Luxembourg, Belgium, and the Netherlands",
      "France, Germany, Italy, Luxembourg, and Belgium",
      "All 10 EEC member states at the time",
      "France, Germany, and Luxembourg only"
    ],
    answer: 0,
    explanation: "The five original signatories were France, West Germany, Belgium, Luxembourg, and the Netherlands — the Benelux countries plus France and Germany."
  },
  {
    id: 53,
    module: 3,
    question: "What is the main purpose of the Schengen Area?",
    options: [
      "To create a single European currency",
      "To abolish passport controls at internal borders between member states",
      "To establish a common European army",
      "To harmonise tax rates across Europe"
    ],
    answer: 1,
    explanation: "The Schengen Area abolishes passport and border controls at the internal borders between participating countries, creating a zone of free movement."
  },
  {
    id: 54,
    module: 3,
    question: "Luxembourg was one of the founding members of which European community in 1951?",
    options: [
      "The European Economic Community (EEC)",
      "The European Coal and Steel Community (ECSC)",
      "The European Union",
      "The Council of Europe"
    ],
    answer: 1,
    explanation: "Luxembourg was a founding member of the European Coal and Steel Community (ECSC), established by the Treaty of Paris in 1951, alongside France, West Germany, Italy, Belgium, and the Netherlands."
  },
  {
    id: 55,
    module: 3,
    question: "The Treaty of Paris (1951) created the European Coal and Steel Community primarily to:",
    options: [
      "Fund post-war reconstruction through a Marshall Plan equivalent",
      "Pool coal and steel production to prevent another European war",
      "Create a free trade zone for agricultural products",
      "Establish a European central bank"
    ],
    answer: 1,
    explanation: "The ECSC was designed to pool Franco-German coal and steel production, making another European war 'not merely unthinkable, but materially impossible' (Schuman Declaration)."
  },
  {
    id: 56,
    module: 3,
    question: "The steel crisis of the 1970s–1980s severely affected Luxembourg because:",
    options: [
      "Iron ore reserves ran out completely",
      "Global overcapacity and cheaper imports made European steel uncompetitive",
      "Luxembourg was subject to trade sanctions",
      "A major strike halted all production"
    ],
    answer: 1,
    explanation: "The global steel crisis of the 1970s–80s hit Luxembourg hard: global overcapacity, rising energy costs, and cheaper steel from newly industrialising countries made the industry uncompetitive."
  },
  {
    id: 57,
    module: 3,
    question: "Following the decline of the steel industry, Luxembourg transformed its economy primarily through:",
    options: [
      "Tourism and agriculture",
      "Financial services and becoming a major European banking centre",
      "High-tech manufacturing",
      "Mining of new minerals"
    ],
    answer: 1,
    explanation: "Luxembourg successfully restructured its economy from steel to financial services, becoming a major European financial and banking centre from the 1970s onwards."
  },
  {
    id: 58,
    module: 3,
    question: "The Schengen Convention, implementing the 1985 agreement, entered into force in which year?",
    options: ["1985", "1990", "1995", "1999"],
    answer: 2,
    explanation: "The Schengen Convention was signed in 1990 but entered into force on 26 March 1995, when border controls were actually abolished between seven Schengen states."
  },
  {
    id: 59,
    module: 3,
    question: "How many countries are currently part of the Schengen Area (approx.)?",
    options: ["15", "22", "27", "29"],
    answer: 3,
    explanation: "As of 2024, the Schengen Area comprises 29 countries, including most EU member states plus Iceland, Norway, Switzerland, and Liechtenstein."
  },
  {
    id: 60,
    module: 3,
    question: "Luxembourg City became home to several key European institutions. Which is based there?",
    options: [
      "The European Parliament's main seat",
      "The European Court of Justice",
      "NATO headquarters",
      "The European Central Bank"
    ],
    answer: 1,
    explanation: "The European Court of Justice (ECJ) is based in Luxembourg City. The city also hosts the European Court of Auditors, the General Court, and parts of the European Commission and Council."
  }
];

export const MODULE_INFO = {
  1: {
    name: "Module 1",
    title: "Fundamental Rights",
    description: "1848 Constitution, European Convention on Human Rights, Constitutional Court",
    color: "blue",
    hours: 6,
    examQuestions: 10,
  },
  2: {
    name: "Module 2",
    title: "State & Municipal Institutions",
    description: "Role of the Grand Duke, three branches of power, 1918/19 political crisis",
    color: "emerald",
    hours: 12,
    examQuestions: 20,
  },
  3: {
    name: "Module 3",
    title: "History & European Integration",
    description: "963 Lucilinburhuc, 1839 independence, steel industry, Schengen Agreement",
    color: "amber",
    hours: 6,
    examQuestions: 10,
  },
};

export const EXAM_CONFIG = {
  totalQuestions: 40,
  passingScore: 28,
  durationMinutes: 60,
  distribution: { 1: 10, 2: 20, 3: 10 },
};
