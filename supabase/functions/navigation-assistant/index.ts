const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const apiKey = Deno.env.get('LOVABLE_API_KEY');

    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const systemPrompt = `Ты — дружелюбный помощник по навигации на сайте кафедры прикладной математики и компьютерного моделирования НИУ «БелГУ».

Твоя задача — помогать новым пользователям ориентироваться на сайте и отвечать на вопросы о кафедре.

Структура сайта:
- Главная страница (/) — обзор кафедры, статистика, новости
- О кафедре (/about) — история, миссия, структура кафедры
- Преподаватели (/teachers) — информация о преподавателях кафедры
- Программы (/programs) — образовательные программы бакалавриата и магистратуры
- Новости (/news) — актуальные новости и события кафедры
- Контакты (/contacts) — адрес, телефоны, email, карта
- База знаний (/knowledge) — учебные материалы по высшей математике с AI-ассистентом

Информация о кафедре:
- Кафедра готовит специалистов в области математического моделирования, анализа данных и IT
- Направления: прикладная математика, компьютерные технологии, научные исследования
- Практическая подготовка: стажировки в ведущих компаниях

Правила ответов:
1. Отвечай кратко и по делу
2. Указывай конкретные страницы сайта, где можно найти информацию
3. Будь вежливым и доброжелательным
4. Если не знаешь ответа — предложи связаться через страницу контактов
5. Отвечай на русском языке`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: 'Payment required' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      throw new Error(`AI Gateway error: ${status}`);
    }

    return new Response(response.body, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Navigation assistant error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
