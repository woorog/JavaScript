'use strict';

{
   const words = ['apple','sky','blue','middle','set',];
   let word = words[Math.floor(Math.random() * words.length)];
   let loc = 0;
   let score = 0;
   let miss = 0;
   let music=1; // 1=music on   0=music off
   const timeLimit = 100 * 1000;
   let startTime;
   let isPlaying = false;
   let word_height=2; //단어 y축
   let word_width=1; //단어 x축
   const COLS = 10;  //행
   const ROWS = 20;  //열
   const BLOCK_SIZE = 30; //사이즈

   const target = document.getElementById('target');
   const scoreLabel = document.getElementById('score');
   const missLabel = document.getElementById('miss');
   const timerLabel = document.getElementById('timer');
   //window.requestAnimationFrame() 나중에 구현해보기
   const canvas = document.getElementById('board'); 
   const ctx = canvas.getContext('2d'); 
   //www.bensound.com
   const myAudio = new Audio(); // Aduio 객체 생성
   myAudio.src = "play.mp3"; // 음원 파일 설정
   const myAudioend = new Audio(); // Aduio 객체 생성
   myAudioend.src = "end.mp3"; // 음원 파일 설정
   
   const btnPause = document.getElementById("btnPause"); //중지버튼 설정
   const btnPlay = document.getElementById("btnPlay"); //틀기버튼 설정
   const playbtn = document.getElementById("play-btn"); // 플레이버튼 설정

   // 상수를 사용해 캔버스의 크기를 계산한다.
   ctx.canvas.width = COLS * BLOCK_SIZE;
   ctx.canvas.height = ROWS * BLOCK_SIZE;
   ctx.font = '1px Courier New';
   // 블록의 크기를 변경한다.
   ctx.scale(BLOCK_SIZE, BLOCK_SIZE); // 캔버스 크기 지정
   
   
   


   playbtn.onclick = function () {
      if (isPlaying === true) {
         return;
      }
      if(music==1){
         myAudioend.pause(); // 종료음 끄기
         myAudio.play(); //배경음 플레이.
      }
      word_height=1;
      isPlaying = true;
      target.textContent = word;
      startTime = Date.now();
      updateTimer();
      
  }

   btnPause.onclick = function () { //중지버튼
      music=0;
      myAudio.pause();
      myAudioend.pause();
  }
   btnPlay.onclick = function () { //플레이버튼
      if(isPlaying === true)
      {
         music=1;
         myAudio.play();
      }
      else{
         music=1;
         myAudioend.play();
      }

   }

  setInterval(function(){  //1초마다 실행
    
     if (isPlaying === true) {
      word_height++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.fillText(word, word_width, word_height);
      ctx.closePath();
   }
     
  }, 1000);



  

   function updateTarget() {
      let placeholder = '';
      for (let i = 0; i < loc; i++) {
         placeholder += '_';
      }
      target.textContent = placeholder + word.substring(loc);
   }


   function updateTimer() {
      const timeLeft = startTime + timeLimit-Date.now();
      timerLabel.textContent = (timeLeft / 1000).toFixed(2);
      const timeoutId = setTimeout(() => {
         updateTimer();
      }, 10);
      
      if (timeLeft < 0||word_height>20) {//문자높이가 20 이상일때.
         if(music===1){  //만약 음악이 안꺼졌으면
            myAudio.pause(); // 배경음 끄기
            myAudioend.play(); //종료음 플레이.
         }
         isPlaying = false;
         clearTimeout(timeoutId);
         timerLabel.textContent = '0.00';
         setTimeout(() => {
            alert('Game Over');
         }, 100);
      }
   }

   window.addEventListener('keydown', e => {
      if (isPlaying !== true) {return;}
      
      if (e.key === word[loc]) {
         loc++;
         if (loc === word.length) {

            word = words[Math.floor(Math.random() * words.length)];
            loc = 0;
            word_width=Math.floor(Math.random() * 6);
            word_height=2;
         }updateTarget();
         score++;
         scoreLabel.textContent = score;
      }else {miss++;
         missLabel.textContent = miss;
         }
   });


   
}