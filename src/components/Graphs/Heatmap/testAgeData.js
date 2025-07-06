export function getAgeData() {
  const raw = [
    {
      "13 - 17 (44)": 17.0,
      "18 - 24 (38)": 13.0,
      "25 - 34 (44)": 8.0,
      "35 - 44 (42)": 9.0,
      "45 - 54 (45)": 13.0,
      "55 - 64 (44)": 11.0,
      "65+ (43)": 18.0,
      Option: "I want to work well with others in games.",
      Overall: 13.0,
      Question:
        "Describe a situation that is important to you personally when you want to build stronger friendships with classmates.",
    },
    {
      "13 - 17 (44)": 19.0,
      "18 - 24 (38)": 10.0,
      "25 - 34 (44)": 11.0,
      "35 - 44 (42)": 3.0,
      "45 - 54 (45)": 16.0,
      "55 - 64 (44)": 11.0,
      "65+ (43)": 10.0,
      Option: "I enjoy team activities that make us closer.",
      Overall: 11.0,
      Question:
        "Describe a situation that is important to you personally when you want to build stronger friendships with classmates.",
    },
    {
      "13 - 17 (44)": 10.0,
      "18 - 24 (38)": 13.0,
      "25 - 34 (44)": 6.0,
      "35 - 44 (42)": 13.0,
      "45 - 54 (45)": 17.0,
      "55 - 64 (44)": 13.0,
      "65+ (43)": 15.0,
      Option: "I look for ways to share ideas and listen to friends.",
      Overall: 12.0,
      Question:
        "Describe a situation that is important to you personally when you want to build stronger friendships with classmates.",
    },
    {
      "13 - 17 (44)": 16.0,
      "18 - 24 (38)": 17.0,
      "25 - 34 (44)": 11.0,
      "35 - 44 (42)": 11.0,
      "45 - 54 (45)": 13.0,
      "55 - 64 (44)": 18.0,
      "65+ (43)": 13.0,
      Option: "I want to feel included and respected by everyone.",
      Overall: 14.0,
      Question:
        "Describe a situation that is important to you personally when you want to build stronger friendships with classmates.",
    },
    {
      "13 - 17 (44)": 12.0,
      "18 - 24 (38)": 1.0,
      "25 - 34 (44)": 18.0,
      "35 - 44 (42)": 13.0,
      "45 - 54 (45)": 16.0,
      "55 - 64 (44)": 10.0,
      "65+ (43)": 18.0,
      Option: "I enjoy figuring out tricky clues in games.",
      Overall: 13.0,
      Question:
        "Describe a situation that is important to you personally when you need to solve a challenging problem or puzzle.",
    },
    {
      "13 - 17 (44)": 14.0,
      "18 - 24 (38)": 14.0,
      "25 - 34 (44)": 17.0,
      "35 - 44 (42)": 12.0,
      "45 - 54 (45)": 13.0,
      "55 - 64 (44)": 3.0,
      "65+ (43)": 12.0,
      Option: "I want to challenge myself to think hard.",
      Overall: 12.0,
      Question:
        "Describe a situation that is important to you personally when you need to solve a challenging problem or puzzle.",
    },
    {
      "13 - 17 (44)": 14.0,
      "18 - 24 (38)": 14.0,
      "25 - 34 (44)": 10.0,
      "35 - 44 (42)": 13.0,
      "45 - 54 (45)": 19.0,
      "55 - 64 (44)": 8.0,
      "65+ (43)": 11.0,
      Option: "I like puzzles that make me think creatively.",
      Overall: 13.0,
      Question:
        "Describe a situation that is important to you personally when you need to solve a challenging problem or puzzle.",
    },
    {
      "13 - 17 (44)": 12.0,
      "18 - 24 (38)": 14.0,
      "25 - 34 (44)": 18.0,
      "35 - 44 (42)": 12.0,
      "45 - 54 (45)": 19.0,
      "55 - 64 (44)": 14.0,
      "65+ (43)": 7.0,
      Option: "I hope to get better at solving problems over time.",
      Overall: 14.0,
      Question:
        "Describe a situation that is important to you personally when you need to solve a challenging problem or puzzle.",
    },
    {
      "13 - 17 (44)": 13.0,
      "18 - 24 (38)": 8.0,
      "25 - 34 (44)": 15.0,
      "35 - 44 (42)": 7.0,
      "45 - 54 (45)": 12.0,
      "55 - 64 (44)": 15.0,
      "65+ (43)": 14.0,
      Option: "I want to get better at working with others.",
      Overall: 12.0,
      Question:
        "Describe a situation that is important to you personally when you're trying to learn new skills or improve yourself.",
    },
    {
      "13 - 17 (44)": 11.0,
      "18 - 24 (38)": 10.0,
      "25 - 34 (44)": 12.0,
      "35 - 44 (42)": 6.0,
      "45 - 54 (45)": 7.0,
      "55 - 64 (44)": 13.0,
      "65+ (43)": 4.0,
      Option: "I enjoy learning new ways to think and play.",
      Overall: 9.0,
      Question:
        "Describe a situation that is important to you personally when you're trying to learn new skills or improve yourself.",
    },
    {
      "13 - 17 (44)": 17.0,
      "18 - 24 (38)": 4.0,
      "25 - 34 (44)": 11.0,
      "35 - 44 (42)": 7.0,
      "45 - 54 (45)": 2.0,
      "55 - 64 (44)": 23.0,
      "65+ (43)": 13.0,
      Option: "I hope to become more strategic and smart.",
      Overall: 11.0,
      Question:
        "Describe a situation that is important to you personally when you're trying to learn new skills or improve yourself.",
    },
    {
      "13 - 17 (44)": 13.0,
      "18 - 24 (38)": 10.0,
      "25 - 34 (44)": 17.0,
      "35 - 44 (42)": 5.0,
      "45 - 54 (45)": 15.0,
      "55 - 64 (44)": 18.0,
      "65+ (43)": 12.0,
      Option: "I want to feel proud of my progress.",
      Overall: 13.0,
      Question:
        "Describe a situation that is important to you personally when you're trying to learn new skills or improve yourself.",
    },
    {
      "13 - 17 (44)": 6.0,
      "18 - 24 (38)": 18.0,
      "25 - 34 (44)": 12.0,
      "35 - 44 (42)": 17.0,
      "45 - 54 (45)": 3.0,
      "55 - 64 (44)": 12.0,
      "65+ (43)": 8.0,
      Option: "I want everyone to have fun together.",
      Overall: 11.0,
      Question:
        "Describe a situation that is important to you personally when you are excited about playing a game with friends or family.",
    },
    {
      "13 - 17 (44)": 4.0,
      "18 - 24 (38)": 17.0,
      "25 - 34 (44)": 8.0,
      "35 - 44 (42)": 20.0,
      "45 - 54 (45)": 5.0,
      "55 - 64 (44)": 11.0,
      "65+ (43)": 12.0,
      Option: "I enjoy creative and lively game moments.",
      Overall: 11.0,
      Question:
        "Describe a situation that is important to you personally when you are excited about playing a game with friends or family.",
    },
    {
      "13 - 17 (44)": 5.0,
      "18 - 24 (38)": 9.0,
      "25 - 34 (44)": 10.0,
      "35 - 44 (42)": 18.0,
      "45 - 54 (45)": 3.0,
      "55 - 64 (44)": 7.0,
      "65+ (43)": 11.0,
      Option: "I hope the game helps us communicate better.",
      Overall: 9.0,
      Question:
        "Describe a situation that is important to you personally when you are excited about playing a game with friends or family.",
    },
    {
      "13 - 17 (44)": 5.0,
      "18 - 24 (38)": 12.0,
      "25 - 34 (44)": 10.0,
      "35 - 44 (42)": 19.0,
      "45 - 54 (45)": 5.0,
      "55 - 64 (44)": 7.0,
      "65+ (43)": 7.0,
      Option: "I want to feel happy and connected during play.",
      Overall: 9.0,
      Question:
        "Describe a situation that is important to you personally when you are excited about playing a game with friends or family.",
    },
  ];

  const segments = [
    "Overall",
    "13 - 17 (44)",
    "18 - 24 (38)",
    "25 - 34 (44)",
    "35 - 44 (42)",
    "45 - 54 (45)",
    "55 - 64 (44)",
    "65+ (43)",
  ];

  const result = [];

  for (const item of raw) {
    for (const segment of segments) {
      result.push({
        Type: segment, // X-axis
        Option: item.Option, // Y-axis
        Score: item[segment], // Color
      });
    }
  }

  return result;
}

// {
//       option: "I want to go out and have fun",
//       overall: "Overall",
//       temperature: 1.2,
// },

//

// {
//         type: "heatmap",
//         xKey: "overall",
//         xName: "Overall",
//         yKey: "option",
//         yName: "Option",
//         colorKey: "temperature",
//         colorName: "Temperature",
//       },
