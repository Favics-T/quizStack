import { getFallbackQuiz } from "./data";

const OPENAI_API_URL = "https://api.openai.com/v1/responses";
const MODEL = "gpt-4.1-mini";

const buildPrompt = (stackName) => `
Generate a quiz JSON array with exactly 20 questions for "${stackName}".

Rules:
1) Difficulty should progress from Beginner, to Intermediate, to Advanced.
2) Include a mix of:
   - MCQ: 4 options A, B, C, D and one correct option.
   - Open-ended: user types answer.
3) Each question object must include:
   - level: "Beginner" | "Intermediate" | "Advanced"
   - question: string
   - type: "mcq" or "open"
   - options: only for "mcq", shape { "A":"", "B":"", "C":"", "D":"" }
   - answer: for mcq use one letter "A"|"B"|"C"|"D"; for open use concise text
   - explanation: short explanation
4) Questions must be only about "${stackName}".
5) Return raw JSON only. No markdown, no code fences, no extra text.
`;

const extractJsonArray = (content) => {
  const start = content.indexOf("[");
  const end = content.lastIndexOf("]");
  if (start === -1 || end === -1 || end <= start) {
    throw new Error("Model response did not contain a JSON array.");
  }
  return content.slice(start, end + 1);
};

const isValidQuestion = (item) => {
  if (!item || typeof item !== "object") return false;
  const validLevel = ["Beginner", "Intermediate", "Advanced"].includes(item.level);
  const hasCore =
    typeof item.question === "string" &&
    typeof item.type === "string" &&
    typeof item.answer === "string" &&
    typeof item.explanation === "string";
  if (!validLevel || !hasCore) return false;

  if (item.type === "mcq") {
    const opts = item.options;
    const hasOptions =
      opts &&
      typeof opts === "object" &&
      typeof opts.A === "string" &&
      typeof opts.B === "string" &&
      typeof opts.C === "string" &&
      typeof opts.D === "string";
    const validAnswer = ["A", "B", "C", "D"].includes(item.answer);
    return hasOptions && validAnswer;
  }

  if (item.type === "open") {
    return !("options" in item);
  }

  return false;
};

const validateQuiz = (quiz) => {
  if (!Array.isArray(quiz) || quiz.length !== 20) {
    throw new Error("Expected exactly 20 questions from OpenAI.");
  }
  if (!quiz.every(isValidQuestion)) {
    throw new Error("OpenAI returned invalid quiz question format.");
  }
  const types = new Set(quiz.map((item) => item.type));
  if (!types.has("mcq") || !types.has("open")) {
    throw new Error("Quiz must contain both mcq and open questions.");
  }
  return quiz;
};

export async function fetchQuizFromOpenAI(stackName, stackId) {
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

  // No API key — go straight to fallback
  if (!apiKey) {
    return useFallback(stackId, "No OpenAI API key found — using local questions.");
  }

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: MODEL,
        input: buildPrompt(stackName)
      })
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`OpenAI request failed (${response.status}): ${message}`);
    }

    const payload = await response.json();
    const rawText =
      payload.output_text ??
      payload.output
        ?.flatMap((entry) => entry.content || [])
        .map((item) => item.text || "")
        .join("\n") ??
      "";

    if (!rawText) {
      throw new Error("OpenAI returned an empty response.");
    }

    const quiz = JSON.parse(extractJsonArray(rawText));
    return validateQuiz(quiz);
  } catch (err) {
    console.warn("OpenAI fetch failed — falling back to local questions.", err.message);
    return useFallback(stackId, err.message);
  }
}

function useFallback(stackId, reason) {
  const fallback = getFallbackQuiz(stackId);
  if (!fallback) {
    throw new Error(`${reason} — no local fallback available for this stack.`);
  }
  return fallback;
}
