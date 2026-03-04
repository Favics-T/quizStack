import { SiWolframmathematica, SiCssdesignawards, SiCodesignal } from "react-icons/si";
import { IoMdSettings } from "react-icons/io";
import { FaCode } from "react-icons/fa6";
import { AiFillPieChart } from "react-icons/ai";

export const techStacks = [
  {
    id: "frontend-engineering",
    name: "Frontend Engineering",
    icon: SiWolframmathematica,
    description: "React, UI architecture, state patterns, and performance.",
    accent: "#f47f52"
  },
  {
    id: "backend-engineering",
    name: "Backend Engineering",
    icon: IoMdSettings,
    description: "APIs, databases, auth, and scalable server design.",
    accent: "#1f9cb5"
  },
  {
    id: "data-analytics",
    name: "Data Analytics",
    icon: FaCode,
    description: "Insights, dashboards, SQL, and decision metrics.",
    accent: "#17a47d"
  },
  {
    id: "data-science",
    name: "Data Science",
    icon: AiFillPieChart,
    description: "ML workflows, feature engineering, and model evaluation.",
    accent: "#6d78f0"
  },
  {
    id: "ui-ux",
    name: "UI/UX",
    icon: SiCssdesignawards,
    description: "Interaction patterns, usability, and visual consistency.",
    accent: "#d9658f"
  },
  {
    id: "product-design",
    name: "Product Design",
    icon: SiCodesignal,
    description: "Discovery, iteration, and end-to-end product thinking.",
    accent: "#a17fe0"
  }
];

export const getStackById = (stackId) => techStacks.find((item) => item.id === stackId) || null


