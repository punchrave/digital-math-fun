import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { GraduationCap, Menu, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const navigation = [
	{ name: 'Главная', href: '/' },
	{ name: 'О кафедре', href: '/about' },
	{ name: 'Преподаватели', href: '/teachers' },
	{ name: 'Тренажёр', href: '/trainer' },
	{ name: 'Новости', href: '/news' },
	{ name: 'Контакты', href: '/contacts' },
]

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const location = useLocation()

	return (
		<header className='sticky top-0 z-40 w-full border-b bg-primary text-primary-foreground'>
			<nav className='container flex h-16 items-center justify-between'>
				<Link to='/' className='flex items-center gap-2'>
					<div className='flex h-10 w-10 items-center justify-center bg-primary-foreground rounded'>
						<GraduationCap className='h-6 w-6 text-primary' />
					</div>
					<div className='hidden sm:block'>
						<p className='text-sm font-semibold leading-tight'>
							Кафедра прикладной математики
						</p>
						<p className='text-xs text-primary-foreground/80'>
							и компьютерного моделирования · НИУ «БелГУ»
						</p>
					</div>
				</Link>

				{/* Desktop navigation */}
				<div className='hidden lg:flex lg:gap-1'>
					{navigation.map(item => (
						<Link
							key={item.name}
							to={item.href}
							className={cn(
								'px-3 py-2 text-sm font-medium transition-colors',
								location.pathname === item.href
									? 'bg-primary-foreground/20 rounded'
									: 'text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded'
							)}
						>
							{item.name}
						</Link>
					))}
				</div>

				<div className='flex items-center gap-2'>
					<Button
						asChild
						variant='secondary'
						size='sm'
						className='hidden sm:inline-flex'
					>
						<Link to='/auth'>
							<User className='mr-2 h-4 w-4' />
							Войти
						</Link>
					</Button>

					{/* Mobile menu button */}
					<Button
						variant='ghost'
						size='icon'
						className='lg:hidden text-primary-foreground hover:bg-primary-foreground/10'
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					>
						{mobileMenuOpen ? (
							<X className='h-5 w-5' />
						) : (
							<Menu className='h-5 w-5' />
						)}
					</Button>
				</div>
			</nav>

			{/* Mobile menu */}
			{mobileMenuOpen && (
				<div className='border-t border-primary-foreground/20 bg-primary lg:hidden'>
					<div className='container py-4'>
						{navigation.map(item => (
							<Link
								key={item.name}
								to={item.href}
								className={cn(
									'block py-2 text-sm font-medium transition-colors',
									location.pathname === item.href
										? 'text-primary-foreground'
										: 'text-primary-foreground/80 hover:text-primary-foreground'
								)}
								onClick={() => setMobileMenuOpen(false)}
							>
								{item.name}
							</Link>
						))}
						<Link
							to='/auth'
							className='mt-4 flex items-center gap-2 py-2 text-sm font-medium text-primary-foreground'
							onClick={() => setMobileMenuOpen(false)}
						>
							<User className='h-4 w-4' />
							Личный кабинет
						</Link>
					</div>
				</div>
			)}
		</header>
	)
}
