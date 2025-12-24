import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import AuthModal from './AuthModal';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; name: string; email: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Newspaper" size={32} className="text-primary" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">NekmiNevs</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Главная
            </button>
            <button
              onClick={() => scrollToSection('news')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'news' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Новости
            </button>
            <button
              onClick={() => scrollToSection('popular')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'popular' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Популярное
            </button>
            <button
              onClick={() => scrollToSection('subscribe')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'subscribe' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Подписка
            </button>
            <button
              onClick={() => scrollToSection('contacts')}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Контакты
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <Button size="sm" variant="ghost" className="hidden md:flex">
              <Icon name="Search" size={16} className="mr-2" />
              Поиск
            </Button>

            {user ? (
              <Button
                size="sm"
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => navigate('/profile')}
              >
                <Avatar className="w-8 h-8 border-2 border-primary/20">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden lg:inline">{user.name}</span>
              </Button>
            ) : (
              <Button size="sm" onClick={() => setIsAuthOpen(true)}>
                <Icon name="LogIn" size={16} className="mr-2" />
                Войти
              </Button>
            )}

            <Button size="icon" variant="ghost" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </div>

      <AuthModal 
        open={isAuthOpen} 
        onOpenChange={setIsAuthOpen}
        onSuccess={(userData) => setUser(userData)}
      />
    </header>
  );
};

export default Header;