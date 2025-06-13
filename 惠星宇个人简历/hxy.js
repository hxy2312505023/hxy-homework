// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 加载动画
    setTimeout(function() {
        document.querySelector('.loader').style.display = 'none';
    }, 2000);
    
    // 导航栏滚动效果
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // 深色/浅色模式切换
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '浅色模式';
        } else {
            themeToggle.textContent = '深色模式';
        }
    });
    
    // 返回顶部按钮
    const backToTopBtn = document.getElementById('back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // 轮播图功能
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const totalSlides = slides.length;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = (n + totalSlides) % totalSlides;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
        
        document.querySelector('.slides').style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // 重置所有动画
        slides.forEach(slide => {
            const h3 = slide.querySelector('h3');
            const p = slide.querySelector('p');
            if (h3) h3.style.opacity = '0';
            if (p) p.style.opacity = '0';
        });
        
        // 如果是当前激活的slide，显示内容
        if (slides[currentSlide].classList.contains('active')) {
            setTimeout(() => {
                const currentH3 = slides[currentSlide].querySelector('h3');
                const currentP = slides[currentSlide].querySelector('p');
                if (currentH3) currentH3.style.opacity = '1';
                if (currentP) currentP.style.opacity = '1';
            }, 50);
        }
    }
    
    document.querySelector('.next').addEventListener('click', function() {
        showSlide(currentSlide + 1);
    });
    
    document.querySelector('.prev').addEventListener('click', function() {
        showSlide(currentSlide - 1);
    });
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // 自动轮播
    let slideInterval = setInterval(function() {
        showSlide(currentSlide + 1);
    }, 5000);
    
    // 鼠标悬停时暂停自动轮播
    const slider = document.querySelector('.slider');
    slider.addEventListener('mouseenter', function() {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', function() {
        slideInterval = setInterval(function() {
            showSlide(currentSlide + 1);
        }, 5000);
    });
    
    // 初始化显示第一个slide的内容
    showSlide(0);
    
    // 平滑滚动
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // AI聊天机器人功能
    const chatbotToggle = document.getElementById('chatbot-toggle');
    const chatbotContainer = document.getElementById('chatbot-container');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatbotUserInput = document.getElementById('chatbot-user-input');
    const chatbotMessages = document.getElementById('chatbot-messages');
    
    // 切换聊天窗口
    chatbotToggle.addEventListener('click', function() {
        chatbotContainer.style.display = chatbotContainer.style.display === 'flex' ? 'none' : 'flex';
        if (chatbotContainer.style.display === 'flex') {
            chatbotUserInput.focus();
        }
    });
    
    // 关闭聊天窗口
    chatbotClose.addEventListener('click', function() {
        chatbotContainer.style.display = 'none';
    });
    
    // 发送消息
    function sendMessage() {
        const message = chatbotUserInput.value.trim();
        if (message === '') return;
        
        // 添加用户消息
        addMessage(message, 'user');
        chatbotUserInput.value = '';
        
        // 显示AI正在输入
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = 'message ai-message';
        thinkingDiv.textContent = '正在思考...';
        chatbotMessages.appendChild(thinkingDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        
        // 调用AI API
        callAIAPI(message, thinkingDiv);
    }
    
    // 添加消息到聊天窗口
    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = message;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // 调用AI API (这里以DeepSeek为例)
    async function callAIAPI(message, thinkingDiv) {
        try {
            // 这里替换为实际的API调用
            // 以下是模拟API调用的示例代码
            
            // 模拟API延迟
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // 模拟响应 - 实际使用时请替换为API调用
            const aiResponse = getMockAIResponse(message);
            
            // 移除"正在思考"消息
            chatbotMessages.removeChild(thinkingDiv);
            
            // 添加AI响应
            addMessage(aiResponse, 'ai');
        } catch (error) {
            console.error('调用AI API出错:', error);
            chatbotMessages.removeChild(thinkingDiv);
            addMessage('抱歉，我暂时无法回答这个问题。请稍后再试。', 'ai');
        }
    }
    
    // 模拟AI响应 - 实际使用时不需要这个函数
    function getMockAIResponse(message) {
        const responses = {
            "你好": "你好！我是你的AI助手，有什么可以帮你的吗？",
            "你是谁": "我是一个基于DeepSeek技术的AI助手，可以帮助你解答问题。",
            "区块链": "区块链是一种分布式数据库技术，具有去中心化、不可篡改等特点。",
            "前端": "前端开发主要涉及HTML、CSS和JavaScript，用于构建用户界面。",
            "三亚学院": "三亚学院是位于海南省三亚市的一所本科院校。",
            "default": "我理解你的问题是: " + message + "。作为一个AI助手，我可以帮你解答关于区块链、前端开发等问题。"
        };
        
        return responses[message] || responses["default"];
    }
    
    // 发送消息事件
    chatbotSend.addEventListener('click', sendMessage);
    chatbotUserInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});