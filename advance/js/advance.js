const behindAdvance = {
  init: () => {
    behindAdvance.advanceModal();
    behindAdvance.advanceForm();
    behindAdvance.typed();
    behindAdvance.scrollAction();
  }

  // 사전가입 modal
  ,advanceModal: () => {
    const advance = $('.advance');
    const advanceBtn = advance.find('.btn > a');
    const advancePopup = advance.find('.popup');
    const advancePopupClose = advancePopup.find('.close');

    // 사전등록 버튼 클릭
    advanceBtn.on('click', function(){
      advance.addClass('modal');
      advancePopup.find('input')[0].focus();
      return false;
    });

    // 팝업 닫기
    advancePopupClose.on('click', function(){
      advance.removeClass('modal');
      document.getElementById('advanceForm').reset();
      return false;
    });
  }

  // 사전가입 post
  ,advanceForm: () => {
    const url = 'https://script.google.com/macros/s/AKfycbxpmjh2vxhJfU7bXhrbQOgmXczT3jLlsiybfs1kM6cJTPlWKlU/exec';
    // const url = 'https://script.google.com/macros/s/AKfycbwfa1YO0EbxpdSmP-to5KTN4pvxLq01rQsNAhpUq3TtVtuzsC0/exec';
    const form = $('#advanceForm');
    const name = form.find('#puName');
    const phone = form.find('#puPhone');
    const coin = form.find('#puCoin');
    const buyCoin = form.find('#puBuyCoin');

    // dom event _ submit
    form.on('submit', function(e){
      e.preventDefault();
      if(formVaildation()) {
        send();
      }
    });

    // validation
    var formVaildation = function() {
      if( !name.val() || !phone.val() || !coin.val() ) {
        alert('모두 입력해 주셔야 합니다.');
        return false;
      }else {
        $('.bodymovin').show();
        return true;
      }
    }

    var send = function() {
      // data
      var data = {
        'name': name.val(), 
        'phone': phone.val(),
        'coin': coin.val(),
        'buycoin': buyCoin.val()
      }
      // ajax post
      $.ajax({
        type: "POST",
        url: url,
        data: data,
        success: function(data) {
          console.log('success');
          document.getElementById('advanceForm').reset();
          $('.bodymovin').hide();
          $('.advance').removeClass('modal');
          $('.post-success').addClass('active');
          setTimeout(function(){
            $('.post-success').removeClass('active');
          }, 3000);
        },
        error: function(data) {
          console.log('fail');
        }
      });
    }
  }

  // text animation
  ,typed: () => {
    const typed = new Typed('.roll-typed', {
      strings: ["번거로운 장외매물 찾기", "직거래의 불편함", "믿을 수 없는 거래"],
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 4000,
      loop: true
    });
  }

  // scroll motion _ 클래스만 제어 (나머지는 css 로 컨트롤)
  ,scrollAction: () => {
    const section = $('#dBody > section');
    const win = $(window);
    const winH = win.height();
    let secInfo = [];

    section.each(function(e){
      const $this = $(this);
      const $top = $this.offset().top;
      const $h = $this.height();
      secInfo.push({
        s: $top,
        e: $top + $h
      });
    });

    win.on('load scroll', function(){
      const winT = $(window).scrollTop();
      for(var i=0; i < secInfo.length; i++){
        if(secInfo[i].s - winH/2 <= winT && secInfo[i].e > winT) {
          section.eq(i).siblings().removeClass('action');
          section.eq(i).addClass('action');
        }
      }
    });

  }
}

$(function(){
  behindAdvance.init();
});