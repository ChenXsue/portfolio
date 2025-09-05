// 平滑滚动到指定部分
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 当前页面高亮导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 100)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// 监听滚动事件
window.addEventListener('scroll', updateActiveNavLink);

// 页面加载时更新导航状态
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// 项目链接悬停效果
document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = '#1d4ed8';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.color = '#2563eb';
    });
});

// 项目图片悬停效果
document.querySelectorAll('.project-image').forEach(image => {
    image.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
        this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
    });
    
    image.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
});

// 联系信息悬停效果
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.color = '#1f2937';
        this.style.transform = 'translateX(5px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.color = '#6b7280';
        this.style.transform = 'translateX(0)';
    });
});

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 滚动动画观察器
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.project-item, .cv-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // 可以添加关闭模态框或其他功能
    }
});

// 性能优化：防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化滚动事件
const optimizedScrollHandler = debounce(updateActiveNavLink, 10);
window.addEventListener('scroll', optimizedScrollHandler);

// 移动端优化
function handleResize() {
    if (window.innerWidth <= 768) {
        // 移动端特殊处理
        document.querySelectorAll('.project-item').forEach(item => {
            item.style.transform = 'none';
        });
    }
}

window.addEventListener('resize', debounce(handleResize, 250));

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 设置初始导航状态
    updateActiveNavLink();
    
    // 添加页面加载完成的类
    document.body.classList.add('loaded');
});

// 平滑滚动到顶部（可选功能）
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// 添加返回顶部按钮（可选）
function addBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        border: none;
        background: #2563eb;
        color: white;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    button.addEventListener('click', scrollToTop);
    document.body.appendChild(button);
    
    // 显示/隐藏按钮
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
        } else {
            button.style.opacity = '0';
        }
    });
}

// 如果需要返回顶部按钮，取消注释下面这行
// addBackToTopButton();