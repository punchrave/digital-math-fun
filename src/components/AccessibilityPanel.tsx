import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Contrast, Eye, RotateCcw, Type, ZoomIn, ZoomOut } from 'lucide-react'
import { useEffect, useState } from 'react'

interface AccessibilitySettings {
	fontSize: number
	highContrast: boolean
	grayscale: boolean
	underlineLinks: boolean
	largeSpacing: boolean
}

const defaultSettings: AccessibilitySettings = {
	fontSize: 100,
	highContrast: false,
	grayscale: false,
	underlineLinks: false,
	largeSpacing: false,
}

export function AccessibilityPanel() {
	const [settings, setSettings] = useState<AccessibilitySettings>(() => {
		const saved = localStorage.getItem('accessibility-settings')
		return saved ? JSON.parse(saved) : defaultSettings
	})

	useEffect(() => {
		localStorage.setItem('accessibility-settings', JSON.stringify(settings))
		applySettings(settings)
	}, [settings])

	const applySettings = (s: AccessibilitySettings) => {
		const root = document.documentElement

		// Font size
		root.style.fontSize = `${s.fontSize}%`

		// High contrast
		if (s.highContrast) {
			root.classList.add('high-contrast')
		} else {
			root.classList.remove('high-contrast')
		}

		// Grayscale
		if (s.grayscale) {
			root.classList.add('grayscale-mode')
		} else {
			root.classList.remove('grayscale-mode')
		}

		// Underline links
		if (s.underlineLinks) {
			root.classList.add('underline-links')
		} else {
			root.classList.remove('underline-links')
		}

		// Large spacing
		if (s.largeSpacing) {
			root.classList.add('large-spacing')
		} else {
			root.classList.remove('large-spacing')
		}
	}

	const resetSettings = () => {
		setSettings(defaultSettings)
	}

	const increaseFontSize = () => {
		setSettings(prev => ({
			...prev,
			fontSize: Math.min(prev.fontSize + 10, 150),
		}))
	}

	const decreaseFontSize = () => {
		setSettings(prev => ({
			...prev,
			fontSize: Math.max(prev.fontSize - 10, 80),
		}))
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					variant='outline'
					size='icon'
					className='fixed top-4 right-4 z-[100] bg-background border-primary hover:bg-primary hover:text-primary-foreground'
					aria-label='Настройки доступности'
				>
					<Eye className='h-5 w-5' />
				</Button>
			</SheetTrigger>
			<SheetContent className='w-[320px] sm:w-[400px] z-[90]' side='left'>
				<SheetHeader>
					<SheetTitle className='flex items-center gap-2'>
						<Eye className='h-5 w-5' />
						Версия для слабовидящих
					</SheetTitle>
					<SheetDescription>
						Настройте параметры отображения для комфортного просмотра
					</SheetDescription>
				</SheetHeader>

				<div className='mt-6 space-y-6'>
					{/* Font Size */}
					<div className='space-y-3'>
						<Label className='text-base font-medium flex items-center gap-2'>
							<Type className='h-4 w-4' />
							Размер шрифта: {settings.fontSize}%
						</Label>
						<div className='flex items-center gap-2'>
							<Button
								variant='outline'
								size='icon'
								onClick={decreaseFontSize}
								disabled={settings.fontSize <= 80}
								aria-label='Уменьшить шрифт'
							>
								<ZoomOut className='h-4 w-4' />
							</Button>
							<Slider
								value={[settings.fontSize]}
								onValueChange={([value]) =>
									setSettings(prev => ({ ...prev, fontSize: value }))
								}
								min={80}
								max={150}
								step={10}
								className='flex-1'
								aria-label='Размер шрифта'
							/>
							<Button
								variant='outline'
								size='icon'
								onClick={increaseFontSize}
								disabled={settings.fontSize >= 150}
								aria-label='Увеличить шрифт'
							>
								<ZoomIn className='h-4 w-4' />
							</Button>
						</div>
					</div>

					{/* High Contrast */}
					<div className='flex items-center justify-between'>
						<Label
							htmlFor='high-contrast'
							className='text-base font-medium flex items-center gap-2 cursor-pointer'
						>
							<Contrast className='h-4 w-4' />
							Высокий контраст
						</Label>
						<Switch
							id='high-contrast'
							checked={settings.highContrast}
							onCheckedChange={checked =>
								setSettings(prev => ({ ...prev, highContrast: checked }))
							}
							aria-label='Включить высокий контраст'
						/>
					</div>

					{/* Grayscale */}
					<div className='flex items-center justify-between'>
						<Label
							htmlFor='grayscale'
							className='text-base font-medium cursor-pointer'
						>
							Чёрно-белый режим
						</Label>
						<Switch
							id='grayscale'
							checked={settings.grayscale}
							onCheckedChange={checked =>
								setSettings(prev => ({ ...prev, grayscale: checked }))
							}
							aria-label='Включить чёрно-белый режим'
						/>
					</div>

					{/* Underline Links */}
					<div className='flex items-center justify-between'>
						<Label
							htmlFor='underline-links'
							className='text-base font-medium cursor-pointer'
						>
							Подчёркивать ссылки
						</Label>
						<Switch
							id='underline-links'
							checked={settings.underlineLinks}
							onCheckedChange={checked =>
								setSettings(prev => ({ ...prev, underlineLinks: checked }))
							}
							aria-label='Подчёркивать ссылки'
						/>
					</div>

					{/* Large Spacing */}
					<div className='flex items-center justify-between'>
						<Label
							htmlFor='large-spacing'
							className='text-base font-medium cursor-pointer'
						>
							Увеличенные интервалы
						</Label>
						<Switch
							id='large-spacing'
							checked={settings.largeSpacing}
							onCheckedChange={checked =>
								setSettings(prev => ({ ...prev, largeSpacing: checked }))
							}
							aria-label='Увеличенные интервалы'
						/>
					</div>

					{/* Reset Button */}
					<Button
						variant='outline'
						className='w-full mt-4'
						onClick={resetSettings}
					>
						<RotateCcw className='h-4 w-4 mr-2' />
						Сбросить настройки
					</Button>
				</div>
			</SheetContent>
		</Sheet>
	)
}
