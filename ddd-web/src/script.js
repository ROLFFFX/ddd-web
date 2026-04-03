// 动画状态锁，防止连续点击导致动画错乱
let isAnimating = false;

function goToPage(targetPageId) {
    if (isAnimating) return; // 如果正在翻页，就忽略新的点击

    const currentPage = document.querySelector('.page.active');
    const targetPage = document.getElementById(targetPageId);

    if (currentPage === targetPage) return;

    // 锁上动画门
    isAnimating = true;

    // 判断翻页方向：如果目标是 page-01 (返回首页)，就是向右合上；否则向左翻开
    const isGoingBack = targetPageId === 'page-01';

    // 1. 预先让目标页显示出来，准备进场
    targetPage.style.display = 'flex';

    // 2. 当前页退场动画
    gsap.to(currentPage, {
        xPercent: isGoingBack ? 100 : -100, // 返回向右退(100)，前进向左退(-100)
        duration: 0.8,
        ease: "back.in(1.2)", // 稍微往回蓄力再滑出去的 Q 弹曲线
        onComplete: () => {
            // 退场结束后，把它的状态清空，隐藏起来
            currentPage.classList.remove('active');
            currentPage.style.display = 'none';
        }
    });

    // 3. 目标页进场动画
    gsap.fromTo(targetPage,
        {
            xPercent: isGoingBack ? -100 : 100 // 从左边(-100)或右边(100)准备进场
        },
        {
            xPercent: 0, // 滑动到正中心
            duration: 0.8,
            ease: "back.out(1.2)", // 滑入时稍微过冲再弹回来的 Q 弹曲线
            onComplete: () => {
                // 进场结束后，打上 active 标记，解开动画锁
                targetPage.classList.add('active');
                isAnimating = false;
            }
        }
    );
}