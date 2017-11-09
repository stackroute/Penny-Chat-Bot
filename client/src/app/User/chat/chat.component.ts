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
  videoId:any[]=[];
  url:any;
  flowanswer:any[] = [];
  id:any;
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
        console.log(data);
        if(data.Counter) {
           this.followup(data.Counter);
        } else if(data.Video) {
          for(var property in data.Video){
            if(data.Video.hasOwnProperty(property)){
              if(data.Video[property]=="video"){
                console.log("v",data.Video[property]);
              }else{
              console.log("video",data.Video[property]);
              this.answ.Video = data.Video[property].match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
              this.videoId.push(this.answ.Video);
              console.log(this.videoId);
              console.log(this.answ.Video[0]);
              }
            }
          }
          // this.answ.Video = data.Video.value2.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
          // this.videoId = this.answ.Video;
          // console.log(this.answ.Video[1]);
        } else {
          for(var property in data.Link){
            if(data.Link.hasOwnProperty(property)){
              if(data.Link[property]=="link"){
                console.log("l",data.Link[property]);
              }else{
                console.log("link",data.Link[property]);
                this.answ.Link=data.Link[property];
              }
            }
          }
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
  this.videoId=[];
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
    console.log("1");
   this.setOut(question);
     this.maincounter = undefined;
     this.tempfollowquestion = undefined;
  }
  else if(this.tempfollowquestion.type == "Q") {
    console.log("2");
     this.setOut(question);
  } else if(this.tempfollowquestion.result) {
    console.log("3");
    this.setOut(question);
     this.maincounter = undefined;
     this.tempfollowquestion = undefined;
  } else {
    console.log("4");
    this.setOut(question);
  }
}


getquestion() {   
  console.log("result",this.question);
  this.chatService.getquestions(this.question)
      .subscribe((res)=>{
        this.rep=res;
        console.log('+++++++++++++++++++++++++++++++',res);
})
}


response:any;
next(ans:any){
   this.chatService.checklink(this.answ.Link).subscribe((resp)=>{
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