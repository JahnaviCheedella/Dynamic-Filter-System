import type { Employee } from "../types/data.types";

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "HR",
  "Finance",
  "Operations",
  "Design",
];

const roles = [
  "Senior Developer",
  "Junior Developer",
  "Manager",
  "Director",
  "Analyst",
  "Coordinator",
  "Designer",
  "Lead",
];

const skills = [
  "React",
  "TypeScript",
  "Node.js",
  "GraphQL",
  "Python",
  "AWS",
  "Docker",
  "SQL",
  "MongoDB",
  "Vue.js",
];

const cities = [
  "Hyderabad",
  "Bengaluru",
  "Chennai",
  "Mumbai",
  "Delhi",
  "Pune",
  "Kolkata",
  "Ahmedabad",
  "Jaipur",
  "Coimbatore",
];

const states = [
  "Andhra Pradesh",
  "Telangana",
  "Karnataka",
  "Tamil Nadu",
  "Maharashtra",
  "Delhi",
  "West Bengal",
  "Gujarat",
  "Rajasthan",
  "Kerala",
];

const firstNames = [
  "Aarav",
  "Ananya",
  "Rohan",
  "Sneha",
  "Rahul",
  "Priya",
  "Karthik",
  "Pooja",
  "Vikram",
  "Neha",
  "Arjun",
  "Kavya",
  "Suresh",
  "Divya",
  "Amit",
];

const lastNames = [
  "Sharma",
  "Reddy",
  "Patel",
  "Iyer",
  "Nair",
  "Gupta",
  "Mehta",
  "Rao",
  "Choudhary",
  "Verma",
  "Singh",
  "Das",
  "Banerjee",
  "Kulkarni",
  "Joshi",
];

// Get a random item from an array
const randomItem = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

// Generate a random date between start and end
const randomDate = (start: Date, end: Date): string => {
  const date = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return date.toISOString().split("T")[0];
};

// Generate a random set of skills
const randomSkills = (): string[] => {
  const count = Math.floor(Math.random() * 4) + 2;
  const selected = new Set<string>();

  while (selected.size < count) {
    selected.add(randomItem(skills));
  }

  return Array.from(selected);
};

export const generateMockData = (count: number = 50): Employee[] => {
  const employees: Employee[] = [];

  for (let i = 1; i <= count; i++) {
    employees.push({
      id: i,
      name: `${randomItem(firstNames)} ${randomItem(lastNames)}`,
      email: `employee${i}@company.com`,
      department: randomItem(departments),
      role: randomItem(roles),
      salary: Math.floor(Math.random() * 100000) + 50000,
      joinDate: randomDate(new Date(2018, 0, 1), new Date(2024, 11, 31)),
      isActive: Math.random() > 0.2,
      skills: randomSkills(),
      address: {
        city: randomItem(cities),
        state: randomItem(states),
        country: "USA",
      },
      projects: Math.floor(Math.random() * 10) + 1,
      lastReview: randomDate(new Date(2023, 0, 1), new Date(2024, 11, 31)),
      performanceRating: Math.round((Math.random() * 2 + 3) * 10) / 10,
    });
  }

  return employees;
};

