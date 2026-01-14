import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article' | 'profile';
  noindex?: boolean;
}

export function SEOHead({
  title = 'Кафедра прикладной математики и компьютерного моделирования — НИУ БелГУ',
  description = 'Официальный сайт кафедры прикладной математики и компьютерного моделирования Белгородского государственного университета. Образовательные программы, научная деятельность, база знаний по высшей математике.',
  keywords = ['математика', 'БелГУ', 'высшая математика', 'прикладная математика', 'образование'],
  canonical,
  ogImage = '/og-image.png',
  ogType = 'website',
  noindex = false,
}: SEOHeadProps) {
  const siteName = 'Кафедра ПМиКМ — НИУ БелГУ';
  const fullTitle = title === siteName ? title : `${title} | ${siteName}`;

  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      
      {/* Robots */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large" />
      )}
      
      {/* Canonical */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ru_RU" />
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Дополнительные мета-теги */}
      <meta name="author" content="Кафедра прикладной математики и компьютерного моделирования НИУ БелГУ" />
      <meta name="geo.region" content="RU-BEL" />
      <meta name="geo.placename" content="Белгород" />
    </Helmet>
  );
}
