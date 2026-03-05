// Local fallback questions for all stacks — used when OpenAI is unavailable.

export const reactQuiz = [
  {
    level: "Beginner",
    question: "What is React primarily used for?",
    type: "mcq",
    options: { A: "Managing SQL databases", B: "Building user interfaces", C: "Creating operating systems", D: "Compiling Java code" },
    answer: "B",
    explanation: "React is a JavaScript library focused on building UI components."
  },
  {
    level: "Beginner",
    question: "What does JSX stand for?",
    type: "open",
    answer: "JavaScript XML",
    explanation: "JSX is a syntax extension that lets you write HTML-like markup in JavaScript."
  },
  {
    level: "Beginner",
    question: "Which hook is used to add state to a functional component?",
    type: "mcq",
    options: { A: "useEffect", B: "useRef", C: "useState", D: "useMemo" },
    answer: "C",
    explanation: "useState creates and updates local component state."
  },
  {
    level: "Beginner",
    question: "What is the name of the inputs passed from parent to child?",
    type: "open",
    answer: "props",
    explanation: "Props are read-only inputs passed into components."
  },
  {
    level: "Beginner",
    question: "Why is the key prop important when rendering lists?",
    type: "mcq",
    options: { A: "It adds default styles", B: "It encrypts list data", C: "It helps React identify changed items efficiently", D: "It converts arrays to objects" },
    answer: "C",
    explanation: "Keys help React track item identity and optimize updates."
  },
  {
    level: "Beginner",
    question: "Name the hook commonly used for side effects like API calls.",
    type: "open",
    answer: "useEffect",
    explanation: "useEffect handles effects such as fetching data and subscriptions."
  },
  {
    level: "Beginner",
    question: "What does one-way data flow mean in React?",
    type: "mcq",
    options: { A: "Data flows only from child to parent", B: "Data flows from parent to child", C: "Data flows only through CSS", D: "Data never changes" },
    answer: "B",
    explanation: "React data typically flows top-down from parent to child through props."
  },
  {
    level: "Intermediate",
    question: "What happens when useEffect has an empty dependency array []?",
    type: "mcq",
    options: { A: "It runs on every render", B: "It runs only once after initial render", C: "It never runs", D: "It runs only on unmount" },
    answer: "B",
    explanation: "An empty dependency array causes the effect to run once after mount."
  },
  {
    level: "Intermediate",
    question: "What is the term for an input whose value is controlled by React state?",
    type: "open",
    answer: "controlled component",
    explanation: "Controlled components keep form input state inside React."
  },
  {
    level: "Intermediate",
    question: "Which is the correct immutable update for an object in state?",
    type: "mcq",
    options: { A: "user.name = 'Ada'", B: "setUser(user.name = 'Ada')", C: "setUser({ ...user, name: 'Ada' })", D: "setUser('Ada')" },
    answer: "C",
    explanation: "You should create a new object reference instead of mutating state directly."
  },
  {
    level: "Intermediate",
    question: "Which hook gives you a mutable value that does not trigger re-renders?",
    type: "open",
    answer: "useRef",
    explanation: "useRef stores mutable values and persists across renders without causing rerender."
  },
  {
    level: "Intermediate",
    question: "What is React Context mainly used for?",
    type: "mcq",
    options: { A: "Styling components", B: "Avoiding deep prop drilling for shared data", C: "Replacing all state management", D: "Compiling JSX" },
    answer: "B",
    explanation: "Context provides shared data to many components without passing props manually at every level."
  },
  {
    level: "Intermediate",
    question: "Name the hook used to memoize a computed value.",
    type: "open",
    answer: "useMemo",
    explanation: "useMemo caches expensive calculations between renders."
  },
  {
    level: "Intermediate",
    question: "What does React.memo do?",
    type: "mcq",
    options: { A: "Memoizes a value inside a component", B: "Prevents rendering forever", C: "Skips re-rendering a component when props are unchanged", D: "Stores state in localStorage" },
    answer: "C",
    explanation: "React.memo can reduce unnecessary renders for pure functional components."
  },
  {
    level: "Advanced",
    question: "What is React reconciliation?",
    type: "open",
    answer: "diffing virtual DOM trees and updating the real DOM efficiently",
    explanation: "Reconciliation compares previous and next trees to apply minimal DOM changes."
  },
  {
    level: "Advanced",
    question: "What is React.lazy used for?",
    type: "mcq",
    options: { A: "Lazy state initialization only", B: "Code-splitting by loading components on demand", C: "Delaying CSS rendering", D: "Handling API retries" },
    answer: "B",
    explanation: "React.lazy enables dynamic component loading to reduce initial bundle size."
  },
  {
    level: "Advanced",
    question: "Which API marks updates as non-urgent in concurrent React?",
    type: "open",
    answer: "startTransition",
    explanation: "startTransition lets urgent updates remain responsive while deferring less critical updates."
  },
  {
    level: "Advanced",
    question: "What can Error Boundaries catch?",
    type: "mcq",
    options: { A: "Errors in event handlers", B: "Errors during render, lifecycle, and constructors in child components", C: "Network errors automatically", D: "Any async promise rejection globally" },
    answer: "B",
    explanation: "Error Boundaries catch render-time errors in component trees, not event handler errors."
  },
  {
    level: "Advanced",
    question: "Name one hook used with Suspense for reading async values in modern React.",
    type: "open",
    answer: "use",
    explanation: "The use hook can read async resources in supported React patterns."
  },
  {
    level: "Advanced",
    question: "Which key choice is best for dynamic list rendering?",
    type: "mcq",
    options: { A: "Array index when order changes often", B: "Math.random() each render", C: "A stable unique ID from the data", D: "Current timestamp" },
    answer: "C",
    explanation: "Stable unique IDs preserve identity and reduce rendering bugs."
  }
];

export const backendQuiz = [
  {
    level: "Beginner",
    question: "What does REST stand for?",
    type: "open",
    answer: "Representational State Transfer",
    explanation: "REST is an architectural style for building web APIs using HTTP."
  },
  {
    level: "Beginner",
    question: "Which HTTP method is used to retrieve data?",
    type: "mcq",
    options: { A: "POST", B: "DELETE", C: "GET", D: "PATCH" },
    answer: "C",
    explanation: "GET requests data from a server without modifying it."
  },
  {
    level: "Beginner",
    question: "What does a 404 HTTP status code mean?",
    type: "mcq",
    options: { A: "Server error", B: "Unauthorized", C: "Resource not found", D: "Request OK" },
    answer: "C",
    explanation: "404 means the requested resource could not be found on the server."
  },
  {
    level: "Beginner",
    question: "What is a database index used for?",
    type: "open",
    answer: "speeding up queries",
    explanation: "Indexes allow the database engine to find rows faster without scanning every row."
  },
  {
    level: "Beginner",
    question: "Which of these is a relational database?",
    type: "mcq",
    options: { A: "MongoDB", B: "Redis", C: "PostgreSQL", D: "Cassandra" },
    answer: "C",
    explanation: "PostgreSQL is a relational database that uses structured tables and SQL."
  },
  {
    level: "Beginner",
    question: "What is middleware in a web server context?",
    type: "open",
    answer: "functions that run between the request and response",
    explanation: "Middleware processes requests before they reach the route handler."
  },
  {
    level: "Beginner",
    question: "What does CRUD stand for?",
    type: "mcq",
    options: { A: "Create, Read, Update, Delete", B: "Connect, Route, Update, Deploy", C: "Cache, Resolve, Undo, Debug", D: "Clone, Run, Upload, Download" },
    answer: "A",
    explanation: "CRUD represents the four basic operations on persistent data."
  },
  {
    level: "Intermediate",
    question: "What is the purpose of JWT in authentication?",
    type: "mcq",
    options: { A: "Encrypting database columns", B: "Storing sessions server-side", C: "Passing verified claims between parties as a token", D: "Hashing passwords" },
    answer: "C",
    explanation: "JWT encodes claims as a signed token that can be verified without a database lookup."
  },
  {
    level: "Intermediate",
    question: "What SQL clause filters results after grouping?",
    type: "open",
    answer: "HAVING",
    explanation: "HAVING filters grouped results the same way WHERE filters rows."
  },
  {
    level: "Intermediate",
    question: "What is database normalization?",
    type: "mcq",
    options: { A: "Splitting a database across servers", B: "Organizing data to reduce redundancy", C: "Encrypting table columns", D: "Backing up table records" },
    answer: "B",
    explanation: "Normalization structures tables to minimize duplicate data and update anomalies."
  },
  {
    level: "Intermediate",
    question: "Name the pattern where slow operations are offloaded to a separate worker process.",
    type: "open",
    answer: "message queue",
    explanation: "Message queues like RabbitMQ or BullMQ allow async background processing."
  },
  {
    level: "Intermediate",
    question: "What is rate limiting used for in APIs?",
    type: "mcq",
    options: { A: "Compressing responses", B: "Preventing abuse by capping request frequency", C: "Caching database results", D: "Routing traffic between servers" },
    answer: "B",
    explanation: "Rate limiting protects the server from overload and misuse."
  },
  {
    level: "Intermediate",
    question: "What does ORM stand for?",
    type: "open",
    answer: "Object Relational Mapper",
    explanation: "An ORM maps database tables to objects so you can query without writing raw SQL."
  },
  {
    level: "Intermediate",
    question: "Which caching strategy writes to cache and database simultaneously?",
    type: "mcq",
    options: { A: "Cache-aside", B: "Write-through", C: "Write-back", D: "Read-through" },
    answer: "B",
    explanation: "Write-through keeps cache and database consistent by updating both on every write."
  },
  {
    level: "Advanced",
    question: "What is the CAP theorem?",
    type: "open",
    answer: "a distributed system can only guarantee two of consistency, availability, and partition tolerance",
    explanation: "CAP states that trade-offs are unavoidable in distributed databases."
  },
  {
    level: "Advanced",
    question: "What does horizontal scaling mean?",
    type: "mcq",
    options: { A: "Adding more RAM to one server", B: "Adding more servers to distribute load", C: "Increasing CPU speed", D: "Splitting a database by rows" },
    answer: "B",
    explanation: "Horizontal scaling adds instances rather than upgrading a single machine."
  },
  {
    level: "Advanced",
    question: "What is database sharding?",
    type: "open",
    answer: "splitting a database into smaller partitions across multiple servers",
    explanation: "Sharding distributes data so no single node holds the entire dataset."
  },
  {
    level: "Advanced",
    question: "Which isolation level prevents dirty reads but allows non-repeatable reads?",
    type: "mcq",
    options: { A: "Read Uncommitted", B: "Read Committed", C: "Repeatable Read", D: "Serializable" },
    answer: "B",
    explanation: "Read Committed ensures you only see committed data but rows may change between reads."
  },
  {
    level: "Advanced",
    question: "What is an idempotent API operation?",
    type: "open",
    answer: "an operation that produces the same result no matter how many times it is called",
    explanation: "Idempotency is critical for safe retries in distributed systems."
  },
  {
    level: "Advanced",
    question: "Which design pattern separates read and write models in a system?",
    type: "mcq",
    options: { A: "MVC", B: "Singleton", C: "CQRS", D: "Observer" },
    answer: "C",
    explanation: "CQRS (Command Query Responsibility Segregation) optimizes reads and writes independently."
  }
];

export const dataAnalyticsQuiz = [
  {
    level: "Beginner",
    question: "What does KPI stand for?",
    type: "open",
    answer: "Key Performance Indicator",
    explanation: "KPIs are measurable values that show how effectively goals are being met."
  },
  {
    level: "Beginner",
    question: "Which SQL statement retrieves data from a table?",
    type: "mcq",
    options: { A: "INSERT", B: "SELECT", C: "UPDATE", D: "DROP" },
    answer: "B",
    explanation: "SELECT is used to query and return data from a database table."
  },
  {
    level: "Beginner",
    question: "What is a dashboard in data analytics?",
    type: "mcq",
    options: { A: "A raw data export file", B: "A visual display of key metrics and trends", C: "A type of database", D: "A server monitoring tool" },
    answer: "B",
    explanation: "Dashboards display charts and metrics to help stakeholders make decisions."
  },
  {
    level: "Beginner",
    question: "What does ETL stand for?",
    type: "open",
    answer: "Extract Transform Load",
    explanation: "ETL pipelines move data from sources into a destination after transforming it."
  },
  {
    level: "Beginner",
    question: "Which chart type is best for showing trends over time?",
    type: "mcq",
    options: { A: "Pie chart", B: "Bar chart", C: "Line chart", D: "Scatter plot" },
    answer: "C",
    explanation: "Line charts clearly show how a value changes across a time period."
  },
  {
    level: "Beginner",
    question: "What is a data warehouse?",
    type: "open",
    answer: "a centralized repository for structured historical data used for reporting and analysis",
    explanation: "Data warehouses are optimized for analytical queries rather than transactions."
  },
  {
    level: "Beginner",
    question: "What does 'data granularity' refer to?",
    type: "mcq",
    options: { A: "Data file size", B: "The level of detail in a dataset", C: "The speed of a query", D: "The number of columns" },
    answer: "B",
    explanation: "Granularity describes how detailed or summarized data points are."
  },
  {
    level: "Intermediate",
    question: "What SQL function returns the number of rows in a group?",
    type: "open",
    answer: "COUNT",
    explanation: "COUNT() aggregates the number of matching records."
  },
  {
    level: "Intermediate",
    question: "What is a cohort analysis?",
    type: "mcq",
    options: { A: "Clustering users by purchase amount", B: "Grouping users by a shared characteristic over time", C: "Running A/B tests", D: "Predicting future revenue" },
    answer: "B",
    explanation: "Cohort analysis tracks behaviour of grouped users who share a common event or trait."
  },
  {
    level: "Intermediate",
    question: "What does a LEFT JOIN return?",
    type: "mcq",
    options: { A: "Only matching rows from both tables", B: "All rows from the right table", C: "All rows from the left table plus matches from the right", D: "All rows from both tables" },
    answer: "C",
    explanation: "LEFT JOIN returns all left table rows and fills NULLs where no right match exists."
  },
  {
    level: "Intermediate",
    question: "What is data normalization in analytics?",
    type: "open",
    answer: "scaling values to a common range",
    explanation: "Normalizing data helps compare metrics measured on different scales."
  },
  {
    level: "Intermediate",
    question: "What is a funnel analysis used for?",
    type: "mcq",
    options: { A: "Visualizing hierarchy trees", B: "Tracking drop-off across a sequence of user steps", C: "Comparing two datasets", D: "Forecasting sales" },
    answer: "B",
    explanation: "Funnel analysis identifies where users exit a conversion flow."
  },
  {
    level: "Intermediate",
    question: "What does a pivot table do?",
    type: "open",
    answer: "summarizes and aggregates data by rotating rows into columns",
    explanation: "Pivot tables make it easy to summarize large datasets interactively."
  },
  {
    level: "Intermediate",
    question: "Which metric measures the percentage of users who return after their first visit?",
    type: "mcq",
    options: { A: "Bounce rate", B: "Retention rate", C: "Churn rate", D: "Conversion rate" },
    answer: "B",
    explanation: "Retention rate tracks how many users come back over a given period."
  },
  {
    level: "Advanced",
    question: "What is a window function in SQL?",
    type: "open",
    answer: "a function that performs calculations across a set of rows related to the current row",
    explanation: "Window functions like ROW_NUMBER and RANK operate without collapsing rows."
  },
  {
    level: "Advanced",
    question: "What does p-value represent in hypothesis testing?",
    type: "mcq",
    options: { A: "The probability the null hypothesis is true", B: "The probability of observing data at least as extreme if the null hypothesis is true", C: "The confidence interval width", D: "The sample size needed" },
    answer: "B",
    explanation: "A low p-value suggests the observed result is unlikely under the null hypothesis."
  },
  {
    level: "Advanced",
    question: "What is data lineage?",
    type: "open",
    answer: "tracking the origin and transformations of data through a pipeline",
    explanation: "Lineage helps with debugging, compliance, and understanding data quality."
  },
  {
    level: "Advanced",
    question: "Which technique reduces dimensionality while preserving variance?",
    type: "mcq",
    options: { A: "Clustering", B: "PCA", C: "Regression", D: "Joining" },
    answer: "B",
    explanation: "Principal Component Analysis reduces features to key components capturing most variance."
  },
  {
    level: "Advanced",
    question: "What is a slowly changing dimension (SCD)?",
    type: "open",
    answer: "a dimension that changes infrequently and requires a strategy to track historical values",
    explanation: "SCDs are common in data warehousing when historical accuracy matters."
  },
  {
    level: "Advanced",
    question: "Which method handles imbalanced datasets by generating synthetic samples?",
    type: "mcq",
    options: { A: "PCA", B: "SMOTE", C: "K-means", D: "LEFT JOIN" },
    answer: "B",
    explanation: "SMOTE creates synthetic minority class samples to balance training data."
  }
];

export const dataScienceQuiz = [
  {
    level: "Beginner",
    question: "What is supervised learning?",
    type: "open",
    answer: "training a model on labeled data",
    explanation: "In supervised learning the model learns from input-output pairs."
  },
  {
    level: "Beginner",
    question: "Which Python library is most commonly used for data manipulation?",
    type: "mcq",
    options: { A: "NumPy", B: "Matplotlib", C: "Pandas", D: "Scikit-learn" },
    answer: "C",
    explanation: "Pandas provides DataFrames for cleaning, transforming, and analyzing data."
  },
  {
    level: "Beginner",
    question: "What does overfitting mean?",
    type: "mcq",
    options: { A: "Model is too simple", B: "Model performs well on training data but poorly on new data", C: "Model has too few parameters", D: "Model training was stopped early" },
    answer: "B",
    explanation: "An overfit model memorizes training data and fails to generalize."
  },
  {
    level: "Beginner",
    question: "What is a train-test split?",
    type: "open",
    answer: "dividing a dataset into a portion for training and a portion for evaluating the model",
    explanation: "Splitting data ensures evaluation happens on unseen data."
  },
  {
    level: "Beginner",
    question: "Which metric measures the proportion of correctly classified instances?",
    type: "mcq",
    options: { A: "Precision", B: "Recall", C: "Accuracy", D: "F1 score" },
    answer: "C",
    explanation: "Accuracy is the ratio of correct predictions to total predictions."
  },
  {
    level: "Beginner",
    question: "What is feature engineering?",
    type: "open",
    answer: "creating or transforming input variables to improve model performance",
    explanation: "Good features often matter more than model choice."
  },
  {
    level: "Beginner",
    question: "Which algorithm creates a tree of decision rules to classify data?",
    type: "mcq",
    options: { A: "Linear regression", B: "Decision tree", C: "K-means", D: "PCA" },
    answer: "B",
    explanation: "Decision trees split data by feature thresholds at each node."
  },
  {
    level: "Intermediate",
    question: "What is cross-validation?",
    type: "open",
    answer: "evaluating a model by splitting data into multiple folds and training on each",
    explanation: "Cross-validation gives a more reliable performance estimate than a single split."
  },
  {
    level: "Intermediate",
    question: "What does regularization do in machine learning?",
    type: "mcq",
    options: { A: "Speeds up training", B: "Adds a penalty to large weights to reduce overfitting", C: "Increases model complexity", D: "Normalizes input features" },
    answer: "B",
    explanation: "Regularization (L1/L2) constrains model weights to prevent memorization."
  },
  {
    level: "Intermediate",
    question: "What is the purpose of a confusion matrix?",
    type: "mcq",
    options: { A: "Showing feature correlations", B: "Visualizing the distribution of targets", C: "Summarizing true and false positives and negatives", D: "Plotting training loss" },
    answer: "C",
    explanation: "Confusion matrices break down classification results into TP, TN, FP, and FN."
  },
  {
    level: "Intermediate",
    question: "What does the F1 score balance?",
    type: "open",
    answer: "precision and recall",
    explanation: "F1 is the harmonic mean of precision and recall, useful for imbalanced datasets."
  },
  {
    level: "Intermediate",
    question: "Which ensemble method builds trees on random subsets and averages predictions?",
    type: "mcq",
    options: { A: "Boosting", B: "Bagging", C: "Stacking", D: "Blending" },
    answer: "B",
    explanation: "Random Forest uses bagging — training many trees on random samples and aggregating results."
  },
  {
    level: "Intermediate",
    question: "What is hyperparameter tuning?",
    type: "open",
    answer: "searching for the best model configuration settings before training",
    explanation: "Hyperparameters like learning rate and depth are set before training begins."
  },
  {
    level: "Intermediate",
    question: "What does gradient descent do?",
    type: "mcq",
    options: { A: "Generates training data", B: "Iteratively adjusts model parameters to minimize loss", C: "Removes outliers from data", D: "Splits data into batches" },
    answer: "B",
    explanation: "Gradient descent moves parameters in the direction that reduces the loss function."
  },
  {
    level: "Advanced",
    question: "What is the bias-variance trade-off?",
    type: "open",
    answer: "the balance between a model being too simple (high bias) and too sensitive to data (high variance)",
    explanation: "Reducing bias often increases variance and vice versa; the goal is to minimize total error."
  },
  {
    level: "Advanced",
    question: "What is an ROC curve used for?",
    type: "mcq",
    options: { A: "Plotting training vs validation loss", B: "Evaluating classification thresholds across all operating points", C: "Showing feature importances", D: "Comparing two regression models" },
    answer: "B",
    explanation: "ROC curves plot true positive rate against false positive rate at various thresholds."
  },
  {
    level: "Advanced",
    question: "What is SHAP used for in machine learning?",
    type: "open",
    answer: "explaining individual model predictions by attributing feature contributions",
    explanation: "SHAP values provide consistent and locally accurate feature importance explanations."
  },
  {
    level: "Advanced",
    question: "Which technique prevents data leakage when scaling features?",
    type: "mcq",
    options: { A: "Scaling all data before splitting", B: "Fitting the scaler on training data only and transforming test data", C: "Using log transforms on all columns", D: "Dropping correlated features" },
    answer: "B",
    explanation: "Fitting on test data leaks information from the future into training."
  },
  {
    level: "Advanced",
    question: "What is transfer learning?",
    type: "open",
    answer: "reusing a model trained on one task as a starting point for a related task",
    explanation: "Transfer learning is especially effective with limited labelled data."
  },
  {
    level: "Advanced",
    question: "What does the attention mechanism in transformers do?",
    type: "mcq",
    options: { A: "Compresses tokens into a single vector", B: "Weights the importance of other tokens when encoding each token", C: "Reduces the vocabulary size", D: "Adds positional noise" },
    answer: "B",
    explanation: "Attention lets each token attend to relevant positions, enabling context-aware representations."
  }
];

export const uiUxQuiz = [
  {
    level: "Beginner",
    question: "What does UI stand for?",
    type: "open",
    answer: "User Interface",
    explanation: "UI refers to the visual elements users interact with in a product."
  },
  {
    level: "Beginner",
    question: "What is the purpose of a wireframe?",
    type: "mcq",
    options: { A: "To add final visual styling", B: "To show a low-fidelity structure of a screen layout", C: "To write code for the interface", D: "To document user stories" },
    answer: "B",
    explanation: "Wireframes communicate layout and hierarchy without visual design decisions."
  },
  {
    level: "Beginner",
    question: "What does UX stand for?",
    type: "open",
    answer: "User Experience",
    explanation: "UX encompasses the overall experience a user has when interacting with a product."
  },
  {
    level: "Beginner",
    question: "What is a call-to-action (CTA)?",
    type: "mcq",
    options: { A: "A tooltip message", B: "A prompt that encourages users to take a specific action", C: "A navigation menu item", D: "An error message" },
    answer: "B",
    explanation: "CTAs guide users toward key actions like signing up or purchasing."
  },
  {
    level: "Beginner",
    question: "What principle states that common actions should be easy to perform?",
    type: "open",
    answer: "Fitts's Law",
    explanation: "Fitts's Law relates target size and distance to the ease of pointing actions."
  },
  {
    level: "Beginner",
    question: "What is contrast used for in UI design?",
    type: "mcq",
    options: { A: "Reducing page load time", B: "Making text and elements distinguishable from their backgrounds", C: "Compressing images", D: "Aligning grid columns" },
    answer: "B",
    explanation: "Sufficient contrast improves readability and meets accessibility standards."
  },
  {
    level: "Beginner",
    question: "What is the purpose of user personas?",
    type: "open",
    answer: "representing different types of target users to guide design decisions",
    explanation: "Personas help teams empathize with users and make user-centered design choices."
  },
  {
    level: "Intermediate",
    question: "What is a design system?",
    type: "mcq",
    options: { A: "A project management tool", B: "A collection of reusable components and design guidelines", C: "A set of user test scripts", D: "A color palette generator" },
    answer: "B",
    explanation: "Design systems ensure consistency and speed across teams building the same product."
  },
  {
    level: "Intermediate",
    question: "What does WCAG stand for?",
    type: "open",
    answer: "Web Content Accessibility Guidelines",
    explanation: "WCAG defines accessibility standards for web content."
  },
  {
    level: "Intermediate",
    question: "What is the difference between usability testing and A/B testing?",
    type: "mcq",
    options: { A: "They are the same method", B: "Usability testing is qualitative observation; A/B testing is quantitative comparison", C: "A/B testing uses interviews; usability testing uses metrics", D: "Usability tests require two variants" },
    answer: "B",
    explanation: "Usability tests observe behaviour qualitatively while A/B tests compare variants statistically."
  },
  {
    level: "Intermediate",
    question: "What is visual hierarchy?",
    type: "open",
    answer: "arranging elements so users perceive them in order of importance",
    explanation: "Visual hierarchy guides attention through size, color, contrast, and placement."
  },
  {
    level: "Intermediate",
    question: "What is progressive disclosure in UX?",
    type: "mcq",
    options: { A: "Loading images lazily", B: "Showing only necessary information and revealing more on demand", C: "Animating page transitions", D: "Using breadcrumbs for navigation" },
    answer: "B",
    explanation: "Progressive disclosure reduces cognitive load by surfacing detail only when needed."
  },
  {
    level: "Intermediate",
    question: "What is affordance in UX design?",
    type: "open",
    answer: "a quality of an element that communicates how it should be used",
    explanation: "A button that looks pressable affords clicking — affordance drives intuitive use."
  },
  {
    level: "Intermediate",
    question: "Which cognitive principle says users have limited working memory capacity?",
    type: "mcq",
    options: { A: "Gestalt principle", B: "Miller's Law", C: "Hick's Law", D: "Occam's Razor" },
    answer: "B",
    explanation: "Miller's Law suggests people can hold about 7±2 items in working memory."
  },
  {
    level: "Advanced",
    question: "What is Hick's Law?",
    type: "open",
    answer: "the more choices a user has, the longer it takes to make a decision",
    explanation: "Hick's Law justifies reducing options to speed up user decisions."
  },
  {
    level: "Advanced",
    question: "What is an information architecture?",
    type: "mcq",
    options: { A: "A server configuration plan", B: "The structural design of shared information environments", C: "A database schema", D: "A component library" },
    answer: "B",
    explanation: "IA defines how content is organized, labeled, and navigated within a product."
  },
  {
    level: "Advanced",
    question: "What is the purpose of an affinity diagram?",
    type: "open",
    answer: "grouping qualitative research data into themes to find patterns",
    explanation: "Affinity mapping synthesizes research insights visually."
  },
  {
    level: "Advanced",
    question: "What is emotional design focused on?",
    type: "mcq",
    options: { A: "Error-free functionality", B: "Creating experiences that evoke positive emotional responses", C: "Reducing page weight", D: "Standardizing color tokens" },
    answer: "B",
    explanation: "Emotional design (Don Norman) considers visceral, behavioral, and reflective responses."
  },
  {
    level: "Advanced",
    question: "What is a mental model in UX?",
    type: "open",
    answer: "a user's internal representation of how a system works",
    explanation: "Designs that match mental models are more intuitive and reduce friction."
  },
  {
    level: "Advanced",
    question: "Which research method reveals how users naturally categorize information?",
    type: "mcq",
    options: { A: "Usability testing", B: "Card sorting", C: "Eye tracking", D: "Diary study" },
    answer: "B",
    explanation: "Card sorting helps design navigation that matches users' mental models."
  }
];

export const productDesignQuiz = [
  {
    level: "Beginner",
    question: "What is a product roadmap?",
    type: "open",
    answer: "a high-level visual plan showing the direction and priorities of a product over time",
    explanation: "Roadmaps align teams on what to build and when."
  },
  {
    level: "Beginner",
    question: "What does MVP stand for in product design?",
    type: "mcq",
    options: { A: "Most Viable Prototype", B: "Minimum Viable Product", C: "Maximum Value Proposition", D: "Minimum Validated Plan" },
    answer: "B",
    explanation: "An MVP is the simplest version of a product that delivers value and enables learning."
  },
  {
    level: "Beginner",
    question: "What is user research?",
    type: "open",
    answer: "gathering information about users' needs, behaviours, and motivations",
    explanation: "User research informs product decisions with real evidence."
  },
  {
    level: "Beginner",
    question: "What is the main goal of discovery in product design?",
    type: "mcq",
    options: { A: "Writing the technical spec", B: "Understanding the problem before building a solution", C: "Designing the final UI", D: "Setting the product price" },
    answer: "B",
    explanation: "Discovery ensures teams solve real problems rather than assumed ones."
  },
  {
    level: "Beginner",
    question: "What is a user story?",
    type: "open",
    answer: "a short description of a feature from the perspective of the user",
    explanation: "User stories follow the format: As a [user], I want [goal] so that [benefit]."
  },
  {
    level: "Beginner",
    question: "What does iteration mean in product design?",
    type: "mcq",
    options: { A: "Building the full product at once", B: "Repeatedly improving a product based on feedback", C: "Designing only in Figma", D: "Writing user documentation" },
    answer: "B",
    explanation: "Iteration involves small, frequent improvements informed by real-world learning."
  },
  {
    level: "Beginner",
    question: "What is a stakeholder in a product context?",
    type: "open",
    answer: "anyone who has an interest in or is affected by the product",
    explanation: "Stakeholders include customers, business leaders, engineers, and support teams."
  },
  {
    level: "Intermediate",
    question: "What is the Jobs To Be Done framework?",
    type: "mcq",
    options: { A: "A hiring framework for product teams", B: "A model for understanding the underlying goals that drive product use", C: "A sprint planning technique", D: "A method for writing API specs" },
    answer: "B",
    explanation: "JTBD focuses on what outcome a user is trying to achieve, not just features."
  },
  {
    level: "Intermediate",
    question: "What is product-market fit?",
    type: "open",
    answer: "when a product satisfies strong demand in a target market",
    explanation: "Product-market fit is evidenced by strong retention and organic growth."
  },
  {
    level: "Intermediate",
    question: "What is the purpose of OKRs?",
    type: "mcq",
    options: { A: "To document API endpoints", B: "To align teams around measurable goals and outcomes", C: "To create sprint backlogs", D: "To manage design tokens" },
    answer: "B",
    explanation: "OKRs (Objectives and Key Results) connect team work to business outcomes."
  },
  {
    level: "Intermediate",
    question: "What is a North Star metric?",
    type: "open",
    answer: "a single metric that best captures the core value a product delivers to users",
    explanation: "The North Star metric focuses the entire team on what matters most."
  },
  {
    level: "Intermediate",
    question: "What is the double diamond design process?",
    type: "mcq",
    options: { A: "Two sprints per feature", B: "A framework with divergent and convergent phases for problem and solution", C: "A two-step launch process", D: "Parallel design and development tracks" },
    answer: "B",
    explanation: "Double diamond expands to explore then narrows to define both the problem and solution."
  },
  {
    level: "Intermediate",
    question: "What does churn rate measure?",
    type: "open",
    answer: "the percentage of users or customers who stop using a product in a given period",
    explanation: "High churn signals poor retention and unmet user needs."
  },
  {
    level: "Intermediate",
    question: "What is feature prioritization?",
    type: "mcq",
    options: { A: "Deciding which bugs to fix first", B: "Ranking features by value and effort to determine build order", C: "Assigning features to designers", D: "Writing acceptance criteria" },
    answer: "B",
    explanation: "Frameworks like RICE and MoSCoW help teams decide what to build next."
  },
  {
    level: "Advanced",
    question: "What is the difference between outputs and outcomes in product thinking?",
    type: "open",
    answer: "outputs are features shipped; outcomes are changes in user behaviour or business results",
    explanation: "Outcome-driven teams focus on impact rather than delivery volume."
  },
  {
    level: "Advanced",
    question: "What is opportunity solution tree used for?",
    type: "mcq",
    options: { A: "Mapping user flows", B: "Connecting desired outcomes to opportunities and solution ideas", C: "Planning engineering architecture", D: "Tracking sprint velocity" },
    answer: "B",
    explanation: "The opportunity solution tree (Teresa Torres) links outcome to discovery and experiments."
  },
  {
    level: "Advanced",
    question: "What is the Kano model used for?",
    type: "open",
    answer: "categorizing features by how they affect customer satisfaction",
    explanation: "Kano classifies features as basic needs, performance, or delighters."
  },
  {
    level: "Advanced",
    question: "What does continuous discovery mean in modern product practice?",
    type: "mcq",
    options: { A: "Launching features continuously", B: "Regularly conducting research and experiments throughout the product lifecycle", C: "Automating user onboarding", D: "Running weekly standups" },
    answer: "B",
    explanation: "Continuous discovery embeds research into every sprint rather than big upfront phases."
  },
  {
    level: "Advanced",
    question: "What is a growth loop?",
    type: "open",
    answer: "a self-reinforcing cycle where product usage drives acquisition of new users",
    explanation: "Growth loops (viral, content, paid) create compounding growth unlike funnels."
  },
  {
    level: "Advanced",
    question: "Which metric best indicates long-term product health?",
    type: "mcq",
    options: { A: "Daily active users", B: "App store rating", C: "Retention rate over time", D: "Number of features shipped" },
    answer: "C",
    explanation: "Long-term retention shows whether the product consistently delivers value."
  }
];

