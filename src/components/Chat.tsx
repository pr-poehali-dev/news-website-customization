import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  userId: string;
  userName: string;
  text: string;
  timestamp: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

const Chat = () => {
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    const storedMessages = localStorage.getItem('chatMessages');
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      const initialMessages: Message[] = [
        {
          id: 1,
          userId: 'system',
          userName: 'Система',
          text: 'Добро пожаловать в общий чат! Здесь вы можете обсудить новости и поделиться мнением.',
          timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
        },
      ];
      setMessages(initialMessages);
      localStorage.setItem('chatMessages', JSON.stringify(initialMessages));
    }
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast({
        title: '⚠️ Требуется авторизация',
        description: 'Войдите в систему, чтобы отправлять сообщения',
        variant: 'destructive',
      });
      return;
    }

    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      userId: user.id,
      userName: user.name,
      text: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    localStorage.setItem('chatMessages', JSON.stringify(updatedMessages));
    setNewMessage('');
  };

  const getUserInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-to-br from-card to-primary/5 border-primary/20">
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <Icon name="MessageSquare" size={24} className="text-primary" />
          Общий чат
          <span className="ml-auto text-sm font-normal text-muted-foreground">
            {user ? 'Онлайн' : 'Войдите для участия'}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 p-0 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => {
              const isCurrentUser = user?.id === message.userId;
              const isSystem = message.userId === 'system';

              if (isSystem) {
                return (
                  <div key={message.id} className="flex justify-center">
                    <div className="bg-muted/50 px-4 py-2 rounded-lg text-xs text-muted-foreground max-w-md text-center">
                      {message.text}
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <Avatar className="w-8 h-8 border-2 border-primary/20">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                      {getUserInitials(message.userName)}
                    </AvatarFallback>
                  </Avatar>

                  <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">{message.userName}</span>
                      <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isCurrentUser
                          ? 'bg-primary text-primary-foreground rounded-tr-sm'
                          : 'bg-muted rounded-tl-sm'
                      }`}
                    >
                      <p className="text-sm break-words">{message.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4">
          {user ? (
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Напишите сообщение..."
                className="flex-1"
                maxLength={500}
              />
              <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                <Icon name="Send" size={18} />
              </Button>
            </form>
          ) : (
            <div className="text-center py-2 text-sm text-muted-foreground">
              <Icon name="Lock" size={20} className="mx-auto mb-2" />
              Войдите, чтобы участвовать в обсуждении
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default Chat;
