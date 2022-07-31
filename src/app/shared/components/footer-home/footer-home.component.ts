import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-home',
  templateUrl: './footer-home.component.html',
  styleUrls: ['./footer-home.component.scss']
})
export class FooterHomeComponent implements OnInit {
  visibilityBtn:boolean = false

  constructor(private router:Router) { }
  goToHome(){
    this.router.navigate(['/'])
  }
  ngOnInit(): void {
  }

  scrollToElement(): void {
    // console.log($element);
   window.scrollTo(0,0)
  //  if(window.scroll.length>600){
  //    this.visibilityBtn = true
  //  }
  //  scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event:Event) {
    // console.log(event);
    if( window.pageYOffset>=800){
      this.visibilityBtn= true
    }else{
      this.visibilityBtn= false
    }
  //  console.log("Scroll Event", window.pageYOffset );


  }

}
