
document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. 3D Particle Background Animation
    // ==========================================
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        const particleCount = 100; // Number of nodes
        const connectionDistance = 150; // Distance to draw lines

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.5; // Velocity
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.color = `rgba(230, 175, 46, ${Math.random() * 0.5 + 0.2})`; // Gold with alpha
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                ctx.fill();
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            particles.forEach((p, i) => {
                p.update();
                p.draw();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(230, 175, 46, ${1 - dist / connectionDistance})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            requestAnimationFrame(animate);
        }

        window.addEventListener('resize', () => {
            resize();
            initParticles();
        });

        resize();
        initParticles();
        animate();
    }


    // ==========================================
    // 2. Navigation Logic (Scroll Spy & Smooth Scroll)
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.side-nav a');
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sideNav = document.getElementById('side-nav');

    // Smooth Scroll on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // e.preventDefault(); // Let default anchor behavior work with css smooth-scroll, or keep manual?
            // Let's use manual to close menu reliably
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Close menu first
                if (hamburgerBtn && sideNav) {
                    hamburgerBtn.classList.remove('active');
                    sideNav.classList.remove('active');
                }

                // Scroll
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Spy (Highlight Nav)
    const observerOptions = {
        root: null,
        threshold: 0.3 // Trigger when 30% visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active from all
                navLinks.forEach(link => link.classList.remove('active-link'));
                // Add to current
                const activeLink = document.querySelector(`.side-nav a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active-link');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));





    // ==========================================
    // 4. Existing Content Logic (Language, Modal, Data)
    // ==========================================

    // Modal Logic
    const modal = document.getElementById('skill-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalImagesContainer = document.getElementById('modal-images');

    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });

    // Close button logic
    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    const interactiveItems = document.querySelectorAll('.skill-tag, .interactive-item');
    interactiveItems.forEach(item => {
        item.addEventListener('click', () => {
            let title = item.textContent.trim();
            const h3 = item.querySelector('h3');
            if (h3) title = h3.textContent.trim();
        });
    });

    // Language Data & Logic
    let currentLang = 'en';

    const translations = {
        en: {
            name: "Tzu-Heng Su",
            intro: "Bridging Data Logic & Business Intuition | Transforming Market Noise into Profitable Guidance",
            hero_subtitle: "MSc Digital Marketing & Analytics | Specializing in Market Analysis, Data Visualization & AI Applications",
            hero_tags: `<span class="hero-tag-pill">Market Analysis</span> · <span class="hero-tag-pill">Data Analytics</span> · <span class="hero-tag-pill">Machine Learning</span> · <span class="hero-tag-pill">Digital Marketing</span>`,

            // Nav
            nav_home: "Home",
            nav_edu: "Education",
            nav_exp: "Projects",
            nav_intern: "Internship",
            nav_skills: "Skills",
            nav_cert: "Certificates",
            nav_contact: "Contact",

            edu_title: "Education",
            edu_1_school: "National Kaohsiung University of Science and Technology",
            edu_1_major: "B.S. in Logistics Management",
            edu_1_time: "2020 - 2023",
            edu_2_school: "National Kaohsiung University of Science and Technology",
            edu_2_major: "M.S. in Finance",
            edu_2_time: "2024 - 2025",
            edu_3_school: "Rennes School of Business",
            edu_3_major: "MSc in Digital Marketing Management",
            edu_3_time: "2025 - 2026",

            exp_title: "Projects & Works",

            exp_1_time: "Jan 2023 – Dec 2023",
            exp_1_role: "Cijin Ferry Biofuel Pricing Strategy Research",
            exp_1_summary: "Integrated TPB and VBN theories to explore consumers' willingness to pay (WTP) for green products.",
            exp_1_tags_list: `<span class="project-tag">Data Analysis</span><span class="project-tag">Survey Research</span><span class="project-tag">Tobit Model</span>`,
            exp_1_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Exploring the Psychology of Green Pricing】</h4>
                <p style="margin-bottom: 1rem;">This project aimed to integrate the Theory of Planned Behavior (TPB) and Value-Belief-Norm Theory (VBN) to explore consumers' willingness to pay (WTP) for green products and CSR.</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Methodology & Findings】</h4>
                <p style="margin-bottom: 1rem;">The method employed the Contingent Valuation Method (CVM) for questionnaire design and used the Tobit model to correct data bias for precise estimation. The results confirmed that psychological factors and specific demographic characteristics (e.g., age, occupation) significantly affect WTP.</p>
                <p style="margin-bottom: 1rem;">It is suggested that enterprises and governments should target high-WTP groups to formulate differentiated pricing and marketing strategies, effectively transforming environmental value into market benefits.<br><br><a href="files/旗津渡輪生質能源票價研究.pdf" target="_blank" class="dashboard-btn">View My Work</a></p>
            `,

            exp_2_time: "Sep 2024 – Jul 2025",
            exp_2_role: "Infectious Medical Waste Generation Prediction",
            exp_2_summary: "Built department-level waste prediction models for Cardiology and OB/GYN to optimize hospital waste management.",
            exp_2_tags_list: `<span class="project-tag">Machine Learning</span><span class="project-tag">Python</span><span class="project-tag">SVR</span><span class="project-tag">SHAP</span>`,
            exp_2_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Solving the One-Size-Fits-All Blind Spot】</h4>
                <p style="margin-bottom: 1rem;">This project aimed to solve medical waste management challenges by establishing department-level infectious waste prediction models specifically for Cardiology and Obstetrics & Gynecology, overcoming the limitations of traditional hospital-wide models that ignore departmental differences.</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Execution Strategy & Tech Application】</h4>
                <p style="margin-bottom: 1rem;">The method used three patient structural indicators, compared six machine learning algorithms, and used SHAP to explain variable influence. The results showed that Support Vector Regression (SVR) performed best, and Case Mix Index (CMI) was the most critical factor affecting infectious waste generation in each department, reflecting a high correlation between disease complexity and waste volume.</p>
                <p style="margin-bottom: 1rem;">It is suggested that hospitals abandon the one-size-fits-all management model in favor of departmental differentiation strategies, establish waste warning mechanisms for high-CMI cases to allow logistics units to schedule resources in advance, integrate waste management into clinical pathways, and implement customized medical classification training based on departmental characteristics to achieve precise reduction and sustainable governance.</p>
            `,

            exp_3_time: "Sep 2025 – Oct 2025",
            exp_3_role: "Dockmate France Digital Marketing Strategy Planning",
            exp_3_summary: "Formulated a comprehensive marketing strategy for Dockmate, combining Google Ads and Influencers.",
            exp_3_tags_list: `<span class="project-tag">Digital Marketing</span><span class="project-tag">Google Ads</span><span class="project-tag">Social Media Strategy</span>`,
            exp_3_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Capturing High-Net-Worth Mindshares】</h4>
                <p style="margin-bottom: 1rem;">This project aimed to formulate a comprehensive European market marketing strategy for the yacht remote control brand Dockmate, enhancing brand awareness and loyalty among high-net-worth clients.</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Execution Strategy: Full-Funnel Marketing】</h4>
                <p style="margin-bottom: 1rem;">The execution strategy covered the Full-Funnel path: first, using emotional appeals of 'Fear and Peace of Mind' to resonate, and introducing e-books and webinars to acquire leads; second, using Google Ads (40% of budget) for precise keyword layout, excluding invalid traffic and targeting specific boat types; on the social front, combining million-follower influencers like Alex Jimenez and LinkedIn B2B native ads to expand volume.</p>
                <p style="margin-bottom: 1rem;">The result was not only a precise customer acquisition model integrating Google Ads, social media, and CRM automation, but also the innovative design of the 'Captains Circle' gamified loyalty program, effectively strengthening retention and word-of-mouth recommendations through tiered reward mechanisms.<br><br><a href="files/DockMate數位行銷策略規劃.pdf" target="_blank" class="dashboard-btn">View My Work</a></p>
            `,

            exp_4_time: "Nov 2025",
            exp_4_role: "E-commerce Customer Churn Analysis & Insights",
            exp_4_summary: "Analyzed key drivers behind customer churn and proposed data-driven retention strategies.",
            exp_4_tags_list: `<span class="project-tag">Data Analysis</span><span class="project-tag">Power BI</span><span class="project-tag">Python</span><span class="project-tag">Customer Retention</span>`,
            exp_4_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Data-Driven Retention Campaign】</h4>
                <p style="margin-bottom: 1rem;">This project integrated Python and Microsoft Power BI technologies to process primitive data, visualize it, and perform algorithmic analysis, deeply analyzing the key drivers behind a high 27.49% churn rate on an e-commerce platform.</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Analysis Architecture & Insights】</h4>
                <p style="margin-bottom: 1rem;">Analysis showed that 'total purchases under 3 times' was the primary churn warning signal, with a churn risk 1.68 times that of other groups; meanwhile, short average conversation time (<8.3 minutes) and low Customer Lifetime Value (<322) were also important predictive indicators.</p>
                <p style="margin-bottom: 1rem;">Based on these findings, it is suggested to establish a 7-14 day 'golden period' remarketing mechanism for customers with few purchases, designing exclusive Landing Pages and personalized EDMs, while synchronously optimizing customer service experience to improve customer stickiness and retention from the source.<br><br><a href="files/顧客流失分析.pdf" target="_blank" class="dashboard-btn">View My Work</a></p>
            `,

            exp_5_time: "Dec 2025 – Present",
            exp_5_role: "Social Media User Behavior Analysis & Prediction",
            exp_5_summary: "Built a response prediction model for green marketing posts in the French market.",
            exp_5_tags_list: `<span class="project-tag">Social Media Analytics</span><span class="project-tag">Random Forest</span><span class="project-tag">Survey</span>`,
            exp_5_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Attempting to Quantify Social Sentiment】</h4>
                <p style="margin-bottom: 1rem;">This project aimed to build a response prediction model for green marketing posts in the French market, solving the pain point of difficulty in quantifying and predicting social content performance.</p>
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Execution Strategy & Modeling】</h4>
                <p style="margin-bottom: 1rem;">Combining social science and data science methods, local social user feedback was first collected through structured questionnaires, utilizing the Likert Scale to convert abstract emotional responses into quantifiable feature indicators; secondly, Random Forest and other supervised machine learning algorithms were introduced for training and performance evaluation, fully establishing a data model capable of predicting potential post interaction rates based on user sentiment scores, providing scientific decision-making reference for brands when formulating green content strategies.</p>
                <p style="margin-top: 1rem; color: #888; font-style: italic;">(In progress...)</p>
            `,

            exp_6_role: "Amazon Product Review Sentiment Mining",
            exp_6_time: "Feb 2026",
            exp_6_summary: "Analyzed 20K+ Amazon reviews using Python NLP and Power BI to build an interactive sentiment dashboard.",
            exp_6_tags_list: `<span class="project-tag">Python (NLP)</span><span class="project-tag">Power BI</span><span class="project-tag">Sentiment Analysis</span><span class="project-tag">Pandas</span>`,
            exp_6_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Project Overview】</h4>
                <p style="margin-bottom: 1rem;">In this project, I analyzed more than 20K Amazon product reviews using Python and Power BI. Starting from the raw CSV file, I cleaned the data with pandas and applied a sentiment analysis model to compute polarity scores and sentiment labels (positive, neutral, negative) for each review.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Process & Outcome】</h4>
                <p style="margin-bottom: 1rem;">I then aggregated the results by product to calculate average sentiment, average rating, and review counts, and loaded the processed dataset into Power BI to build an interactive dashboard. The dashboard highlights overall sentiment KPIs, sentiment distribution, a keyword-based word cloud, the top 10 products with the highest sentiment scores, and dynamic slicers for year and rating, enabling users to drill down from high-level trends to individual review texts and uncover actionable customer insights.</p>
                <p style="margin-top: 20px;"><a href="https://github.com/hanssusansu/Amazon-Product-Review-Sentiment-Mining-Project/" target="_blank" class="dashboard-btn">View GitHub Project</a></p>
            `,
            exp_6_imgs: [
                { "src": "files/images/amazon dashboard.png", "caption": "Amazon Product Sentiment Analysis Dashboard" }
            ],

            exp_7_role: "Building Personal Website",
            exp_7_time: "Jan 2026 – Present",
            exp_7_summary: "A personal brand website built from scratch using Google AntiGravity AI environment.",
            exp_7_tags_list: `<span class="project-tag">Web Development</span><span class="project-tag">AI Agent</span><span class="project-tag">Prompt Engineering</span>`,
            exp_7_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Verifying the AI Development Revolution】</h4>
                <p style="margin-bottom: 1rem;">The birth of this project stems from my desire to personally verify a revolution that is taking place. I used Google's latest AI development environment, AntiGravity, to build the personal website you see now from scratch. For me, this is not just to build a space to store my portfolio, but a practical experiment on "Agentic Workflow". I tried to understand how AI, when it is no longer just a passive Q&A machine but an agent that can actively perform tasks, will completely change my past patterns of using tools and my logic for solving problems.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Reflection: From Developer to AI PM】</h4>
                <p style="margin-bottom: 1rem;">In the development process, I did not position myself as a traditional programmer, but turned into the project manager of this AI engineer. I didn't need to type every line of code by hand, nor did I need to memorize tedious syntax. My core work shifted to precise instruction giving and resource control. Just like managing production capacity in a factory, I had to think about how to exchange the fewest dialogue turns for the richest web functions and content within AntiGravity's limited Token quota. Every Prompt is like a standard work order issued to the production line; the more precise the instructions, the higher the yield rate. This made me deeply realize that in the AI era, the ability to "ask the right questions" has long surpassed the ability to "write the answers".</p>
                
                <p style="margin-bottom: 1rem;">Of course, the process was not smooth sailing. When the layout broke or functions reported errors, I did not choose to take over and rewrite it, but insisted on using the built-in AI Agent for debugging. I asked it not only to fix the error but also to explain the cause of the error, letting me understand which part of the syntax logic caused the conflict. Through this cycle of "command and feedback", I not only successfully eliminated problems but also deeply mastered the keys to avoiding future repetition of mistakes. This experience convinced me that future competitiveness lies not in who can write the most perfect code, but in who can command AI to complete the most complex tasks with the clearest logic.</p>
            `,
            exp_7_imgs: [
                // Original exp_6 did not have images, so this will be empty or removed if not needed.
            ],

            exp_8_role: "Paper RAG System Construction",
            exp_8_time: "Feb 2026 – Present",
            exp_8_summary: "Developed a RAG system to solve scientific information overload, enabling natural language QA and automated APA citation generation.",
            exp_8_tags_list: `<span class="project-tag">RAG</span><span class="project-tag">LLM</span><span class="project-tag">Docker</span><span class="project-tag">FastAPI</span><span class="project-tag">OpenSearch</span>`,
            exp_8_detail: `
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Origin: Starting from Family Health Needs】</h4>
                <p style="margin-bottom: 1rem;">Due to family health issues, I began looking for natural adjuvant solutions, hoping to deeply understand the specific scientific evidence of ingredients like "Reishi" (Ganoderma) in immunomodulation or critical care support.</p>
                <p style="margin-bottom: 1rem;">To ensure these choices were safe and effective, I started searching for relevant papers, trying to find answers on PubMed and Google Scholar. However, I found the process full of challenges—facing a massive amount of academic literature, it not only required spending hours searching and downloading PDFs one by one, but the texts were also filled with obscure biomedical terminology, making it difficult for the average person to digest and integrate useful information in a short time.</p>
                <p style="margin-bottom: 2rem;">This pain point of "information access barrier" gave me the idea to make a change. So I developed this RAG (Retrieval-Augmented Generation) system, aiming to bridge the gap between researchers and the general public. Through AI technology, the system can automatically read and understand hundreds of professional journal papers, allowing users to simply ask questions in "natural language" (e.g., "Does Reishi help with chemotherapy side effects?") and receive grounded answers complete with APA citations. This is not just a Q&A bot, but a 24/7 academic research assistant that makes professional knowledge accessible.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【What I Learned】</h4>
                <p style="margin-bottom: 1rem;">This project was a complete End-to-End AI system development experience, allowing me to master full-stack skills from data collection to model deployment:</p>
                
                <ul style="margin-left: 1.5rem; margin-bottom: 1rem; list-style-type: disc;">
                    <li style="margin-bottom: 0.8rem;"><strong>1. Deep RAG Architecture Development</strong><br>
                    Vector Search: Mastered using OpenSearch for large-scale vector storage and retrieval, and implemented Hybrid Search (BM25 + Vector) to improve accuracy.<br>
                    Document Processing: Mastered tools like PyMuPDF to parse complex academic PDF layouts and implemented intelligent chunking strategies to preserve context.<br>
                    LLM Integration: Locally deployed Llama 3 models using Ollama and utilized Prompt Engineering to focus the model on factual answers and avoid hallucinations.</li>
                    
                    <li style="margin-bottom: 0.8rem;"><strong>2. Data Engineering & Crawling</strong><br>
                    Automated Data Pipelines: Designed and implemented Airflow-concept automated crawlers to regularly fetch the latest research from sources like "Reishi News" and automatically download full-text PDFs.<br>
                    Data Cleaning: Processed unstructured data, converting PDFs into machine-readable formats.</li>
                    
                    <li style="margin-bottom: 0.8rem;"><strong>3. Microservices & DevOps</strong><br>
                    Containerization: Containerized PostgreSQL, OpenSearch, Redis, Ollama, and applications using Docker Compose for "one-click startup".<br>
                    System Optimization: Optimized Redis caching strategies and database query performance.</li>
                    
                    <li style="margin-bottom: 0.8rem;"><strong>4. Full-Stack Application Development</strong><br>
                    Backend API: Built high-performance RESTful APIs using FastAPI.<br>
                    Interactive Frontend: Used Gradio to quickly build intuitive Chatbot interfaces and implemented real-time streaming responses.</li>
                </ul>
                <p style="margin-top: 20px;"><a href="https://github.com/hanssusansu/Ganoderma-Paper-RAG-System-" target="_blank" class="dashboard-btn">View GitHub Repository</a></p>
            `,
            exp_8_imgs: [
                { "src": "files/images/rag system flow chart eng.png", "caption": "System Architecture Flowchart" },
                { "src": "files/images/docker screen shot.png", "caption": "Docker Container Runtime Status" },
                { "src": "files/images/rag system apply screen shot.jpg", "caption": "RAG System Interface" }
            ],

            // Images Captions (EN)
            exp_2_imgs: [
                { "src": "files/images/機器學習模型預測結果.png", "caption": "Comparison of Machine Learning Model Prediction Performance" },
                { "src": "files/images/W51 shap summary plot.png", "caption": "SHAP Summary Plot - Cardiology" },
                { "src": "files/images/W51 因子重要性.png", "caption": "Factor Importance Analysis - Cardiology" }
            ],

            skills_title: "Skills",
            skills_summary: "Specialize in the end-to-end data analysis process, from market data collection, data cleaning, and visualization to machine learning modeling and strategic recommendations.",
            skill_cat_1: "Data & AI",
            skill_list_1: `
                <div class="skill-item-pill">Statistical & ML Models</div>
                <div class="skill-item-pill">Python (Pandas, Scikit-learn)</div>
                <div class="skill-item-pill">SQL & Database</div>
                <div class="skill-item-pill">RAG System Development</div>
                <div class="skill-item-pill">Data Visualization</div>
            `,
            skill_cat_2: "Marketing & Business",
            skill_list_2: `
                <div class="skill-item-pill">Customer Segmentation</div>
                <div class="skill-item-pill">Customer Retention & Churn Analysis</div>
                <div class="skill-item-pill">Performance Ads (Google)</div>
                <div class="skill-item-pill">Social Media Analytics</div>
                <div class="skill-item-pill">Consumer Behavior Prediction</div>
            `,
            skill_cat_3: "Tools & Platforms",
            skill_list_3: `
                <div class="skill-item-pill">Power BI</div>
                <div class="skill-item-pill">AntiGravity</div>
                <div class="skill-item-pill">GitHub</div>
                <div class="skill-item-pill">NotebookLM</div>
                <div class="skill-item-pill">Gemini</div>
            `,

            hint_text: "(Click for more info)",

            contact_title: "Contact Me",
            contact_btn: "Email",

            about_btn: "About Me",
            about_desc: `
                <p style="margin-bottom: 2rem;">Hello, I am Tzu-Heng Su. My personality is defined by a balance of steady analysis and active exploration. I am accustomed to thinking deeply to clarify the essence of problems, but I am equally happy to embrace the unknown.</p>

                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Cross-Disciplinary Academic Background】</h4>
                <p style="margin-bottom: 1rem;">This curiosity led me to build a diverse academic background. I started with Logistics Management in Taiwan, moved into Finance to understand capital valuation, and finally studied Digital Marketing Management in France to grasp market dynamics.</p>
                
                <p style="margin-bottom: 1.5rem;">I aspire to be a multifaceted talent who can combine process efficiency, financial logic, and consumer insights. By speaking the language of data, I hope to assist enterprises in making precise and strategic decisions.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【AI-Driven Problem-Solving Mindset】</h4>
                <p style="margin-bottom: 1.5rem;">I firmly believe that the value of technology lies in solving real-world problems. Therefore, I actively learn and apply various AI open-source platforms, from Google AntiGravity, NotebookLM to Gemini, flexibly utilizing AI Agent and Prompt Engineering techniques to optimize workflows. Whether it's automating content generation, building RAG retrieval systems, or developing data analysis tools, I leverage AI implementation capabilities to rapidly transform ideas into executable solutions. This "AI-first" mindset enables me to stay ahead of the curve and maintain a competitive edge in the fields of digital marketing and data analysis.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Passion for Challenge & Life】</h4>
                <p style="margin-bottom: 1rem;">My adaptability extends beyond the classroom. As a solo traveler who has explored France extensively, I have learned to solve problems independently and navigate unfamiliar environments with confidence. Whether I am facing a strange city or a complex data project, I believe that staying open and continuously learning is the key to finding the best solution.</p>
            `,

            view_details_btn: "View Details",

            cert_title: "Certificates & Proof of Ability",

            cert_subtitle_prof: "Professional Certificates",
            cert_1_name: "Production Management Certificate",
            cert_1_detail: "Chinese Institute of Industrial Engineers (CIIE)<br><span class=\"cert-date\">July 2022</span>",
            cert_2_name: "ESG Literacy Certificate (Professional & Advanced)",
            cert_2_detail: "IPOE<br><span class=\"cert-date\">Dec 2023</span>",
            cert_3_name: "Net Zero Planning Manager",
            cert_3_detail: "Industrial Development Administration (IPAS)<br><span class=\"cert-date\">Dec 2024</span><br><a href=\"files/淨零.pdf\" target=\"_blank\" class=\"custom-btn\">View Certificate</a>",
            cert_4_name: "AI Application Planning Manager",
            cert_4_detail: "Industrial Development Administration (IPAS)<br><span class=\"cert-date\">May 2025</span><br><a href=\"files/ai應用規劃.pdf\" target=\"_blank\" class=\"custom-btn\">View Certificate</a>",
            cert_google_name: "Google AI-Powered Performance Ads Certification",
            cert_google_detail: "Google<br><span class=\"cert-date\">Aug 2025</span>",
            cert_hubspot_name: "Social Media Certified",
            cert_hubspot_detail: "HubSpot Academy<br><span class=\"cert-date\">Aug 2025</span>",

            cert_subtitle_lang: "Language Proficiency",
            cert_5_name: "TOEIC",
            cert_5_detail: "Score: 810<br><span class=\"cert-date\">Dec 2024</span><br><a href=\"files/toeic.pdf\" target=\"_blank\" class=\"custom-btn\">View Certificate</a>",

            cert_subtitle_course: "Courses",
            cert_6_name: "Udemy Power BI Certificate Prep Course",
            cert_6_detail: "Udemy<br><span class=\"cert-date\">Jan 2026</span>",

            view_cert_btn: "View Certificate",

            resume_btn: "Download CV",

            intern_title: "Internship Experience",
            intern_1_title: "Golden Corporation Sdn Bhd | Plant Intern",
            intern_1_time: "Jul 2023 - Aug 2023",
            intern_1_desc: "Rotated through storage, production, quality control, and aquaculture, assisting in process optimization and basic reporting.",

            intern1role: "Golden Corporation Sdn Bhd | Plant Intern",
            intern1detail: `
                <p style="margin-bottom: 1rem;">In the summer between my junior and senior years, to step out of my comfort zone, I chose to go to Brunei for an internship. I have always liked to try boldly and also liked to take a life path different from others. At the same time, I also wanted to step out of the textbooks and see with my own eyes what the difference is between what I learned and actual operations.</p>
                
                <p style="margin-bottom: 1rem;">My internship period was from July 1, 2023 to August 31, 2023. The position was Plant Intern, and the internship location was Golden Corporation Sdn Bhd in Brunei.</p>
                <p style="margin-bottom: 2rem;">The design of this internship was not to fix me in a single position, but to let me rotate through various workstations, including warehousing, production lines, quality control laboratories, shrimp farms, and logistics areas. When I walked through these stations, I realized that a factory is not supported by a certain department alone, but is more like a web that affects each other.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Warehousing】</h4>
                <p style="margin-bottom: 1.5rem;">Warehousing is like the starting point. I started to care about how materials are placed, how they are found, and how they match subsequent needs. That is a very simple sense of order, but it is also the basic skill that is most easily overlooked, because as long as the starting point is messy, every subsequent step takes more effort to pull it back.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Production Line】</h4>
                <p style="margin-bottom: 1.5rem;">The production line is like the rhythm itself. I saw how standardization makes daily output more consistent, and also saw how the site uses experience to fill in the corners not written in the standards. At that moment, I understood that the process does not run itself just because it is written on paper. It relies on people to guard it, rely on people to pick it up, and rely on people to make every handover clearer.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【QC Lab】</h4>
                <p style="margin-bottom: 1.5rem;">Walking into the quality control laboratory, the feeling was different again. There, quality is a language that must be recorded, judged, and communicated. I began to understand that the site and the laboratory are actually talking about the same thing, just standing in different positions and using different ways to make things go in a more stable direction.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Farms & Logistics】</h4>
                <p style="margin-bottom: 1.5rem;">The shrimp farm let me see the reality at the front end. Many things do not happen ideally just by pressing a button. The logistics area is like gathering all efforts into one delivery. Going out and delivering steadily counts as completing the responsibility. After the rotation, I could understand better that the reason why the factory works is because every department is willing to explain information clearly and take responsibility in their own position.</p>
                
                <h4 style="color:#E6AF2E; margin-bottom:0.5rem;">【Summary】</h4>
                <p style="margin-bottom: 1rem;">This internship is hard to quantify because it is more like learning to throw myself into the system. What I took away was not beautiful numbers, but a way of seeing things, moving from single-point work to understanding the entire process, and from personal tasks to the rhythm of cross-departmental collaboration.</p>
                <p style="margin-bottom: 1rem;">Also because of this experience, I am more certain that what I yearn for is not to lock my life in a safe range. What I pursue is not being different itself, but being willing to put myself into the real world, walk into unfamiliar fields, admit the existence of gaps, and use a more humble and practical way to fill up the required professionalism bit by bit.</p>
            `,

            intern_1_imgs: [
                { "src": "files/images/golden1.JPG", "caption": "Photo with the Boss~" },
                { "src": "files/images/golden2.JPG", "caption": "Photo with Staff~" },
                { "src": "files/images/golden3.JPG", "caption": "Experiencing the QC Station~" }
            ],

            exp_4_imgs: [
                { "src": "files/images/churned rate dashboard1.png", "caption": "Customer Churn Rate Analysis Dashboard 1" },
                { "src": "files/images/churned rate dashboard2.png", "caption": "Customer Churn Rate Analysis Dashboard 2" }
            ],

            exp_6_imgs: [
                { "src": "files/images/amazon dashboard.png", "caption": "Amazon Sentiment Analysis Dashboard" }
            ],

            exp_8_imgs: [
                { "src": "files/images/rag system flow chart eng.png", "caption": "System Architecture Flowchart" },
                { "src": "files/images/docker screen shot.png", "caption": "Docker Container Runtime Status" },
                { "src": "files/images/rag system apply screen shot.jpg", "caption": "RAG System Interface" }
            ]
        }
    };

    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key] != null) {
                // Use innerHTML to handle HTML content (e.g., skill lists, detailed project info)
                el.innerHTML = translations[lang][key];
            }
        });

        // Update descriptions and image lists stored in attributes
        document.querySelectorAll('.skill-tag, .interactive-item, .about-btn, .job-item').forEach(item => {
            const descKey = item.getAttribute('data-desc-key');
            if (descKey && translations[lang] && translations[lang][descKey] != null) {
                item.setAttribute('data-desc', translations[lang][descKey]);
            }
            const imagesKey = item.getAttribute('data-images-key');
            if (imagesKey && translations[lang] && translations[lang][imagesKey]) {
                item.setAttribute('data-images', JSON.stringify(translations[lang][imagesKey]));
            }
        });
    }

    // Modal click handler update (dynamic content)
    function openModalForItem(item) {
        let title = item.textContent.trim();
        // Adjust title extraction for complex items
        const h3 = item.querySelector('h3');
        if (h3) title = h3.textContent.trim();
        // Special case for 'About Me' button which has no h3
        if (item.classList.contains('about-btn')) {
            title = translations[currentLang]['about_btn']; // Use translated title
        }

        // NEW LOGIC: Look up directly from translations object to ensure HTML is preserved
        const descKey = item.getAttribute('data-desc-key');
        let desc = '';
        if (descKey && translations[currentLang] && translations[currentLang][descKey]) {
            desc = translations[currentLang][descKey];
        } else {
            desc = item.getAttribute('data-desc') || '';
        }

        modalTitle.textContent = title;
        modalDesc.innerHTML = desc;

        modalImagesContainer.innerHTML = '';
        const imagesData = item.getAttribute('data-images');
        if (imagesData) {
            try {
                const images = JSON.parse(imagesData);
                images.forEach(imgData => {
                    const imageItem = document.createElement('div');
                    imageItem.className = 'modal-image-item';

                    const img = document.createElement('img');
                    img.src = imgData.src;
                    img.alt = imgData.caption || '';

                    const caption = document.createElement('p');
                    caption.className = 'modal-image-caption';
                    caption.textContent = imgData.caption || '';

                    imageItem.appendChild(img);
                    imageItem.appendChild(caption);
                    modalImagesContainer.appendChild(imageItem);
                });
            } catch (e) {
                console.error('Error parsing images data:', e);
            }
        }
        modal.classList.add('active');
    }

    // Modal click handler update (dynamic content)
    document.querySelectorAll('.skill-tag, .interactive-item, .about-btn').forEach(item => {
        item.addEventListener('click', () => {
            openModalForItem(item);
        });
    });

    // View Details Button Handler
    document.querySelectorAll('.view-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const item = btn.closest('.job-item');
            if (item) {
                openModalForItem(item);
            }
        });
    });

    // Hamburger Logic (Existing)
    if (hamburgerBtn && sideNav) {
        hamburgerBtn.addEventListener('click', () => {
            hamburgerBtn.classList.toggle('active');
            sideNav.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!hamburgerBtn.contains(e.target) && !sideNav.contains(e.target)) {
                hamburgerBtn.classList.remove('active');
                sideNav.classList.remove('active');
            }
        });
    }

    // Lang Switch Logic - ONLY EN
    updateLanguage(currentLang);

    // ==========================================
    // 5. HTML Custom Cursor & Real Animations
    // ==========================================

    // Create cursor element
    const cursor = document.createElement('div');
    cursor.id = 'custom-cursor';
    document.body.appendChild(cursor);

    // Track movement
    // Halo is 40x40, center is 20,20
    document.addEventListener('mousemove', (e) => {
        const offset = 20;

        cursor.style.setProperty('--x', (e.clientX - offset) + 'px');
        cursor.style.setProperty('--y', (e.clientY - offset) + 'px');

        // Apply basic transform for idle state if not animating
        if (!cursor.classList.contains('clicking')) {
            cursor.style.transform = `translate(${e.clientX - offset}px, ${e.clientY - offset}px)`;
        }
    });

    document.addEventListener('mousedown', (e) => {
        if (e.button === 0) {
            // Trigger Click/Poke Animation
            cursor.classList.remove('clicking');
            void cursor.offsetWidth; // trigger reflow
            cursor.classList.add('clicking');

            // Trigger Data Ripple
            createDataRipple(e.clientX, e.clientY);
        }
    });

    // Clean up animation class
    cursor.addEventListener('animationend', () => {
        cursor.classList.remove('clicking');
    });

    function createDataRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.classList.add('data-ripple');
        // Position handled by CSS transform translate(-50%, -50%) combined with top/left
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        document.body.appendChild(ripple);

        setTimeout(() => {
            if (ripple.parentNode) ripple.remove();
        }, 600); // Match animation duration
    }


});
