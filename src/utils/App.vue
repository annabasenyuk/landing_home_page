<script>
import { ref, onMounted, defineComponent } from 'vue';
import Preloader from '../components/Preloader.vue';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bgimg1 from '../assets/img/bacground/01.png';
import bgimg2 from '../assets/img/bacground/02.png';
import bgimg3 from '../assets/img/bacground/03.png';
import bgimg4 from '../assets/img/bacground/04.png';

gsap.registerPlugin(ScrollTrigger)

export default defineComponent({
  name: 'Component',
  components: {
    Preloader
  },
  setup() {
    const chartContainer = ref(null);
    const barHeights = [171, 266, 341, 305, 194, 266, 341, 423, 305, 407, 509, 597, 445, 682];
    const totalBars = barHeights.length;
    const totalGaps = totalBars - 1;
    const gapWidth = 1;
    const totalGapsWidth = gapWidth * totalGaps;
    const containerWidth = 100;
    const barWidth = `calc(((${containerWidth}% - ${totalGapsWidth}px) / ${totalBars}))`;
    const barWidths = ['100%', '1115px', '100%', '823px'];

    const showMainContent = () => {
      chartContainer.value.style.opacity = '1';
    };

    const backgroundImages = [
      bgimg1,
      bgimg2,
      bgimg3,
      bgimg4
    ];
    let currentImageIndex = 0;
    const t = gsap.timeline({ repeat: -1 });

    const changeBackgroundAndAnimate = () => {
      const imageUrl = backgroundImages[currentImageIndex];

      gsap.to('.section1', {
        background: `url(${imageUrl}) lightgray 0px -104px / cover no-repeat`,
        duration: 1
      });

      document.querySelectorAll('.move1').forEach((element, index) => {
        t.to(element, { duration: 1 });
      });

      currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
    };


    const animateText = () => {
      const texts = document.querySelectorAll('.block__title');

      texts.forEach(text => {
        const chars = text.textContent.split('');
        text.textContent = '';

        chars.forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0';
          span.style.fontFamily = "Suisse Intl";
          text.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
          });
        });
      });
    };


    const animateT = () => {
      const texts = document.querySelectorAll('.section3__block-title');

      texts.forEach(text => {
        const chars = text.textContent.split('');
        text.textContent = '';

        chars.forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char;
          span.style.opacity = '0';
          text.appendChild(span);

          gsap.to(span, {
            opacity: 1,
            duration: 0.5,
            delay: index * 0.1,
          });
        });
      });
    };



    onMounted(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: '.section1',
          start: 'top top',
          end: 'bottom 10%',
          scrub: true,
          onEnter: animateText
        }
      })

      changeBackgroundAndAnimate();
      setInterval(changeBackgroundAndAnimate, 1000);

      gsap.timeline({
        scrollTrigger: {
          trigger: '.section3',
          start: 'top top',
          end: 'bottom 10%',
          scrub: true,
          onEnter: animateT
        }
      })

      animateT();
    });

    return {
      chartContainer,
      barHeights,
      barWidth,
      totalBars,
      barWidths,
      showMainContent
    };
  }
});

</script>

<template>
  <Preloader @loading-complete="showMainContent"></Preloader>

  <div class="container">
    <!-- #region section1 -->
    <section class="section1">
      <div class="section1__logo">
        <div class="logo__part1">
          <img src="../assets/icons/title/Path 210.svg?url" alt="My image" class="logo__bottom" />
          <img src="../assets/icons/title/Path 211.svg?url" alt="My image" />
          <img src="../assets/icons/title/Path 212.svg?url" alt="My image" />
          <img src="../assets/icons/title/Path 213.svg?url" alt="My image" class="logo__top" />
          <img src="../assets/icons/title/Path 214.svg?url" alt="My image" />
          <img src="../assets/icons/title/Path 215.svg?url" alt="My image" />
          <img src="../assets/icons/title/Path 216.svg?url" alt="My image" class="logo__bottom" />
        </div>

        <img src="../assets/icons/title/Group 94.svg?url" alt="My image" class="logo__dot" />
        <img src="../assets/icons/title/Group 93.svg?url" alt="My image" class="logo__part2" />
      </div>

      <p class="section1__title">Digital Marketing Agency</p>
    </section>
    <!-- #endregion-->

    <div class="cover">
      <!-- #region section2 -->
      <section class="section2">
        <nav class="nav">
          <img src="../assets/icons/title/Group 409.svg?url" alt="My image" class="nav__icon" />

          <div class="link__left">
            <a href="" class="nav__title">Services</a>
            <a href="" class="nav__title">Case Studies</a>
            <a href="" class="nav__title">Blog</a>
            <a href="" class="nav__title">About us</a>
          </div>

          <div class="link__right">
            <a href="" class="nav__title">We're hiring</a>
            <a href="" class="nav__title">Contacts</a>
          </div>

          <button class="nav__button">
            <img src="../assets/icons/Frame 8467.svg?url" alt="My image" class="button-icon-red" />
            <div class="button-title red-c">Book a call</div>
          </button>
        </nav>

        <div class="section2__block">
          <p class="block__title">Growing businesses by building relationships</p>
        </div>

        <p class="section2__title">B2B Marketing & LinkedIn Lead Generation agency</p>
      </section>
      <!-- #endregion-->

      <!-- #region section3 -->
      <section class="section3">
        <div class="section3__block">
          <p class="section3__block-title">Consitent leads flow to streamline Your business growth.</p>
          <p class="bsection3__block-describe">We combine disruptive marketing techniques with proven tech solutions to
            provide
            maximum business value.</p>
        </div>

        <div ref="chartContainer" class="section3__container-top">
          <div class="container-top__graph" v-for="(height, index) in barHeights" :key="index"
            :style="{ height: height + 'px', bottom: 0, left: (index * (100 / totalBars)) + '%', width: barWidth }">
          </div>
        </div>

        <div class="section3__container-bottom">
          <div class="container-bottom__graph" v-for="(width, index) in barWidths" :key="index" :style="{ width: width }">
          </div>
        </div>
      </section>
      <!-- #endregion-->

      <!-- #region section4 -->
      <section class="section4">
        <div class="section4__block">
          <div class="section4__block-header">Trusted long-term partner</div>
          <div class="section4__block-cover">
            <p class="block-cover__title">For leading B2B tech and service companies</p>
          </div>
        </div>

        <p class="section4__title">We combine disruptive marketing techniques with proven tech solutions to provide maximum
          business value.</p>

        <div class="section4__box">
          <div class="box red-bg left-position">
            <div class="box__content">
              <p class="box__content-number">1</p>

              <div class="box__content-header">B2B Marketing</div>

              <p class="box__content-description">Your solution is of high value and great quality, but you have a hard time
                attracting the right audience? Wish
                to work with specific clients but can't cut through the noise of a saturated market? Or simply looking to
                advance your growth efforts?</p>

              <p class="box__content-description">That's the challenge for real B2B marketing pros. Having a perfect knowledge
                of
                the
                digital landscape, we will
                help you identify the lowest hanging fruits before you spend a fortune on marketing campaigns. While you
                make
                good use of the results, we work on a sustainable strategy to scale your business in the long run.</p>
            </div>

            <div class="box__content-bottom">
              <img src="../assets/icons/Group 411.svg?url" alt="My image" class="box__content-icon" />

              <button class="box__content-button dark-bg">
                <img src="../assets/icons/Frame 8467.svg?url" alt="My image" class="button-icon-red" />
                <div class="button__title red-c">Learn more</div>
              </button>
            </div>

          </div>

          <div class="box dark-bg right-position">
            <div class="box__content">
              <p class="box__content-number">2</p>

              <div class="box__content-header">LinkedIn Lead Generation</div>

              <p class="box__content-description">Your business is all set up and now feel ready to expand your client list? You
                understand your ideal client and how your product can solve their problems?</p>

              <p class="box__content-description">That's when we come in with the comprehensive lead generation campaign to
                employ
                your sales team with more deals? Like experienced detectives, we will search for the prospects who drive
                the
                most value for your business. ext step? We make them talk to you. Unlike most salesy outreaches, our
                customized campaign is focused on building long-term relationships. Your sales team will love it.hv</p>
            </div>

            <div class="box__content-bottom">
              <img src="../assets/icons/Group 417.svg?url" alt="My image" class="box__content-icon" />

              <button class="box__content-button red-bg">
                <img src="../assets/icons/Path 8516.svg?url" alt="My image" class="button-icon-dark" />
                <div class="button__title dark-c">Learn more</div>
              </button>
            </div>
          </div>
        </div>
      </section>
      <!-- #endregion-->
    </div>
  </div>
</template>
