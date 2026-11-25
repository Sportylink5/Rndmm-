/* RNDM Chat — offline front-end implementation of the Figma desktop concept.
   Demonstration data is saved locally; no Supabase credentials, authentication,
   real-time networking or remote calls are used. */
(() => {
  'use strict';
  const $ = (s, root=document) => root.querySelector(s);
  const iconPaths = {
    home:'<path d="m3 10 9-7 9 7v10H3z"/><path d="M9 20v-7h6v7"/>',
    message:'<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8A8.5 8.5 0 0 1 8.7 3.9a8.38 8.38 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"/>',
    news:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/>',
    clips:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m10 8 6 4-6 4z"/>',
    channels:'<path d="M3 11v2a2 2 0 0 0 2 2h2l3 5h3l-3-5 9-4V5L7 9H5a2 2 0 0 0-2 2Z"/><path d="M21 9v4"/>',
    groups:'<circle cx="9" cy="7" r="3"/><path d="M2 21v-2a6 6 0 0 1 12 0v2M17 4a3 3 0 0 1 0 6M17 14a5 5 0 0 1 5 5v2"/>',
    phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8l-1.7 1.7a16 16 0 0 0 6.5 6.5l1.7-1.7a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 2Z"/>',
    friends:'<circle cx="9" cy="7" r="4"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M19 8v6m-3-3h6"/>',
    shuffle:'<path d="m18 14 4 4-4 4M2 18h2c6 0 8-12 14-12h4m-4-4 4 4-4 4M2 6h2c2.8 0 4.6 2 6 4M14 16c1.1 1.3 2.4 2 4 2h4"/>',
    game:'<rect x="2" y="6" width="20" height="13" rx="6"/><path d="M8 10v6M5 13h6M15 13h.01M18 11h.01"/>',
    profile:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    admin:'<path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6l-8-4Z"/><path d="m9 12 2 2 4-4"/>',
    settings:'<path d="M12 2v3m0 14v3M4.9 4.9 7 7m10 10 2.1 2.1M2 12h3m14 0h3M4.9 19.1 7 17m10-10 2.1-2.1"/><circle cx="12" cy="12" r="4"/>',
    shop:'<path d="M4 8h16l-1.3 13H5.3L4 8ZM8 9V6a4 4 0 0 1 8 0v3"/>',
    bank:'<path d="m2 9 10-6 10 6M3 9h18M5 10v9M10 10v9M15 10v9M20 10v9M2 21h20"/>',
    cloud:'<path d="M20 17a4 4 0 0 0-1.8-7.6A6 6 0 0 0 6.6 11 3.5 3.5 0 0 0 7 18h13"/>',
    search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    plus:'<path d="M12 5v14M5 12h14"/>',
    check:'<path d="m4 12 5 5L20 6"/>',
    chevron:'<path d="m9 18 6-6-6-6"/>',
    back:'<path d="m15 18-6-6 6-6"/>',
    send:'<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    clip:'<path d="M8 3v4m8-4v4M4 7h16v14H4zM3 3h18v4H3"/>',
    smile:'<circle cx="12" cy="12" r="9"/><path d="M8 14s1.3 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>',
    video:'<rect x="3" y="5" width="13" height="14" rx="3"/><path d="m16 10 5-3v10l-5-3"/>',
    attach:'<path d="m21 11-9 9a5 5 0 0 1-7-7l10-10a3.5 3.5 0 1 1 5 5L10 18a2 2 0 0 1-3-3l9-9"/>',
    more:'<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>',
    heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
    reply:'<path d="m9 17-5-5 5-5M4 12h10a6 6 0 0 1 6 6"/>',
    share:'<path d="M14 3h7v7m0-7L10 14"/><path d="M21 13v7H4V3h8"/>',
    star:'<path d="m12 2 3.1 6.4 7.1 1-5.1 5 .9 7-6-3.4-6 3.4.9-7-5.1-5 7.1-1L12 2Z"/>',
    bookmark:'<path d="M5 3h14v19l-7-5-7 5V3Z"/>',
    wallet:'<rect x="3" y="5" width="18" height="15" rx="3"/><path d="M16 11h5v4h-5a2 2 0 0 1 0-4Z"/>',
    lightning:'<path d="m13 2-9 11h7l-1 9 10-12h-7z"/>',
    bell:'<path d="M18 8a6 6 0 0 0-12 0c0 8-3 8-3 10h18c0-2-3-2-3-10M10 22h4"/>',
    moon:'<path d="M20 16.8A9 9 0 0 1 7.2 4 9 9 0 1 0 20 16.8Z"/>',
    sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    gift:'<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M12 9v12M2 5h20v4H2z"/><path d="M12 5c-4-5-8-2-5 0h5c4-5 8-2 5 0h-5"/>',
    x:'<path d="M18 6 6 18M6 6l12 12"/>',
    upload:'<path d="M12 17V3m-5 5 5-5 5 5M3 17v4h18v-4"/>',
    filter:'<path d="M3 5h18M7 12h10m-7 7h4"/>',
    clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
    download:'<path d="M12 3v14m-5-5 5 5 5-5M4 19v2h16v-2"/>'
  };
  function ic(name, size=18) { return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.star}</svg>`; }
  const esc = (x) => String(x == null ? '' : x).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
  const items = [
    ['home','Главная','home'],['chats','Чаты','message'],['news','Новости','news'],['clips','Клипы','clips'],
    ['channels','Каналы','channels'],['groups','Группы','groups'],['calls','Звонки','phone'],
    ['friends','Друзья','friends'],['roulette','Рулетка','shuffle'],['games','Игры','game'],
    ['market','Маркет','shop'],['bank','Банк','bank'],['cloud','Облако','cloud'],
    ['profile','Профиль','profile'],['settings','Настройки','settings'],['admin','Админка','admin']
  ];
  const demoChats = [
    {id:'alex',name:'Алексей',type:'Личные',preview:'Привет! Как дела?',time:'12:42',unread:2,online:true,c1:'#7d6ff1',c2:'#49409b'},
    {id:'rndm',name:'RNDM Community',type:'Группы',preview:'Новый пост в группе',time:'11:26',unread:3,c1:'#51c4bb',c2:'#23708a'},
    {id:'maria',name:'Мария',type:'Личные',preview:'Спасибо за помощь!',time:'Вчера',unread:0,online:true,c1:'#e78abc',c2:'#9f557c'},
    {id:'newsroom',name:'RNDM News',type:'Каналы',preview:'Свежие новости',time:'Вчера',unread:0,c1:'#6f92f2',c2:'#5850a1'},
    {id:'team',name:'Команда проекта',type:'Группы',preview:'Всем добрый вечер!',time:'Ср',unread:0,c1:'#bfa470',c2:'#8a618d'},
    {id:'dima',name:'Дмитрий',type:'Личные',preview:'До встречи!',time:'Вт',unread:0,c1:'#72b49c',c2:'#327674'}
  ];
  const demoMessages = {
    alex:[{text:'Привет! Как дела?',own:false,time:'12:39'},{text:'Привет, всё отлично! Делаю новый дизайн RNDM.',own:true,time:'12:40'},{text:'Классно! Хочешь созвониться вечером?',own:false,time:'12:42'}],
    rndm:[{text:'Добро пожаловать в сообщество RNDM Chat!',own:false,time:'11:20'},{text:'Сегодня тестируем новые разделы и дизайн.',own:false,time:'11:26'}],
    maria:[{text:'Привет! Посмотрела новый интерфейс.',own:false,time:'18:05'},{text:'Рад, что понравился!',own:true,time:'18:07'}],
    newsroom:[{text:'RNDM 2.0 — новости проекта и новые возможности.',own:false,time:'10:00'}],
    team:[{text:'Всем добрый вечер! Как дела с обновлением?',own:false,time:'20:20'}],
    dima:[{text:'До встречи!',own:false,time:'21:15'}]
  };
  const demoPosts = [
    {id:'p1',author:'RNDM News',subtitle:'Официальный канал · 2 часа назад',text:'RNDM 2.0 — больше возможностей для общения! Обновлённые чаты, клипы, каналы и цифровые подарки теперь собраны в одном пространстве.',likes:128,comments:17,art:true,liked:false},
    {id:'p2',author:'Мария',subtitle:'Ваша подписка · 5 часов назад',text:'Делюсь первым впечатлением: тёмная тема и мягкие фиолетовые акценты смотрятся очень здорово ✨',likes:48,comments:6,art:false,liked:false},
    {id:'p3',author:'Команда RNDM',subtitle:'Сообщество · Вчера',text:'Какую функцию добавить следующей? Расскажите в комментариях. Нам важно ваше мнение.',likes:76,comments:29,art:false,liked:false}
  ];
  const giftList = [
    ['Счастливый кот','gift-lucky_cat.webp',35],['Неоновая звезда','gift-neon_star.webp',65],
    ['Комета','gift-comet.webp',85],['Фиолетовая комета','gift-violet_comet.webp',120],
    ['Космическая ракета','gift-rocket.webp',200],['Бриллиант','gift-diamond.webp',350]
  ];
  const clips = [
    {author:'@rndm_official',title:'Что нового в RNDM Chat 2.0?',likes:2580,cover:'linear-gradient(145deg,#4d3c88,#9b69c6 60%,#4c8f9e)'},
    {author:'@digital_mood',title:'Вдохновение для твоего профиля',likes:1024,cover:'linear-gradient(135deg,#255c7a,#634caa 58%,#b76e9e)'},
    {author:'@creator',title:'Создавай, общайся, находи друзей',likes:937,cover:'linear-gradient(140deg,#9d4780,#5c4fb7 55%,#24486d)'}
  ];
  const defaults = {chats:demoChats,messages:demoMessages,posts:demoPosts,friends:['alex','maria','dima'],balance:1250,transactions:[{title:'Приветственный бонус',amount:1250,date:'Сегодня'}],tap:0,displayName:'Мой профиль',username:'@you',bio:'Общение в твоём ритме.',theme:'dark',compact:false,notifications:true,sound:true,files:[],following:['newsroom'],moderated:[],stories:['Алексей','Мария','Дмитрий']};
  let stored={}; try{stored=JSON.parse(localStorage.getItem('rndm-figma-demo-v2')||'{}')||{}}catch(_e){}
  const db={...structuredClone(defaults),...stored};
  const state={view:(location.hash.slice(1).split('?')[0]||'chats'),chat:null,tab:'Все',filter:'Все',clip:0,roulette:-1,showMain:true,postFilter:'Все'};
  if(!items.some(it=>it[0]===state.view))state.view='chats';
  function persist(){try{localStorage.setItem('rndm-figma-demo-v2',JSON.stringify(db))}catch(_e){}}
  function avatar(name, opts={}){let c=opts.chat;const colors=c?[c.c1,c.c2]:['#856ce5','#4c4096'];const letters=esc(String(name).trim().split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase());return `<div class="avatar ${opts.online?'online-avatar':''}" style="--a1:${colors[0]};--a2:${colors[1]}">${letters}</div>`}
  function btn(action,label,icon='',cl='pill',extra=''){return `<button type="button" class="${cl}" data-action="${action}" ${extra}>${icon?ic(icon):''}<span>${esc(label)}</span></button>`}
  function bicon(action,name,title,extra=''){return `<button type="button" class="icon-button" title="${esc(title)}" aria-label="${esc(title)}" data-action="${action}" ${extra}>${ic(name)}</button>`}
  function nav(){return `<aside class="rail"><div class="brand"><img src="icon-512.svg" alt="Логотип RNDM"><span><b>RNDM</b><small>CHAT / SOCIAL</small></span></div><nav class="navigation" aria-label="Разделы">${items.map(([key,title,sym])=>`<button class="nav-btn ${state.view===key?'active':''}" data-action="navigate" data-id="${key}" title="${title}" ${state.view===key?'aria-current="page"':''}>${ic(sym)}<span>${title}</span></button>`).join('')}</nav><div class="rail-bottom"><span class="online"><span class="dot"></span>В сети</span><div class="rail-small">RNDM Chat · Desktop</div></div></aside>`}
  const sectionInfo={home:['Главная','Обзор RNDM Chat'],chats:['Сообщения','Личные сообщения, группы и каналы'],news:['Новости','Твоя лента публикаций'],clips:['Клипы','Короткие видео и реакции'],channels:['Каналы','Подписки и публикации'],groups:['Группы','Общение в сообществах'],calls:['Звонки','Голосовая и видеосвязь'],friends:['Друзья','Люди и знакомства'],roulette:['Рулетка','Случайный чат'],games:['Игры','Играй с друзьями'],market:['Маркет','Подарки и цифровые товары'],bank:['Банк','Баланс и операции'],cloud:['Облако','Файлы и фотографии'],profile:['Мой профиль','Настрой свою страницу'],settings:['Настройки','Оформление и приватность'],admin:['Админ-панель','Демонстрация инструментов управления']};
  function sideRow(label,desc,action,id,{active=false,aux='',chat=null}={}){return `<button class="list-row ${active?'active':''}" data-action="${action}" data-id="${esc(id)}" data-filter-text="${esc(label+' '+desc).toLowerCase()}">${avatar(label,{chat,online:chat?.online})}<div class="row-main"><div class="row-title">${esc(label)}</div><div class="row-desc">${esc(desc)}</div></div>${aux?`<div class="row-aux"><span class="row-time">${esc(aux)}</span>${chat?.unread?`<span class="unread">${chat.unread}</span>`:''}</div>`:''}</button>`}
  function sidebar(){const [title,sub]=sectionInfo[state.view];let html=`<div class="side-header"><div class="side-topline"><span class="eyebrow">RNDM / 2.0</span>${bicon('new-item','plus','Создать')}</div><h1 class="side-title">${title}</h1><p class="side-sub">${sub}</p><label class="search-wrap">${ic('search')}<input id="side-search" placeholder="Поиск…" autocomplete="off" aria-label="Поиск в разделе"></label></div>`;
    html+=`<div class="side-body">`;
    if(state.view==='chats'||state.view==='groups'||state.view==='channels'){
      if(state.view==='chats'){
        html+=`<button class="quick-chat" data-action="navigate" data-id="roulette">${ic('shuffle',25)}<span><b>Случайный чат</b><small>Найди нового собеседника</small></span>${ic('chevron',16)}</button>`;
        html+=`<div class="mini-label">Истории</div><div class="story-strip"><button class="story" data-action="new-story">${avatar('+')}Добавить</button>${db.stories.map(s=>`<button class="story" data-action="story" data-id="${esc(s)}">${avatar(s)}${esc(s)}</button>`).join('')}</div>`;
        html+=`<div class="tabs">${['Все','Личные','Группы','Каналы'].map(t=>`<button data-action="tab" data-id="${t}" class="tab ${state.tab===t?'active':''}">${t}</button>`).join('')}</div>`;
      }
      const kind=state.view==='groups'?'Группы':state.view==='channels'?'Каналы':state.tab;
      const chats=db.chats.filter(c=>kind==='Все'||c.type===kind);
      html+=`<div class="mini-label">${state.view==='groups'?'Групповые чаты':state.view==='channels'?'Мои каналы':'Недавние переписки'} · ${chats.length}</div>`;
      html+=chats.map(c=>sideRow(c.name,c.preview,'chat',c.id,{active:state.chat===c.id,aux:c.time,chat:c})).join('');
      if(!chats.length)html+=`<div class="empty" style="min-height:160px;font-size:12px">Пока нет переписок</div>`;
    }else if(state.view==='news'){
      html+=`<div class="mini-label">Лента</div>`;
      for(const x of ['Все','Популярное','Подписки','Мои публикации'])html+=sideRow(x,x==='Все'?'Последние обновления':'Фильтр публикаций','news-filter',x,{active:state.postFilter===x});
      html+=`<div class="mini-label">Сообщества</div>`+sideRow('RNDM News','Официальные новости','navigate','channels');
    }else if(state.view==='clips'){
      html+=`<div class="mini-label">Разделы</div>`;
      for(const x of ['Для вас','Подписки','Популярное'])html+=sideRow(x,'Лента клипов','clip-filter',x,{active:state.filter===x});
      html+=`<div class="mini-label">Авторы</div>`+clips.map((c,i)=>sideRow(c.author,c.title,'open-clip',i,{active:state.clip===i})).join('');
    }else if(state.view==='friends'||state.view==='calls'){
      html+=`<div class="mini-label">${state.view==='friends'?'Люди в сети':'Недавние звонки'}</div>`;
      const contacts=db.chats.filter(c=>c.type==='Личные');
      html+=contacts.map(c=>sideRow(c.name,state.view==='friends'?'● В сети':'История вызовов',state.view==='friends'?'chat':'call',c.id,{chat:c})).join('');
    }else if(state.view==='market'){
      html+=`<div class="mini-label">Категории</div>`;for(const x of ['Подарки','Редкие','Популярные'])html+=sideRow(x,'Каталог','market-filter',x,{active:state.filter===x});
      html+=`<div class="mini-label">Баланс</div><div class="card" style="margin:6px 7px"><div class="card-label">Внутренняя валюта</div><div class="card-number">${db.balance} ⭐</div></div>`;
    }else if(state.view==='settings'){
      html+=`<div class="mini-label">Параметры</div>`;for(const x of ['Тема интерфейса','Уведомления','Звуки','Компактный режим'])html+=sideRow(x,'Настройка приложения','scroll-settings',x);
    }else if(state.view==='admin'){
      html+=`<div class="mini-label">Управление · демо</div>`;for(const x of ['Пользователи','Модерация','Жалобы','Роли'])html+=sideRow(x,'Демонстрация','scroll-admin',x);
    }else if(state.view==='games'){
      html+=`<div class="mini-label">Аркада</div>`;for(const x of ['Тапалка','Догонялки','Гонки'])html+=sideRow(x,'Мини-игры RNDM','game-select',x);
    }else if(state.view==='profile'){
      html+=`<div class="mini-label">Мой аккаунт</div>`+sideRow(db.displayName,db.username,'edit-profile','profile');
      html+=`<div class="mini-label">Быстрые действия</div>`+sideRow('Изменить профиль','Имя и описание','edit-profile','profile')+sideRow('Мои друзья',`${db.friends.length} контакта`,'navigate','friends');
    }else if(state.view==='cloud'){
      html+=`<div class="mini-label">Файлы</div>`+sideRow('Все файлы',`${db.files.length} сохранённых записей`,'noop','files')+sideRow('Загрузить файл','Локальная демонстрация','upload','cloud');
    }else if(state.view==='roulette'){
      html+=`<div class="mini-label">Поиск собеседников</div>`+sideRow('Начать поиск','Случайный собеседник','roulette-start','find')+sideRow('Как это работает','Демонстрация, без сети','how-roulette','rules');
    }else if(state.view==='bank'){
      html+=`<div class="mini-label">Финансы</div>`+sideRow('Баланс',`${db.balance} ⭐`,'noop','balance')+sideRow('История','Операции в демонстрации','noop','history')+sideRow('Перевод','Внутренняя симуляция','transfer','new');
    }else{
      html+=`<div class="mini-label">Быстрый доступ</div>`+sideRow('Сообщения','Продолжить общение','navigate','chats')+sideRow('Лента новостей','Интересные публикации','navigate','news')+sideRow('Клипы','Смотреть клипы','navigate','clips')+sideRow('Друзья','Найти людей','navigate','friends');
    }
    html+=`</div><div class="side-footer"><span><span class="online"><span class="dot"></span> В сети</span></span><span>Прототип · Figma</span></div>`;
    return `<aside class="sidebar" aria-label="Список и разделы">${html}</aside>`;
  }
  function header(title,sub,buttons='',ava='',back=true){return `<div class="main-header"><div class="head-profile">${back?bicon('mobile-back','back','Назад к списку'):''}${ava?avatar(ava):''}<div style="min-width:0"><h2>${esc(title)}</h2><p>${esc(sub)}</p></div></div><div class="head-tools">${buttons}${bicon('notifications','bell','Уведомления')}${bicon('navigate','settings','Настройки','data-id="settings"')}</div></div>`}
  function secHead(title,desc='',button=''){return `<div class="section-head"><div><h3>${esc(title)}</h3>${desc?`<p>${esc(desc)}</p>`:''}</div>${button}</div>`}
  function rootMain(head,body){return `<main class="main">${head}<div class="main-scroll"><div class="content-max">${body}</div></div></main>`}
  function inboxHome(){let body=`<div class="hero"><span class="eyebrow">RNDM CHAT 2.0 / ТВОЙ МИР</span><h1>Твой круг.<br>Твой ритм.</h1><p>Ближе, чем кажется. Общайся, открывай новые каналы, находи друзей и создавай моменты вместе.</p><div class="hero-actions">${btn('new-chat','Новое сообщение','plus','pill primary')}${btn('navigate','Найти людей','friends','pill','data-id="friends"')}</div></div>`;
    body+=secHead('Твоя активность','Всё главное в одном месте');
    body+=`<div class="grid four">${[['message','Чаты',db.chats.length],['friends','Друзья',db.friends.length],['channels','Каналы',db.chats.filter(x=>x.type==='Каналы').length],['star','Звёзды',db.balance]].map(([sym,label,v])=>`<div class="card"><div class="card-icon">${ic(sym)}</div><div class="card-number">${v}</div><div class="card-label">${label}</div></div>`).join('')}</div>`;
    body+=secHead('Быстрый старт','Выбирай, чем заняться');
    body+=`<div class="grid three">${[['roulette','Рулетка','Новый собеседник','shuffle'],['clips','Клипы','Короткие видео','clips'],['market','Подарки','Маркет RNDM','gift']].map(([v,title,desc,ico])=>`<button class="card" data-action="navigate" data-id="${v}" style="text-align:left;color:var(--white);cursor:pointer"><div class="card-icon">${ic(ico)}</div><h3>${title}</h3><p>${desc}</p><span class="highlight">Открыть ${ic('chevron',13)}</span></button>`).join('')}</div>`;
    body+=secHead('Недавние чаты','Продолжи разговор',btn('navigate','Все чаты','','pill ghost','data-id="chats"'));
    body+=`<div class="grid two">${db.chats.slice(0,4).map(c=>`<button class="card" style="text-align:left;color:var(--white)" data-action="chat" data-id="${c.id}"><div class="flex">${avatar(c.name,{chat:c})}<span class="grow"><b>${esc(c.name)}</b><br><span class="small muted">${esc(c.preview)}</span></span>${ic('chevron')}</div></button>`).join('')}</div>`;
    return rootMain(header('RNDM Chat','Общение в твоём ритме',btn('new-chat','Написать','plus','pill primary')),body);
  }
  function chatScreen(){if(!state.chat)return inboxHome();const c=db.chats.find(c=>c.id===state.chat);if(!c)return inboxHome();const messages=db.messages[c.id]||[];const stream=`<div class="message-stream" id="message-stream"><div class="day-separator">Сегодня</div>${messages.map(m=>`<div class="bubble-row ${m.own?'own':''}"><div class="bubble">${esc(m.text).replace(/\n/g,'<br>')}<div class="bubble-meta">${esc(m.time)} ${m.own?'✓✓':''}</div></div></div>`).join('')}</div>`;
    const composer=`<form class="composer-wrap" data-form="send"><div class="composer">${bicon('attach','attach','Прикрепить файл')}${bicon('emoji','smile','Вставить смайлик')}<textarea id="message-input" name="text" placeholder="Написать сообщение…" aria-label="Сообщение" rows="1" maxlength="2000"></textarea><button class="icon-button send" type="submit" aria-label="Отправить">${ic('send')}</button></div><div class="compose-hint">Enter — отправить · Shift + Enter — перенос строки</div></form>`;
    const head=header(c.name,c.online?'● в сети':c.type,`${bicon('call','phone','Позвонить')}${bicon('video-call','video','Видеозвонок')}${bicon('chat-details','more','О чате')}`,c.name);
    return `<main class="main">${head}<div class="message-area">${stream}${composer}</div></main>`;
  }
  function newsScreen(){let posts=db.posts.filter(p=>state.postFilter==='Все'||state.postFilter==='Популярное'&&p.likes>60||state.postFilter==='Подписки'&&p.author.includes('RNDM')||state.postFilter==='Мои публикации'&&p.mine);let body=`<div class="flex space-between" style="margin-bottom:20px"><div><div class="eyebrow">SOCIAL / FEED</div><h1 style="font-size:28px;letter-spacing:-1px;margin:8px 0">Лента новостей</h1><p class="muted">Публикации от друзей и сообществ</p></div>${btn('new-post','Создать запись','plus','pill primary')}</div>`;
    body+=posts.map(p=>`<article class="feed-card"><div class="feed-user">${avatar(p.author)}<div class="grow"><h4>${esc(p.author)}</h4><small>${esc(p.subtitle)}</small></div>${bicon('more-post','more','Дополнительные действия',`data-id="${p.id}"`)}</div><div class="feed-text">${esc(p.text)}</div>${p.art?`<div class="feed-art"><span>RNDM 2.0</span></div>`:''}<div class="feed-actions"><button class="${p.liked?'active':''}" data-action="like-post" data-id="${p.id}">${ic('heart')} ${p.likes}</button><button data-action="comment-post" data-id="${p.id}">${ic('message')} ${p.comments} комментариев</button><button data-action="share-post" data-id="${p.id}">${ic('share')} Поделиться</button></div></article>`).join('')||`<div class="empty"><h3>Пока нет публикаций</h3><p>Создай первую запись или выбери другую ленту.</p></div>`;
    return rootMain(header('Новости','Главная лента RNDM',btn('new-post','Новый пост','plus','pill primary')),body);
  }
  function channelsScreen(){const ch=db.chats.find(c=>c.id===state.chat && c.type==='Каналы')||db.chats.find(c=>c.type==='Каналы');const body=`<div class="channel-banner">${avatar(ch?.name||'RNDM News',{chat:ch})}<div class="grow"><div class="eyebrow">КАНАЛ / RNDM</div><h1>${esc(ch?.name||'RNDM News')}</h1><p>Новости, публикации и материалы сообщества</p></div>${btn('follow','Подписаться','plus','pill primary')}</div>${secHead('Последние публикации','Все новости канала')}${db.posts.filter(p=>p.author.includes('RNDM')).map(p=>`<article class="feed-card"><div class="feed-user">${avatar(p.author)}<div class="grow"><h4>${esc(p.author)}</h4><small>${esc(p.subtitle)}</small></div></div><p class="feed-text">${esc(p.text)}</p>${p.art?'<div class="feed-art"><span>RNDM 2.0</span></div>':''}<div class="feed-actions"><button data-action="like-post" data-id="${p.id}">${ic('heart')} ${p.likes}</button><button data-action="comment-post" data-id="${p.id}">${ic('message')} Комментарии</button></div></article>`).join('')}`;
    return rootMain(header('Каналы','Публикации и подписки',btn('new-channel','Создать канал','plus','pill primary')),body);
  }
  function clipsScreen(){const c=clips[state.clip];const body=`<div class="flex space-between" style="margin-bottom:20px"><div><div class="eyebrow">SHORT VIDEO</div><h1 style="font-size:28px;margin:8px 0">RNDM Клипы</h1><p class="muted">Демонстрация ленты. Для просмотра видео нужен источник видео.</p></div>${btn('upload-clip','Добавить клип','plus','pill primary')}</div><div style="display:flex;justify-content:center"><div class="media-card" style="width:min(470px,100%)"><div class="media-cover" style="height:440px;background:${c.cover}"><div style="font-size:100px;color:#fff9;z-index:1">${ic('clips',100)}</div><div class="cover-word">${esc(c.title)}</div></div><div class="media-info"><div class="flex space-between"><div><strong>${esc(c.author)}</strong><p>${esc(c.title)}</p></div><span class="badge">${state.clip+1}/${clips.length}</span></div><div class="flex" style="margin-top:17px">${btn('like-clip',c.likes.toLocaleString('ru-RU'),'heart','pill')}${btn('next-clip','Следующий клип','chevron','pill primary')}${btn('share-clip','Поделиться','share','pill')}</div></div></div></div>`;
    return rootMain(header('Клипы','Видео, реакции, подписки',btn('upload-clip','Загрузить','upload','pill primary')),body);
  }
  function groupsScreen(){return chatScreen()}
  function friendsScreen(){const contacts=db.chats.filter(c=>c.type==='Личные');let body=`<div class="flex space-between"><div><div class="eyebrow">SOCIAL / PEOPLE</div><h1 style="font-size:29px;margin:8px 0">Друзья и знакомства</h1><p class="muted">Люди, с которыми тебе интересно общаться</p></div>${btn('new-chat','Найти человека','plus','pill primary')}</div>${secHead('Контакты','Ваши друзья и подписки')}`;
    body+=`<div class="grid two">${contacts.map(c=>`<div class="card"><div class="flex">${avatar(c.name,{chat:c,online:c.online})}<div class="grow"><b>${esc(c.name)}</b><div class="small muted" style="margin-top:3px">${c.online?'● В сети':'Не в сети'}</div></div></div><div class="flex" style="margin-top:17px">${btn('chat','Написать','message','pill primary',`data-id="${c.id}"`)}${btn('toggle-friend',db.friends.includes(c.id)?'В друзьях':'Добавить','friends','pill',`data-id="${c.id}"`)}</div></div>`).join('')}</div>`;
    return rootMain(header('Друзья',`${contacts.length} контакта`),body);
  }
  function callsScreen(){let body=`<div class="hero"><div class="eyebrow">CALLS / AUDIO & VIDEO</div><h1>Общайтесь ближе.</h1><p>Голосовая и видеосвязь. В этом макете звонки показывают только демонстрационный экран — соединение не устанавливается.</p>${btn('call','Начать звонок','phone','pill primary')}</div>${secHead('История звонков','Последние собеседники')}<div class="stack">${db.chats.filter(c=>c.type==='Личные').map(c=>`<div class="card"><div class="flex">${avatar(c.name,{chat:c})}<div class="grow"><b>${esc(c.name)}</b><div class="muted small">Входящий · Недавно</div></div>${bicon('call','phone','Начать звонок',`data-id="${c.id}"`)}${bicon('video-call','video','Видеозвонок',`data-id="${c.id}"`)}</div></div>`).join('')}</div>`;
    return rootMain(header('Звонки','Недавние вызовы',btn('call','Позвонить','phone','pill primary')),body);
  }
  function rouletteScreen(){let match=state.roulette>=0?db.chats.filter(c=>c.type==='Личные')[state.roulette % db.chats.filter(c=>c.type==='Личные').length]:null;
    let body=`<div class="card" style="text-align:center;min-height:500px;padding:45px 30px"><div class="eyebrow">RNDM / RANDOM CHAT</div><h1 style="font-size:32px;letter-spacing:-1px;margin:10px 0">Знакомься случайно</h1><p class="muted">Демонстрация подбора собеседника без подключения к серверу</p>${match?`<div class="roulette-orb">${ic('friends',65)}</div><h2>Твой собеседник: ${esc(match.name)}</h2><p class="muted">Можешь перейти к переписке или попробовать снова</p><div class="flex" style="justify-content:center;margin-top:20px">${btn('chat','Открыть чат','message','pill primary',`data-id="${match.id}"`)}${btn('roulette-start','Следующий','shuffle','pill')}</div>`:`<div class="roulette-orb">${ic('shuffle',70)}</div><h2>Готов к новым знакомствам?</h2><p class="muted">Нажми кнопку, чтобы увидеть демонстрационного собеседника</p><div class="flex" style="justify-content:center;margin-top:20px">${btn('roulette-start','Начать поиск','shuffle','pill primary')}</div>`}</div>`;
    return rootMain(header('Случайный чат','Рулетка знакомств'),body);
  }
  function gamesScreen(){let body=`<div class="hero"><div class="eyebrow">RNDM / MINI GAMES</div><h1>Играем вместе</h1><p>Мини-игры внутри RNDM. Здесь работает автономная версия тапалки, а остальные игры показаны в каталоге.</p>${btn('reset-tap','Начать заново','lightning','pill primary')}</div>${secHead('Тапалка','Кликай и набирай очки')}<div class="card" style="text-align:center"><span class="eyebrow">МОИ ОЧКИ</span><div class="counter">${db.tap.toLocaleString('ru-RU')}</div><button class="tap-button" data-action="tap" aria-label="Тапнуть">R</button><p>Каждое нажатие добавляет одно очко. Прогресс сохранится в браузере.</p></div>${secHead('Другие игры')}<div class="grid two">${[['Догонялки','Мультиплеерная арена'],['Гонки','Скоростные заезды']].map(([a,b])=>`<div class="card"><div class="card-icon">${ic('game')}</div><h3>${a}</h3><p>${b}</p><span class="badge">Только превью</span></div>`).join('')}</div>`;
    return rootMain(header('Игры','Мини-игры RNDM'),body);
  }
  function profileScreen(){let body=`<div class="profile-hero">${avatar(db.displayName)}<div class="grow"><div class="eyebrow">RNDM ID</div><h1>${esc(db.displayName)}</h1><p>${esc(db.username)}</p><p>${esc(db.bio)}</p></div>${btn('edit-profile','Изменить профиль','settings','pill primary')}</div>${secHead('Статистика')}<div class="grid three">${[['Друзья',db.friends.length],['Публикации',db.posts.filter(p=>p.mine).length],['Баланс',db.balance+' ⭐']].map(([l,v])=>`<div class="card"><div class="card-number">${v}</div><div class="card-label">${l}</div></div>`).join('')}</div>${secHead('Цифровые подарки','Укрась профиль подарками из маркета',btn('navigate','Перейти в маркет','','pill','data-id="market"'))}<div class="grid three">${giftList.slice(0,3).map(([name,img])=>`<div class="card gift-card"><div class="gift-img"><img alt="${esc(name)}" src="${img}"></div><strong>${esc(name)}</strong></div>`).join('')}</div>`;
    return rootMain(header('Мой профиль','Публичная страница',btn('edit-profile','Редактировать','settings','pill primary')),body);
  }
  function marketScreen(){let list=state.filter==='Редкие'?giftList.slice(3):state.filter==='Популярные'?giftList.slice(0,4):giftList;let body=`<div class="flex space-between"><div><div class="eyebrow">RNDM / GIFTS</div><h1 style="font-size:29px;margin:8px 0">Маркет подарков</h1><p class="muted">Покупка за демонстрационные звёзды</p></div>${btn('navigate',db.balance+' ⭐','wallet','pill','data-id="bank"')}</div>${secHead('Выбери подарок','Оригинальные изображения из проекта RNDM 2.0')}`;
    body+=`<div class="grid three">${list.map(([name,img,price],i)=>`<div class="card gift-card"><div class="gift-img"><img src="${img}" alt="${esc(name)}"></div><strong>${esc(name)}</strong><p>${price} ⭐</p>${btn('buy-gift','Купить','gift','pill primary',`data-id="${giftList.findIndex(g=>g[0]===name)}"`)}</div>`).join('')}</div>`;
    return rootMain(header('RNDM Маркет','Подарки за звёзды'),body);
  }
  function bankScreen(){let body=`<div class="hero"><div class="eyebrow">RNDM BANK / DEMO</div><h1>${db.balance.toLocaleString('ru-RU')} ⭐</h1><p>Внутренняя валюта в демонстрационном макете. Не связана с реальными платежами.</p><div class="hero-actions">${btn('transfer','Перевести','wallet','pill primary')}${btn('bonus','Получить бонус','star','pill')}</div></div>${secHead('Последние операции','Локальная история')}<div class="card"><table class="mini-table"><thead><tr><th>Операция</th><th>Дата</th><th>Сумма</th></tr></thead><tbody>${db.transactions.map(t=>`<tr><td>${esc(t.title)}</td><td>${esc(t.date)}</td><td class="${t.amount>=0?'mint-text':'muted'}">${t.amount>0?'+':''}${t.amount} ⭐</td></tr>`).join('')}</tbody></table></div>`;
    return rootMain(header('RNDM Банк','Баланс и переводы'),body);
  }
  function cloudScreen(){let body=`<div class="flex space-between"><div><div class="eyebrow">RNDM / CLOUD</div><h1 style="font-size:29px;margin:8px 0">Облако</h1><p class="muted">Локальные записи о выбранных файлах, без загрузки на сервер</p></div>${btn('upload','Загрузить','upload','pill primary')}</div>${secHead('Мои файлы')}`;
    body+=db.files.length?`<div class="card"><table class="mini-table"><thead><tr><th>Файл</th><th>Размер</th><th>Добавлен</th></tr></thead><tbody>${db.files.map(x=>`<tr><td>${ic('clip',15)} ${esc(x.name)}</td><td>${esc(x.size)}</td><td>${esc(x.date)}</td></tr>`).join('')}</tbody></table></div>`:`<div class="empty card"><div class="empty-orb">${ic('cloud')}</div><h3>Пока нет файлов</h3><p>Выбери файл, чтобы увидеть, как выглядит облако. Содержимое не отправляется на сервер.</p>${btn('upload','Выбрать файл','plus','pill primary')}</div>`;
    return rootMain(header('Облако','Файлы и фотографии'),body);
  }
  function settingsScreen(){const settingRows=[['Тёмная тема','Фиолетовая тема в стиле RNDM 2.0','theme',db.theme==='dark'],['Уведомления','Показывать локальные уведомления интерфейса','notifications',db.notifications],['Звуки','Звуковые уведомления (только визуальная настройка)','sound',db.sound],['Компактный режим','Более плотные списки и карточки','compact',db.compact]];let body=`<div class="card"><div class="eyebrow">PREFERENCES</div><h2>Настройки RNDM</h2>${settingRows.map(([name,desc,k,on])=>`<div class="settings-row"><div><strong>${name}</strong><small>${desc}</small></div><button class="toggle ${on?'on':''}" data-action="toggle-setting" data-id="${k}" role="switch" aria-checked="${on}" aria-label="${name}"></button></div>`).join('')}</div>${secHead('Данные демонстрации')}<div class="card"><h3>Хранение в браузере</h3><p>Состояние переписок и интерфейса сохраняется только на этом устройстве. Нет подключения к реальной базе RNDM.</p>${btn('reset-demo','Сбросить демо','settings','pill ghost')}</div>`;
    return rootMain(header('Настройки','Персонализация и приватность'),body);
  }
  function adminScreen(){let users=db.chats.filter(x=>x.type==='Личные');let body=`<div class="card" style="border-color:rgba(167,139,250,.27);margin-bottom:18px"><div class="eyebrow">RNDM ADMIN / DEMO</div><h2 style="margin:9px 0 6px">Панель администратора</h2><p>Это локальный прототип интерфейса. Здесь нет доступа к пользователям и данным настоящего приложения.</p></div><div class="grid three">${[['Пользователи',users.length],['Чаты',db.chats.length],['Локальные ограничения',db.moderated.length]].map(([l,v])=>`<div class="card"><div class="card-number">${v}</div><div class="card-label">${l}</div></div>`).join('')}</div>${secHead('Управление пользователями','Демонстрационные записи')}<div class="card"><table class="mini-table"><thead><tr><th>Имя</th><th>Статус</th><th>Действия</th></tr></thead><tbody>${users.map(c=>`<tr><td>${esc(c.name)}</td><td>${db.moderated.includes(c.id)?'<span class="badge">Ограничен</span>':'<span class="badge good">Активен</span>'}</td><td>${btn('moderate',db.moderated.includes(c.id)?'Снять ограничение':'Ограничить','','pill ghost',`data-id="${c.id}"`)}</td></tr>`).join('')}</tbody></table></div>`;
    return rootMain(header('Админ-панель','Только демонстрация'),body);
  }
  function currentMain(){switch(state.view){case'home':return inboxHome();case'chats':return chatScreen();case'groups':return groupsScreen();case'news':return newsScreen();case'channels':return channelsScreen();case'clips':return clipsScreen();case'calls':return callsScreen();case'friends':return friendsScreen();case'roulette':return rouletteScreen();case'games':return gamesScreen();case'market':return marketScreen();case'bank':return bankScreen();case'cloud':return cloudScreen();case'profile':return profileScreen();case'settings':return settingsScreen();case'admin':return adminScreen();default:return inboxHome()}}
  function render(){document.documentElement.dataset.theme=db.theme;document.documentElement.dataset.compact=db.compact?'yes':'no';$('#app').innerHTML=nav()+sidebar()+currentMain();$('#app').classList.toggle('show-main',state.showMain);const m=$('#message-stream');if(m)m.scrollTop=m.scrollHeight;}
  function navigate(view){if(!items.some(x=>x[0]===view))return;state.view=view;state.tab='Все';state.filter='Все';state.showMain=true;if(view==='chats'||view==='groups'||view==='channels')state.chat=null;location.hash=view;render();}
  function toast(text){const t=$('#toast');t.textContent=text;t.classList.add('visible');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('visible'),3000)}
  function modal(title,body,form=''){const el=$('#modal-root');el.innerHTML=`<div class="modal-backdrop" data-action="close-outside"><div class="modal-box" role="dialog" aria-modal="true" aria-label="${esc(title)}"><div class="modal-head"><h2>${esc(title)}</h2>${bicon('close-modal','x','Закрыть')}</div>${form?`<form data-form="${form}">${body}<div class="modal-actions">${btn('close-modal','Отмена','','pill ghost')}<button type="submit" class="pill primary">${ic('check')} Сохранить</button></div></form>`:body}</div></div>`;setTimeout(()=>$('#modal-root input, #modal-root textarea')?.focus(),0)}
  function field(label,name,val='',required=true,type='text'){return `<div class="field"><label for="f-${name}">${label}</label><input id="f-${name}" name="${name}" type="${type}" value="${esc(val)}" ${required?'required':''}></div>`}
  function openCreate(){const v=state.view;if(v==='news'){modal('Новая публикация',`<div class="field"><label>Текст записи</label><textarea name="text" maxlength="1800" required placeholder="О чём хочешь рассказать?"></textarea></div>`,'new-post')}else if(v==='channels'){modal('Создать канал',field('Название канала','name'),'new-channel')}else if(v==='groups'){modal('Создать группу',field('Название группы','name'),'new-group')}else if(v==='clips'){uploadClip()}else if(v==='market'){navigate('bank')}else if(v==='bank'){transferModal()}else if(v==='cloud'){openUpload()}else{modal('Новая переписка',field('Имя собеседника или название чата','name'),'new-chat')}}
  function transferModal(){modal('Перевод звёзд',`<div class="modal-info">Это демонстрация внутреннего перевода без реального получателя.</div>${field('Получатель','recipient','',true)}${field('Сумма','amount','50',true,'number')}`,'transfer')}
  function editProfile(){modal('Изменить профиль',field('Имя','displayName',db.displayName)+field('Имя пользователя','username',db.username)+`<div class="field"><label>О себе</label><textarea name="bio" maxlength="200">${esc(db.bio)}</textarea></div>`,'edit-profile')}
  function newTime(){return new Date().toLocaleTimeString('ru-RU',{hour:'2-digit',minute:'2-digit'})}
  function openUpload(){const input=document.createElement('input');input.type='file';input.multiple=true;input.addEventListener('change',()=>{if(!input.files?.length)return;for(const file of input.files){db.files.unshift({name:file.name,size:file.size>1048576?(file.size/1048576).toFixed(1)+' МБ':Math.round(file.size/1024)+' КБ',date:new Date().toLocaleDateString('ru-RU')})}persist();render();toast('Сведения о файлах добавлены локально. На сервер ничего не отправлено.')});input.click()}
  function uploadClip(){toast('Загрузка видео требует подключения к серверу. В прототипе доступна демонстрация ленты.')}
  function sendMessage(value){let id=state.chat;if(!id)return toast('Сначала выбери переписку');if(!String(value).trim())return;db.messages[id]??=[];db.messages[id].push({text:String(value).trim().slice(0,2000),own:true,time:newTime()});const c=db.chats.find(c=>c.id===id);if(c){c.preview=String(value).slice(0,75);c.time=newTime()}persist();render();$('#message-input')?.focus()}
  function getDataAction(e){return e.target.closest('[data-action]')}
  document.addEventListener('click',e=>{
    if(e.target.classList.contains('modal-backdrop')){$('#modal-root').innerHTML='';return;}
    const target=getDataAction(e);if(!target)return;
    const action=target.dataset.action,id=target.dataset.id;
    if(action==='navigate'){navigate(id);return}
    if(action==='mobile-back'){$('#app').classList.remove('show-main');state.showMain=false;return}
    if(action==='new-item'||action==='new-chat'||action==='new-post'||action==='new-channel'){if(action==='new-post'){modal('Новая публикация',`<div class="field"><label>Текст записи</label><textarea name="text" maxlength="1800" required></textarea></div>`,'new-post')}else if(action==='new-channel'){modal('Создать канал',field('Название','name'),'new-channel')}else if(action==='new-chat'){modal('Новая переписка',field('Имя собеседника','name'),'new-chat')}else openCreate();return}
    if(action==='close-modal'){$('#modal-root').innerHTML='';return}
    if(action==='chat'){const c=db.chats.find(c=>c.id===id);if(!c)return;state.view=c.type==='Группы'?'groups':c.type==='Каналы'?'channels':'chats';state.chat=c.id;c.unread=0;state.showMain=true;persist();history.replaceState(null,'','#'+state.view);render();return}
    if(action==='tab'){state.tab=id;render();return}
    if(action==='news-filter'){state.postFilter=id;render();return}
    if(action==='clip-filter'){state.filter=id;render();return}
    if(action==='open-clip'){state.clip=Number(id)||0;render();return}
    if(action==='market-filter'){state.filter=id;render();return}
    if(action==='call'||action==='video-call'){const c=db.chats.find(c=>c.id===id)||db.chats.find(c=>c.id===state.chat);modal('Демонстрация звонка',`<div class="modal-info">${ic('phone',22)} ${c?`Собеседник: ${esc(c.name)}.`:''} Голосовое и видеосоединение не устанавливается. Для реальных звонков нужен сервер сигнализации и WebRTC.</div><div class="modal-actions">${btn('close-modal','Завершить','x','pill primary')}</div>`);return}
    if(action==='chat-details'){const c=db.chats.find(c=>c.id===state.chat);if(c)modal('О переписке',`<div class="flex">${avatar(c.name,{chat:c})}<div><b>${esc(c.name)}</b><br><span class="muted small">${esc(c.type)}</span></div></div><div class="soft-rule"></div><div class="modal-info">${(db.messages[c.id]||[]).length} сообщений в демонстрации. Настоящие данные RNDM не используются.</div>`);return}
    if(action==='attach'){const input=document.createElement('input');input.type='file';input.addEventListener('change',()=>{if(input.files?.[0])sendMessage('📎 '+input.files[0].name+' (демо-вложение, содержимое не загружено)')});input.click();return}
    if(action==='emoji'){const x=$('#message-input');if(x){x.value+='😊';x.focus()}return}
    if(action==='toggle-friend'){db.friends=db.friends.includes(id)?db.friends.filter(x=>x!==id):[...db.friends,id];persist();render();return}
    if(action==='roulette-start'){state.roulette+=1;render();return}
    if(action==='how-roulette'){modal('Случайный чат',`<p class="muted">Здесь показывается только логика интерфейса. В реальном приложении подбор пользователей выполняется через сервер.</p>`);return}
    if(action==='tap'){db.tap++;persist();const c=$('.counter');if(c)c.textContent=db.tap.toLocaleString('ru-RU');return}
    if(action==='reset-tap'){db.tap=0;persist();render();return}
    if(action==='like-post'){const p=db.posts.find(p=>p.id===id);if(p){p.liked=!p.liked;p.likes+=p.liked?1:-1;persist();render()}return}
    if(action==='comment-post'){modal('Добавить комментарий',`<div class="field"><label>Комментарий</label><textarea required name="text" maxlength="500"></textarea></div><input type="hidden" name="postId" value="${esc(id)}">`,'comment');return}
    if(action==='share-post'||action==='share-clip'){const text=action==='share-clip'?'RNDM Клипы — '+clips[state.clip].title:'RNDM Новости';if(navigator.clipboard?.writeText)navigator.clipboard.writeText(text).then(()=>toast('Текст скопирован')).catch(()=>toast(text));else toast(text);return}
    if(action==='more-post'){toast('Дополнительные действия доступны в полной версии.');return}
    if(action==='like-clip'){clips[state.clip].likes++;render();return}
    if(action==='next-clip'){state.clip=(state.clip+1)%clips.length;render();return}
    if(action==='upload-clip'){uploadClip();return}
    if(action==='edit-profile'){editProfile();return}
    if(action==='buy-gift'){const g=giftList[Number(id)];if(!g)return;if(db.balance<g[2]){toast('Недостаточно демонстрационных звёзд');return}db.balance-=g[2];db.transactions.unshift({title:'Подарок: '+g[0],amount:-g[2],date:'Сегодня'});persist();render();toast(`Подарок «${g[0]}» куплен в демонстрации`);return}
    if(action==='transfer'){transferModal();return}
    if(action==='bonus'){db.balance+=100;db.transactions.unshift({title:'Демонстрационный бонус',amount:100,date:'Сегодня'});persist();render();toast('Добавлено 100 демо-звёзд');return}
    if(action==='upload'){openUpload();return}
    if(action==='toggle-setting'){if(id==='theme')db.theme=db.theme==='dark'?'light':'dark';else if(id==='compact'||id==='notifications'||id==='sound')db[id]=!db[id];persist();render();return}
    if(action==='reset-demo'){if(confirm('Сбросить все локальные данные демонстрации?')){localStorage.removeItem('rndm-figma-demo-v2');location.reload()}return}
    if(action==='moderate'){db.moderated=db.moderated.includes(id)?db.moderated.filter(x=>x!==id):[...db.moderated,id];persist();render();toast('Изменён локальный демонстрационный статус');return}
    if(action==='notifications'){modal('Уведомления',`<div class="modal-info">В локальной версии уведомления появляются как подсказки. Системные push-уведомления не подключены.</div>`);return}
    if(action==='new-story'){toast('Публикация историй требует серверного хранилища');return}
    if(action==='story'){modal('История',`<div class="card" style="text-align:center;min-height:240px;display:grid;place-items:center"><div>${avatar(id)}<h2>${esc(id)}</h2><p class="muted">Пример истории без медиаконтента</p></div></div>`);return}
    if(action==='follow'){toast('Подписка на каналы работает в полной версии RNDM');return}
    if(action==='game-select'){if(id==='Тапалка'){$('.tap-button')?.scrollIntoView({behavior:'smooth'});return}toast(`${id}: только карточка в этом прототипе`);return}
    if(action==='scroll-settings'||action==='scroll-admin'){toast(`Раздел «${id}» отображён в основной области`);return}
    if(action==='noop'){return}
  });
  document.addEventListener('submit',e=>{
    const form=e.target;if(!(form instanceof HTMLFormElement))return;e.preventDefault();
    const type=form.dataset.form;const fd=new FormData(form);
    if(type==='send'){const txt=String(fd.get('text')||'').trim();sendMessage(txt);return}
    if(type==='new-chat'||type==='new-channel'||type==='new-group'){
      const name=String(fd.get('name')||'').trim().slice(0,60);if(!name)return;const id='local_'+Date.now();const typ=type==='new-channel'?'Каналы':type==='new-group'?'Группы':'Личные';db.chats.unshift({id,name,type:typ,preview:'Новая переписка',time:newTime(),unread:0,c1:'#a78bfa',c2:'#6d54a6'});db.messages[id]=[];persist();$('#modal-root').innerHTML='';state.view=typ==='Личные'?'chats':type==='new-channel'?'channels':'groups';state.chat=id;state.showMain=true;location.hash=state.view;render();toast('Новый чат создан локально');return;
    }
    if(type==='new-post'){
      const text=String(fd.get('text')||'').trim();if(!text)return;db.posts.unshift({id:'p_'+Date.now(),author:db.displayName,subtitle:'Моя публикация · только что',text:text.slice(0,1800),likes:0,comments:0,art:false,mine:true,liked:false});persist();$('#modal-root').innerHTML='';state.postFilter='Все';navigate('news');toast('Публикация добавлена');return;
    }
    if(type==='comment'){const p=db.posts.find(p=>p.id===fd.get('postId'));if(p)p.comments++;persist();$('#modal-root').innerHTML='';render();toast('Комментарий добавлен в демо (текст не публикуется)');return}
    if(type==='edit-profile'){db.displayName=String(fd.get('displayName')||'').trim().slice(0,50)||db.displayName;db.username=String(fd.get('username')||'').trim().slice(0,40)||db.username;db.bio=String(fd.get('bio')||'').trim().slice(0,200);persist();$('#modal-root').innerHTML='';render();toast('Профиль сохранён в браузере');return}
    if(type==='transfer'){
      const recipient=String(fd.get('recipient')||'').trim().slice(0,60);const amount=Math.floor(Number(fd.get('amount')));if(!Number.isFinite(amount)||amount<=0||!recipient){toast('Проверь данные перевода');return}if(amount>db.balance){toast('Недостаточно звёзд');return}db.balance-=amount;db.transactions.unshift({title:'Демо-перевод: '+recipient,amount:-amount,date:'Сегодня'});persist();$('#modal-root').innerHTML='';render();toast('Перевод смоделирован локально');return;
    }
  });
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('#modal-root').innerHTML){$('#modal-root').innerHTML='';return}const el=e.target;if(el.id==='message-input'&&e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage(el.value)}});
  document.addEventListener('input',e=>{if(e.target.id==='side-search'){const q=e.target.value.toLocaleLowerCase('ru');document.querySelectorAll('[data-filter-text]').forEach(el=>el.style.display=el.dataset.filterText.includes(q)?'':'none')}});
  window.addEventListener('hashchange',()=>{const value=location.hash.slice(1);if(items.some(x=>x[0]===value)&&state.view!==value){state.view=value;state.chat=null;render()}});
  render();
})();
