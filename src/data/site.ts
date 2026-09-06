export type NavigationItem = Readonly<{ label: string; href: string }>;
export type ContentItem = Readonly<{ title: string; description: string }>;
export type ExperienceItem = Readonly<{ title: string; description: string }>;
export type ContactConfig = Readonly<{
  telegram: string | null;
  email: string | null;
  phone: string | null;
}>;

export const brand = {
  name: 'Nepomka',
  person: 'Непомнящий Данил Александрович',
  descriptor: 'Автомобильный специалист',
  statement: 'Автомобили без догадок.',
  description:
    'Разбираюсь в автомобилях от состояния и обслуживания до запчастей и процессов автобизнеса. Помогаю отделять реальную проблему от догадок и принимать решения, которые можно объяснить.',
} as const;

export const navigation: readonly NavigationItem[] = [
  { label: 'Экспертиза', href: '#expertise' },
  { label: 'Разборы', href: '#cases' },
  { label: 'Опыт', href: '#experience' },
  { label: 'Подход', href: '#principles' },
  { label: 'Обо мне', href: '#about' },
];

export const expertise: readonly ContentItem[] = [
  {
    title: 'Состояние автомобиля',
    description: 'Осмотр, приёмка и понимание того, что действительно требует внимания.',
  },
  {
    title: 'Обслуживание',
    description: 'Логика работ, приоритеты и разговор с сервисом без лишних операций.',
  },
  {
    title: 'Запчасти',
    description:
      'Каталоги, аналоги, поставщики и выбор между ценой, совместимостью и ресурсом.',
  },
  {
    title: 'Автобизнес',
    description:
      'Продажи, путь клиента и цифровые B2B-процессы вокруг запчастей и сервиса.',
  },
];

export const experience: readonly ExperienceItem[] = [
  {
    title: 'Детейлинг',
    description:
      'Внимание к состоянию, материалам и деталям, где качество результата видно буквально на поверхности.',
  },
  {
    title: 'Приёмка автомобилей',
    description:
      'Системный осмотр, фиксация важного и разговор с владельцем на понятном языке.',
  },
  {
    title: 'Продажа запчастей',
    description:
      'Каталоги, аналоги, поставщики и реальные запросы людей, которым нужна подходящая деталь, а не просто позиция в прайсе.',
  },
  {
    title: 'Частные клиенты',
    description:
      'Практический взгляд на обслуживание, где решение оценивается по тому, что в итоге получает автомобиль и его владелец.',
  },
  {
    title: 'B2B automotive',
    description:
      'Интерес к тому, как профессиональные инструменты помогают продавцам, поставщикам и сервисам работать быстрее и точнее.',
  },
];

export const ownerHelp = [
  'разобраться в ситуации с автомобилем',
  'обсудить обслуживание или ремонт',
  'понять логику подбора запчастей',
  'получить второе мнение перед решением',
] as const;

export const businessHelp = [
  'автомобильная предметная экспертиза',
  'понимание пути клиента и B2B-коммуникации',
  'контекст поиска, подбора и поставки запчастей',
  'связь между цифровым продуктом и реальной работой отрасли',
] as const;

export const principles = [
  'Сначала понять причину, потом менять детали.',
  'Не предлагать работу только потому, что её можно продать.',
  'Отделять срочное от того, что можно спокойно запланировать.',
  'Объяснять решение обычным языком, без тумана из терминов.',
  'Смотреть не только на цену детали, но и на совместимость, ресурс и последствия выбора.',
] as const;

export const contact: ContactConfig = {
  telegram: null,
  email: null,
  phone: null,
};
