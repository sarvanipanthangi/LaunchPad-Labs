export interface SessionData {
    sessionId: string;
    profileText?: string;
    extractedSkills?: any;
    marketSkills?: any;
    gapAnalysis?: any;
    roadmap?: any;
    refinedRoadmap?: any;
    progress?: number;
    dreamRole?: string;
}

const STORAGE_KEY = "career_navigator_session";

export const getSession = (): SessionData => {
    if (typeof window === "undefined") return { sessionId: "demo-user" };
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : { sessionId: "demo-user" };
};

export const saveSession = (data: Partial<SessionData>) => {
    if (typeof window === "undefined") return;
    const current = getSession();
    const updated = { ...current, ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
};

export const clearSession = () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
};
