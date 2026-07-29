import React from 'react';
import {
  Shield,
  Sparkles,
  Sword,
  Sun,
  Trees,
  HeartHandshake,
  Music,
  Skull,
  Leaf,
  Flame,
  Eye,
  Zap,
  Wand2,
  HelpCircle,
} from 'lucide-react';

interface ClassIconProps {
  iconName: string;
  className?: string;
  size?: number;
}

export const ClassIcon: React.FC<ClassIconProps> = ({ iconName, className = 'w-5 h-5', size }) => {
  const props = { className, size };
  switch (iconName) {
    case 'Shield':
      return <Shield {...props} />;
    case 'Sparkles':
      return <Sparkles {...props} />;
    case 'Sword':
      return <Sword {...props} />;
    case 'Sun':
      return <Sun {...props} />;
    case 'Trees':
      return <Trees {...props} />;
    case 'HeartHandshake':
      return <HeartHandshake {...props} />;
    case 'Music':
      return <Music {...props} />;
    case 'Skull':
      return <Skull {...props} />;
    case 'Leaf':
      return <Leaf {...props} />;
    case 'Flame':
      return <Flame {...props} />;
    case 'Eye':
      return <Eye {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Wand2':
      return <Wand2 {...props} />;
    default:
      return <HelpCircle {...props} />;
  }
};
