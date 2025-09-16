import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle, ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';

interface TutorialStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string;
  code?: string;
  explanation?: string;
  completed?: boolean;
  isActive?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
}

export const TutorialStep = ({
  stepNumber,
  totalSteps,
  title,
  description,
  code,
  explanation,
  completed = false,
  isActive = false,
  onNext,
  onPrevious,
  onComplete
}: TutorialStepProps) => {
  return (
    <Card className={`p-6 transition-all duration-300 ${
      isActive ? 'border-primary shadow-glow' : 'border-border/50'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {completed ? (
            <CheckCircle2 className="h-6 w-6 text-success" />
          ) : (
            <Circle className={`h-6 w-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
          )}
          <div>
            <Badge variant="outline" className="mb-2">
              Step {stepNumber} of {totalSteps}
            </Badge>
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Code Block */}
        {code && (
          <Card className="bg-code-bg border-code-border">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="secondary" className="text-xs font-mono">
                  JavaScript
                </Badge>
              </div>
              <pre className="font-mono text-sm text-foreground overflow-x-auto">
                <code>{code}</code>
              </pre>
            </div>
          </Card>
        )}

        {/* Explanation */}
        {explanation && (
          <div className="p-4 rounded-lg bg-info/10 border border-info/20">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-info mb-2">Explanation</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{explanation}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <Button 
          variant="outline" 
          onClick={onPrevious}
          disabled={stepNumber === 1}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Previous
        </Button>

        <div className="flex gap-2">
          {stepNumber === totalSteps ? (
            <Button 
              onClick={onComplete}
              className="bg-gradient-accent hover:shadow-glow transition-all duration-300"
            >
              Complete Tutorial
              <CheckCircle2 className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button 
              onClick={onNext}
              className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
            >
              Next Step
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};