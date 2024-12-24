$(function () {
    function portfolio() {

        //portfolio 프로젝트명 검색
        let form_box = $('.portfolio_list .top .search_wrap label input');

        form_box.on('focusin', function () {
            $(this).prev('.input_hold').addClass('active');
        });
          
        form_box.on('focusout', function () {
            if (!this.value) {
                $(this).prev('.input_hold').removeClass('active');
            }
        });

        //portfolio 리스트 클릭 filter
        $('.portfolio_wrap .filter_category .filter').on('click', function () {
            let pf_data_filter = $(this).data('pffilter');
            let $noList = $('.nolist');
            let pf_filter_list = $('.portfolio_list .small_list li , .portfolio_list .big_list .lists li');

            $(this).addClass('clk').siblings().removeClass('clk')

            pf_filter_list.each(function () {
                $(this).css('display', 'none');
                let category = $(this).data('category');
                if (pf_data_filter === 'all' || category === pf_data_filter) {
                    $(this).css('display', 'block');
                }
            });

            const lists = $('.portfolio_list .big_list .lists');

            lists.removeClass('act');
            setTimeout(() => {
                lists.addClass('act');
            }, 0);
            

            let visibleItems = $('.portfolio_list .small_list li:visible, .portfolio_list .big_list .lists li:visible');
            if (visibleItems.length === 0) {
                $noList.show();
                $('.portfolio_list .btn_more').hide();
            } else {
                $noList.hide();
                $('.portfolio_list .btn_more').show();
            }

            
        });

        //portfolio 하단 LIKES 버튼
        $(".portfolio_detail .pf_btns .like_btn").click(function () {
            let count_reset = $(".portfolio_detail .up_count");
            let count_reset_num = parseInt(count_reset.text().replace(/,/g, ""), 10);
            count_reset_num += 1;
            const like_num = count_reset_num.toLocaleString();
            count_reset.text(like_num);


            $(this).removeClass('act');
            setTimeout(() => {
                $(this).addClass('act');
            }, 0);
        });

        //portfolio 배열 
        $('.portfolio_list .array .array_9').on('click', function () {
            $('.portfolio_list .small_list').addClass('ver01').removeClass('ver02')
        });
        $('.portfolio_list .array .array_15').on('click', function () {
            $('.portfolio_list .small_list').addClass('ver02').removeClass('ver01')
        });

        //포트폴리오 최신등록순
        $('.select_text').on('click', function () {
            $('.box_select').toggleClass('clk');
            $('.box_select ul').stop().slideToggle(200);
        });
        
        $('.box_select').on('mouseleave blur', function () {
            $('.box_select').removeClass('clk');
            $('.box_select ul').stop().slideUp(200);
        })

        $('.box_select ul li').on('click', function () {
            let src_p = $(this).find('p').text();
            $('.box_select .select_text p').text(src_p);
            $('.box_select').removeClass('clk');
            $('.box_select ul').stop().slideUp(200);
        })

        //portfolio thumb up
        $('.portfolio_list .big_list .box .thumb_button , .notice_list .lists figcaption .thumb_button').on('click', function () {
            $(this).removeClass('ani');
            setTimeout(() => {
                $(this).addClass('ani');
            }, 1);
        });
    }
    portfolio();

    function recruit() {
        
        var idx = 0; 
		setInterval(time, 2500); 
		function time(){ 
			var infodata_li = $('.how_to_apply .apply_box ul li');
			infodata_li.removeClass('now'); 
			infodata_li.eq(idx).addClass('now'); 
			idx++;
			if(idx >= infodata_li.length) idx= 0;
		}
    }
    recruit();

    function contact() {
        
        $("#attach1").on("change", function () {
            let fileName02 = $(this).val().split("\\").pop();
            $(".file_name").text(fileName02 || "선택된 파일 없음");
        });

        //글자수 체크
        $("#inquire_text").each(function () {
            let text = $(this).val();
    
            if (text.length == 0 || text == '') {
                $('.inquire_text .textarea_count').text("0");
            } else {
                $('.inquire_text .textarea_count').text(text.length);
            }
        });
        
        $("#inquire_text").keyup(function (e) {
            let text = $(this).val();
    
            if (text.length == 0 || text == '') {
                $('.inquire_text .textarea_count').text("0");
            } else {
                $('.inquire_text .textarea_count').text(text.length);
            }
        })

        //선택사항 접어놓기
        $('.contact_form .form_select .form_tit').on('click', function () {
            $('.contact_form .form_select .form_div').stop().slideToggle(300);
            $('.contact_form .form_select').toggleClass('open');
        })
    }
    contact();

    function about() {

        $('.history_list .history_slide').each(function(index) {
            const totalSlides = $('.history_list .history_slide').length;
            $(this).css('z-index', totalSlides - index); // 앞쪽 슬라이드일수록 z-index가 높아짐
          });
          

        //magizine class 추가
        const classList = ["ver02", "ver03", "ver04", "ver05", "ver01"];
        let currentIndex = 0;
    
        setInterval(() => {
            $(".magazine_box").removeClass(classList.join(" "));
    
            $(".magazine_box").addClass(classList[currentIndex]);
    
            currentIndex = (currentIndex + 1) % classList.length;
        }, 5000);

        const magazine_name = "active"; // 추가할 클래스 이름

        setInterval(() => {
            let magazine_box = $(".magazine_box");
        
            magazine_box.addClass(magazine_name);
            setTimeout(() => magazine_box.removeClass(magazine_name), 4900);
        }, 5000);
        

        //calendar 입력
        let today = new Date();
        let today_year = today.getFullYear();
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let today_month = months[today.getMonth()];
        let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        let today_date = weekdays[today.getDay()];
        let dayToday = today.getDate();
        
        $('.map_inner_box .cont01 .ca_box01 .mid .month').text(today_month)
        $('.map_inner_box .cont01 .ca_box01 .mid .year').text(today_year)
        $('.map_inner_box .cont01 .ca_box01 .mid .day').text(today_date)
        $('.map_inner_box .cont01 .ca_box01 .date_big').text(dayToday)


        //calendar 두번째 달력      

        function buildCalendar() {

            let date = new Date();
            
            nowYear = today.getFullYear();
            nowMonth = today.getMonth();
            firstDate = new Date(nowYear, nowMonth, 1).getDate();
            firstDay = new Date(nowYear, nowMonth, 1).getDay(); //1st의 요일
            lastDate = new Date(nowYear, nowMonth + 1, 0).getDate();

            if ((nowYear % 4 === 0 && nowYear % 100 !== 0) || nowYear % 400 === 0) { //윤년 적용
                lastDate[1] = 29;
            }

            const monthNames = [
                "JANUMARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
            ];
            
            // 월 이름 출력
            $(".year_mon").text(monthNames[nowMonth]);

            for (i = 0; i < firstDay; i++) { //첫번째 줄 빈칸
                $("#calendar tbody:last").append("<td></td>");
            }
            for (i = 1; i <= lastDate; i++) { // 날짜 채우기
                plusDate = new Date(nowYear, nowMonth, i).getDay();
                if (plusDate == 0) {
                    $("#calendar tbody:last").append("<tr></tr>");
                }
                $("#calendar tbody:last").append("<td class='date'>" + i + "</td>");
            }
            if ($("#calendar > tbody > td").length % 7 != 0) { //마지막 줄 빈칸
                for (i = 1; i <= $("#calendar > tbody > td").length % 7; i++) {
                    $("#calendar tbody:last").append("<td></td>");
                }
            }
            $(".date").each(function (index) { // 오늘 날짜 표시
                if (nowYear == date.getFullYear() && nowMonth == date.getMonth() && $(".date").eq(index).text() == date.getDate()) {
                    $(".date").eq(index).addClass('colToday');
                }
            })
        }
        buildCalendar();


        //tab bar heart
        $(".map_inner_box .bar_menu .menu_icon:nth-child(3)").click(function () {

            $(this).removeClass('act');
            setTimeout(() => {
                $(this).addClass('act');
            }, 0);
        });

    }
    about();

    function notice() {
        $('.notice_wrap .filter_list li').on('click', function () {
            $(this).addClass('clk').siblings().removeClass('clk');
            let ntfilter = $(this).data('ntfilter');
            let notice_filter_list = $('.notice_list .lists ul li');
    
            notice_filter_list.each(function () {
                $(this).css('display', 'none');
                let nt_category = $(this).data('ntresult');
                if (ntfilter === 'all' || nt_category === ntfilter) {
                    $(this).css('display', 'block');
                }
            });
        });

        $('.notice_list .array_select').on('click', function () {
            $(this).find('ul').stop().slideToggle(200)
        })

        $('.notice_list .array_select ul li').on('click', function () {
            let this_data = $(this).find('p').text();
            $('.notice_list .array_select .result span').text(this_data)
        })

        $('.notice_list .array_select').on('mouseleave blur', function () {
            $(this).find('ul').slideUp(300)
        })

        //notice 배열 
        $('.notice_list .array .array_9').on('click', function () {
            $('.notice_list .lists').addClass('ver01').removeClass('ver02')
        });
        $('.notice_list .array .array_15').on('click', function () {
            $('.notice_list .lists').addClass('ver02').removeClass('ver01')
        });

        //notive view 상단 LIKES 버튼
        $(".view_wrap .head .likes").click(function () {
            let count_reset = $(".view_wrap .head .likes span");
            let count_reset_num = parseInt(count_reset.text().replace(/,/g, ""), 10);
            count_reset_num += 1;
            const like_num = count_reset_num.toLocaleString();
            count_reset.text(like_num);


            $(this).removeClass('act');
            setTimeout(() => {
                $(this).addClass('act');
            }, 0);
        });


        
    }
    notice();
})