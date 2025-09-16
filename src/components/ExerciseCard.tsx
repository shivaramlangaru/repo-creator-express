import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Trophy, Star, ArrowRight } from 'lucide-react';

interface ExerciseCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  points: number;
  tags: string[];
  completed?: boolean;
  onStart?: (id: string) => void;
}

const difficultyColors = {
  beginner: 'bg-success text-success-foreground',
  intermediate: 'bg-warning text-warning-foreground',
  advanced: 'bg-destructive text-destructive-foreground'
};

const difficultyIcons = {
  beginner: '🌱',
  intermediate: '🔥',
  advanced: '⚡'
};

export const ExerciseCard = ({
  id,
  title,
  description,
  difficulty,
  estimatedTime,
  points,
  tags,
  completed = false,
  onStart
}: ExerciseCardProps) => {
  return (
    <Card className="p-6 hover:shadow-glow transition-all duration-300 group cursor-pointer border-border/50 hover:border-primary/50">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
              {title}
            </h3>
            {completed && (
              <Badge className="bg-success text-success-foreground">
                <Trophy className="h-3 w-3 mr-1" />
                Completed
              </Badge>
            )}
          </div>
          
          <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Badge className={`${difficultyColors[difficulty]} text-xs`}>
            <span className="mr-1">{difficultyIcons[difficulty]}</span>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </Badge>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Clock className="h-4 w-4" />
            <span>{estimatedTime}</span>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Star className="h-4 w-4" />
            <span>{points} pts</span>
          </div>
        </div>

        <Button 
          onClick={() => onStart?.(id)}
          size="sm"
          className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
        >
          {completed ? 'Review' : 'Start'}
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </Card>
  );
};