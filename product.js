
const reviewBank = {
  1: [
    ['Lina M.', '5', 'Absolutely beautiful. It looks even more delicate in person and the packaging was gorgeous.'],
    ['Sara K.', '5', 'I have worn this almost every day since it arrived. So pretty and easy to style.'],
    ['Nora A.', '4', 'Really elegant necklace. The chain is slightly finer than I expected, but I love it.']
  ],
  2: [
    ['Meryem B.', '5', 'The perfect little ring. It catches the light so beautifully.'],
    ['Yasmine R.', '5', 'Looks expensive without being too much. I am obsessed.'],
    ['Aya T.', '4', 'Very pretty and comfortable for everyday wear.']
  ],
  3: [
    ['Salma E.', '5', 'These hoops are so cute. Lightweight and actually comfortable all day.'],
    ['Imane L.', '5', 'My new favorite earrings. They go with literally everything.'],
    ['Hiba N.', '4', 'Beautiful shape and arrived nicely packaged.']
  ],
  4: [
    ['Maya S.', '5', 'Elegant, minimal and exactly what I wanted.'],
    ['Nour C.', '5', 'The cuff makes even a basic outfit look put together.'],
    ['Lina R.', '4', 'Really lovely piece and easy to stack with other bracelets.']
  ],
  5: [
    ['Sara M.', '5', 'The chain has such a pretty shine. It feels very luxe.'],
    ['Ines A.', '5', 'Bought it as a gift and ended up wanting one for myself.'],
    ['Meriem H.', '4', 'Simple but definitely noticeable.']
  ],
  6: [
    ['Aya B.', '5', 'The signet detail is gorgeous and it fits perfectly.'],
    ['Salma R.', '5', 'So chic. I get compliments every time I wear it.'],
    ['Nora K.', '4', 'Beautiful ring, especially in sunlight.']
  ],
  7: [
    ['Yasmine T.', '5', 'The pearl detail is stunning. Very feminine without being childish.'],
    ['Lina A.', '5', 'Looks beautiful with both casual and dressy outfits.'],
    ['Maya F.', '4', 'Really pretty earrings and nicely finished.']
  ],
  8: [
    ['Nour B.', '5', 'Delicate and elegant. Exactly my style.'],
    ['Sara L.', '5', 'I love layering this with my other bracelets.'],
    ['Imane S.', '4', 'Very cute and comfortable.']
  ],
  9: [
    ['Meryem K.', '5', 'The set is gorgeous. Both rings look amazing together.'],
    ['Aya M.', '5', 'Such a good gift idea. The packaging made it feel extra special.'],
    ['Nora S.', '4', 'Pretty, feminine and easy to wear.']
  ],
  10: [
    ['Lina B.', '5', 'This is THAT necklace. It makes every outfit look better.'],
    ['Salma K.', '5', 'The shape is so elegant and flattering.'],
    ['Yasmine A.', '4', 'Really beautiful statement piece without being too loud.']
  ]
};

function getStoredReviews(id) {
  try {
    return JSON.parse(localStorage.getItem('velou_reviews_' + id) || '[]');
  } catch {
    return [];
  }
}

function getReviews(id) {
  return [...(reviewBank[id] || []), ...getStoredReviews(id)];
}

function starsHTML(value, interactive = false) {
  if (interactive) {
    return [1, 2, 3, 4, 5]
      .map(n => `<button type="button" class="ratingStar ${n <= value ? 'active' : ''}" data-rating="${n}" aria-label="${n} star${n > 1 ? 's' : ''}">★</button>`)
      .join('');
  }

  return '★★★★★'
    .split('')
    .map((s, i) => `<span class="star ${i < value ? 'filled' : ''}">${s}</span>`)
    .join('');
}

function averageRating(reviews) {
  return reviews.length
    ? reviews.reduce((sum, r) => sum + Number(r[1]), 0) / reviews.length
    : 0;
}

function renderReviews(p) {
  const reviews = getReviews(p.id);
  const avg = averageRating(reviews);
  const counts = [5, 4, 3, 2, 1].map(n =>
    reviews.filter(r => Number(r[1]) === n).length
  );

  reviewsContent.innerHTML = `
    <div class="reviewsHeader">
      <div>
        <small>REAL PEOPLE, REAL PIECES</small>
        <h2>Reviews</h2>
        <button class="reviewSummary" id="openReviewForm">
          <span class="bigRating">${avg.toFixed(1)}</span>
          <span class="summaryStars">${starsHTML(Math.round(avg))}</span>
          <span>${reviews.length} reviews · Write a review</span>
        </button>
      </div>

      <div class="ratingBars">
        ${[5, 4, 3, 2, 1].map((n, i) => `
          <div class="ratingBar">
            <span>${n}</span>
            <div>
              <i style="width:${reviews.length ? counts[i] / reviews.length * 100 : 0}%"></i>
            </div>
            <small>${counts[i]}</small>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="reviewsList">
      ${reviews.map(r => `
        <article class="reviewCard">
          <div class="reviewTop">
            <div>
              <strong>${escapeHTML(r[0])}</strong>
              <div class="reviewStars">${starsHTML(Number(r[1]))}</div>
            </div>
            <small>${r[3] || 'Verified purchase'}</small>
          </div>
          <p>${escapeHTML(r[2])}</p>
        </article>
      `).join('')}
    </div>

    <form id="reviewForm" class="reviewForm hidden">
      <div class="formTitle">
        <div>
          <small>YOUR EXPERIENCE</small>
          <h3>Write a review</h3>
        </div>
        <button type="button" id="closeReviewForm">×</button>
      </div>

      <label>
        Your name
        <input id="reviewName" required maxlength="40" placeholder="Your name">
      </label>

      <label>
        Your rating
        <div class="ratingInput" id="ratingInput">${starsHTML(0, true)}</div>
        <input type="hidden" id="reviewRating" value="0">
      </label>

      <label>
        Your review
        <textarea id="reviewText" required maxlength="500" rows="5" placeholder="Tell us what you think about this piece..."></textarea>
      </label>

      <button class="btn dark" type="submit">
        Publish review <span>→</span>
      </button>
    </form>
  `;

  document.getElementById('openReviewForm').onclick = () => {
    const f = document.getElementById('reviewForm');
    f.classList.remove('hidden');
    f.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  document.getElementById('closeReviewForm').onclick = () => {
    document.getElementById('reviewForm').classList.add('hidden');
  };

  document.querySelectorAll('.ratingStar').forEach(btn => {
    btn.onclick = () => {
      const n = Number(btn.dataset.rating);

      document.getElementById('reviewRating').value = n;

      document.querySelectorAll('.ratingStar').forEach(x => {
        x.classList.toggle('active', Number(x.dataset.rating) <= n);
      });
    };
  });

  document.getElementById('reviewForm').onsubmit = e => {
    e.preventDefault();

    const name = document.getElementById('reviewName').value.trim();
    const rating = Number(document.getElementById('reviewRating').value);
    const text = document.getElementById('reviewText').value.trim();

    if (!rating) {
      showToast('Please choose a rating');
      return;
    }

    const stored = getStoredReviews(p.id);
    stored.unshift([name, String(rating), text, 'Just now']);

    localStorage.setItem(
      'velou_reviews_' + p.id,
      JSON.stringify(stored)
    );

    renderReviews(p);
    showToast('Thank you for your review ♥');

    document.getElementById('reviewsSection').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };
}

function escapeHTML(str) {
  return String(str).replace(/[&<>'"]/g, c => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    "'": '&#39;',
    '"': '&quot;'
  }[c]));
}

document.addEventListener('DOMContentLoaded', () => {
  let id = +(new URLSearchParams(location.search).get('id') || 1);
  let p = products.find(x => x.id === id) || products[0];

  document.title = p.name + ' — VelouJewels';

  const reviews = getReviews(p.id);
  const avg = averageRating(reviews);

  productPage.innerHTML = `
    <div class="crumb">
      <a href="collections.html">Collections</a> / ${p.name}
    </div>

    <div class="detail">
      <div>
        <div class="mainPhoto">
          <img id="mainImg" src="${p.images[0]}" alt="${p.name}">
        </div>

        <div class="thumbs">
          ${p.images.map((x, i) => `
            <button class="${i ? '' : 'active'}" data-img="${x}">
              <img src="${x}">
            </button>
          `).join('')}
        </div>
      </div>

      <div class="info">
        <small>${p.category}</small>
        <h1>${p.name}</h1>
        <strong class="price">${p.price.toLocaleString()} MAD</strong>

        <button class="stars reviewJump" id="reviewJump" type="button" aria-label="View reviews">
          <span class="summaryStars">${starsHTML(Math.round(avg))}</span>
          <span>${avg.toFixed(1)} · ${reviews.length} reviews</span>
        </button>

        <p>${p.desc}</p>

        <div class="spec">
          <span>Material</span>
          <b>${p.material}</b>
        </div>

        <div class="spec">
          <span>Shipping</span>
          <b>2–4 business days · 35 MAD</b>
        </div>

        <div class="productActions">
          <button class="btn dark full" id="addDetail">Add to cart +</button>
          <button class="detailHeart ${getWishlist().includes(p.id) ? 'saved' : ''}" data-wish="${p.id}">
            ${getWishlist().includes(p.id) ? '♥' : '♡'}
          </button>
        </div>

        <div class="note">✦ Complimentary delivery on orders over 700 MAD</div>
      </div>
    </div>
  `;

  document.querySelectorAll('[data-img]').forEach(b => {
    b.onclick = () => {
      mainImg.src = b.dataset.img;

      document.querySelectorAll('[data-img]').forEach(x => {
        x.classList.remove('active');
      });

      b.classList.add('active');
    };
  });

  addDetail.onclick = () => addToCart(p.id);

  document.getElementById('reviewJump').onclick = () => {
    document.getElementById('reviewsSection').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  };

  let rec = products
    .filter(x => x.id !== p.id && x.category === p.category)
    .slice(0, 3);

  if (rec.length < 3) {
    rec = products
      .filter(x => x.id !== p.id)
      .slice(0, 3);
  }

  recommendations.innerHTML = rec.map(card).join('');

  renderReviews(p);
});
