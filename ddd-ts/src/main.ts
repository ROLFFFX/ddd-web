import './style.css';
import gsap from 'gsap';

let isAnimating = false;

function goToPage(targetPageId: string): void {
  if (isAnimating) return;

  const currentPage = document.querySelector<HTMLElement>('.page.active');
  const targetPage = document.getElementById(targetPageId);

  if (!currentPage || !targetPage || currentPage === targetPage) return;

  isAnimating = true;

  const isGoingBack = targetPageId === 'page-01';

  targetPage.style.display = 'flex';

  gsap.to(currentPage, {
    xPercent: isGoingBack ? 100 : -100,
    duration: 0.8,
    ease: 'back.in(1.2)',
    onComplete: () => {
      currentPage.classList.remove('active');
      currentPage.style.display = 'none';
      gsap.set(currentPage, { xPercent: 0 });
    },
  });

  gsap.fromTo(
    targetPage,
    { xPercent: isGoingBack ? -100 : 100 },
    {
      xPercent: 0,
      duration: 0.8,
      ease: 'back.out(1.2)',
      onComplete: () => {
        targetPage.classList.add('active');
        isAnimating = false;
      },
    }
  );
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll<HTMLElement>('[data-target]').forEach((el) => {
    el.addEventListener('click', () => {
      const target = el.dataset.target;
      if (target) goToPage(target);
    });
  });
});
