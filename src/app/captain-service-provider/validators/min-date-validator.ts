import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import * as moment from "moment";

// export class CustomValidators {
//   static dateMinimum(date: string): ValidatorFn {
//     return (control: AbstractControl): ValidationErrors | null => {
//       if (control.value == null) {
//         return null;
//       }

//       const controlDate = moment(control.value, FORMAT_DATE);

//       if (!controlDate.isValid()) {
//         return null;
//       }

//       const validationDate = moment(date);

//       return controlDate.isAfter(validationDate) ? null : {
//         'date-minimum': {
//           'date-minimum': validationDate.format(FORMAT_DATE),
//           'actual': controlDate.format(FORMAT_DATE)
//         }
//       };
//     };
//   }
// }
// export class DateValidator {

//   static LessThanToday(control: FormControl): { [key: string]: any } {
//        let today : Date = new Date();

//       if (new Date(control.value) > today)
//           return { "LessThanToday": true };

//       return null;
//   }
// }


