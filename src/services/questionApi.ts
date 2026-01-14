import { API_ENDPOINT } from "@/config/gameConfig";

export interface Question {
  id: number;
  question: string;
  type: "text" | "image" | "latex";
  imageUrl?: string;
  answers: string[];
  correctIndex: number;
}

// Placeholder for API integration
// This function will be implemented when the API is provided
export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    // TODO: Implement API call when endpoint details are provided
    const response = await fetch(`${API_ENDPOINT}/api/questions`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }
    
    const data = await response.json();
    return data as Question[];
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};
