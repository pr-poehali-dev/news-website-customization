import { useState } from 'react';
import Header from '@/components/Header';
import NewsCard from '@/components/NewsCard';
import CommentSection from '@/components/CommentSection';
import Chat from '@/components/Chat';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const newsData = [
  {
    id: 1,
    title: 'Утечка данных клиентов Альфа-Банка: под угрозой миллионы пользователей',
    category: 'Безопасность',
    excerpt: 'В даркнете появилась база с персональными данными клиентов Альфа-Банка. Эксперты оценивают масштаб утечки в несколько миллионов записей.',
    date: '24 дек 2024',
    author: 'Александр Киберов',
    views: 45892,
    comments: 234,
    featured: true,
  },
  {
    id: 2,
    title: 'Прорыв в искусственном интеллекте: новая модель превзошла все ожидания',
    category: 'Технологии',
    excerpt: 'Исследователи представили революционную систему ИИ, способную решать сложные задачи с беспрецедентной точностью.',
    date: '23 дек 2024',
    author: 'Алексей Иванов',
    views: 12458,
    comments: 89,
  },
  {
    id: 3,
    title: 'Космический туризм становится реальностью',
    category: 'Космос',
    excerpt: 'Частные компании объявили о запуске коммерческих рейсов на орбиту уже в следующем году.',
    date: '22 дек 2024',
    author: 'Мария Петрова',
    views: 8542,
    comments: 56,
  },
  {
    id: 4,
    title: 'Экологическая революция: новый источник чистой энергии',
    category: 'Экология',
    excerpt: 'Ученые разработали технологию получения энергии из воздуха без вреда для окружающей среды.',
    date: '21 дек 2024',
    author: 'Дмитрий Смирнов',
    views: 6234,
    comments: 42,
  },
  {
    id: 5,
    title: 'Медицина будущего: лечение болезней на генетическом уровне',
    category: 'Медицина',
    excerpt: 'Новая терапия показала 95% эффективность в лечении ранее неизлечимых заболеваний.',
    date: '20 дек 2024',
    author: 'Елена Волкова',
    views: 9876,
    comments: 67,
  },
];

const popularNews = [
  {
    id: 6,
    title: 'Квантовые компьютеры вышли на новый уровень',
    category: 'Наука',
    excerpt: 'Прорыв в квантовых вычислениях открывает путь к решению задач, недоступных обычным компьютерам.',
    date: '19 дек 2024',
    author: 'Игорь Соколов',
    views: 15678,
    comments: 124,
  },
  {
    id: 7,
    title: 'Автономные автомобили заполнят города в 2025 году',
    category: 'Транспорт',
    excerpt: 'Крупнейшие автопроизводители завершили испытания беспилотных такси.',
    date: '18 дек 2024',
    author: 'Ольга Белова',
    views: 13245,
    comments: 98,
  },
  {
    id: 8,
    title: 'Виртуальная реальность изменит образование',
    category: 'Образование',
    excerpt: 'Школы и университеты внедряют VR-технологии для создания иммерсивного обучения.',
    date: '17 дек 2024',
    author: 'Сергей Новиков',
    views: 11234,
    comments: 76,
  },
];

const sampleComments = [
  {
    id: 1,
    author: 'Анна Кузнецова',
    text: 'Невероятная новость! Интересно, когда это станет доступно широкой публике?',
    date: '2 часа назад',
    likes: 12,
  },
  {
    id: 2,
    author: 'Павел Морозов',
    text: 'Отличная статья, спасибо за информацию. Жду продолжения!',
    date: '5 часов назад',
    likes: 8,
  },
];

const Index = () => {
  const [selectedNews, setSelectedNews] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <section id="home" className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">В безопасности? </h2>
            <p className="text-xl text-muted-foreground text-center">Все новости из мира финансов и мошенничества </p>
          </div>
        </section>

        <section id="news" className="container mx-auto px-4 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Icon name="Sparkles" size={32} className="text-primary" />
              Свежие новости
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {newsData.map((news) => (
              <div key={news.id} onClick={() => setSelectedNews(news.id)}>
                <NewsCard {...news} />
              </div>
            ))}
          </div>

          {selectedNews && (
            <div className="mt-8">
              <CommentSection newsId={selectedNews} initialComments={sampleComments} />
            </div>
          )}
        </section>

        <section id="popular" className="container mx-auto px-4 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold flex items-center gap-3">
              <Icon name="TrendingUp" size={32} className="text-primary" />
              Популярное
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularNews.map((news) => (
              <div key={news.id} onClick={() => setSelectedNews(news.id)}>
                <NewsCard {...news} />
              </div>
            ))}
          </div>
        </section>



        <section id="chat" className="container mx-auto px-4 mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
              <Icon name="MessageSquare" size={32} className="text-primary" />
              Общение
            </h2>
            <Chat />
          </div>
        </section>

        <section id="contacts" className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
              <Icon name="Phone" size={32} className="text-primary" />
              Контакты
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6 hover-scale cursor-pointer">
                <Icon name="Mail" size={32} className="mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-sm text-muted-foreground">info@newsportal.ru</p>
              </Card>
              
              <Card className="text-center p-6 hover-scale cursor-pointer">
                <Icon name="MessageCircle" size={32} className="mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Telegram</h3>
                <p className="text-sm text-muted-foreground">@newsportal</p>
              </Card>
              
              <Card className="text-center p-6 hover-scale cursor-pointer">
                <Icon name="Share2" size={32} className="mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Социальные сети</h3>
                <div className="flex justify-center gap-3 mt-3">
                  <Button size="icon" variant="ghost">
                    <Icon name="Twitter" size={20} />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Icon name="Facebook" size={20} />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Icon name="Instagram" size={20} />
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p className="text-sm">© 2024 NewsPortal. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;