document.addEventListener("DOMContentLoaded", () => {
    
    // 1) CANLI TEMA DEĞİŞTİRİCİ (Unique Özellik #1)
    const themeButtons = document.querySelectorAll(".theme-btn");
    const body = document.body;

    themeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const selectedTheme = btn.getAttribute("data-set-theme");
            body.setAttribute("data-theme", selectedTheme);

            themeButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // 2) YAZI MAKİNESİ (TYPEWRITER) EFEKTİ (Unique Özellik #2)
    const words = [
        "C# & ASP.NET Core MVC",
        "MS SQL Veritabanı Mimarisi",
        "Python & Flask Servisleri",
        "Docker & AWS Bulut Çözümleri"
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typewriterEl = document.getElementById("typewriter");

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = isDeleting ? 45 : 90;

        if (!isDeleting && charIndex === currentWord.length) {
            speed = 1800; // Kelime tamamlandığında bekle
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }
    typeEffect();

    // 3) KAYDIRMA İLE BELİRME ANİMASYONU (Scroll Reveal)
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    // 4) BECERİ KARTLARINDA HAFİF 3D EĞİM EFEKTİ (Unique Özellik #3)
    const tiltCards = document.querySelectorAll(".tilt-card");
    tiltCards.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(600px) rotateX(0deg) rotateY(0deg) translateY(0)";
        });
    });

    // 5) MOBİL MENÜ AÇMA / KAPAMA
    const mobileMenuBtn = document.getElementById("mobileMenuBtn");
    const navLinks = document.getElementById("navLinks");

    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("open");
    });

    // Menüden bir bağlantıya tıklanınca mobil menüyü kapat
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
        });
    });
});