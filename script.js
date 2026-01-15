// Liquid Glass Interactive Effects
document.addEventListener('DOMContentLoaded', function() {
    // === УДАЛИТЬ ВЫБОР ОС И СДЕЛАТЬ ОДНУ КНОПКУ СКАЧИВАНИЯ ===
    const downloadBtn = document.getElementById('download-main-btn');
    const btnTitle = downloadBtn.querySelector('.btn-title');
    const btnSub = downloadBtn.querySelector('.btn-sub');
    const downloadSection = document.querySelector('.download-section .glass-card');

    // 1. Полностью удаляем блок с выбором ОС из DOM
    const osSelector = document.querySelector('.os-selector');
    if (osSelector) osSelector.remove();

    // 2. Изменяем текст и внешний вид главной кнопки
    btnTitle.textContent = 'СКАЧАТЬ NEXUSCLIENT';
    btnSub.textContent = 'v5.0 • Liquid Glass • Прямая ссылка';

    // Обновляем иконку
    const icon = downloadBtn.querySelector('i');
    icon.className = 'fas fa-download fa-fw';

    // 3. Убираем остальные кнопки (альтернативные ссылки, zip архив)
    const altButtonsContainer = downloadBtn.parentElement;
    // Оставляем только главную кнопку, удаляем соседние кнопки
    const siblingButtons = document.querySelectorAll('.alt-download-btn');
    siblingButtons.forEach(btn => btn.remove());

    // 4. Изменяем инструкцию, так как теперь установка проще
    const instructionsBlock = document.querySelector('.instructions');
    if (instructionsBlock) {
        instructionsBlock.innerHTML = `
            <h4><i class="fas fa-info-circle"></i> Новая инструкция:</h4>
            <ol>
                <li>Нажмите кнопку "СКАЧАТЬ NEXUSCLIENT" ниже.</li>
                <li>Архив начнет скачиваться сразу.</li>
                <li>Распакуйте архив в папку с Minecraft.</li>
                <li>Запустите игру.</li>
            </ol>
        `;
    }

    // 5. Изменяем предупреждение
    const warningBlock = document.querySelector('.warning p');
    if (warningBlock) {
        warningBlock.innerHTML = `<strong>Просто:</strong> Нажмите кнопку. Скачивание начнется автоматически на максимальной скорости.`;
    }

    // === СКАЧИВАНИЕ ===
    downloadBtn.addEventListener('click', function() {
        // Прямая ссылка на архив с MEGA.nz
        const directDownloadLink = 'https://mega.nz/file/HAtn2I4C#_3betMFSboX8b2dZZN5JXfuP7BshVaLmt3YpE7CFP4Y';

        // Создаем скрытую ссылку для принудительного скачивания
        const link = document.createElement('a');
        link.href = directDownloadLink;
        link.setAttribute('download', 'NexusClient_LiquidGlass_v5.0.zip'); // Имя файла
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Обновить счетчик скачиваний
        const countElement = document.getElementById('download-count');
        let count = parseInt(countElement.textContent.replace(',', '')) || 154287;
        count++;
        countElement.textContent = count.toLocaleString();

        // Можно показать короткое уведомление (опционально)
        console.log('Скачивание архива NexusClient начато...');
    });

    // === АНИМАЦИЯ СТАТИСТИКИ ===
    function animateCounter(elementId, target, duration = 2000) {
        const element = document.getElementById(elementId);
        if (!element) return;

        let start = 0;
        const increment = target / (duration / 16);
        const current = parseInt(element.textContent.replace(',', '')) || 0;

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start + current).toLocaleString();
            }
        }, 16);
    }

    // Запустить анимацию счетчиков
    setTimeout(() => {
        animateCounter('download-count', 154287);
        animateCounter('online-count', 2458);
    }, 1000);

    // === ПЛАВНАЯ ПРОКРУТКА ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // === ПЕРЕКЛЮЧЕНИЕ ТЕМЫ ===
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-moon')) {
            icon.className = 'fas fa-sun';
            document.body.style.filter = 'invert(1) hue-rotate(180deg)';
        } else {
            icon.className = 'fas fa-moon';
            document.body.style.filter = 'none';
        }
    });

    // === ЭФФЕКТ ПРИ НАВЕДЕНИИ НА КАРТОЧКИ ===
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});