export const articlesData = [
  {
    _id: "1",
    title: "Keir Stamer pounds Zelensky",
    description:
      "Zelensky met Keir Stamer at 10 Downing Street and got pounded. We have never seen a pounding like this.",
    date: "Feb 25, 2025",
    readTime: "5 mins",
    category: "Research",
    author: "John Doe",
    image:
      "https://media.cnn.com/api/v1/images/stellar/prod/2025-03-01t174617z-1698872933-rc2h4dapo419-rtrmadp-3-ukraine-crisis-britain.jpg?c=16x9&q=h_653,w_1160,c_fill/f_webp",
    keyTakeaways: [
      "Zelensky faced intense questioning from Keir Starmer.",
      "Discussions revolved around UK-Ukraine military support.",
      "Keir Starmer emphasized diplomatic negotiations over conflict escalation.",
    ],
    content: [
      {
        heading: "The Background",
        text: "Keir Starmer met with President Zelensky at 10 Downing Street to discuss pressing issues surrounding the ongoing war in Ukraine.",
      },
      {
        heading: "The Key Issues Discussed",
        text: "Military aid, diplomatic relations, and potential strategies to de-escalate the conflict were the major topics during the discussion.",
        image: "https://source.unsplash.com/800x400/?politics,meeting",
      },
      {
        heading: "Starmer’s Stance",
        text: "The UK opposition leader strongly advocated for a balanced approach to military support, urging NATO partners to remain cautious.",
        quote:
          "The UK must provide support, but not at the cost of escalating tensions in Europe. — Keir Starmer",
      },
    ],
    relatedArticles: [
      { id: "2", title: "Ukraine Conflict: Latest Updates" },
      { id: "3", title: "How the UK is Supporting Ukraine in 2025" },
    ],
  },
  {
    _id: "2",
    title: "The Impact of AI on Political Decisions",
    description:
      "AI is playing an increasing role in shaping political narratives and decision-making processes worldwide.",
    date: "March 10, 2025",
    readTime: "6 mins",
    category: "Technology",
    author: "Sarah Smith",
    image: "https://source.unsplash.com/800x400/?AI,politics",
    keyTakeaways: [
      "AI is used for political campaigns and voter analysis.",
      "Governments are leveraging AI for policymaking.",
      "Concerns over AI bias and misinformation persist.",
    ],
    content: [
      {
        heading: "AI in Political Campaigns",
        text: "Political parties now use AI-driven analytics to predict voter behavior and optimize their campaign strategies.",
        image: "https://source.unsplash.com/800x400/?analytics,politics",
      },
      {
        heading: "Ethical Concerns with AI in Politics",
        text: "While AI can enhance efficiency, there are growing concerns about potential bias and misinformation spreading through automated political campaigns.",
        quote:
          "AI should be a tool for transparency, not manipulation. — AI Ethics Committee",
      },
    ],
    relatedArticles: [
      { id: "1", title: "Keir Stamer pounds Zelensky" },
      { id: "4", title: "The Role of AI in National Security" },
    ],
  },
  {
    _id: "3",
    title: "Economic Recovery Post-Pandemic",
    description:
      "How global economies are bouncing back after the COVID-19 pandemic.",
    date: "April 5, 2025",
    readTime: "8 mins",
    category: "Economy",
    author: "Michael Brown",
    image: "https://source.unsplash.com/800x400/?economy,recovery",
    keyTakeaways: [
      "Global GDP is projected to grow by 4% in 2025.",
      "Unemployment rates are declining as businesses recover.",
      "Governments are investing heavily in infrastructure projects.",
    ],
    content: [
      {
        heading: "Global Economic Trends",
        text: "After years of uncertainty, economies worldwide are showing signs of strong recovery, driven by policy support and increased consumer demand.",
      },
      {
        heading: "The Role of Government Stimulus",
        text: "Stimulus packages in major economies have helped stabilize markets and provide relief to struggling businesses.",
        quote:
          "Economic stability is built on strong policies and public trust. — IMF",
      },
    ],
    relatedArticles: [
      { id: "2", title: "The Impact of AI on Political Decisions" },
      { id: "5", title: "How Inflation is Affecting Global Trade" },
    ],
  },
];

export default articlesData;
