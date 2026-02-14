import { saveSession, getSession } from "./session";

// Mock delays to simulate AI processing
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const analyzeProfile = async (text: string) => {
    await delay(2000);
    // Deterministic mock response based on prompt example
    const result = {
        technical_skills: [
            { name: "React", level: 8, category: "Frontend" },
            { name: "TypeScript", level: 7, category: "Frontend" },
            { name: "Node.js", level: 5, category: "Backend" },
            { name: "Python", level: 4, category: "Backend" },
            { name: "SQL", level: 3, category: "Database" },
        ],
        soft_skills: [
            { name: "Communication", level: 9 },
            { name: "Problem Solving", level: 7 },
            { name: "Leadership", level: 5 },
            { name: "Adaptability", level: 8 },
        ],
        experience_level: "Intermediate",
        domain_exposure: ["Web Development", "SaaS", "E-commerce"],
    };
    saveSession({ profileText: text, extractedSkills: result });
    return result;
};

export const getMarketIntel = async (role: string) => {
    await delay(1500);
    const result = {
        role,
        demandLevel: "Very High",
        salaryRange: "$120k - $160k",
        requiredSkills: [
            { name: "Python", level: 9, important: true },
            { name: "Machine Learning", level: 9, important: true },
            { name: "Deep Learning", level: 8, important: true },
            { name: "Linear Algebra", level: 7, important: false },
            { name: "Docker", level: 6, important: false },
            { name: "Cloud Basics", level: 6, important: false },
        ],
        marketTrends: "Rising demand in Fintech and Healthcare AI.",
    };
    saveSession({ dreamRole: role, marketSkills: result });
    return result;
};

export const runGapAnalysis = async () => {
    await delay(2000);
    const session = getSession();

    // Simulate smart comparison
    const result = {
        missing_skills: ["Deep Learning", "Linear Algebra", "Docker", "Cloud Basics"],
        weak_skills: [
            { name: "Python", user: 4, target: 9, gap: 5 },
            { name: "Machine Learning", user: 0, target: 9, gap: 9 } // Assuming 0 if not found
        ],
        strong_skills: ["React", "Communication", "TypeScript"], // Skills user has that exceed or match
        overall_gap_score: 6.4, // 0-10 (High gap)
        priority_order: ["Machine Learning", "Deep Learning", "Python", "Docker"]
    };
    saveSession({ gapAnalysis: result });
    return result;
}

export const generateRoadmap = async (hoursPerDay: number = 1.5) => {
    await delay(3000);
    const result = {
        weeks: [
            {
                week: 1,
                title: "Foundations & Python Mastery",
                focus: "Python Mastery & Logic",
                tasks: [
                    { id: "w1-1", title: "Refresh Python Basics (Data Structures)", completed: false },
                    { id: "w1-2", title: "Git & GitHub Workflow (Team focus)", completed: false },
                    { id: "w1-3", title: "Mini Project: CLI Tool for data parsing", completed: false }
                ],
                status: "active",
                progress: 0
            },
            {
                week: 2,
                title: "Core ML Concepts",
                focus: "Intro to ML & Data",
                tasks: [
                    { id: "w2-1", title: "Pandas & NumPy refresher", completed: false },
                    { id: "w2-2", title: "Linear Regression from Scratch", completed: false },
                    { id: "w2-3", title: "One guided project (Housing Prices)", completed: false }
                ],
                status: "locked",
                progress: 0
            },
            {
                week: 3,
                title: "Market-Aligned Project",
                focus: "Model Deployment (Docker)",
                tasks: [
                    { id: "w3-1", title: "Dockerize a Flask App", completed: false },
                    { id: "w3-2", title: "Deploy to AWS Lambda", completed: false },
                    { id: "w3-3", title: "Resume Polish: Add ML keywords", completed: false }
                ],
                status: "locked",
                progress: 0
            },
            {
                week: 4,
                title: "Capstone & Validation",
                focus: "Capstone Project",
                tasks: [
                    { id: "w4-1", title: "Build End-to-End Pipeline", completed: false },
                    { id: "w4-2", title: "Start applying to Junior roles", completed: false }
                ],
                status: "locked",
                progress: 0
            }
        ]
    };
    saveSession({ roadmap: result });
    return result;
}

export const adaptRoadmap = async (progressPercent: number) => {
    await delay(2000);
    let strategy = "maintain";
    let reason = "On track.";

    if (progressPercent < 50) {
        strategy = "reinforce";
        reason = "Progress is below 50%. Reinforcing foundations.";
    } else if (progressPercent > 80) {
        strategy = "accelerate";
        reason = "Excellent progress. Accelerating to advanced topics.";
    }

    // Return a modified roadmap for demo effect
    const currentSession = getSession();
    const originalRoadmap = currentSession.roadmap || await generateRoadmap();

    // Deep copy
    const newRoadmap = JSON.parse(JSON.stringify(originalRoadmap));

    if (strategy === "reinforce") {
        newRoadmap.weeks[1].title = "Reinforced ML Concepts";
        newRoadmap.weeks[1].tasks.unshift({ id: "w2-rem-1", title: "Review: Python Functions", completed: false });
    }

    saveSession({ refinedRoadmap: newRoadmap });

    return {
        strategy,
        reason,
        updated_roadmap: newRoadmap
    };
}
