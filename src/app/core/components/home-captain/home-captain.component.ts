import { HomePageProviderService } from './../../../shared/services/home-page-provider.service';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-captain',
  templateUrl: './home-captain.component.html',
  styleUrls: ['./home-captain.component.scss']
})
export class HomeCaptainComponent implements OnInit {
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
    {
      restName: "المطعم الشرقي",
      restLink: "path",
      restImgPath: "../../../../assets/imgs/oriental-restaurant.jpg"
    },
    {
      restName: "المطعم الغربي",
      restLink: "path - id restaurant",
      restImgPath: "../../../../assets/imgs/western restaurant.jpg"
    },
    {
      restName: "المطعم الهندي",
      restLink: "path",
      restImgPath: "../../../../assets/imgs/oriental-restaurant.jpg"
    },
    {
      restName: "المطعم الجبل",
      restLink: "path",
      restImgPath: "../../../../assets/imgs/oriental-restaurant.jpg"
    },


  ]

  constructor(private HomePageService: HomePageProviderService , private toastr: ToastrService) { }
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
      phone : this.subscribedUsers.value.restaurantPhoneNumber,
      // :emailRestaurant
      email : this.subscribedUsers.value.restaurantEmail,
      // address:addressRestaurant
      address: this.subscribedUsers.value.restaurantAddress,
      // Note:NoteRestaurant
      Note: this.subscribedUsers.value.restaurantNote
    }


    this.HomePageService.postSubscribedUser(subscriptionPost).subscribe({
      next: (data) => {
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
      // todo : show any alert for this error
      this.toastr.error('everything is broken', 'Major Error', {
        timeOut: 3000,
      });
      }
    })


  }

  ngOnInit(): void {
  }

}
