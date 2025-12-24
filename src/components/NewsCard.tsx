import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

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
  onSaveToggle?: (id: number, saved: boolean) => void;
}

const NewsCard = ({
  id,
  title,
  category,
  excerpt,
  date,
  author,
  views,
  comments,
  image,
  featured = false,
  onSaveToggle,
}: NewsCardProps) => {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setIsSaved(userData.savedNews?.includes(id) || false);
    }
  }, [id]);

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      toast({
        title: '⚠️ Требуется авторизация',
        description: 'Войдите в систему, чтобы сохранять новости',
        variant: 'destructive',
      });
      return;
    }

    const userData = JSON.parse(storedUser);
    const savedNews = userData.savedNews || [];
    
    let newSavedNews;
    let newIsSaved;
    
    if (savedNews.includes(id)) {
      newSavedNews = savedNews.filter((newsId: number) => newsId !== id);
      newIsSaved = false;
      toast({
        title: '🗑️ Удалено из сохранённого',
        description: 'Новость убрана из вашей коллекции',
      });
    } else {
      newSavedNews = [...savedNews, id];
      newIsSaved = true;
      toast({
        title: '✅ Добавлено в сохранённое',
        description: 'Новость сохранена в ваш профиль',
      });
    }
    
    const updatedUser = { ...userData, savedNews: newSavedNews };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setIsSaved(newIsSaved);
    
    if (onSaveToggle) {
      onSaveToggle(id, newIsSaved);
    }
  };
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
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={isSaved ? "default" : "ghost"}
            onClick={handleSaveClick}
            className="h-8 px-3"
          >
            <Icon name={isSaved ? "BookmarkCheck" : "Bookmark"} size={14} className="mr-1" />
            {isSaved ? 'Сохранено' : 'Сохранить'}
          </Button>
          <span className="text-xs text-primary font-medium story-link">
            Читать далее
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;