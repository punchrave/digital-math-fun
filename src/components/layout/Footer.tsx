import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center bg-primary">
                <GraduationCap className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">Кафедра ПМиКМ</p>
                <p className="text-xs text-muted-foreground">НИУ «БелГУ»</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Кафедра прикладной математики и компьютерного моделирования 
              Белгородского государственного национального исследовательского университета.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Навигация</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary">
                  О кафедре
                </Link>
              </li>
              <li>
                <Link to="/teachers" className="text-muted-foreground hover:text-primary">
                  Преподаватели
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-muted-foreground hover:text-primary">
                  Образовательные программы
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-muted-foreground hover:text-primary">
                  Новости
                </Link>
              </li>
            </ul>
          </div>

          {/* For students */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Студентам</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/auth" className="text-muted-foreground hover:text-primary">
                  Личный кабинет
                </Link>
              </li>
              <li>
                <a href="https://bsuedu.ru/bsu/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                  Сайт НИУ «БелГУ»
                </a>
              </li>
              <li>
                <Link to="/programs" className="text-muted-foreground hover:text-primary">
                  Учебные материалы
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-muted-foreground hover:text-primary">
                  Обратная связь
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Контакты</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                <span>308015, г. Белгород, ул. Победы, 85</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 shrink-0" />
                <a href="tel:+74722301211" className="hover:text-primary">
                  +7 (4722) 30-12-11
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <a href="mailto:pmikm@bsu.edu.ru" className="hover:text-primary">
                  pmikm@bsu.edu.ru
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Кафедра прикладной математики и компьютерного моделирования НИУ «БелГУ»</p>
        </div>
      </div>
    </footer>
  );
}
