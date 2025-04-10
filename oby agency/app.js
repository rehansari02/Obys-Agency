
function locomotiveAnimation(){

    // scroll karte time smooth ke liye he

    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });
    
    
    
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
    
    
    
    
    
    
}
tl=gsap.timeline();

function loaderAnimation(){
//    starting me name head aya tha uska he aur timer
tl.from(".line h1,h2",{
     y:100,
     stagger:0.25,
     duration:0.6,
     delay:0.5
})
gsap.from(".line1-part1 h5,h6",{
    opacity:0,
    delay:0.5
})


function loaderCount(){
    let  h5Timer= document.querySelector(".line1-part1 h5")
    let count=0;
    let stop=setInterval(function(){
        count++
      h5Timer.textContent=count;
        if(count===100){
            clearInterval(stop)
            setTimeout(function(){
                tl.to(".line",{
                    opacity:0
                })
                tl.to(".loader",{
                    y:-100+"%",
                    duration:0.5,
                    opacity:0,
                })
              
            },500)
            page1Animation();
            sheryjsAnimation();
        }
    },35)
    
}
loaderCount();
}

function cursorAnimation(){
    // npm se laya hua crsr he ye
    Shery.mouseFollower({
        skew:true,
        ease:"cubic-bezier(0.23, 1, 0.320, 1)",
        duration:1,
    })
    // nav  wala crsr
  

    // video play time crsr gayab karne ke liye
    let page2=document.querySelector(".page2")
    page2.addEventListener("mouseenter",function(){
        gsap.to(".mousefollower",{
            opacity:0
        })
    })

    page2.addEventListener("mouseleave",function(){
        gsap.to(".mousefollower",{
            opacity:1
        })
    })
    
    

    // video play and pause ke liye
  let videoCont=  document.querySelector(".video-container");
  video=document.querySelector(".video-container video")

//   jab mouse enter hoga jab use karne wale features
  videoCont.addEventListener("mouseenter",function(){
      videoCont.addEventListener("mousemove",function(eve){
       gsap.to(".video-crsr",{
            left:eve.x - 450,
            top:eve.y - 250
        }) 
      })
    })  

    // jab crsr se click hone wale features play and pause
   let flag=0
    videoCont.addEventListener("click",function(){
        if(flag===0){
            gsap.to(".video-container img",{
                opacity:0
            })
           video.play();
           video.style.opacity=1;
    
          document.querySelector(".video-crsr").innerHTML=`<i class="ri-pause-line"></i>` 
    
           gsap.to(".video-crsr",{
            scale:0.5
           })

           flag=1;
        }
        else{
            gsap.to(".video-container img",{
                opacity:1
            })
           video.pause();
           video.style.opacity=0;
    
          document.querySelector(".video-crsr").innerHTML=`<i class="ri-play-fill"></i>`
    
           gsap.to(".video-crsr",{
            scale:1
           })

           flag=0;
        }

    })

    // aur jab mouse leave karte time 

    videoCont.addEventListener("mouseleave",function(){
        gsap.to(".video-crsr",{
            top:"-10%",
            left: "70%"
        })
        gsap.to(".video-container img",{
            opacity:1
        })
       video.pause();
       video.style.opacity=0;

      document.querySelector(".video-crsr").innerHTML=`<i class="ri-play-fill"></i>`

       gsap.to(".video-crsr",{
        scale:1
       })
       flag=0;
    })

    Shery.makeMagnet(" nav .nav-part2 h4", {
    });

}

function page1Animation(){

    // content wala stagger ke hisab se 
    gsap.from("#head1",{
        duration:0.6,
        opacity:0
    })
    gsap.from(".content-p1 h1,h2,h3",{
          y:120,
          stagger:0.2,
          duration:0.6,
          delay:0.5,
      })
    //   nav ka hover karne pr
   

     page1ContentHead=function(){
        document.addEventListener("mousemove",function(eve){
            gsap.to("#image-design",{
                left:eve.x,
                top:eve.y
            })
        })
        document.querySelector("#content-p1-3").addEventListener("mouseenter",function(){
            gsap.to("#image-design",{
                opacity:1
            })
        })
        document.querySelector("#content-p1-3").addEventListener("mouseleave",function(){
            gsap.to("#image-design",{
                opacity:0
            })
        })
     }

     page1ContentHead();
  }

function sheryjsAnimation(){
    Shery.imageEffect(".image-div",{
        style:5,
        // debug:true,
    config:{"a":{"value":3.66,"range":[0,30]},"b":{"value":0.68,"range":[-1,1]},"zindex":{"value":-9996999,"range":[-9999999,9999999]},"aspect":{"value":0.7187409394567315},"ignoreShapeAspect":{"value":true},"shapePosition":{"value":{"x":0,"y":0}},"shapeScale":{"value":{"x":0.5,"y":0.5}},"shapeEdgeSoftness":{"value":0,"range":[0,0.5]},"shapeRadius":{"value":0,"range":[0,2]},"currentScroll":{"value":0},"scrollLerp":{"value":0.07},"gooey":{"value":true},"infiniteGooey":{"value":false},"growSize":{"value":4,"range":[1,15]},"durationOut":{"value":1,"range":[0.1,5]},"durationIn":{"value":1.5,"range":[0.1,5]},"displaceAmount":{"value":0.5},"masker":{"value":false},"maskVal":{"value":1,"range":[1,5]},"scrollType":{"value":0},"geoVertex":{"range":[1,64],"value":1},"noEffectGooey":{"value":true},"onMouse":{"value":1},"noise_speed":{"value":0.2,"range":[0,10]},"metaball":{"value":0.2,"range":[0,2]},"discard_threshold":{"value":0.5,"range":[0,1]},"antialias_threshold":{"value":0,"range":[0,0.1]},"noise_height":{"value":0.5,"range":[0,2]},"noise_scale":{"value":10,"range":[0,100]}},
        gooey:true
    })
}

locomotiveAnimation()
loaderAnimation();
cursorAnimation();
page1Animation();







