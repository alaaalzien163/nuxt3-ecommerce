<!-- components/layout/Footer.vue -->
<template>
<footer class="bg-black text-white py-5">
    <div class="container">
      <div class="row align-items-start g-4">
        <!-- العمود 1 -->
        <div class="col-lg-4 col-md-6 mb-4 d-flex flex-column">
          <div class="mb-4">
            <img :src="logoSrc" alt="Developer Test" class="footer-logo" />
          </div>
          <!-- وسائل التواصل الاجتماعي -->
          <div class="social-icons d-flex gap-3 mt-auto">
            <a href="#" aria-label="Facebook" class="icon-circle"><i class="bi bi-facebook"></i></a>
            <a href="#" aria-label="YouTube" class="icon-circle"><i class="bi bi-youtube"></i></a>
            <a href="#" aria-label="Instagram" class="icon-circle"><i class="bi bi-instagram"></i></a>
            <a href="#" aria-label="X" class="icon-circle"><i class="bi bi-twitter-x"></i></a>
          </div>
        </div>

        <!-- العمود 2 -->
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="row">
            <div class="col-6">
              <h6 class="col-title">Home</h6>
              <ul class="list-unstyled footer-links">
                <li><NuxtLink to="/about" class="link">About us</NuxtLink></li>
                <li><NuxtLink to="/media" class="link">Media center</NuxtLink></li>
                <li><NuxtLink to="/contact" class="link">Contact Us</NuxtLink></li>
              </ul>
            </div>
            <div class="col-6">
              <h6 class="col-title">Electronics</h6>
              <ul class="list-unstyled footer-links">
                <li><NuxtLink to="/categories/2" class="link">Jwelery</NuxtLink></li>
                <li><NuxtLink to="/categories/3" class="link">Men Clothing</NuxtLink></li>
                <li><NuxtLink to="/categories/4" class="link">Women Clothing</NuxtLink></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- العمود 3 -->
        <div class="col-lg-4 col-md-12 mb-4">
          <h5 class="contact-title">Contact us</h5>
          <ul class="list-unstyled contact-list">
            <li>+971 00 000 0000</li>
            <li>+971 0 000 0000</li>
            <li><a href="mailto:info@sample.com" class="link">info@sample.com</a></li>
          </ul>
        </div>

        <!-- العمود 4 -->
        <!-- حقوق النشر -->
        <div class="col-12">
          <hr class="divider" />
          <p class="text-center copyright"> Developer Test 2024. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logoSrc from '~/assets/icons/DEVELOPER TEST - Logo.png'
</script>

<style scoped>
footer {
  background-color: #000 !important;
}

.footer-logo { max-width: 220px; height: auto; }

.col-title { font-size: 1rem; font-weight: 700; margin-bottom: 0.75rem; }
.footer-links .link { color: rgba(255,255,255,.8); text-decoration: none; display: inline-block; padding: 4px 0; }
.footer-links .link:hover { color: #fff; }

.contact-title { font-weight: 700; margin-bottom: 0.75rem; }
.contact-list li { color: #fff; opacity: 0.85; padding: 4px 0; }
.contact-list a.link { color: rgba(255,255,255,.85); text-decoration: none; }
.contact-list a.link:hover { color: #fff; }

.icon-circle { width: 36px; height: 36px; border-radius: 50%; border: 1px solid #fff; color: #fff; display: inline-flex; align-items: center; justify-content: center; opacity: .9; }
.icon-circle:hover { opacity: 1; }

.divider { border: none; border-top: 1px solid rgba(255,255,255,.35); margin-top: 32px; margin-bottom: 12px; }
.copyright { color: rgba(255,255,255,.75); margin: 0; font-size: 0.9rem; }
</style>