import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import Header from '@/components/Header';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  joinDate?: string;
  savedNews?: number[];
}

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser({
      ...userData,
      bio: userData.bio || 'Любитель технологий и новостей',
      joinDate: userData.joinDate || '15 дек 2024',
      savedNews: userData.savedNews || [],
    });
  }, [navigate]);

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedUser = {
      ...user,
      name: formData.get('name') as string,
      bio: formData.get('bio') as string,
    };
    
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser as UserData);
    setIsEditing(false);
    
    toast({
      title: '✅ Профиль обновлён',
      description: 'Изменения успешно сохранены',
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: '👋 До встречи!',
      description: 'Вы вышли из системы',
    });
    navigate('/');
  };

  if (!user) return null;

  const userInitials = user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="bg-gradient-to-br from-card to-primary/5 border-primary/20 sticky top-24">
                <CardContent className="pt-6">
                  <div className="text-center space-y-4">
                    <Avatar className="w-32 h-32 mx-auto border-4 border-primary/20">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-3xl">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <h2 className="text-2xl font-bold">{user.name}</h2>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>

                    <p className="text-sm text-muted-foreground italic">{user.bio}</p>

                    <div className="flex justify-center gap-4 pt-4 border-t">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{user.savedNews?.length || 0}</div>
                        <div className="text-xs text-muted-foreground">Сохранено</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">24</div>
                        <div className="text-xs text-muted-foreground">Комментариев</div>
                      </div>
                    </div>

                    <div className="pt-4 space-y-2">
                      <Button variant="outline" className="w-full" onClick={() => navigate('/')}>
                        <Icon name="Home" size={18} className="mr-2" />
                        На главную
                      </Button>
                      <Button variant="destructive" className="w-full" onClick={handleLogout}>
                        <Icon name="LogOut" size={18} className="mr-2" />
                        Выйти
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">
                    <Icon name="User" size={16} className="mr-2" />
                    Обзор
                  </TabsTrigger>
                  <TabsTrigger value="saved">
                    <Icon name="Bookmark" size={16} className="mr-2" />
                    Сохранённое
                  </TabsTrigger>
                  <TabsTrigger value="settings">
                    <Icon name="Settings" size={16} className="mr-2" />
                    Настройки
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Activity" size={24} className="text-primary" />
                        Активность
                      </CardTitle>
                      <CardDescription>Ваша статистика за последний месяц</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon name="Eye" size={20} className="text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">Просмотров</div>
                            <div className="text-sm text-muted-foreground">Прочитано новостей</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-primary">156</div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                            <Icon name="MessageCircle" size={20} className="text-accent" />
                          </div>
                          <div>
                            <div className="font-semibold">Комментарии</div>
                            <div className="text-sm text-muted-foreground">Оставлено отзывов</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-accent">24</div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                            <Icon name="ThumbsUp" size={20} className="text-green-500" />
                          </div>
                          <div>
                            <div className="font-semibold">Лайки</div>
                            <div className="text-sm text-muted-foreground">Получено на комментарии</div>
                          </div>
                        </div>
                        <div className="text-2xl font-bold text-green-500">89</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Award" size={24} className="text-primary" />
                        Достижения
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                          <Icon name="Zap" size={32} className="mx-auto mb-2 text-primary" />
                          <div className="font-semibold text-sm">Активный</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg">
                          <Icon name="Star" size={32} className="mx-auto mb-2 text-accent" />
                          <div className="font-semibold text-sm">Эксперт</div>
                        </div>
                        <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg">
                          <Icon name="Heart" size={32} className="mx-auto mb-2 text-green-500" />
                          <div className="font-semibold text-sm">Любимчик</div>
                        </div>
                        <div className="text-center p-4 bg-muted/30 rounded-lg opacity-50">
                          <Icon name="Lock" size={32} className="mx-auto mb-2 text-muted-foreground" />
                          <div className="font-semibold text-sm">Скоро</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="saved">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Bookmark" size={24} className="text-primary" />
                        Сохранённые новости
                      </CardTitle>
                      <CardDescription>Новости, которые вы отметили для прочтения позже</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-12 text-muted-foreground">
                        <Icon name="Inbox" size={48} className="mx-auto mb-4 opacity-50" />
                        <p>У вас пока нет сохранённых новостей</p>
                        <Button variant="outline" className="mt-4" onClick={() => navigate('/')}>
                          <Icon name="Search" size={18} className="mr-2" />
                          Искать новости
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon name="Settings" size={24} className="text-primary" />
                        Настройки профиля
                      </CardTitle>
                      <CardDescription>Управляйте своими личными данными</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!isEditing ? (
                        <div className="space-y-4">
                          <div>
                            <Label className="text-muted-foreground">Имя</Label>
                            <p className="text-lg font-medium">{user.name}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Email</Label>
                            <p className="text-lg font-medium">{user.email}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">О себе</Label>
                            <p className="text-lg font-medium">{user.bio}</p>
                          </div>
                          <div>
                            <Label className="text-muted-foreground">Дата регистрации</Label>
                            <p className="text-lg font-medium">{user.joinDate}</p>
                          </div>
                          <Button onClick={() => setIsEditing(true)} className="w-full">
                            <Icon name="Edit" size={18} className="mr-2" />
                            Редактировать профиль
                          </Button>
                        </div>
                      ) : (
                        <form onSubmit={handleSaveProfile} className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Имя</Label>
                            <Input id="name" name="name" defaultValue={user.name} required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" defaultValue={user.email} disabled />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">О себе</Label>
                            <Input id="bio" name="bio" defaultValue={user.bio} />
                          </div>
                          <div className="flex gap-3">
                            <Button type="submit" className="flex-1">
                              <Icon name="Save" size={18} className="mr-2" />
                              Сохранить
                            </Button>
                            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
                              Отмена
                            </Button>
                          </div>
                        </form>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
