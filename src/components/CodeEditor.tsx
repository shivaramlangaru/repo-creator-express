import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Bug, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react';

interface CodeError {
  line: number;
  message: string;
  type: 'error' | 'warning' | 'suggestion';
}

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
}

export const CodeEditor = ({ 
  initialCode = "// Welcome to CodeLearn AI!\n// Try writing some JavaScript code here\n\nfunction greetUser(name) {\n  console.log('Hello, ' + name + '!');\n}\n\ngreetUser('Developer');", 
  language = 'javascript',
  onCodeChange 
}: CodeEditorProps) => {
  const [code, setCode] = useState(initialCode);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [errors, setErrors] = useState<CodeError[]>([
    { line: 4, message: 'Consider using template literals for better readability', type: 'suggestion' },
    { line: 7, message: 'Missing semicolon', type: 'warning' }
  ]);
  const [output, setOutput] = useState('');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    onCodeChange?.(newCode);
    
    // Simulate real-time analysis
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Simulate error detection
      analyzeCode(newCode);
    }, 1000);
  };

  const analyzeCode = (codeToAnalyze: string) => {
    const mockErrors: CodeError[] = [];
    const lines = codeToAnalyze.split('\n');
    
    lines.forEach((line, index) => {
      if (line.includes('console.log') && !line.includes('//')) {
        mockErrors.push({
          line: index + 1,
          message: 'Consider using a proper logging library in production',
          type: 'suggestion'
        });
      }
      if (line.includes('var ')) {
        mockErrors.push({
          line: index + 1,
          message: 'Use const or let instead of var for better scoping',
          type: 'warning'
        });
      }
    });
    
    setErrors(mockErrors);
  };

  const runCode = () => {
    try {
      // Simulate code execution
      setOutput('Code executed successfully!\nHello, Developer!');
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const getErrorIcon = (type: CodeError['type']) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'suggestion':
        return <Lightbulb className="h-4 w-4 text-info" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
      {/* Code Editor Panel */}
      <div className="lg:col-span-2">
        <Card className="h-full bg-code-bg border-code-border shadow-code">
          <div className="flex items-center justify-between p-4 border-b border-code-border">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="font-mono text-xs">
                {language}
              </Badge>
              {isAnalyzing && (
                <Badge variant="outline" className="text-info">
                  <Bug className="h-3 w-3 mr-1 animate-pulse" />
                  Analyzing...
                </Badge>
              )}
            </div>
            <Button 
              onClick={runCode} 
              size="sm" 
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              <Play className="h-4 w-4 mr-2" />
              Run Code
            </Button>
          </div>
          
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => handleCodeChange(e.target.value)}
              className="w-full h-96 p-4 bg-transparent text-foreground font-mono text-sm resize-none outline-none leading-relaxed"
              spellCheck={false}
              style={{ 
                lineHeight: '1.6',
                tabSize: 2
              }}
            />
            
            {/* Line numbers */}
            <div className="absolute left-0 top-0 pt-4 pl-2 text-muted-foreground font-mono text-sm pointer-events-none">
              {code.split('\n').map((_, index) => (
                <div key={index} className="h-6 leading-relaxed">
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Output Panel */}
          {output && (
            <div className="border-t border-code-border p-4 bg-secondary/30">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Output:</span>
              </div>
              <pre className="font-mono text-sm text-muted-foreground whitespace-pre-wrap">
                {output}
              </pre>
            </div>
          )}
        </Card>
      </div>

      {/* Analysis Panel */}
      <div className="space-y-6">
        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Bug className="h-5 w-5" />
            Code Analysis
          </h3>
          
          {errors.length === 0 ? (
            <div className="flex items-center gap-2 text-success">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm">No issues found!</span>
            </div>
          ) : (
            <div className="space-y-3">
              {errors.map((error, index) => (
                <div key={index} className="flex gap-3 p-3 rounded-md bg-secondary/50 border border-border">
                  {getErrorIcon(error.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs">
                        Line {error.line}
                      </Badge>
                      <Badge 
                        variant={error.type === 'error' ? 'destructive' : 'secondary'} 
                        className="text-xs"
                      >
                        {error.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{error.message}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-info" />
            AI Suggestions
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="p-3 rounded-md bg-info/10 border border-info/20">
              <p className="font-medium text-info mb-1">Code Improvement</p>
              <p>Consider using template literals (backticks) instead of string concatenation for better readability.</p>
            </div>
            <div className="p-3 rounded-md bg-success/10 border border-success/20">
              <p className="font-medium text-success mb-1">Best Practice</p>
              <p>Add JSDoc comments to document your function parameters and return values.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};