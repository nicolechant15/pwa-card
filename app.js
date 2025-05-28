if ('serviceWorker' in navigator) { // Проверка поддержки Service Worker
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js'); // Регистрация sw.js при загрузке страницы
    });
  }
  