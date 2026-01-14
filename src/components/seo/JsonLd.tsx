import { Helmet } from 'react-helmet-async';

// Типы для JSON-LD разметки
interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'EducationalOrganization';
  name: string;
  alternateName?: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  contactPoint?: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    email?: string;
  };
  sameAs?: string[];
  parentOrganization?: {
    '@type': 'EducationalOrganization';
    name: string;
    url: string;
  };
}

interface CourseSchema {
  '@context': 'https://schema.org';
  '@type': 'Course';
  name: string;
  description: string;
  provider: {
    '@type': 'EducationalOrganization';
    name: string;
    url: string;
  };
  educationalLevel?: string;
  teaches?: string[];
  hasCourseInstance?: {
    '@type': 'CourseInstance';
    courseMode: string;
    inLanguage: string;
  };
}

interface LearningResourceSchema {
  '@context': 'https://schema.org';
  '@type': 'LearningResource';
  name: string;
  description: string;
  educationalLevel: string;
  learningResourceType: string;
  teaches: string[];
  inLanguage: string;
  isAccessibleForFree: boolean;
  provider: {
    '@type': 'EducationalOrganization';
    name: string;
  };
  about?: {
    '@type': 'Thing';
    name: string;
  };
}

interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

// Компоненты для разных типов разметки

export function OrganizationJsonLd() {
  const schema: OrganizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Кафедра прикладной математики и компьютерного моделирования',
    alternateName: 'Кафедра ПМиКМ НИУ БелГУ',
    url: 'https://digital-math-fun.lovable.app',
    description: 'Кафедра прикладной математики и компьютерного моделирования Белгородского государственного национального исследовательского университета. Подготовка специалистов в области математического моделирования и информационных технологий.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'ул. Победы, 85',
      addressLocality: 'Белгород',
      addressRegion: 'Белгородская область',
      postalCode: '308015',
      addressCountry: 'RU',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+7-4722-30-12-11',
      contactType: 'customer service',
      email: 'pmikm@bsu.edu.ru',
    },
    parentOrganization: {
      '@type': 'EducationalOrganization',
      name: 'Белгородский государственный национальный исследовательский университет',
      url: 'https://bsu.edu.ru',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

interface CourseJsonLdProps {
  name: string;
  description: string;
  teaches?: string[];
}

export function CourseJsonLd({ name, description, teaches = [] }: CourseJsonLdProps) {
  const schema: CourseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Кафедра ПМиКМ НИУ БелГУ',
      url: 'https://digital-math-fun.lovable.app',
    },
    educationalLevel: 'Высшее образование',
    teaches,
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      inLanguage: 'ru',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

interface LearningResourceJsonLdProps {
  name: string;
  description: string;
  teaches: string[];
  topic?: string;
}

export function LearningResourceJsonLd({ 
  name, 
  description, 
  teaches,
  topic 
}: LearningResourceJsonLdProps) {
  const schema: LearningResourceSchema = {
    '@context': 'https://schema.org',
    '@type': 'LearningResource',
    name,
    description,
    educationalLevel: 'Высшее образование',
    learningResourceType: 'Учебный материал',
    teaches,
    inLanguage: 'ru',
    isAccessibleForFree: true,
    provider: {
      '@type': 'EducationalOrganization',
      name: 'Кафедра ПМиКМ НИУ БелГУ',
    },
    ...(topic && {
      about: {
        '@type': 'Thing',
        name: topic,
      },
    }),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

interface FAQJsonLdProps {
  questions: Array<{
    question: string;
    answer: string;
  }>;
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  const schema: FAQSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url?: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema: BreadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url && { item: item.url }),
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
