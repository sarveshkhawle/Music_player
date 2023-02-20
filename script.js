console.log("hello")
let songidx = 0 ;
let previdx = -1 ;
let prevtime = 0 ;

let audioele = new Audio('/Music_items/1.mp3')

let masterplay = document.getElementById('masterplay') 
let myprogressbar = document.getElementById('myprogressbar')
let gif = document.getElementById('musicgif')
 let songitemmm =Array.from( document.getElementsByClassName('songitem'))
 let mastersongname = document.getElementById('mastersongname')
let songs =[
    {songname : " opps1" , filepath : "/Music_items/1.mp3" ,coverpath : "imggg/1.jpg"},
    {songname : " opps2" , filepath : "/Music_items/2.mp3" ,coverpath : "imggg/2.jpg"},
    {songname : " opps3" , filepath : "/Music_items/3.mp3" ,coverpath : "imggg/3.jpg"},
    {songname : " opps4" , filepath : "/Music_items/4.mp3" ,coverpath : "imggg/4.jpg"},
    {songname : " opps5" , filepath : "/Music_items/5.mp3" ,coverpath : "imggg/5.jpg"}

]
const makeelepause=(idx)=>{
    
    document.getElementById(idx).classList.remove('fa-play-circle')
      document.getElementById(idx).classList.add('fa-pause-circle')

    }
    const makeeleplay=(idx)=>{

        document.getElementById(idx).classList.remove('fa-pause-circle')
        document.getElementById(idx).classList.add('fa-play-circle')
  
   
}
const makemasterplaypause=()=>{
  
    masterplay.classList.remove('fa-play-circle')
    masterplay.classList.add('fa-pause-circle')
}
const makemasterplayplay=()=>{
    masterplay.classList.remove('fa-pause-circle')
    masterplay.classList.add('fa-play-circle')
}
let ex =  {songname : " opps" , filepath : "/Music_items/1.mp3" ,coverpath : "imggg/1.jpg"};
masterplay.addEventListener('click',()=>{
    if(audioele.paused || audioele.currentTime<=0){
        audioele.play()
        masterplay.classList.add('fa-pause-circle')
        masterplay.classList.remove('fa-circle-play')
        makeelepause(previdx)
        gif.style.opacity =1
    }else{
        audioele.pause()
        masterplay.classList.remove('fa-pause-circle')
        masterplay.classList.add('fa-play-circle')
        makeeleplay(previdx)
        gif.style.opacity =0

    }
})
audioele.addEventListener('timeupdate',()=>{

    let currtime = audioele.currentTime
    let totaltime = audioele.duration 
    progress = parseInt(( currtime/totaltime)*100) ;// convert progress to percentage 
    myprogressbar.value = progress 
})
 myprogressbar.addEventListener('change', ()=>{
    
    let totaltime = audioele.duration 
    let progress_val = myprogressbar.value
    audioele.currentTime = (progress_val *  totaltime)/100 
 })  
 songitemmm.forEach((ele,i)=>{  
    console.log(ele,i )
    console.log( ele.getElementsByClassName("songnameee")[0].innerText)
    
    ele.getElementsByTagName("img")[0].src = songs[i].coverpath;
    ele.getElementsByClassName("songnameee")[0].innerText = songs[i].songname;
 }) 

const makeallplay=()=>{
    Array.from(getElementsByClassName('songitemplay')).forEach(ele => {
        ele.classList.remove('fa-pause-circle')
        ele.classList.add('fa-play-circle')
    });
}
 
Array.from(document.getElementsByClassName('songitemplay')).forEach((ele)=>{
    ele.addEventListener('click',(e)=>{

        previdx = songidx
        songidx = parseInt(e.target.id)

        if(e.target.classList.contains('fa-play-circle') === true ){

            e.target.classList.remove('fa-play-circle')
            e.target.classList.add('fa-pause-circle')
            if(previdx != -1  && songidx != previdx )makeeleplay(previdx)
            makemasterplaypause()
            audioele.src = `/Music_items/${songidx}.mp3`   // vert important do not ue''   use ``
            mastersongname.innerText = songs[songidx].songname 
              if(prevtime){
                audioele.currentTime =prevtime
                audioele.play()
                gif.style.opacity =1
              }
              else{

                  audioele.currentTime =0 ;
                   audioele.play()
                   gif.style.opacity =1
              }
        }
        else{
            e.target.classList.remove('fa-pause-circle')
            e.target.classList.add('fa-play-circle')
            makemasterplayplay()
            audioele.pause()
            prevtime = audioele.currentTime 
        }
        
    })


})
document.getElementById('next').addEventListener('click',()=>{
    if(songidx >=4){
        songidx = 0
        makeeleplay(4)
    }
    else{
        previdx = songidx
        songidx += 1 
    }
    audioele.src = `/Music_items/${songidx}.mp3`
    mastersongname.innerText = songs[songidx].songname
    makeeleplay(previdx)
    makeelepause(songidx)
    audioele.currentTime =0 
    audioele.play()
    masterplay.classList.remove('fa-play-circle') 
    masterplay.classList.add('fa-pause-circle')
})
document.getElementById('previous').addEventListener('click',()=>{
    if(songidx <= 0){
        songidx = 0
    }
    else{
        previdx = songidx
        songidx -= 1 
    }
    audioele.src = `/Music_items/${songidx}.mp3`
    mastersongname.innerText = songs[songidx].songname 
    makeeleplay(previdx)
    makeelepause(songidx)
    audioele.currentTime =0
    audioele.play()
    masterplay.classList.remove('fa-play-circle') 
    masterplay.classList.add('fa-pause-circle')
})




