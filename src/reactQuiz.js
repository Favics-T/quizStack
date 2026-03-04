export const reactQuiz = [
  {
    level: "Beginner",
    question: "What is React primarily used for?",
    type: "mcq",
    options: {
      A: "Managing SQL databases",
      B: "Building user interfaces",
      C: "Creating operating systems",
      D: "Compiling Java code"
    },
    answer: "B",
    explanation: "React is a JavaScript library focused on building UI components."
  },
  {
    level: "Beginner",
    question: "What does JSX stand for?",
    type: "open",
    answer: "JavaScript XML",
    acceptedAnswers: ["javascript xml", "jsx stands for javascript xml"],
    explanation: "JSX is a syntax extension that lets you write HTML-like markup in JavaScript."
  },
  {
    level: "Beginner",
    question: "Which hook is used to add state to a functional component?",
    type: "mcq",
    options: {
      A: "useEffect",
      B: "useRef",
      C: "useState",
      D: "useMemo"
    },
    answer: "C",
    explanation: "useState creates and updates local component state."
  },
  {
    level: "Beginner",
    question: "What is the name of the prop used to pass data from parent to child?",
    type: "open",
    answer: "props",
    acceptedAnswers: ["props", "property props"],
    explanation: "Props are read-only inputs passed into components."
  },
  {
    level: "Beginner",
    question: "Why is the key prop important when rendering lists?",
    type: "mcq",
    options: {
      A: "It adds default styles",
      B: "It encrypts list data",
      C: "It helps React identify changed items efficiently",
      D: "It converts arrays to objects"
    },
    answer: "C",
    explanation: "Keys help React track item identity and optimize updates."
  },
  {
    level: "Beginner",
    question: "Name the hook commonly used for side effects like API calls.",
    type: "open",
    answer: "useEffect",
    acceptedAnswers: ["useeffect", "use effect"],
    explanation: "useEffect handles effects such as fetching data and subscriptions."
  },
  {
    level: "Beginner",
    question: "What does one-way data flow mean in React?",
    type: "mcq",
    options: {
      A: "Data flows only from child to parent",
      B: "Data flows from parent to child",
      C: "Data flows only through CSS",
      D: "Data never changes"
    },
    answer: "B",
    explanation: "React data typically flows top-down from parent to child through props."
  },
  {
    level: "Intermediate",
    question: "What happens when useEffect has an empty dependency array []?",
    type: "mcq",
    options: {
      A: "It runs on every render",
      B: "It runs only once after initial render",
      C: "It never runs",
      D: "It runs only on unmount"
    },
    answer: "B",
    explanation: "An empty dependency array causes the effect to run once after mount."
  },
  {
    level: "Intermediate",
    question: "What is the term for an input whose value is controlled by React state?",
    type: "open",
    answer: "controlled component",
    acceptedAnswers: ["controlled component", "controlled input"],
    explanation: "Controlled components keep form input state inside React."
  },
  {
    level: "Intermediate",
    question: "Which is the correct immutable update for an object in state?",
    type: "mcq",
    options: {
      A: "user.name = 'Ada'",
      B: "setUser(user.name = 'Ada')",
      C: "setUser({ ...user, name: 'Ada' })",
      D: "setUser('Ada')"
    },
    answer: "C",
    explanation: "You should create a new object reference instead of mutating state directly."
  },
  {
    level: "Intermediate",
    question: "Which hook gives you a mutable value that does not trigger re-renders?",
    type: "open",
    answer: "useRef",
    acceptedAnswers: ["useref", "use ref"],
    explanation: "useRef stores mutable values and persists across renders without causing rerender."
  },
  {
    level: "Intermediate",
    question: "What is React Context mainly used for?",
    type: "mcq",
    options: {
      A: "Styling components",
      B: "Avoiding deep prop drilling for shared data",
      C: "Replacing all state management",
      D: "Compiling JSX"
    },
    answer: "B",
    explanation: "Context provides shared data to many components without passing props manually at every level."
  },
  {
    level: "Intermediate",
    question: "Name the hook used to memoize a computed value.",
    type: "open",
    answer: "useMemo",
    acceptedAnswers: ["usememo", "use memo"],
    explanation: "useMemo caches expensive calculations between renders."
  },
  {
    level: "Intermediate",
    question: "What does React.memo do?",
    type: "mcq",
    options: {
      A: "Memoizes a value inside a component",
      B: "Prevents rendering forever",
      C: "Skips re-rendering a component when props are unchanged",
      D: "Stores state in localStorage"
    },
    answer: "C",
    explanation: "React.memo can reduce unnecessary renders for pure functional components."
  },
  {
    level: "Advanced",
    question: "What is React reconciliation?",
    type: "open",
    answer: "The process of diffing virtual DOM trees and updating the real DOM efficiently.",
    acceptedAnswers: [
      "diffing virtual dom and updating real dom",
      "comparing virtual dom trees",
      "reconciliation is react diffing"
    ],
    explanation: "Reconciliation compares previous and next trees to apply minimal DOM changes."
  },
  {
    level: "Advanced",
    question: "What is React.lazy used for?",
    type: "mcq",
    options: {
      A: "Lazy state initialization only",
      B: "Code-splitting by loading components on demand",
      C: "Delaying CSS rendering",
      D: "Handling API retries"
    },
    answer: "B",
    explanation: "React.lazy enables dynamic component loading to reduce initial bundle size."
  },
  {
    level: "Advanced",
    question: "Which API marks updates as non-urgent in concurrent React?",
    type: "open",
    answer: "startTransition",
    acceptedAnswers: ["starttransition", "start transition"],
    explanation: "startTransition lets urgent updates remain responsive while deferring less critical updates."
  },
  {
    level: "Advanced",
    question: "What can Error Boundaries catch?",
    type: "mcq",
    options: {
      A: "Errors in event handlers",
      B: "Errors during render, lifecycle, and constructors in child components",
      C: "Network errors automatically",
      D: "Any async promise rejection globally"
    },
    answer: "B",
    explanation: "Error Boundaries catch render-time errors in component trees, not event handler errors."
  },
  {
    level: "Advanced",
    question: "Name one hook used with Suspense for reading asynchronous values in modern React.",
    type: "open",
    answer: "use",
    acceptedAnswers: ["use", "use hook"],
    explanation: "The use hook can read async resources in supported React patterns."
  },
  {
    level: "Advanced",
    question: "Which key choice is best for dynamic list rendering?",
    type: "mcq",
    options: {
      A: "Array index when order changes often",
      B: "Math.random() each render",
      C: "A stable unique ID from the data",
      D: "Current timestamp"
    },
    answer: "C",
    explanation: "Stable unique IDs preserve identity and reduce rendering bugs."
  }
];
