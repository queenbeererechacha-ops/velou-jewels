
const CK = 'velou_cart',
    WK = 'velou_wishlist';

const getCart = () => JSON.parse(localStorage.getItem(CK) || '[]'),
    getWishlist = () => JSON.parse(localStorage.getItem(WK) || '[]');

const saveCart = x => localStorage.setItem(CK, JSON.stringify(x)),
    saveWishlist = x => localStorage.setItem(WK, JSON.stringify(x));

function updateCounts() {
    let c = getCart().reduce((a, x) => a + x.qty, 0),
        w = getWishlist().length;

    document.querySelectorAll('.cartCount').forEach(x => x.textContent = c);
    document.querySelectorAll('.wishCount').forEach(x => x.textContent = w);
}

function showToast(s) {
    let t = document.querySelector('#toast');

    if (!t) return;

    t.textContent = s;
    t.classList.add('show');

    clearTimeout(window.tt);
    window.tt = setTimeout(() => t.classList.remove('show'), 2300);
}

function addToCart(id, q = 1) {
    let c = getCart(),
        i = c.find(x => x.id === id);

    i ? i.qty += q : c.push({ id, qty: q });

    saveCart(c);
    updateCounts();
    showToast('Added to your cart ♡');
}

function toggleWishlist(id) {
    let w = getWishlist();

    if (w.includes(id)) {
        w = w.filter(x => x !== id);
        showToast('Removed from wishlist');
    } else {
        w.push(id);
        showToast('Saved to wishlist ♡');
    }

    saveWishlist(w);
    updateCounts();

    document.querySelectorAll(`[data-wish="${id}"]`).forEach(b => {
        b.classList.toggle('saved', w.includes(id));
        b.textContent = w.includes(id) ? '♥' : '♡';
    });
}

function card(p) {
    let s = getWishlist().includes(p.id);

    return `
        <article class="card">
            <div class="cardImg">
                <a href="product.html?id=${p.id}">
                    <img src="${p.images[0]}" alt="${p.name}" loading="lazy">
                </a>
                <button class="heart ${s ? 'saved' : ''}" data-wish="${p.id}">
                    ${s ? '♥' : '♡'}
                </button>
                <small>${p.category}</small>
            </div>
            <div class="meta">
                <div>
                    <a href="product.html?id=${p.id}">${p.name}</a>
                    <p>${p.price.toLocaleString()} MAD</p>
                </div>
                <button class="plus" data-add="${p.id}">+</button>
            </div>
        </article>
    `;
}

function renderCollection(cat = 'All', sort = 'featured') {
    let g = document.querySelector('#collectionGrid');

    if (!g) return;

    let a = products.filter(p => cat === 'All' || p.category === cat);

    if (sort === 'low') a.sort((x, y) => x.price - y.price);
    if (sort === 'high') a.sort((x, y) => y.price - x.price);
    if (sort === 'az') a.sort((x, y) => x.name.localeCompare(y.name));

    g.innerHTML = a.map(card).join('');
}

function renderWishlist() {
    let g = document.querySelector('#wishlistGrid');

    if (!g) return;

    let a = getWishlist()
        .map(id => products.find(p => p.id === id))
        .filter(Boolean);

    g.innerHTML = a.length
        ? a.map(card).join('')
        : `
            <div class="empty">
                <h2>Nothing saved yet.</h2>
                <p>Your future self is waiting.</p>
            </div>
        `;
}

function searchSetup() {
    let p = document.querySelector('.searchPanel'),
        i = document.querySelector('#search');

    if (!p || !i) return;

    document.querySelectorAll('.searchBtn').forEach(b => {
        b.onclick = () => {
            p.classList.add('open');
            i.focus();
        };
    });

    document.querySelector('.closeSearch').onclick = () => p.classList.remove('open');

    i.oninput = () => {
        let q = i.value.toLowerCase().trim(),
            r = document.querySelector('#searchResults');

        if (!q) {
            r.innerHTML = '';
            return;
        }

        let a = products
            .filter(x => (x.name + x.category + x.material).toLowerCase().includes(q))
            .slice(0, 6);

        r.innerHTML = a.length
            ? a.map(x => `
                <a href="product.html?id=${x.id}">
                    <img src="${x.images[0]}">
                    <span>
                        <b>${x.name}</b>
                        <small>${x.category} · ${x.price} MAD</small>
                    </span>
                </a>
            `).join('')
            : '<p>No pieces found.</p>';
    };
}

function mobileSetup() {
    let m = document.querySelector('.mobileMenu');

    if (!m) return;

    document.querySelector('.menuBtn').onclick = () => m.classList.add('open');
    document.querySelector('.closeMenu').onclick = () => m.classList.remove('open');
}

document.addEventListener('click', e => {
    let a = e.target.closest('[data-add]'),
        w = e.target.closest('[data-wish]');

    if (a) addToCart(+a.dataset.add);
    if (w) toggleWishlist(+w.dataset.wish);
});

document.addEventListener('DOMContentLoaded', () => {
    updateCounts();
    searchSetup();
    mobileSetup();

    let f = document.querySelector('#featured');

    if (f) f.innerHTML = products.slice(0, 4).map(card).join('');

    let n = document.querySelector('#newsletter');

    if (n) {
        n.onsubmit = e => {
            e.preventDefault();
            showToast('You are on the list ♡');
            n.reset();
        };
    }
});
