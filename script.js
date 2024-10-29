let slideIndex = 1;
showSlides(1);

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    let slides = document.getElementsByClassName("slides");
    if (!slides.length) return; // 如果页面上没有幻灯片，直接返回
    
    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    
    slides[slideIndex-1].style.display = "block";  
}

// 页面加载时初始化幻灯片
document.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
}); 