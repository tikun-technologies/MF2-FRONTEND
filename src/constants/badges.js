import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineClock } from "react-icons/hi";

export const BADGE_TYPES = {
  ongoing: {
    className: "badgeOngoing",
    icon: HiOutlineClock,
  },
  completed: {
    className: "badgeCompleted",
    icon: FaCheckCircle,
  },
  tag: {
    className: "badgeTag",
    icon: null,
    text: null,
  },
};
