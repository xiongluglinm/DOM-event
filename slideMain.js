let $slides = $('#slides')
let $images = $slides.children('img')
let $buttons = $('#buttonWrapper>li.button')
$buttons.eq(0).addClass('active')
let current = 0
let timer
cloneSlides()
clickSlide() // 点击轮播
autoSlide() // 自动轮播
// preAndNext()







function autoSlide(){
  timer = setInterval(function(){
    let index = current + 1
    goToSlide(index)
  },1500)
}

//复制两个slide元素作为无缝轮播时的过渡
function cloneSlides(){
  let $firstCopy = $images.eq(0).clone(true)
  let $lastCopy = $images.eq($images.length - 1).clone(true)
  // console.dir($firstCopy[0].outerHTML)
  $slides.prepend($lastCopy)
  $slides.append($firstCopy)
}

//将点击按钮-滑动图片这一功能封装成模块，以便在不同类型的按钮下都可以调用
function goToSlide(index){
  if(index === $images.length){
    index = 0
  }else if(index === -1){
    index = $images.length-1
  }
  buttonHighLight(index)
  if(current === 0 && index === $images.length-1){
    // console.log('0-->3')
    $slides.css({transform:`translateX(${-(current)*920}px)`})
    .one('transitionend',function(){
      $slides.hide().offset()
      $slides.css({transform:`translateX(${-(index+1)*920}px)`}).show()
    })
    current = index
  }else if(current === $images.length-1 && index === 0){
    // console.log('3-->0')
    $slides.css({transform:`translateX(${-(current+2)*920}px)`})
    .one('transitionend',function(){
      $slides.hide().offset()
      $slides.css({transform:`translateX(${-(index+1)*920}px)`}).show()
    })
    current = index
  }else{
    $slides.css({transform:`translateX(${-(index+1)*920}px)`})
    current = index
    // console.log(index)
  }
}

function clickSlide(){
  $('#buttonWrapper').on('click','.button',function(e){
    window.clearInterval(timer)
    let index = $(e.currentTarget).index()-1
    goToSlide(index)
  })
}

function buttonHighLight(index){
  $buttons.eq(index).siblings().removeClass('active')
  $buttons.eq(index).addClass('active')
}

function preAndNext(){
  $('.next').on('click',function(){
    goToSlide(current+1)
  })
  $('.previous').on('click',function(){
    goToSlide(current-1)
  })
}



