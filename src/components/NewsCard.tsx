import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface NewsCardProps {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  date: string;
  author: string;
  views: number;
  comments: number;
  image?: string;
  featured?: boolean;
}

const NewsCard = ({
  title,
  category,
  excerpt,
  date,
  author,
  views,
  comments,
  image,
  featured = false,
}: NewsCardProps) => {
  return (
    <Card className={`group cursor-pointer overflow-hidden hover-scale ${
      featured ? 'col-span-full md:col-span-2' : ''
    }`}>
      <div className={`relative overflow-hidden ${featured ? 'h-80' : 'h-48'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-primary/90 backdrop-blur-sm">{category}</Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className={`font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors ${
          featured ? 'text-2xl' : 'text-xl'
        }`}>
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="User" size={14} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="Calendar" size={14} />
            <span>{date}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="px-6 pb-6 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Icon name="Eye" size={14} />
            <span>{views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Icon name="MessageCircle" size={14} />
            <span>{comments}</span>
          </div>
        </div>
        <span className="text-xs text-primary font-medium story-link">
          Читать далее
        </span>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
