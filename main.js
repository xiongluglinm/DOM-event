$(clickMe).on('click',function(){
  if($(popover).css('display') === 'none' ){
    $(popover).show()
  }else{
    $(popover).hide()
  }
    // console.log('show')
    // console.log($(popover).css('display'))
    //setTimeout 的延时设定为0ms即可，只是为了达到执行完点击clickMe
    //里面的代码后再执行 setTimeout 里的代码这一需求即可
  setTimeout(function(){
      // console.log('添加 one click')
      $(document).one('click',function(){
          // console.log('我觉得点击clickMe时，这里应该不会执行')
          // console.log('hide')
          $(popover).hide()
          console.log($(popover).css('display'))
      })
  },0)
})

$(document).on('click',function(){
    console.log('点击clickMe事件走到了document')
})

$(wrapper).on('click',function(e){
    e.stopPropagation() //阻止事件传播
})




// var n=0
// $('div').on('click',function(e){
//   setTimeout(function(){
//     $(e.currentTarget).addClass('active')
//     console.log(n)
//   },n*500)
//   n=n+1
// })