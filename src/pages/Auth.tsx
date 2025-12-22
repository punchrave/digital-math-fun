import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { GraduationCap, LogIn, UserPlus } from "lucide-react";

export default function Auth() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Функция в разработке",
      description: "Авторизация будет доступна после подключения базы данных",
    });
    
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Функция в разработке",
      description: "Регистрация будет доступна после подключения базы данных",
    });
    
    setIsLoading(false);
  };

  return (
    <Layout>
      <section className="flex min-h-[calc(100vh-16rem)] items-center justify-center py-16">
        <div className="container max-w-md">
          {/* Logo */}
          <div className="mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-12 w-12 items-center justify-center bg-primary">
                <GraduationCap className="h-7 w-7 text-primary-foreground" />
              </div>
            </Link>
            <h1 className="mt-4 font-serif text-2xl font-bold">Личный кабинет</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Кафедра прикладной математики и компьютерного моделирования
            </p>
          </div>

          <Card className="border-0 shadow-lg">
            <CardContent className="pt-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Вход</TabsTrigger>
                  <TabsTrigger value="register">Регистрация</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login" className="mt-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input 
                        id="login-email" 
                        type="email" 
                        required 
                        placeholder="student@university.ru"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="login-password">Пароль</Label>
                        <button 
                          type="button"
                          className="text-xs text-muted-foreground hover:text-primary"
                        >
                          Забыли пароль?
                        </button>
                      </div>
                      <Input 
                        id="login-password" 
                        type="password" 
                        required 
                        placeholder="••••••••"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        "Вход..."
                      ) : (
                        <>
                          <LogIn className="mr-2 h-4 w-4" />
                          Войти
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="register" className="mt-6">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Имя</Label>
                        <Input 
                          id="register-name" 
                          required 
                          placeholder="Иван"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-surname">Фамилия</Label>
                        <Input 
                          id="register-surname" 
                          required 
                          placeholder="Иванов"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input 
                        id="register-email" 
                        type="email" 
                        required 
                        placeholder="student@university.ru"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-student-id">Номер студенческого билета</Label>
                      <Input 
                        id="register-student-id" 
                        required 
                        placeholder="123456"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Пароль</Label>
                      <Input 
                        id="register-password" 
                        type="password" 
                        required 
                        placeholder="••••••••"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password-confirm">Подтвердите пароль</Label>
                      <Input 
                        id="register-password-confirm" 
                        type="password" 
                        required 
                        placeholder="••••••••"
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? (
                        "Регистрация..."
                      ) : (
                        <>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Зарегистрироваться
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">
              ← Вернуться на главную
            </Link>
          </p>
        </div>
      </section>
    </Layout>
  );
}
