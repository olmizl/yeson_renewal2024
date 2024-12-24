$(document).ready(function () {
    AOS.init();

    
});


$(function () {

    // Lenis 객체 생성
    const lenis = new Lenis({
        // duration: 1.5,
        smoothWheel: true,
        smoothTouch: true,
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    
    lenis.easing = 'cubic-bezier(0.25, 0.8, 0.25, 1)';
    
    function raf(time) {
        lenis.raf(time); 
        requestAnimationFrame(raf); 
    }
    
    requestAnimationFrame(function(time) {
        raf(time); 
    });


    $("textarea").on("wheel touchmove", function (e) {
        const $this = $(this);
        const scrollTop = $this.scrollTop(); 
        const scrollHeight = $this.prop("scrollHeight"); 
        const clientHeight = $this.innerHeight();
    
        // 스크롤 가능한 상태인지 확인
        const isScrollable = scrollHeight > clientHeight;
    
        // 스크롤 가능한 상태에서 상단/하단에 도달했는지 확인
        const atTop = scrollTop === 0 && e.originalEvent.deltaY < 0;
        const atBottom = scrollTop + clientHeight >= scrollHeight && e.originalEvent.deltaY > 0;
    
        if (isScrollable && !(atTop || atBottom)) {
            // Lenis 이벤트 전파 차단
            e.stopPropagation();
        }
    });

    function devideword(dvword, dvtime,dway) {
        $(dvword).each(function() {
            let originalText = $(this).text();
            let newHTML = "";
            let count = 0;
            for (let i = 0; i < originalText.length; i++) {
                let is = i / dvtime;
                if (originalText[i] !== " ") {
                    newHTML += "<span class='ix char" + count + "' style='" + dway + "-delay:" + is + "s'>" + originalText[i] + "</span>";
                    count++;
                } else {
                    newHTML += " ";
                }
            }
            $(this).html(newHTML);
        });
    }
    devideword(".contact_btn .bubble_text p ", 20 , 'animation');
    devideword(".sec05_inquiry .inquiry_form button p , .portfolio_detail .value_box .big , .contact_btn .btn_call p , .contact_wrap .subtitle .call a:nth-child(1) p , .history_modal .modal_con .left p span , .people_info .info_txt .txt01 p b , .how_to_apply .apply_box ul li .cont p", 10, 'animation');
    
    function devideword_alldelay(dvword, dvtime, dway) {
        let count = 0; 
        $(dvword).each(function() {
            let originalText = $(this).text();
            let newHTML = "";
            for (let i = 0; i < originalText.length; i++) {
                let delay = count / dvtime; 
                if (originalText[i] !== " ") {
                    newHTML += "<span class='ix char" + count + "' style='" + dway + "-delay:" + delay + "s'>" + originalText[i] + "</span>";
                    count++;
                } else {
                    newHTML += " ";
                }
            }
            $(this).html(newHTML);
        });
    }
    
    devideword_alldelay(".map_top div p:nth-child(1), .map_top div p:nth-child(3)", 20, 'animation');

    
    function delay_animation(contents, time) {
        $(contents).each(function(index) {
            $(this).css('animation-delay', (index * time) + 's ');
        });
    }
    delay_animation(".sec01_cont .box03 .cardcon .cardbox svg path , .portfolio_list .small_list .all li", 0.1);

    function visible_script(classname, selector) {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // entry의 target으로 DOM에 접근합니다.
                const $target = entry.target;
                // 화면에 노출 상태에 따라 해당 엘리먼트의 class를 컨트롤 합니다.
                if (entry.isIntersecting) {
                    $target.classList.add(classname);
                } else {
                    $target.classList.remove(classname);
                };
            });
        });
        // 옵저버할 대상 DOM을 선택하여 관찰을 시작합니다.
        const $items = document.querySelectorAll(selector);
        $items.forEach((item) => {
            io.observe(item);
        });
    }
    visible_script("section_vis", "section");
    
    function layout_script() {
     
        // sitemap 사진교체
        $('.sitemap_wrap .box .left .list li').on('mouseenter focus', function () {
            let nav_num = $(this).data('nav');
            $('.sitemap_wrap .box .left .list').attr("class", "list " + nav_num);
        });

        $('.sitemap_wrap .box .left .list li').on('mouseleave blur', function () {
            $('.sitemap_wrap .box .left .list').attr("class", "list ");
        });


        // sitemap open
        let isLenisStopped = false;

        $('.sitemap_btn').on('click', function () {
            $('.header_wrap').toggleClass('siteopen');  
            $('body').toggleClass('scrollno');
            if (isLenisStopped) {
                lenis.start();  
                isLenisStopped = false;
              } else {
                lenis.stop();  
                isLenisStopped = true;
              }
        })

        //history modal
        let history_m_open = $('.history_list .history_slide')
        let history_m_close = $('.history_modal .bg ,.history_modal .modal_con button');
        let history_m = $('.history_modal');

        history_m_open.on('click', function () {
            let img_data = $(this).find('img').attr('src');
            let year_data = $(this).data('year');
            let name01_data = $(this).data('name01');
            let name02_data = $(this).data('name02');
            let website_data = $(this).data('website');

            $('.history_modal .modal_con figure img').attr('src',img_data)
            $('.history_modal .modal_con .year').text(year_data)
            $('.history_modal .modal_con .left p .t01 , .history_modal .modal_con .left p .t02').text(name01_data)
            $('.history_modal .modal_con .left em').text(name02_data)
            if (!/^https?:\/\//.test(website_data)) {website_data = 'http://' + website_data;}
            $('.history_modal .modal_con .tt_box > a').attr('href', website_data)

            function devideword(dvword, dvtime,dway) {
                $(dvword).each(function() {
                    let originalText = $(this).text();
                    let newHTML = "";
                    let count = 0;
                    for (let i = 0; i < originalText.length; i++) {
                        let is = i / dvtime;
                        if (originalText[i] !== " ") {
                            newHTML += "<span class='ix char" + count + "' style='" + dway + "-delay:" + is + "s'>" + originalText[i] + "</span>";
                            count++;
                        } else {
                            newHTML += " ";
                        }
                    }
                    $(this).html(newHTML);
                });
            }
            devideword(".history_modal .modal_con .left p span ", 10, 'animation');

            history_m.show();
            if (isLenisStopped) {
                lenis.start();  
                isLenisStopped = false;
            } else {
                lenis.stop();  
                isLenisStopped = true;
            }
        })
        history_m_close.on('click', function () {
            history_m.hide();
            if (isLenisStopped) {
                lenis.start();  
                isLenisStopped = false;
            } else {
                lenis.stop();  
                isLenisStopped = true;
            }
        })

        //main 하단 bar 
        $('.quickmenu ul li').on('mouseenter focus', function () {
            let quickmenu_li_left = $(this).offset().left;
            let qm_green = $('.quickmenu ul li.greenbar');
            qm_green.offset({left: quickmenu_li_left });
        })

        //footer 
        $(".footer_som figure figcaption").on("mousemove", function(e) {
            const footer_som = $('.footer_som figure img')
            const footer_x = ( e.pageX - $(this).offset().left - 70 ) * 0.5;
            const footer_y = ( e.pageY - $(this).offset().top - 70 ) * 0.5;
            gsap.to(footer_som, {
                duration: 1,
                transform: `translate(${footer_x}px, ${footer_y}px)`
            });
        });

        $(".footer_som figure").on("mouseleave blur", function (e) {
            const footer_som = $('.footer_som figure img')
            gsap.to(footer_som, {
                duration: 1,
                transform: 'translate(0px, 0px)'
            });
        });

        //문의하고 싶어요!
        $(".contact_btn .contact_btn_wrap a").on("mousemove", function(e) {
            const contact_btn_svg = $('.contact_btn .contact_btn_wrap a svg');

            const cbsvg_x = ( e.pageX - $(this).offset().left - 15 ) * 0.15;
            const cbsvg_y = ( e.pageY - $(this).offset().top - 16 ) * 0.15;
            gsap.to(contact_btn_svg, {
                duration: 0.3,
                transform: `translate(${cbsvg_x}px, ${cbsvg_y}px)`
            });
        });

        $(".contact_btn .contact_btn_wrap a").on("mouseleave blur", function (e) {
            const contact_btn_svg = $('.contact_btn .contact_btn_wrap a svg')
            gsap.to(contact_btn_svg, {
                duration: 1,
                transform: 'translate(0px, 0px)'
            });
        });


        //quick menu 나오기
        $('.contact_btn .contact_btn_wrap a , .main_visual .btm_text .text_wrap b , .sitemap_wrap .box .left_txt a:nth-child(2)').on('click', function () {
            $('.contact_btn .contact_btn_info').addClass('show');
        })
        $('.contact_btn .info_wrap .btn_close').on('click', function () {
            $('.contact_btn .contact_btn_info').removeClass('show');
        })

        //privacy modal
        let privacy_open = $('.sec05_inquiry .inquiry_chk .privacy_txt , .footer_btns .btn_privacy , .contact_btn .contact_check p , .contact_form .inquiry_chk .privacy_txt ');

        privacy_open.on('click', function () {
            window.open('privacy.html');
        })

        
    }
    layout_script();

    function getExHeight() {
        const screenWidth = window.innerWidth;
        
        if (screenWidth <= 360) {
            return 36; 
        } else if (screenWidth <= 400) {
            return 44; 
        } else if (screenWidth <= 480) {
            return 50; 
        } else if (screenWidth <= 550) {
            return 60; 
        } else if (screenWidth <= 640) {
            return 72; 
        } else if (screenWidth <= 1024) {
            return 50; 
        } else if (screenWidth <= 1280) {
            return 60; 
        } else {
            return 72 ;  
        }
    }

    function sitemap_text_cube() {
        function nexttext(text, element) {
            const ex = $(element);
            if (ex.data("animating")) return; 
        
            let ex_height = getExHeight();
            const ex_text = ex.text();
            const ex_plus = text;
        
            ex.data("animating", true).css("height", ex_height + "px");
        
            // 기존 텍스트 요소
            const ex01 = $("<div></div>")
                .css("transform-origin", `0 ${ex_height / 2}px -${ex_height / 2}px`)
                .addClass("t3xt")
                .text(ex_text);
        
            // 새 텍스트 요소
            const ex02 = ex01.clone().text(ex_plus);
            ex.empty().append(ex01).append(ex02);
        
            ex01.addClass("cube_out");
            ex02.addClass("cube_in");
        
            ex02.on("animationend", function () {
                ex.empty().text(ex_plus).data("animating", false);
            });
        }
        
        $('.sitemap_wrap .box .left .list p').on('mouseenter focus', function () {
            let data_t3xt = $(this).data('t3xt');
            nexttext(data_t3xt, this); 
        });

        $(window).on('resize', function() {
            $('.sitemap_wrap .box .left .list p').each(function() {
                const ex_height = getExHeight(); 
                $(this).css("height", ex_height); 
            });
        });
    }
    sitemap_text_cube();

    function section02() {

        // section02 swiper
        var carousel = $(".carousel"),
            slides = $(".carousel .item"), // 슬라이드들
            totalSlides = 10, // 전체 슬라이드 수
            currdeg = 0;

        $(".sec02_swiper .next").on("click", { d: "n" }, rotate);
        $(".sec02_swiper .prev").on("click", { d: "p" }, rotate);

        $('.sec02_swiper .prev , .sec02_swiper .next').on('click', function () {
            $('.sec02_slide').addClass('rotate');
            setTimeout(() => {
                $('.sec02_slide').removeClass('rotate');
            }, 800); 
            
        })

        function rotate(e) {
            if (e.data.d == "n") {
                currdeg = currdeg - 36;
            }
            if (e.data.d == "p") {
                currdeg = currdeg + 36;
            }

            // 회전 적용
            carousel.css({
                "-webkit-transform": "rotateY(" + currdeg + "deg)",
                "-moz-transform": "rotateY(" + currdeg + "deg)",
                "-o-transform": "rotateY(" + currdeg + "deg)",
                "transform": "rotateY(" + currdeg + "deg)"
            });

            // 현재 중앙 슬라이드 확인
            findCenterSlide();
        }

        function findCenterSlide() {
            // 중앙 슬라이드의 인덱스 계산
            let normalizedDeg = (360 + currdeg % 360) % 360;
            let centerIndex = Math.round(normalizedDeg / 36) % totalSlides;
            let reversedIndex = (totalSlides - centerIndex) % totalSlides;
            let slide_data = slides.eq(reversedIndex).data('currdeg');
            let slide_data02 = slides.eq(reversedIndex).data('currdeg02');
            $('.sec02_swiper .hover_text strong').text(slide_data)
            $('.sec02_swiper .hover_text .info').text(slide_data02)
            slides.eq(reversedIndex).addClass('active').siblings().removeClass('active'); 
            const video = slides.eq(reversedIndex).find('video')[0];
            if (video) {
                video.play();
            } 
        }

        //section02 moreview
        $('.sec02_moreview ul , .notice_list .lists .moreview .btns').on('mouseenter focus', function () {
            $(this).addClass('hover')
        })
        $('.sec02_moreview ul , .notice_list .lists .moreview .btns').on('mouseleave blur', function () {
            $(this).removeClass('hover')
        })

        $('.sec02_slide .item').each(function () {
            if ($(this).hasClass('active')) {
                const video = $(this).find('video')[0];
                if (video) {
                    video.play();
                }
            } 
        });

        $('.sec02_slide .item').on('mouseenter focus', function () {
            let video_move = $(this).find('video')[0];
            if (video_move) {
                video_move.pause();
            } 
        })

        $('.sec02_slide .item').on('mouseleave blur', function () {
            let video_move = $(this).find('video')[0];
            if (video_move) {
                video_move.play();
            } 
        })

        //section 02 projects 크기 구하기
        // 현재 요소의 화면 크기 가져오기
        if (document.querySelector(".sec02_slide")) {

            function calculateTransformedSize() {
                const project_item_size = document.querySelector('.sec02_slide .item.active');
                const hover_text = document.querySelector('.sec02_swiper .hover_text');
                
                if (project_item_size && hover_text) {
                    const { width, height } = project_item_size.getBoundingClientRect();
                    hover_text.style.width = `${width}px`;
                    hover_text.style.height = `${height}px`;
                }
    
                // 애니메이션 프레임마다 크기 계산
                requestAnimationFrame(calculateTransformedSize);
            }
    
            // MutationObserver로 active 클래스 변경 감지
            new MutationObserver(calculateTransformedSize).observe(document.querySelector('.sec02_slide'), {
                childList: true,   // 자식 요소의 변화 감지
                subtree: true,     // 전체 트리에서 감지
                attributes: true,  // 속성 변경 감지
            });
    
            // 초기 크기 계산
            requestAnimationFrame(calculateTransformedSize);
        }
                

    }
    section02();

    function section04() {
        
        //notice typing effect

        var typingBool = false; 
        var typingIdx = 0; 
        var liIndex = 0;
        var liLength = $(".typing_txt>ul>li").length;

        var typingTxt = $(".typing_txt>ul>li").eq(liIndex).text(); 
        typingTxt = Array.from(typingTxt);
        if(typingBool==false){ 
            typingBool=true; 
            var tyInt = setInterval(typing,100); 
        } 
            
        function typing(){ 
            if(typingIdx < typingTxt.length){
                $(".typing_cursor").append(typingTxt[typingIdx]);  
                typingIdx++; 
            } else{ 
                if(liIndex>=liLength-1){
                    liIndex=0;
                }else{
                    liIndex++; 
            }
            
            typingIdx=0;
            typingBool = false; 
            typingTxt = $(".typing_txt>ul>li").eq(liIndex).text(); 
            typingTxt = Array.from(typingTxt);
            
            clearInterval(tyInt);
            setTimeout(function(){
                $(".typing_cursor").html('');
                tyInt = setInterval(typing,150);
                },2000);
            } 
        }  

        //notice swiepr
        const swiper = new Swiper('.sec04_talk .talk_list', {
            slidesPerView : 3.5,
            spaceBetween: 40, 
            breakpoints: {
                0: {
                  slidesPerView: 1.2,
                  spaceBetween: 20,
                },
                480: {
                  slidesPerView: 1.5,
                  spaceBetween: 30,
                },
                1279: {
                  slidesPerView: 3.5,  //브라우저가 1024보다 클 때
                  spaceBetween: 40,
                },
              },
            
        })

        //sec04_thumb up
        $('.sec04_talk .thumb_button').on('click', function () {
            $(this).removeClass('ani');
            setTimeout(() => {
                $(this).addClass('ani');
            }, 1);
        });
        


    }
    section04();

    function section05() {
        
        let form_box = $('.sec05_inquiry .inputbox input, .contact_form .form_box label input[type="text"]');

        form_box.on('focusin', function () {
            $(this).next('.placeholder').addClass('active');
        });
          
        form_box.on('focusout', function () {
            if (!this.value) {
                $(this).next('.placeholder').removeClass('active');
            }
        });

        $('.sec05_inquiry .placeholder').on('click', function () {
            $(this).prev('input').focus();
        });

        // footer 나오기
        $(window).on("scroll", function() {
            const lastcon = $(".page_end")[0];
            const lastcon_bottom = lastcon.getBoundingClientRect().bottom;
            const windowHeight = $(window).height();
            
            //bottom content가 보이면
            if (lastcon_bottom <= windowHeight ) {
                $('.quickmenu').hide();
                $('.contact_btn').hide();
                $('.contact_btn .contact_btn_info').removeClass('show');
            } else {
                $('.quickmenu').show();
                $('.contact_btn').show();
            }
            
          });
          
    }
    section05();

    function cursor() {
        const $cursor = $(".custom_cursor");

        $(document).on("mousemove", function (e) {
            const top = e.clientY; 
            const left = e.clientX;
          
            $cursor.css({
              top: top + "px",
              left: left + "px",
            });
          
        });
      
        $(".sec02_slide .carousel").on("mouseenter", ".item.active", function () {
            $cursor.removeClass("ver02").addClass("ver01");
        });
          
        $(".sec02_slide .carousel").on("mouseleave", ".item.active", function () {
            $cursor.removeClass("ver01");
        });
        
        $(".motion").on("mouseenter", function () {
          $cursor.removeClass("ver01").addClass("ver02");
        });
      
        $(".motion").on("mouseleave", function () {
          $cursor.removeClass("ver02");
        });
    }
    cursor();



})