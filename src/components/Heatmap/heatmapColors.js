const colors = {
  green: "#10B981",
  red: "#D7263D",
  blue: "#60A5FA",
  yellow: "#B8860B",
};

const heatmapColors = {
  "Top-Down": {
    ranges: [
      { from: -1000, to: 0, color: "#767676", name: "Low Priority" },
      { from: 0, to: 20, color: "#767676", name: "Medium Priority" },
      { from: 20, to: 1000, color: colors.green, name: "High Priority" }, // Green
    ],
  },

  // RGB 218 235 212

  "Bottom-Up": {
    ranges: [
      { from: -1000, to: 5, color: "#767676", name: "Low Influence" },
      { from: 5, to: 15, color: "#767676", name: "Moderate Influence" },
      { from: 15, to: 1000, color: colors.red, name: "High Influence" }, // Red
    ],
  },

  "Response Time": {
    ranges: [
      { from: 0.0, to: 0.1, color: "#e3e3e3", name: "Unavailable" },
      { from: 0.1, to: 0.2, color: colors.blue, name: "Fast Response" }, // Blue
      { from: 0.3, to: 1.2, color: "767676", name: "Moderate Response" }, // Gray
      { from: 1.3, to: 100, color: colors.yellow, name: "Slow Response" }, // Yellow
    ],
  },
};

export default heatmapColors;
