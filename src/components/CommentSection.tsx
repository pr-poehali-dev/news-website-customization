import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

interface Comment {
  id: number;
  author: string;
  text: string;
  date: string;
  likes: number;
}

interface CommentSectionProps {
  newsId: number;
  initialComments?: Comment[];
}

const CommentSection = ({ newsId, initialComments = [] }: CommentSectionProps) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      const comment: Comment = {
        id: Date.now(),
        author: 'Гость',
        text: newComment,
        date: 'Только что',
        likes: 0,
      };
      setComments([comment, ...comments]);
      setNewComment('');
    }
  };

  const handleLike = (id: number) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
    ));
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="MessageSquare" size={24} />
          Комментарии ({comments.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Textarea
            placeholder="Ваш комментарий..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-24 resize-none"
          />
          <Button onClick={handleAddComment} className="w-full md:w-auto">
            <Icon name="Send" size={16} className="mr-2" />
            Отправить
          </Button>
        </div>

        <div className="space-y-4 mt-8">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 p-4 bg-muted/30 rounded-lg animate-scale-in">
              <Avatar>
                <AvatarFallback className="bg-primary/20 text-primary">
                  {comment.author[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold text-sm">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">{comment.date}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleLike(comment.id)}
                    className="gap-1"
                  >
                    <Icon name="ThumbsUp" size={14} />
                    <span className="text-xs">{comment.likes}</span>
                  </Button>
                </div>
                <p className="text-sm text-foreground/90">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>

        {comments.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-3 opacity-30" />
            <p>Пока нет комментариев. Будьте первым!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CommentSection;
