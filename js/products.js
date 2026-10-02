const products = [
  // --------PROGRAMAÇÃO--------
  {
    id: 1,
    title: "HTML5 e CSS3 do Zero ao Avançado",
    category: "Programação & Tecnologia",
    price: 99.9,
    level: "Iniciante",
    duration: "40 horas",
    instructor: "Gustavo Guanabara",
    image: "/assets/img/html-css.jpg",
    description:
      "Aprenda a criar sites modernos, responsivos e semânticos do absoluto zero.",
  },
  {
    id: 2,
    title: "JavaScript Moderno e DOM na Prática",
    category: "Programação & Tecnologia",
    price: 149.9,
    level: "Intermediário",
    duration: "50 horas",
    instructor: "Diego Fernandes",
    image: "/assets/img/javascript.jpg",
    description:
      "Domine a linguagem base da web, manipulação de DOM e lógica assíncrona.",
  },
  {
    id: 3,
    title: "React.js: Construindo Interfaces Reativas",
    category: "Programação & Tecnologia",
    price: 199.9,
    level: "Intermediário",
    duration: "35 horas",
    instructor: "Filipe Deschamps",
    image: "/assets/img/react.jpg",
    description:
      "Crie aplicações SPA dinâmicas com Hooks, State Management e Vite.",
  },
  {
    id: 4,
    title: "Git e GitHub para Desenvolvedores",
    category: "Programação & Tecnologia",
    price: 79.9,
    level: "Iniciante",
    duration: "15 horas",
    instructor: "Loiane Groner",
    image: "/assets/img/git.jpg",
    description:
      "Aprenda versionamento de código, ramificação e colaboração em equipe.",
  },
  {
    id: 5,
    title: "Automação e Scripts com Python",
    category: "Programação & Tecnologia",
    price: 129.9,
    level: "Iniciante",
    duration: "30 horas",
    instructor: "Luiz Otávio",
    image: "/assets/img/python.jpg",
    description:
      "Automatize tarefas repetitivas, rotinas de dados e crie robôs úteis.",
  },

  // --------DESIGN--------
  {
    id: 6,
    title: "Figma do Zero ao Pro: Design de Interfaces",
    category: "Design & UX/UI",
    price: 139.9,
    level: "Iniciante",
    duration: "25 horas",
    instructor: "Eduardo Meirelles",
    image: "/assets/img/figma.jpg",
    description:
      "Projete wireframes, protótipos navegáveis e design systems no Figma.",
  },
  {
    id: 7,
    title: "Design System na Prática com Figma e CSS",
    category: "Design & UX/UI",
    price: 179.9,
    level: "Avançado",
    duration: "30 horas",
    instructor: "Amyris Fernandez",
    image: "/assets/img/design-system.jpg",
    description:
      "Crie e mantenha bibliotecas de componentes escaláveis e organizadas.",
  },
  {
    id: 8,
    title: "Photoshop Mestre para Redes Sociais",
    category: "Design & UX/UI",
    price: 89.9,
    level: "Iniciante",
    duration: "20 horas",
    instructor: "Lucas Rosa",
    image: "/assets/img/photoshop.jpg",
    description:
      "Técnicas de tratamento de imagem, recorte preciso e criação de posts.",
  },
  {
    id: 9,
    title: "Ilustração Digital com Illustrator",
    category: "Design & UX/UI",
    price: 119.9,
    level: "Intermediário",
    duration: "28 horas",
    instructor: "Substantivo Vetor",
    image: "/assets/img/illustrator.jpg",
    description:
      "Vetorização avançada, criação de logos, ícones e artes para web.",
  },
  {
    id: 10,
    title: "Branding e Identidade Visual Completa",
    category: "Design & UX/UI",
    price: 159.9,
    level: "Intermediário",
    duration: "32 horas",
    instructor: "Marcelo Kimura",
    image: "/assets/img/branding.jpg",
    description:
      "Desenvolva projetos conceituais de marcas, guias de estilo e manuais.",
  },

  // --------MARKETING--------
  {
    id: 11,
    title: "Copywriting: Escrita Persuasiva para Vendas",
    category: "Marketing & Negócios",
    price: 119.9,
    level: "Iniciante",
    duration: "18 horas",
    instructor: "Paulo Maccedo",
    image: "/assets/img/copywriting.jpg",
    description:
      "Crie textos que prendem a atenção e convertem leitores em clientes.",
  },
  {
    id: 12,
    title: "Tráfego Pago: Meta Ads e Google Ads",
    category: "Marketing & Negócios",
    price: 189.9,
    level: "Intermediário",
    duration: "45 horas",
    instructor: "Pedro Sobral",
    image: "/assets/img/trafego.jpg",
    description:
      "Aprenda a criar campanhas lucrativas no Instagram, Facebook e Google.",
  },
  {
    id: 13,
    title: "SEO e Posição Orgânica no Google",
    category: "Marketing & Negócios",
    price: 139.9,
    level: "Intermediário",
    duration: "22 horas",
    instructor: "Diego Ivo",
    image: "/assets/img/seo.jpg",
    description:
      "Otimização on-page e off-page para posicionar sites no topo das buscas.",
  },
  {
    id: 14,
    title: "Estratégias de Lançamento de Infoprodutos",
    category: "Marketing & Negócios",
    price: 249.9,
    level: "Avançado",
    duration: "50 horas",
    instructor: "Erico Rocha",
    image: "/assets/img/lancamento.jpg",
    description:
      "Planeje e execute lançamentos digitais do pré-marketing ao pós-venda.",
  },
  {
    id: 15,
    title: "Gestão de Mídias Sociais e Conteúdo",
    category: "Marketing & Negócios",
    price: 99.9,
    level: "Iniciante",
    duration: "20 horas",
    instructor: "Camila Porto",
    image: "/assets/img/social-media.jpg",
    description:
      "Construa calendários editoriais, estratégias de engajamento e métricas.",
  },

  // --------SOFT SKILLS--------
  {
    id: 16,
    title: "Organização Pessoal e Projetos no Notion",
    category: "Produtividade & Soft Skills",
    price: 69.9,
    level: "Iniciante",
    duration: "12 horas",
    instructor: "Matheus de Souza",
    image: "/assets/img/notion.jpg",
    description:
      "Crie dashboards funcionais para estudos, vida financeira e trabalho.",
  },
  {
    id: 17,
    title: "Engenharia de Prompt para IA (ChatGPT e Claude)",
    category: "Produtividade & Soft Skills",
    price: 109.9,
    level: "Iniciante",
    duration: "16 horas",
    instructor: "Rodrigo Bressan",
    image: "/assets/img/prompt-engineering.jpg",
    description:
      "Extraia o máximo potencial das IAs para acelerar seus estudos e trabalho.",
  },
  {
    id: 18,
    title: "Inglês Técnico para Profissionais de Tech",
    category: "Produtividade & Soft Skills",
    price: 149.9,
    level: "Intermediário",
    duration: "30 horas",
    instructor: "Carina Fragozo",
    image: "/assets/img/ingles-tech.jpg",
    description:
      "Melhore a leitura de documentações, termos técnicos e entrevistas em inglês.",
  },
  {
    id: 19,
    title: "Oratória e Comunicação de Alto Impacto",
    category: "Produtividade & Soft Skills",
    price: 89.9,
    level: "Iniciante",
    duration: "15 horas",
    instructor: "Reinaldo Polito",
    image: "/assets/img/oratoria.jpg",
    description:
      "Perca o medo de falar em público, faça reuniões e apresentações marcantes.",
  },
  {
    id: 20,
    title: "Gestão do Tempo e Foco no Trabalho Remoto",
    category: "Produtividade & Soft Skills",
    price: 79.9,
    level: "Iniciante",
    duration: "10 horas",
    instructor: "Christian Barbosa",
    image: "/assets/img/gestao-tempo.jpg",
    description:
      "Métodos práticos como Pomodoro e Tríade do Tempo para combater a procrastinação.",
  },
];
