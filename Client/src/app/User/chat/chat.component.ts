import { Component, OnInit } from '@angular/core';
import { AfterViewChecked, ElementRef, ViewChild} from '@angular/core';
import { ChatService } from './chat.service';
import { Router, NavigationEnd } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ChatService]
})
export class ChatComponent implements OnInit, AfterViewChecked {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  answer:any;
  question:any=[];
  res: any;
  ref:any;
  rep:any;
  flag = -2; 
  maincounter:any;
  tempfollowquestion:any;
  tempfollowtype:any;
  answ:any = {};
  links:any=0;
  moreInfoLink:any;
  ans;
  videoId:any;
  url:any;
  flowanswer:any[] = [];
  constructor(private chatService:ChatService, private router: Router) { }

  scrollToBottom(): void { // scrolling with answers
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                
  }
  ngOnInit() { //introduction message to start the chat
    let value;
    value = JSON.parse(localStorage.getItem("Userdata"));
    console.log(value.data.name);
    
    this.scrollToBottom();
      let temp = {
    bot : "Hi "+value.data.name+"! How may I Help You?"
  }
  this.question.push(temp);
 
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  fetch(ans){ //fetching the response on different condition
    this.ans = ans;
    this.response = null;
    this.answer="";
    if(!this.maincounter) {     //if no follow up questions
    this.chatService.fetch(ans).subscribe((res)=> {
      if(res.message == "badCount is greater than 3") {
        swal(
        'Logging Out!',
        'You are using too much abusive language !!',
        'warning'
        )
        this.chatService.forceLogout().subscribe((res)=> this.res = res)
        localStorage.removeItem('Userdata');
        this.router.navigateByUrl('/');

      } else {
        if(res.message.length == 0) {
            let temp = {
            bot : "Sorry I am Facing trouble understanding that"
          }
          this.question.push(temp);
         this.unansweredquestion();
        } else {
        this.moreInfoLink=res.links.length;
        let temp = {
          bot : res.message[0].message
        }
      this.question.push(temp);  
       this.getquestion();
        console.log(this.question);
      }
    }
      res.links.map((data) => {
        if(data.Counter) {
           this.followup(data.Counter);
        } else if(data.Video) {
          this.answ.Video = data.Video.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
          this.videoId = this.answ.Video;
          console.log(this.answ.Video[1]);
        } else {
          this.answ.Link = data.Link;
        }
      })
    })
  } else { //if at the time of followup questions
    if(this.tempfollowquestion.genre == "Question") {
      this.flowanswer.push(ans);
    }
    this.chatService.nextfollowup(this.maincounter,this.tempfollowquestion,ans)
    .subscribe((res) => {
      //console.log("next response ------------",res);
      this.setfollowup(res);
    })
  }
  }

judge(ans) {  //pushing the message to the chat application
  this.question[this.question.length-1].user = ans;
  this.fetch(ans);
}


 followup(counter) {  //triggering the follow up
   this.maincounter = counter;
   this.triggerfollowup(counter);
 }

 triggerfollowup(counter) { // getting the required trigger flow
   console.log("here",counter);
   this.chatService.triggerfollowup(counter).subscribe((res) => {
     console.log("Fectched flow",res);
     if(res.type.length > 0) {
       this.setfollowup(res);
     }
   })
 }

setOut(question) {   // giving output to chat
  console.log("-------------here ---------------------",question);
 setTimeout(()=> {
      if(!question.option) {
        let temp = {
          bot :question.message
             }
              this.question.push(temp);
      } else {
        let temp = {
          bot : question.message,
          option : question.option
               }
               console.log("asjkffskvdgjldsjafbvkjsdlafjvkejasfldvnsjkdfld");
               this.question.push(temp);
      }
  },2000);
}

setfollowup(question) {   // pushing data to chat based on type
  let t =1;
  console.log("-------------where -------------",question);
  this.tempfollowquestion = question;
  if(this.tempfollowquestion.next == -1) {
   this.setOut(question);
     this.maincounter = undefined;
     this.tempfollowquestion = undefined;
  }
  else if(this.tempfollowquestion.type == "Q") {
     this.setOut(question);
  } else if(this.tempfollowquestion.result) {
    this.fetchresult();
  } else {
    this.setOut(question);
  }
}

fetchresult() {
console.log("Result answer of flow======================",this.flowanswer);
}


getquestion() {   
  console.log("result",this.question);
  this.chatService.getquestions(this.question)
      .subscribe((res)=>{
        this.rep=res;
        console.log('+++++++++++++++++++++++++++++++',res);
})
}
id:any;
// player:any;
// //player: YT.Player;
//   savePlayer (player) {
//   this.player = player;
//   console.log('player instance', player)
//   }
// onStateChange(event){ //youtube video work
//   console.log('player state', event);
// }
// youtubeVideo(ans:any){ //display video
// console.log("next",this.answ);
//    console.log('hey', this.videoId[1])
//    this.id = this.videoId[1];
//    this.savePlayer(this.player);
//    this.onStateChange(event);
// }
response:any;
next(ans:any){
 console.log("next",this.answ);
  // this.id = this.answ.Video;
  // this.savePlayer(this.player);
  // this.onStateChange(event);
  console.log(this.answ,"--------------ajdsfka")
   this.chatService.checklink(this.answ.Link).subscribe((resp)=>{
     console.log('Final reesponse......',resp)
     this.response = resp})
   //resp contains the unfurled data from server
}

unansweredquestion(){ //saving unanswered question
  this.chatService.unansweredquestion(this.answer)
  .subscribe ((ref)=>{
      console.log("hey===",ref);
  })
}

}


/*resultsuggestion:any;
resultimage:any;
timescore:any = 0;
riskscore:any = 0;
valuecheck:any;
checkrisk:any;
type:any;
result:any;

getSentiment(plan){
   console.log('retirement.. ',plan);
   this.chatService.getSentiment(plan)
   .subscribe((res)=>{
     console.log(res.score)
     this.ref=res.score;
     this.negative=100-this.ref;
     let main = plan+" has "+this.ref+ " % Positive Feedback on Twitter"
     setTimeout(()=>{
       let temp = {
          bot : main
             }
        this.question.push(temp);
     },2000)

     setTimeout(()=>{
       let temp = {
          bot : "Anything else, I could help."
             }
        this.question.push(temp);
     },2000)
   })

   this.maincounter = undefined;
   this.tempfollowquestion = undefined;
 }
riskportfolio(){
  console.log("-----------enter here",this.flag,this.timescore,this.riskscore,this.ans);
    this.resultsuggestion=undefined;
    if(this.flag<2){
      if(this.flag==0){
        if(this.ans<3)
          this.timescore=this.timescore+1;
        else if(this.ans<=5)
          this.timescore=this.timescore+3;
        else if(this.ans<=10)
          this.timescore=this.timescore+7;
        else
          this.timescore=this.timescore+10;
      }
      else if(this.flag==1){  
        if(this.ans<2)
          this.timescore=this.timescore+0;
        else if(this.ans<=5)
          this.timescore=this.timescore+1;
        else if(this.ans<=10)
          this.timescore=this.timescore+4;
        else
          this.timescore=this.timescore+8;
        if(this.timescore<3){
          this.checkrisk=1;
          this.type=1;
        }
      }
      if(this.checkrisk==0){
        setTimeout(()=> {
          this.type=1;
          return  this.flag++},1000);
      }
    }
    else if(this.flag<=6){
      if(this.timescore>=3){
        if(this.flag==2){
          if(this.ans>=0 && this.ans<=10){
            this.riskscore=this.riskscore+parseInt(this.ans);
          }
          else
            this.valuecheck=1
        }
      else if(this.flag==3){
        if(this.ans>=0 && this.ans<=8){
                this.riskscore = this.riskscore + parseInt(this.ans);}
        else
          this.valuecheck=1;
      }
      else if(this.flag==4){
        if(this.ans=='a' || this.ans=='A')
          this.riskscore = this.riskscore + 3;
        else if(this.ans=='b' || this.ans=='B')
          this.riskscore = this.riskscore + 6;
        else if(this.riskscore=='c' || this.ans=='C')
          this.riskscore = this.riskscore + 8;
        else
          this.valuecheck=1;
      }
      else if(this.flag==5){
        if(this.ans=='a' || this.ans=='A')
          this.riskscore = this.riskscore + 0;
        else if(this.ans=='b' || this.ans=='B')
          this.riskscore = this.riskscore + 2;
        else if(this.ans=='c' || this.ans=='C')
          this.riskscore = this.riskscore + 5;
        else if(this.ans == 'd' || this.ans=='D')
          this.riskscore = this.riskscore + 8;
        else
          this.valuecheck=1;
      }
      else if(this.flag==6){
        if(this.ans=='a' || this.ans=='A')
          this.riskscore = this.riskscore + 0;
        else if(this.ans=='b' || this.ans=='B')
          this.riskscore = this.riskscore + 3;
        else if(this.ans=='c' || this.ans=='C')
          this.riskscore = this.riskscore + 6;
        else if(this.ans == 'd' || this.ans=='D')
          this.riskscore = this.riskscore + 8;
        else if(this.ans=='e' || this.ans=='E')
          this.riskscore = this.riskscore + 10;
        else
          this.valuecheck=1;
      }
      setTimeout(()=> {
        this.type=1;
        return  this.flag},1000);
    }
    // if(this.valuecheck==1){
    //   this.flag=this.flag-1;
    //   this.valuecheck=undefined;
    // }
  }
 // this.questions[this.flag]["answer"] = this.ans;
  this.type=0;
  if(this.flag!==7)
    this.ans="";
  
  if(this.flag==6){
    console.log("Last");
   // this.calculateDetails();
  }
}
m:any = 0;
calculateDetails(){
  if(this.timescore <5){
    if(this.riskscore<19)
      this.result="Conservative";
    else if(this.riskscore<31)
      this.result="Moderately Conservative";
    else
      this.result="Moderate"
  }
  else if(this.timescore==5){
    if(this.riskscore<=15)
      this.result="Conservative";
    else if(this.riskscore<=24)
      this.result="Moderately Conservative";
    else if(this.riskscore<=35)
      this.result="Moderate"
    else 
      this.result="Moderately Aggressive";
  }
  else if(this.timescore<=9 && this.timescore>=7){
    if(this.riskscore<=12)
      this.result="Conservative";
    else if(this.riskscore<=20)
      this.result="Moderately Conservative";
    else if(this.riskscore<=28)
      this.result="Moderate"
    else if(this.riskscore<=37)
      this.result="Moderately Aggressive";
    else
      this.result="Aggressive";
  }
  else if(this.timescore<=12 && this.timescore>=10){
    if(this.riskscore<=11)
      this.result="Conservative";
    else if(this.riskscore<=18)
      this.result="Moderately Conservative";
    else if(this.riskscore<=26)
      this.result="Moderate"
    else if(this.riskscore<=34)
      this.result="Moderately Aggressive";
    else
      this.result="Aggressive"
  }
  else if(this.timescore<=18 && this.timescore>=14){
    if(this.riskscore<=10)
      this.result="Conservative";
    else if(this.riskscore<=17)
      this.result="Moderately Conservative";
    else if(this.riskscore<=24)
      this.result="Moderate"
    else if(this.riskscore<=31)
      this.result="Moderately Aggressive";
    else
      this.result="Aggressive"
  }
  if(this.result=="Conservative"){
    this.resultsuggestion="50% in Fixed income, 30% in Cash Investments, 15% in Large-Cap Equity and 5% in International Equity";
    this.resultimage = './assets/img/conservative.jpeg';
  }
  else if(this.result=="Moderately Conservative"){
    this.resultsuggestion="50% in Fixed income, 10% in Cash Investments, 25% in Large-Cap Equity, 5% in Smally-Cap Equity and 10% in International Equity";
    this.resultimage = './assets/img/mod_conservative.jpeg';
  }
  else if(this.result=="Moderate"){
    this.resultsuggestion="35% in Fixed income, 5% in Cash Investments, 35% in Large-Cap Equity, 10% in Smally-Cap Equity and 15% in International Equity";
    this.resultimage = './assets/img/mod_allocation.jpeg';
  }
  else if(this.result=="Moderately Aggressive"){
    this.resultsuggestion="15% in Fixed income, 5% in Cash Investments, 45% in Large-Cap Equity, 15% in Smally-Cap Equity and 20% in International Equity"
    this.resultimage = './assets/img/mod_aggresive.jpeg';
  }   
  else{
    this.resultsuggestion="5% in Cash Investments, 50% in Large-Cap Equity, 20% in Smally-Cap Equity and 25% in International Equity"
    this.resultimage = './assets/img/agg_allocation.jpeg';
  }
  console.log(this.result);
 // if(this.flag == 7) {
  console.log(this.resultsuggestion);
//}
  // this.flag=0;
  // if(this.flag==6){
  //   this.flag=-1;
  // }
}

setresult() {
    let score = this.timescore + this.riskscore;
  setTimeout(()=> {
    let temp = {
      bot : "Your risk profile score is "+score +" which falls under "+this.result+". We suggest you "+this.resultsuggestion,
      image : this.resultimage
    }
    this.question.push(temp);
    this.arrageresult();
  },2000)
}
senti:boolean = false;
arrageresult() {
  let main = "Great! One of the things your risk profile score allows us to do is to provide advice on the right product to select. For example your risk profile score suggests the following allocation…"
  let option = [
        {
            value:'1. VTSMX (Vanguard Total Stock Market Index Fund)'
        },
        {
            value:'2. AGTHX (American Funds Growth Fund of America)'
        },
        {
            value:'3. FCNTX (Fidelity Contrafund)'
        },
        {
            value:'4. ARTAX (American Century One Choice In Ret Port)'
        },
        {
            value:'5. AGRAX (AllianzGI Retirement Income Fund)'
        },
        {
            value:'Choose one from above'
        }]
  setTimeout(()=> {
    let temp = {
      bot : main,
      option : option
    }
    this.question.push(temp);
  },2000)
  this.senti = true;
}*/