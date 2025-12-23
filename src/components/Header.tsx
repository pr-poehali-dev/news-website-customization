import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Header = () => {
  const [activeSection, setActiveSection] = useState('home');

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
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              NewsPortal
            </h1>
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

          <Button size="sm" className="hidden md:flex">
            <Icon name="Search" size={16} className="mr-2" />
            Поиск
          </Button>

          <Button size="icon" variant="ghost" className="md:hidden">
            <Icon name="Menu" size={24} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
