/* ============================================================
   ИКОНКИ (Обновленные, ровные и премиальные)
   ============================================================ */
const ICONS = {
    // Щит (Защита)
    shield: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L4 6V11C4 16.5 7.5 20.5 12 22C16.5 20.5 20 16.5 20 11V6L12 3Z" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 12L11 14L15.5 9.5" stroke="#bfff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    
    // Молния (Скорость)
    lightning: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L4.5 13.5H11V22L20.5 10.5H14L13 2Z" stroke="#bfff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    
    // Глобус (Сеть)
    globe: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="9" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M3 12H21" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 3C14.5 5.5 14.5 18.5 12 21" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M12 3C9.5 5.5 9.5 18.5 12 21" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    
    // Замок (Приватность)
    lock: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="10" width="16" height="11" rx="2" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 10V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V10" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="15.5" r="2" fill="#bfff00"/>
    </svg>`,
    
    // Ключ (Доступ)
    key: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="7.5" cy="15.5" r="4.5" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.5 12.5L20 3" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 7L19 10" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M19 4L22 7" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,
    
    // Wi-Fi (Соединение)
    wifi: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 8.5C7.5 3.5 16.5 3.5 22 8.5" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M5 12C9 8.5 15 8.5 19 12" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8.5 15.5C10.5 13.5 13.5 13.5 15.5 15.5" stroke="#bfff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="19.5" r="1.5" fill="#bfff00"/>
    </svg>`,
    
    // Глаз (Наблюдение/Анонимность)
    eye: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 12C2 12 6 5 12 5C18 5 22 12 22 12C22 12 18 19 12 19C6 19 2 12 2 12Z" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="12" r="3" fill="#bfff00"/>
    </svg>`,
    
    // Ракета (Скорость/Запуск)
    rocket: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C12 2 16 5 16 10C16 13 15 15 15 15H9C9 15 8 13 8 10C8 5 12 2 12 2Z" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M9 15L7 19L10 18" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M15 15L17 19L14 18" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="12" cy="9" r="1.5" fill="#bfff00"/>
    </svg>`
};

const NAMES = {
    shield: 'Щит', lightning: 'Молнию', globe: 'Глобус', lock: 'Замок',
    key: 'Ключ', rocket: 'Ракету', wifi: 'Wi-Fi', eye: 'Глаз'
};

const KEYS = Object.keys(ICONS);

/* ============================================================
   ЛОГИКА КАПЧИ
   ============================================================ */
const grid = document.getElementById('grid');
const targetName = document.getElementById('targetName');
const overlay = document.getElementById('overlay');
const resultCircle = document.getElementById('resultCircle');
const resultText = document.getElementById('resultText');
const restartBtn = document.getElementById('restartBtn');
const dots = document.querySelectorAll('.dot');
const hint = document.getElementById('hint');

let target = null;
let attemptsLeft = 3;
let locked = false;

function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function initCaptcha() {
    locked = false;
    attemptsLeft = 3;
    overlay.classList.remove('show');
    restartBtn.style.display = 'none';
    hint.textContent = 'У вас 3 попытки';
    hint.classList.remove('error');
    dots.forEach(d => d.classList.remove('used'));
    targetName.style.color = 'var(--text)';

    const shuffledKeys = shuffle(KEYS);
    target = shuffledKeys[0];
    const chosen = shuffledKeys.slice(0, 6);
    const layout = shuffle(chosen);

    targetName.textContent = NAMES[target];

    grid.innerHTML = '';
    layout.forEach(key => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.key = key;
        card.innerHTML = ICONS[key];
        card.addEventListener('click', () => handlePick(card, key));
        grid.appendChild(card);
    });
}

function handlePick(card, key) {
    if (locked) return;
    if (card.classList.contains('correct') || card.classList.contains('wrong')) return;

    if (key === target) {
        locked = true;
        card.classList.add('correct');
        showSuccess();
    } else {
        card.classList.add('wrong');
        attemptsLeft--;
        dots[attemptsLeft].classList.add('used');

        hint.textContent = attemptsLeft > 0
            ? `Неверно! Осталось попыток: ${attemptsLeft}`
            : 'Попытки исчерпаны';
        hint.classList.add('error');

        if (attemptsLeft <= 0) {
            locked = true;
            setTimeout(showFailure, 600);
        }
    }
}

function showSuccess() {
    resultCircle.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#1db954" stroke-width="4"/>
            <path class="check-path" d="M30 52 L 44 66 L 72 36"
                fill="none" stroke="#bfff00" stroke-width="6"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`;
    resultText.textContent = 'Проверка пройдена';
    resultText.style.color = '#1db954';
    restartBtn.style.display = 'none';
    overlay.classList.add('show');
    targetName.style.color = '#1db954';

    // Через 1.5 секунды скрываем капчу и показываем сайт
    setTimeout(() => {
        document.getElementById('captcha-screen').classList.remove('active');
        document.getElementById('main-content').classList.add('show');
    }, 1500);
}

function showFailure() {
    resultCircle.innerHTML = `
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="44" fill="none" stroke="#d15468" stroke-width="4"/>
            <path class="cross-path" d="M34 34 L 66 66"
                fill="none" stroke="#d15468" stroke-width="6" stroke-linecap="round"/>
            <path class="cross-path" d="M66 34 L 34 66"
                fill="none" stroke="#d15468" stroke-width="6" stroke-linecap="round"
                style="transition-delay:0.3s"/>
        </svg>`;
    resultText.textContent = 'Доступ заблокирован';
    resultText.style.color = '#d15468';
    targetName.style.color = '#d15468';
    restartBtn.style.display = 'inline-block';
    overlay.classList.add('show');
}

restartBtn.addEventListener('click', () => {
    overlay.classList.remove('show');
    setTimeout(initCaptcha, 300);
});


/* ============================================================
   ЛОГИКА САЙТА (ШАГИ)
   ============================================================ */
// НОВАЯ ССЫЛКА НА ПОДПИСКУ
const SUB_URL = "https://clck.ru/3Wnqdy"; 

let currentApp = '';

const apps = {
    happ: {
        name: 'Happ',
        download: 'https://play.google.com/store/apps/details?id=com.happproxy',
        import: `happ://add/${SUB_URL}`
    },
    incy: {
        name: 'Incy',
        download: 'https://play.google.com/store/apps/details?id=llc.itdev.incy',
        import: `incy://add/${SUB_URL}`
    }
};

function goToStep(step, app = null) {
    if (app) currentApp = app;
    
    document.querySelectorAll('.step').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(`step-${step}`);
    if (target) target.classList.add('active');

    if (step === 2 && currentApp) {
        const data = apps[currentApp];
        document.getElementById('step-2-title').textContent = `Скачайте ${data.name}`;
        document.getElementById('download-link').href = data.download;
    }

    if (step === 3 && currentApp) {
        const data = apps[currentApp];
        document.getElementById('step-3-app-name').textContent = data.name;
        document.getElementById('import-link').href = data.import;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function copyLink() {
    const input = document.getElementById('sub-url');
    input.select();
    input.setSelectionRange(0, 99999);
    
    try {
        navigator.clipboard.writeText(input.value).then(() => {
            const btn = document.getElementById('copy-btn');
            const originalText = btn.textContent;
            btn.textContent = '✓ Готово';
            btn.style.color = 'var(--brand-green)';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.color = 'var(--brand-green)';
            }, 2000);
        });
    } catch (err) {
        document.execCommand('copy');
        alert('Ссылка скопирована!');
    }
}

// Запуск капчи при загрузке страницы
initCaptcha();
