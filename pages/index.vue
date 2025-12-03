<template>
  <div>
        <section class="hero-section">
      <div class="container-fluid px-5">
        <div class="row align-items-center g-4">
          <div class="col-lg-6">
            <h1 class="display-3 fw-bold">SALE</h1>
            <p class="text-muted fs-5">ACCESS A LIMITED SELECTION WITH UP TO 60% OFF</p>
            <NuxtLink class="btn btn-dark btn-lg">Shop Now</NuxtLink>
          </div>

          <div class="col-lg-6 text-end position-relative">
            <img :src="headerImg" class="hero-img" />
            <div class="hero-dots d-none d-md-flex justify-content-center gap-2">
              <span class="dot active"></span>
              <span class="dot"></span>
              <span class="dot"></span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
  <div class="container-fluid px-0">
    <div class="jewelry-banner d-flex align-items-center justify-content-center" :style="{ backgroundImage: `url(${jewelryImg})` }">
        <div class="jewelry-center">
          <div class="jewelry-title">JEWELRY</div>
          <small class="jewelry-sub">Find your next forever piece</small>
        </div>
        <NuxtLink class="btn btn-light jewelry-cta">See More</NuxtLink>
      </div>
  </div>
</section>


    <!-- Special Offers -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="mb-0">Special Offers</h3>
          <div>
            <NuxtLink to="/categories/1" class="btn btn-sm btn-outline-secondary me-2">Electronics</NuxtLink>
            <NuxtLink to="/categories/2" class="btn btn-sm btn-outline-secondary me-2">Jewelery</NuxtLink>
            <NuxtLink to="/categories/3" class="btn btn-sm btn-outline-secondary me-2">Men</NuxtLink>
            <NuxtLink to="/categories/4" class="btn btn-sm btn-outline-secondary">Women</NuxtLink>
          </div>
        </div>
        <div class="offers-carousel position-relative">
          <button class="carousel-arrow left" type="button" @click="scrollOffers(-1)">
            ‹
          </button>
          <div ref="offersTrack" class="offers-track d-flex gap-3" @scroll="onOffersScroll">
            <div v-for="(o, idx) in offers" :key="o.id" class="offer-item">
              <div class="card offer-card h-100">
                <div class="offer-img-wrap">
                  <img :src="o.image" :alt="o.title" class="offer-img" />
                </div>
                <div class="p-3 text-center">
                  <div class="text-muted small mb-1">{{ o.title }}</div>
                  <div class="d-flex justify-content-center gap-3 align-items-center">
                    <span class="text-muted text-decoration-line-through">AED {{ o.price.toFixed(2) }}</span>
                    <strong class="text-danger">AED {{ o.special.toFixed(2) }}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button class="carousel-arrow right" type="button" @click="scrollOffers(1)">
            ›
          </button>
          <div class="offers-dots d-flex gap-2 justify-content-center mt-3">
            <span v-for="(o, i) in offers" :key="o.id" :class="['dot', { active: activeOfferIndex === i }]"> </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Promo Banner -->
    <section class="py-10 w-full">
      <div class=" ">
        <img :src="promoImg" class="img-fluid rounded w-100" alt="promo" />
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="py-5 bg-light">
      <div class="container">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="mb-0">New Arrivals</h3>
        </div>
        <div class="arrivals-carousel position-relative">
          <button class="carousel-arrow left" type="button" @click="scrollArrivals(-1)">‹</button>
          <div ref="arrivalsTrack" class="arrivals-track d-flex gap-3" @scroll="onArrivalsScroll">
            <div v-for="(p, idx) in arrivals" :key="p.id" class="arrival-item">
              <!-- use existing ProductCard but keep the horizontal flow -->
              <ProductCard :product="p" />
            </div>
          </div>
          <button class="carousel-arrow right" type="button" @click="scrollArrivals(1)">›</button>
          <div class="arrivals-dots d-flex gap-2 justify-content-center mt-3">
            <span v-for="(p, i) in arrivals" :key="p.id" :class="['dot', { active: activeArrivalIndex === i }]"> </span>
          </div>
        </div>
      </div>
    </section>

   <!-- Membership CTA -->
<section class="cta-section ">
  <div class="container  d-flex flex-column flex-md-row align-items-center justify-content-center gap-3 py-4">
    <h4 class="mb-0 cta-title">Become a member & get 15% off</h4>
    <a href="#" class="btn cta-btn">Sign up for free <span class="arrow">→</span></a>
  </div>
</section>

  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ProductCard from '~/components/product/ProductCard.vue'
import headerImg from '~/assets/images/Header.jpg'
import jewelryImg from '~/assets/images/Jewelry.jpg'
import img1 from '~/assets/images/1.jpg'
import img2 from '~/assets/images/2.jpg'
import img3 from '~/assets/images/3.jpg'
import img4 from '~/assets/images/4.jpg'
import imgD from '~/assets/images/D.png'
import imgF from '~/assets/images/F.png'
import imgG from '~/assets/images/G.png'
import imgH from '~/assets/images/H.png'
import promoImg from '~/assets/images/Untitled-1.jpg'

const { data } = await useFetch('https://fakestoreapi.com/products?limit=12')
const products = computed(() => (data.value as any[]) || [])
const specials = computed(() => products.value.slice(0, 4))
const arrivals = computed(() => products.value.slice(4, 8))

const offers = [
  { id: 'o1', title: 'Lorem ipsum dolor', image: img1, price: 899, special: 800 },
  { id: 'o2', title: 'Lorem ipsum dolor', image: img2, price: 899, special: 800 },
  { id: 'o3', title: 'Lorem ipsum dolor', image: img3, price: 899, special: 800 },
  { id: 'o4', title: 'Lorem ipsum dolor', image: img4, price: 899, special: 800 },
  { id: 'o5', title: 'Lorem ipsum dolor', image: imgD, price: 899, special: 800 },
  { id: 'o6', title: 'Lorem ipsum dolor', image: imgF, price: 899, special: 800 },
  { id: 'o7', title: 'Lorem ipsum dolor', image: imgG, price: 899, special: 800 },
  { id: 'o8', title: 'Lorem ipsum dolor', image: imgH, price: 899, special: 800 }
]

const offersTrack = ref<HTMLDivElement | null>(null)
const activeOfferIndex = ref(0)
const activeArrivalIndex = ref(0)
const offersItemWidth = ref(270 + 12)
function scrollOffers(direction: number) {
  const track = offersTrack.value
  if (!track) return
  const item = track.querySelector('.offer-item') as HTMLElement | null
  const step = item ? item.offsetWidth + 12 : 300
  track.scrollBy({ left: direction * step, behavior: 'smooth' })
}
function onOffersScroll() {
  const track = offersTrack.value
  if (!track) return
  const item = track.querySelector('.offer-item') as HTMLElement | null
  const width = item ? item.offsetWidth + 12 : offersItemWidth.value
  activeOfferIndex.value = Math.round(track.scrollLeft / width)
}

const arrivalsTrack = ref<HTMLDivElement | null>(null)
onMounted(() => {
  // initialize dot positions
  onOffersScroll()
  onArrivalsScroll()
  const setWidth = () => {
    const item = offersTrack.value?.querySelector('.offer-item') as HTMLElement | null
    if (item) offersItemWidth.value = item.offsetWidth + 12
  }
  setWidth()
  window.addEventListener('resize', setWidth)
})
function scrollArrivals(direction: number) {
  const track = arrivalsTrack.value
  if (!track) return
  const item = track.querySelector('.arrival-item') as HTMLElement | null
  const step = item ? item.offsetWidth + 12 : 300
  track.scrollBy({ left: direction * step, behavior: 'smooth' })
}
function onArrivalsScroll() {
  const track = arrivalsTrack.value
  if (!track) return
  const item = track.querySelector('.arrival-item') as HTMLElement | null
  const width = item ? item.offsetWidth + 12 : offersItemWidth.value
  activeArrivalIndex.value = Math.round(track.scrollLeft / width)
}
</script>

<style scoped>
.hero-section {
  background: #f7f3e9; /* same beige tone in screenshot */
  padding: 60px 0;
}

.hero-img {
  width: 100%;
  height: auto;
  object-fit: contain;
}


.jewelry-banner {
  height: 500px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.jewelry-center-text {
  color: white;
  font-size: 65px;
  letter-spacing: 10px;
  font-weight: 300;
  text-align: center;
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.jewelry-cta {
  position: absolute;
  bottom: 30px;
  left: 40px;
}

.jewelry-banner::before{
  content:'';
  position:absolute;
  inset:0;
  background: linear-gradient(0deg, rgba(0,0,0,0.7), rgba(0,0,0,0.6));
}
.jewelry-center{ position:relative; color:#fff; text-align:center; z-index:2 }
.jewelry-title{ font-size:72px; letter-spacing:14px; font-weight:300; }
.jewelry-sub{ display:block; margin-top:8px; font-size:14px; letter-spacing:2px; color: rgba(255,255,255,.85) }


/* Special offers visuals similar to provided mock */
.offer-card {
  border: 1px solid #e5e5e5;
  box-shadow: none;
}
.offer-img-wrap {
  background: #fff;
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.offer-img {
  max-height: 220px;
  width: auto;
  object-fit: contain;
}

/* Carousel layout */
.offers-carousel {
  position: relative;
}
.offers-track {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 4px;
}
.offers-track::-webkit-scrollbar { height: 8px; }
.offers-track::-webkit-scrollbar-thumb { background: #ddd; border-radius: 4px; }
.offer-item {
  flex: 0 0 auto;
  width: 270px;
  scroll-snap-align: start;
}
.carousel-arrow {
  position: absolute;
  top: 40%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.carousel-arrow.left { left: -12px; }
.carousel-arrow.right { right: -12px; }

.hero-dots{ position:absolute; right: 0; left: 0; bottom: -12px; z-index:2 }
.hero-dots .dot{ width:10px; height:10px; border-radius:50%; background:#ddd; display:inline-block }
.dot.active{ background:#111 }

.offers-dots, .arrivals-dots{ z-index:1; }
.offers-dots .dot, .arrivals-dots .dot{ width:9px; height:9px; border-radius:50%; background:#e6e6e6; display:inline-block }
.offers-dots .dot.active, .arrivals-dots .dot.active{ background:#000 }

/* Arrivals visuals */
.arrival-card {
  border: 1px solid #e5e5e5;
  box-shadow: none;
}
.arrival-img-wrap {
  background: #eef1f4; /* light gray background like mock */
  height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrival-img {
  max-height: 220px;
  width: auto;
  object-fit: contain;
}
.arrivals-track {
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  padding-bottom: 4px;
}
.arrival-item {
  flex: 0 0 auto;
  width: 270px;
  scroll-snap-align: start;
}

/* CTA styles */
.cta-section {
  background: #ffde59;
  padding: 0;        /* remove spacing */
  margin: 0;         /* ensure no margins */
  border: none;  
  height: 15rem;
  margin-bottom: -22px; /* remove white bottom border that caused the line */
  display: flex;
}

.cta-title {
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.cta-btn {
  background: #000;
  color: #fff;
  border: 1px solid #000;
  padding: 0.6rem 1.1rem;
  border-radius: 4px;
  position: relative;
}

.cta-btn::after {
  content: '';
  position: absolute;
  inset: 4px -4px -4px 4px;
  border: 1px solid #111;
  z-index: -1;
}

.cta-btn .arrow { margin-left: 6px; }
</style>