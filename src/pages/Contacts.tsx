import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contacts() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время",
    });
    
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container">
          <h1 className="mb-4 font-serif text-4xl font-bold">Контакты</h1>
          <p className="max-w-2xl text-lg text-primary-foreground/80">
            Свяжитесь с нами для получения дополнительной информации
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact info */}
            <div>
              <h2 className="mb-8 font-serif text-2xl font-bold">Контактная информация</h2>
              
              <div className="space-y-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Адрес</h3>
                      <p className="text-sm text-muted-foreground">
                        г. Москва, ул. Университетская, д. 1<br />
                        Главный корпус, ауд. 301-315
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Телефон</h3>
                      <p className="text-sm text-muted-foreground">
                        <a href="tel:+74951234567" className="hover:text-primary">
                          +7 (495) 123-45-67
                        </a>
                        <br />
                        <a href="tel:+74951234568" className="hover:text-primary">
                          +7 (495) 123-45-68
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Email</h3>
                      <p className="text-sm text-muted-foreground">
                        <a href="mailto:kafedra@university.ru" className="hover:text-primary">
                          kafedra@university.ru
                        </a>
                        <br />
                        <a href="mailto:priem@university.ru" className="hover:text-primary">
                          priem@university.ru
                        </a> (приёмная комиссия)
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="mb-1 font-semibold">Часы работы</h3>
                      <p className="text-sm text-muted-foreground">
                        Пн–Пт: 9:00 – 18:00<br />
                        Сб: 10:00 – 14:00<br />
                        Вс: выходной
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact form */}
            <div>
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Форма обратной связи</CardTitle>
                  <CardDescription>
                    Заполните форму и мы свяжемся с вами в ближайшее время
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя *</Label>
                        <Input id="name" name="name" required placeholder="Ваше имя" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input id="email" name="email" type="email" required placeholder="email@example.com" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+7 (___) ___-__-__" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Тема обращения *</Label>
                      <Input id="subject" name="subject" required placeholder="Тема вашего сообщения" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Сообщение *</Label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        required 
                        placeholder="Опишите ваш вопрос..."
                        rows={5}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                      {isSubmitting ? (
                        "Отправка..."
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Отправить сообщение
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="border-t">
        <div className="h-80 bg-muted flex items-center justify-center">
          <p className="text-muted-foreground">Карта расположения</p>
        </div>
      </section>
    </Layout>
  );
}
