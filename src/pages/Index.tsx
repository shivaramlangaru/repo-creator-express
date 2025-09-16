import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeEditor } from '@/components/CodeEditor';
import { ExerciseCard } from '@/components/ExerciseCard';
import { TutorialStep } from '@/components/TutorialStep';
import { 
  Brain, 
  Code2, 
  BookOpen, 
  Zap, 
  Users, 
  Trophy, 
  ArrowRight,
  Sparkles,
  Target,
  Award
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('editor');
  const [currentTutorialStep, setCurrentTutorialStep] = useState(1);

  const exercises = [
    {
      id: '1',
      title: 'Variable Declaration and Scope',
      description: 'Learn the difference between var, let, and const. Understand block scope and function scope in JavaScript.',
      difficulty: 'beginner' as const,
      estimatedTime: '15 min',
      points: 100,
      tags: ['Variables', 'Scope', 'ES6'],
      completed: true
    },
    {
      id: '2',
      title: 'Array Methods and Iteration',
      description: 'Master array methods like map, filter, reduce, and forEach. Learn functional programming concepts.',
      difficulty: 'intermediate' as const,
      estimatedTime: '25 min',
      points: 200,
      tags: ['Arrays', 'Functional Programming', 'ES6']
    },
    {
      id: '3',
      title: 'Async/Await and Promises',
      description: 'Handle asynchronous operations with promises and async/await. Learn error handling patterns.',
      difficulty: 'advanced' as const,
      estimatedTime: '40 min',
      points: 300,
      tags: ['Async', 'Promises', 'Error Handling']
    }
  ];

  const tutorialSteps = [
    {
      stepNumber: 1,
      totalSteps: 3,
      title: 'Understanding Functions',
      description: 'Functions are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.',
      code: `function greetUser(name) {
  return "Hello, " + name + "!";
}

const message = greetUser("Alice");
console.log(message); // Output: Hello, Alice!`,
      explanation: 'This function takes a name parameter and returns a greeting string. The function is called with "Alice" as an argument.'
    },
    {
      stepNumber: 2,
      totalSteps: 3,
      title: 'Function Parameters and Arguments',
      description: 'Learn how to pass data to functions using parameters and provide default values.',
      code: `function calculateArea(length, width = 1) {
  return length * width;
}

console.log(calculateArea(5, 3)); // 15
console.log(calculateArea(5));    // 5 (uses default width)`,
      explanation: 'The width parameter has a default value of 1, so if no second argument is provided, it will use this default.'
    },
    {
      stepNumber: 3,
      totalSteps: 3,
      title: 'Arrow Functions',
      description: 'Arrow functions provide a concise syntax for writing functions, especially useful for short operations.',
      code: `// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;

// Array method with arrow function
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);`,
      explanation: 'Arrow functions are shorter and have lexical this binding, making them perfect for callbacks and functional programming.'
    }
  ];

  const handleStartExercise = (exerciseId: string) => {
    setActiveTab('editor');
    // In a real app, this would load the specific exercise
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        <div className="relative max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-gradient-accent text-white border-0 px-4 py-2">
            <Sparkles className="h-4 w-4 mr-2" />
            AI-Powered Learning Platform
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Master Programming with AI
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Learn to code with intelligent analysis, real-time debugging, and personalized tutorials. 
            Our AI assistant guides you through every step of your programming journey.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-8 py-6 text-lg"
              onClick={() => setActiveTab('editor')}
            >
              <Code2 className="h-5 w-5 mr-2" />
              Start Coding Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-6 text-lg hover:bg-secondary"
              onClick={() => setActiveTab('tutorials')}
            >
              <BookOpen className="h-5 w-5 mr-2" />
              Browse Tutorials
            </Button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 hover:shadow-glow transition-all duration-300 border-border/50">
              <Brain className="h-12 w-12 text-primary mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">AI Code Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Get instant feedback and suggestions to improve your code quality and performance.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 border-border/50">
              <Zap className="h-12 w-12 text-warning mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Smart Debugging</h3>
              <p className="text-muted-foreground text-sm">
                Automatically detect errors and receive intelligent debugging suggestions.
              </p>
            </Card>

            <Card className="p-6 hover:shadow-glow transition-all duration-300 border-border/50">
              <Target className="h-12 w-12 text-success mb-4 mx-auto" />
              <h3 className="text-lg font-semibold mb-2">Personalized Learning</h3>
              <p className="text-muted-foreground text-sm">
                Adaptive exercises and tutorials tailored to your skill level and learning pace.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Learning Interface */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-8">
              <TabsTrigger value="editor" className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                Code Editor
              </TabsTrigger>
              <TabsTrigger value="exercises" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                Exercises
              </TabsTrigger>
              <TabsTrigger value="tutorials" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Tutorials
              </TabsTrigger>
            </TabsList>

            <TabsContent value="editor" className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold mb-2">Interactive Code Editor</h2>
                <p className="text-muted-foreground">
                  Write code with real-time AI analysis and intelligent suggestions
                </p>
              </div>
              <CodeEditor />
            </TabsContent>

            <TabsContent value="exercises" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Programming Exercises</h2>
                <p className="text-muted-foreground">
                  Practice coding with exercises tailored to your skill level
                </p>
              </div>
              
              <div className="grid gap-6">
                {exercises.map((exercise) => (
                  <ExerciseCard 
                    key={exercise.id} 
                    {...exercise} 
                    onStart={handleStartExercise}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Interactive Tutorials</h2>
                <p className="text-muted-foreground">
                  Step-by-step guides to master programming concepts
                </p>
              </div>

              <div className="max-w-4xl mx-auto">
                <TutorialStep
                  {...tutorialSteps[currentTutorialStep - 1]}
                  isActive={true}
                  onNext={() => setCurrentTutorialStep(prev => Math.min(prev + 1, tutorialSteps.length))}
                  onPrevious={() => setCurrentTutorialStep(prev => Math.max(prev - 1, 1))}
                  onComplete={() => {
                    // Handle tutorial completion
                    alert('Tutorial completed! 🎉');
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Learning Progress</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">25+</div>
              <div className="text-muted-foreground">Interactive Exercises</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-success">1,250</div>
              <div className="text-muted-foreground">Lines of Code Analyzed</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-warning">98%</div>
              <div className="text-muted-foreground">Bug Detection Accuracy</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;