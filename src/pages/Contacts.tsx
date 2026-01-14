import { Layout } from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState } from 'react'
import { SEOHead, BreadcrumbJsonLd } from '@/components/seo'

export default function Contacts() {
	const { toast } = useToast()
	const [isSubmitting, setIsSubmitting] = useState(false)

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsSubmitting(true)

		// Simulate form submission
		await new Promise(resolve => setTimeout(resolve, 1000))

		toast({
			title: 'Сообщение отправлено',
			description: 'Мы свяжемся с вами в ближайшее время',
		})

		setIsSubmitting(false)
		;(e.target as HTMLFormElement).reset()
	}

	return (
		<Layout>
			<SEOHead 
				title="Контакты"
				description="Контактная информация кафедры прикладной математики и компьютерного моделирования НИУ БелГУ. Адрес, телефон, email и форма обратной связи."
				keywords={['контакты', 'БелГУ', 'адрес', 'телефон', 'email', 'обратная связь']}
			/>
			<BreadcrumbJsonLd 
				items={[
					{ name: 'Главная', url: 'https://digital-math-fun.lovable.app' },
					{ name: 'Контакты' }
				]}
			/>

			{/* Hero */}
			<section className='bg-primary py-16 text-primary-foreground'>
				<div className='container'>
					<h1 className='mb-4 font-serif text-4xl font-bold'>Контакты</h1>
					<p className='max-w-2xl text-lg text-primary-foreground/80'>
						Свяжитесь с нами для получения дополнительной информации
					</p>
				</div>
			</section>

			<section className='py-16'>
				<div className='container'>
					<div className='grid gap-12 lg:grid-cols-2'>
						{/* Contact info */}
						<div>
							<h2 className='mb-8 font-serif text-2xl font-bold'>
								Контактная информация
							</h2>

							<div className='space-y-6'>
								<Card className='border-0 shadow-sm'>
									<CardContent className='flex items-start gap-4 p-6'>
										<div className='flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10'>
											<MapPin className='h-5 w-5 text-primary' />
										</div>
										<div>
											<h3 className='mb-1 font-semibold'>Адрес кафедры</h3>
											<p className='text-sm text-muted-foreground'>
												308015, г. Белгород, ул. Победы, 85
												<br />
												Корпус 14, кабинет 1-11а
											</p>
										</div>
									</CardContent>
								</Card>

								<Card className='border-0 shadow-sm'>
									<CardContent className='flex items-start gap-4 p-6'>
										<div className='flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10'>
											<Phone className='h-5 w-5 text-primary' />
										</div>
										<div>
											<h3 className='mb-1 font-semibold'>Телефон</h3>
											<p className='text-sm text-muted-foreground'>
												<a
													href='tel:+74722301211'
													className='hover:text-primary'
												>
													+7 (4722) 30-12-11
												</a>
											</p>
										</div>
									</CardContent>
								</Card>

								<Card className='border-0 shadow-sm'>
									<CardContent className='flex items-start gap-4 p-6'>
										<div className='flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10'>
											<Mail className='h-5 w-5 text-primary' />
										</div>
										<div>
											<h3 className='mb-1 font-semibold'>Email</h3>
											<p className='text-sm text-muted-foreground'>
												<a
													href='mailto:pmikm@bsu.edu.ru'
													className='hover:text-primary'
												>
													pmikm@bsu.edu.ru
												</a>
											</p>
										</div>
									</CardContent>
								</Card>

								<Card className='border-0 shadow-sm'>
									<CardContent className='flex items-start gap-4 p-6'>
										<div className='flex h-10 w-10 shrink-0 items-center justify-center bg-primary/10'>
											<Clock className='h-5 w-5 text-primary' />
										</div>
										<div>
											<h3 className='mb-1 font-semibold'>Часы работы</h3>
											<p className='text-sm text-muted-foreground'>
												Пн–Пт: 9:00 – 18:00
												<br />
												Сб: 10:00 – 14:00
												<br />
												Вс: выходной
											</p>
										</div>
									</CardContent>
								</Card>
							</div>
						</div>

						{/* Contact form */}
						<div>
							<Card className='border-0 shadow-sm'>
								<CardHeader>
									<CardTitle>Форма обратной связи</CardTitle>
									<CardDescription>
										Заполните форму и мы свяжемся с вами в ближайшее время
									</CardDescription>
								</CardHeader>
								<CardContent>
									<form onSubmit={handleSubmit} className='space-y-4'>
										<div className='grid gap-4 sm:grid-cols-2'>
											<div className='space-y-2'>
												<Label htmlFor='name'>Имя *</Label>
												<Input
													id='name'
													name='name'
													required
													placeholder='Ваше имя'
												/>
											</div>
											<div className='space-y-2'>
												<Label htmlFor='email'>Email *</Label>
												<Input
													id='email'
													name='email'
													type='email'
													required
													placeholder='email@example.com'
												/>
											</div>
										</div>

										<div className='space-y-2'>
											<Label htmlFor='phone'>Телефон</Label>
											<Input
												id='phone'
												name='phone'
												type='tel'
												placeholder='+7 (___) ___-__-__'
											/>
										</div>

										<div className='space-y-2'>
											<Label htmlFor='subject'>Тема обращения *</Label>
											<Input
												id='subject'
												name='subject'
												required
												placeholder='Тема вашего сообщения'
											/>
										</div>

										<div className='space-y-2'>
											<Label htmlFor='message'>Сообщение *</Label>
											<Textarea
												id='message'
												name='message'
												required
												placeholder='Опишите ваш вопрос...'
												rows={5}
											/>
										</div>

										<Button
											type='submit'
											className='w-full'
											disabled={isSubmitting}
										>
											{isSubmitting ? (
												'Отправка...'
											) : (
												<>
													<Send className='mr-2 h-4 w-4' />
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

			<section className='border-t bg-background'>
				<div className='h-96'>
					<div className='w-full h-full'>
						<iframe
							src='https://www.google.com/maps/d/embed?mid=1qmw6-FmxhrhcxY4igsKwbJBA0ttw8ek&ehbc=2E312F'
							width='100%'
							height='100%'
							frameBorder='0'
							allowFullScreen
							title='Карта расположения'
							loading='lazy'
						/>
					</div>
				</div>
			</section>
		</Layout>
	)
}
