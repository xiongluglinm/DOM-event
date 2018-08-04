let $slides = $('#slides')
let $images = $slides.children('img')
let $buttons = $('#buttonWrapper>button')
let current = 0
cloneSlides()

clickSlide()
preAndNext()

setInterval(function(){
  let index = current + 1
  goToSlide(index)
},1000)




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
  if(index === $buttons.length){
    index = 0
  }else if(index === -1){
    index = $buttons.length-1
  }
  if(current === 0 && index === $buttons.length-1){
    console.log('0-->3')
    $slides.css({transform:`translateX(${-(current)*300}px)`})
    .one('transitionend',function(){
      $slides.hide().offset()
      $slides.css({transform:`translateX(${-(index+1)*300}px)`}).show()
    })
    current = index
  }else if(current === $buttons.length-1 && index === 0){
    console.log('3-->0')
    $slides.css({transform:`translateX(${-(current+2)*300}px)`})
    .one('transitionend',function(){
      $slides.hide().offset()
      $slides.css({transform:`translateX(${-(index+1)*300}px)`}).show()
    })
    current = index
  }else{
    $slides.css({transform:`translateX(${-(index+1)*300}px)`})
    current = index
    console.log(index)
  }
}

function clickSlide(){
  $('#buttonWrapper').on('click','button',function(e){
    let index = $(e.currentTarget).index()
    goToSlide(index)
  })
}

function preAndNext(){
  $('.next').on('click',function(){
    goToSlide(current+1)
  })
  $('.previous').on('click',function(){
    goToSlide(current-1)
  })
}

// $buttons.eq(0).on('click',function(){
//   if (current === 3) {
//     console.log('3->0')
//     $slides.css({transform:'translateX(-1500px)'})
//     .one('transitionend',function(){
//       // $slides.css({transition:'none'}).offset()
//       // $slides.css({transform:'translateX(-300px)'})
//       // .css({transition:'all 0.5s'})

//       $slides.hide().offset()
//       $slides.css({transform:'translateX(-300px)'}).show()
//     })
//   }else{
//     $slides.css({transform:'translateX(-300px)'})
//   }
//   current = 0
// })
// $buttons.eq(1).on('click',function(){
//   $slides.css({transform:'translateX(-600px)'})
//   current = 1
// })
// $buttons.eq(2).on('click',function(){
//   $slides.css({transform:'translateX(-900px)'})
//   current = 2
//   console.log(2)
// })
// $buttons.eq(3).on('click',function(){
//   if (current === 0) {
//     console.log('0->3')
//     $slides.css({transform:'translateX(0px)'})
//       .one('transitionend',function(){

//       $slides.hide().offset()
//       $slides.css({transform:'translateX(-1200px)'}).show()
//     })
//   }else{
//     $slides.css({transform:'translateX(-1200px)'})
//   }
//   current = 3
// })

