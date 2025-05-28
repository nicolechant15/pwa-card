const CACHE_NAME = "card-v1"; // Название кэша (можно менять при обновлениях)

const FILES = [ // Файлы, которые будут сохранены в кэш при установке
  "/",
  "/index.html",
  "/styles.css",
  "/app.js",
  "/manifest.json",
  "/offline.html",
  "/images/photo.jpg",
  "/images/qrcode.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

// Установка сервис-воркера
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(c => c.addAll(FILES))
  );
  self.skipWaiting(); // Сразу активировать новый воркер
});

// Активация (очистка старого кэша)
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Обработка запросов от страницы
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request) // Пытаемся найти файл в кэше
      .then(r => r || fetch(e.request)) // Если нет — пробуем загрузить из интернета
      .catch(() => caches.match("/offline.html")) // Если совсем не удалось — показать offline.html
  );
}); 