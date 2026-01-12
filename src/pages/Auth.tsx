import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { GraduationCap, LogIn, UserPlus } from "lucide-react";

export default function Auth() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, loading, signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user && !loading) {
      navigate('/trainer');
    }
  }, [user, loading, navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const { error } = await signIn(email, password);
    if (error) {
      toast({ title: "Ошибка входа", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Успешный вход", description: "Добро пожаловать!" });
      navigate('/trainer');
    }
    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;
    const surname = formData.get('surname') as string;
    
    const { error } = await signUp(email, password, `${name} ${surname}`);
    if (error) {
      toast({ title: "Ошибка регистрации", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Регистрация успешна", description: "Вы вошли в систему!" });
      navigate('/trainer');
    }
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
                        name="email"
                        type="email" 
                        required 
                        placeholder="student@university.ru"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Пароль</Label>
                      <Input 
                        id="login-password" 
                        name="password"
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
                        <Input id="register-name" name="name" required placeholder="Иван" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="register-surname">Фамилия</Label>
                        <Input id="register-surname" name="surname" required placeholder="Иванов" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input id="register-email" name="email" type="email" required placeholder="student@university.ru" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Пароль</Label>
                      <Input id="register-password" name="password" type="password" required placeholder="••••••••" />
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
