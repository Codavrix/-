/* ============================================================
   ИКОНКИ TABLER (готовые, ровные, 24x24, stroke 2px)
   Цвета изменены на фирменные Omnivex
   ============================================================ */
const ICONS = {
    // Щит (shield)
    shield: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" /><path d="M9 12l2 2l4 -4" stroke="#bfff00"/></svg>`,
    
    // Молния (bolt)
    lightning: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#bfff00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" /></svg>`,
    
    // Глобус (world)
    globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg>`,
    
    // Замок (lock)
    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" /><circle cx="12" cy="16" r="1" fill="#bfff00" /><path d="M8 11v-4a4 4 0 0 1 8 0v4" /></svg>`,
    
    // Ключ (key)
    key: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4" /><path d="M10.85 12.15l7.15 -7.15" /><path d="M18 5l2 2" /><path d="M15 8l2 2" /></svg>`,
    
    // Wi-Fi
    wifi: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 18l.01 0" stroke="#bfff00" /><path d="M9.172 15.172a4 4 0 0 1 5.656 0" stroke="#bfff00" /><path d="M6.343 12.343a8 8 0 0 1 11.314 0" /><path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" /></svg>`,
    
    // Глаз (eye)
    eye: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="2" fill="#bfff00" /><path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" /></svg>`,
    
    // Ракета (rocket)
    rocket: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1db954" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" /><path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" /><circle cx="15" cy="9" r="1" fill="#bfff00" /></svg>`
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

initCaptcha();
