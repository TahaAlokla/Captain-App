import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HomePageProviderService } from './../../../shared/services/home-page-provider.service';

import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ToastrService } from 'ngx-toastr';
import SwiperCore, { SwiperOptions, Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper';
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Autoplay]);

@Component({
  selector: 'app-home-captain',
  templateUrl: './home-captain.component.html',
  styleUrls: ['./home-captain.component.scss']
})
export class HomeCaptainComponent implements OnInit {
  getPublicRestaurants!: Subscription
  featuresListOutRestaurant = [
    "تقديم صفحة عامة لمطعمك تستطيع تقديم نفسك عليها",
    "طلبات للحجز يمكن للمستخدمين ارسال حجوزاتهم أليك",
    "عرض الوجبات التي تقدمها ومعلومات الوصول"
  ]
  featuresListInRestaurant = [
    "لوحة تحكم تستطيع من خلالها إدارة وأنشاء المينو الخاص بك",
    "أدارة كاملة للفوتير والضرائب",
    "تطبيق للنادل ليتمكن من الطلب منه واستعراض ميزات الاقتراحات الذكية",
    "تطبيق خاص بالمطبخ والبار يتلقى عليه الطلبات الواردة لاقسام "
  ]
  RestaurantSubscription = [
  ]



  constructor(private HomePageService: HomePageProviderService, private toastr: ToastrService , private router:Router) {

    // let uuid = new DeviceUUID().get();


  }
  subscribedUsers = new FormGroup({
    restaurantName: new FormControl(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(80)] }),
    restaurantEmail: new FormControl(null, { validators: [Validators.required, Validators.email] }),
    restaurantPhoneNumber: new FormControl(null, { validators: [Validators.required, Validators.pattern(/^[+]*[0-9]{7,15}[-\s\./0-9]*$/)] }),
    restaurantAddress: new FormControl(null, { validators: [Validators.required, Validators.minLength(5), Validators.maxLength(600)] }),
    restaurantNote: new FormControl(null)


  })

  onSubmitSubscribed() {
    let subscriptionPost = {
      // name:nameRestaurant
      name: this.subscribedUsers.value.restaurantName,
      // phone:phoneRestaurant
      phone: this.subscribedUsers.value.restaurantPhoneNumber,
      // :emailRestaurant
      email: this.subscribedUsers.value.restaurantEmail,
      // address:addressRestaurant
      address: this.subscribedUsers.value.restaurantAddress,
      // Note:NoteRestaurant
      Note: this.subscribedUsers.value.restaurantNote
    }

    console.log(subscriptionPost);



    this.HomePageService.postSubscribedUser(subscriptionPost).subscribe({
      next: (data) => {
        // for reset form after success submitted
        this.subscribedUsers.reset()
        console.log(data);

        //todo :For success sending post data
        Swal.fire({
          title: 'شكراً لك',
          // title:this.translate.instant('thinks-msg'),
          // text:this.translate.instant('conform-msg') ,
          text: "تم تسجيل طلبك سوف نتواصل معك بأقرب وقت",
          showConfirmButton: false,
          // cancelButtonText: this.translate.instant('accept') ,
          cancelButtonText: "موافق",
          showCancelButton: true,
          focusCancel: true,
          timer: 7500,
          buttonsStyling: false,
          customClass: {
            container: 'container-sweet',
            popup: 'popup-sweet',
            cancelButton: 'cancelButton-sweet',
            title: 'title-sweet',
            htmlContainer: 'text-sweet'
          }
        });
      },
      error: (err) => {
        console.log(err);

        // todo : show any alert for this error
        this.toastr.error('تأكد من تعبئتك الحقول بشكل صحيح', 'هناك خطاء ما ', {
          timeOut: 3000,
        });
      }
    })


  }

  ngOnInit(): void {
    this.getPublicRestaurants = this.HomePageService.getPublicRestaurants().subscribe({
      next: (data) => {
        console.log(data.restaurants);
        this.RestaurantSubscription = data.restaurants
      }, error: (err) => {
        console.log(err);

      }
    })
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    grabCursor:true,

    navigation: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false
    },
    // rewind:true,
    loop: true,
    slideToClickedSlide: true,
    keyboard: {
      enabled: true
    },
    // pagination: { clickable: true },
    breakpoints: {
      0:{
        slidesPerView: 1,
      },
      768:{
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200:{
        slidesPerView: 4,
      },
      1400:{
        slidesPerView: 4,
      },
    },
    // scrollbar: { draggable: true },
  };
  viewHomeRestaurant(idRestaurant: string , name:string) {
    console.log(name,idRestaurant);
    // navigation to restaurant home
    this.router.navigate(['restaurant', idRestaurant,name]);
  }
  ngOnDestroy(): void {
    this.getPublicRestaurants.unsubscribe()

  }

}
