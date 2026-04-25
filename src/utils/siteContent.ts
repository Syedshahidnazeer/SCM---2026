import type { Feature, NavLink, StoreInfo } from "@/types";

export const storeInfo: StoreInfo = {
  name: "Syed Cycle Mart",
  address: "13/200, Trunk Road, Ganagapeta, Kadapa, Andhra Pradesh 516001",
  mapUrl: "https://maps.app.goo.gl/GF8iMJ1123zoDeen9",
  hours: "Open daily, 9:00 AM - 9:00 PM",
  locationLine: "Trunk Road, Ganagapeta, Kadapa"
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Cycles", href: "#cycles" },
  { label: "Visit", href: "#visit" }
];

export const features: Feature[] = [
  {
    eyebrow: "Kids",
    title: "Right-size cycles for growing riders",
    description:
      "A clear way for parents to compare size, comfort, training wheels, baskets, bells, and everyday durability."
  },
  {
    eyebrow: "Gear",
    title: "Sporty rides for school, fitness, and fun",
    description:
      "Position gear cycles and MTB-style models for students and young riders who care about style and control."
  },
  {
    eyebrow: "Family",
    title: "Ladies and gents cycles for daily use",
    description:
      "Simple, practical buying paths for errands, commuting, exercise, and weekend rides around Kadapa."
  },
  {
    eyebrow: "Repair",
    title: "Quick service for the parts that matter",
    description:
      "Highlight punctures, brakes, tyres, chains, pedals, seats, baskets, stands, and regular maintenance."
  },
  {
    eyebrow: "Local",
    title: "A Trunk Road shop built around trust",
    description:
      "The experience feels local and direct: clear directions, practical help, UPI-friendly buying, and open daily hours."
  }
];
