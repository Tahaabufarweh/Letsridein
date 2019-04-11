import { Component} from '@angular/core';
import { Validators, FormGroup, FormControl, FormGroupDirective, NgForm, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { NotificationsService } from 'angular2-notifications';
import { Router } from '@angular/router';
import { forEach } from '@angular/router/src/utils/collection';
import { ErrorStateMatcher } from '@angular/material';
import { AbstractClassPart } from '@angular/compiler/src/output/output_ast';
import { InternationalizationService } from '../services/internationalization.service';
import { LoginComponent } from '../login/login.component';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { error } from 'util';



export interface Country {
  code: string;
  viewValue: string;
  PhoneCode: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
/** register component*/
export class RegisterComponent {
    /** register ctor */
  signUpForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('', [Validators.required,Validators.minLength(6)]),
    MobileNumber: new FormControl('', Validators.required),
    rePass: new FormControl('', Validators.required),
    Country: new FormControl('', Validators.required)

  }, { validators: this.passValidator })

  
  hide = true;
  
  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private router: Router,
    private socialAuthService: AuthService,
    private notificationService: NotificationService) {
    translate.use(localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en');

  }

  public signinWithGoogle() {
    
    let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    this.socialAuthService.signIn(socialPlatformProvider)
      .then((userData) => {
        //on success
        //this will return user data from google. What you need is a user token which you will send it to the server
        localStorage.setItem("googleData", JSON.stringify(userData));
      }, error => {
          localStorage.setItem("error", JSON.stringify(error));

        });
  }
 
  
  get fullName() {   
    return this.signUpForm.get('fullName') as FormControl;
  }
  
  get username() {
    return this.signUpForm.get('username') as FormControl;
  }

  get email() {
    return this.signUpForm.get('email') as FormControl;
  }

  get password() {
    return this.signUpForm.get('password') as FormControl;
  }
  
  get MobileNumber() {
    return this.signUpForm.get('MobileNumber') as FormControl;
    
  }

  get Country() {
    return this.signUpForm.get('Country') as FormControl;
  }
  
  get rePass() {
    return this.signUpForm.get('rePass') as FormControl;
  }
  
  CreateNewUser() {
    
    let MobileNo = this.filterItemsOfType(this.Country.value) + this.MobileNumber.value;
    
    this.signUpForm.controls['MobileNumber'].setValue(MobileNo);
    
    this.userService.createUser(this.signUpForm.value).subscribe(response => {
      
      this.notificationService.createNotificationService('success', 'Signup Success', 'Your account has been created');

     setTimeout(() => {
        this.router.navigate(["/"]);
      }, 5000);
      
    }, error => {
      var errormsg = error.error;
      console.log(error);
      this.notificationService.createNotificationService('error', 'Signup Failed', errormsg);
    });

   
  }
  

  countries: Country[] = [
    {
      viewValue: 'Afghanistan',
      PhoneCode: '+93',
      code: 'AF'
    },
    {
      viewValue: 'Aland Islands',
      PhoneCode: '+358',
      code: 'AX'
    },
    {
      viewValue: 'Albania',
      PhoneCode: '+355',
      code: 'AL'
    },
    {
      viewValue: 'Algeria',
      PhoneCode: '+213',
      code: 'DZ'
    },
    {
      viewValue: 'AmericanSamoa',
      PhoneCode: '+1 684',
      code: 'AS'
    },
    {
      viewValue: 'Andorra',
      PhoneCode: '+376',
      code: 'AD'
    },
    {
      viewValue: 'Angola',
      PhoneCode: '+244',
      code: 'AO'
    },
    {
      viewValue: 'Anguilla',
      PhoneCode: '+1 264',
      code: 'AI'
    },
    {
      viewValue: 'Antarctica',
      PhoneCode: '+672',
      code: 'AQ'
    },
    {
      viewValue: 'Antigua and Barbuda',
      PhoneCode: '+1268',
      code: 'AG'
    },
    {
      viewValue: 'Argentina',
      PhoneCode: '+54',
      code: 'AR'
    },
    {
      viewValue: 'Armenia',
      PhoneCode: '+374',
      code: 'AM'
    },
    {
      viewValue: 'Aruba',
      PhoneCode: '+297',
      code: 'AW'
    },
    {
      viewValue: 'Australia',
      PhoneCode: '+61',
      code: 'AU'
    },
    {
      viewValue: 'Austria',
      PhoneCode: '+43',
      code: 'AT'
    },
    {
      viewValue: 'Azerbaijan',
      PhoneCode: '+994',
      code: 'AZ'
    },
    {
      viewValue: 'Bahamas',
      PhoneCode: '+1 242',
      code: 'BS'
    },
    {
      viewValue: 'Bahrain',
      PhoneCode: '+973',
      code: 'BH'
    },
    {
      viewValue: 'Bangladesh',
      PhoneCode: '+880',
      code: 'BD'
    },
    {
      viewValue: 'Barbados',
      PhoneCode: '+1 246',
      code: 'BB'
    },
    {
      viewValue: 'Belarus',
      PhoneCode: '+375',
      code: 'BY'
    },
    {
      viewValue: 'Belgium',
      PhoneCode: '+32',
      code: 'BE'
    },
    {
      viewValue: 'Belize',
      PhoneCode: '+501',
      code: 'BZ'
    },
    {
      viewValue: 'Benin',
      PhoneCode: '+229',
      code: 'BJ'
    },
    {
      viewValue: 'Bermuda',
      PhoneCode: '+1 441',
      code: 'BM'
    },
    {
      viewValue: 'Bhutan',
      PhoneCode: '+975',
      code: 'BT'
    },
    {
      viewValue: 'Bolivia, Plurinational State of',
      PhoneCode: '+591',
      code: 'BO'
    },
    {
      viewValue: 'Bosnia and Herzegovina',
      PhoneCode: '+387',
      code: 'BA'
    },
    {
      viewValue: 'Botswana',
      PhoneCode: '+267',
      code: 'BW'
    },
    {
      viewValue: 'Brazil',
      PhoneCode: '+55',
      code: 'BR'
    },
    {
      viewValue: 'British Indian Ocean Territory',
      PhoneCode: '+246',
      code: 'IO'
    },
    {
      viewValue: 'Brunei Darussalam',
      PhoneCode: '+673',
      code: 'BN'
    },
    {
      viewValue: 'Bulgaria',
      PhoneCode: '+359',
      code: 'BG'
    },
    {
      viewValue: 'Burkina Faso',
      PhoneCode: '+226',
      code: 'BF'
    },
    {
      viewValue: 'Burundi',
      PhoneCode: '+257',
      code: 'BI'
    },
    {
      viewValue: 'Cambodia',
      PhoneCode: '+855',
      code: 'KH'
    },
    {
      viewValue: 'Cameroon',
      PhoneCode: '+237',
      code: 'CM'
    },
    {
      viewValue: 'Canada',
      PhoneCode: '+1',
      code: 'CA'
    },
    {
      viewValue: 'Cape Verde',
      PhoneCode: '+238',
      code: 'CV'
    },
    {
      viewValue: 'Cayman Islands',
      PhoneCode: '+ 345',
      code: 'KY'
    },
    {
      viewValue: 'Central African Republic',
      PhoneCode: '+236',
      code: 'CF'
    },
    {
      viewValue: 'Chad',
      PhoneCode: '+235',
      code: 'TD'
    },
    {
      viewValue: 'Chile',
      PhoneCode: '+56',
      code: 'CL'
    },
    {
      viewValue: 'China',
      PhoneCode: '+86',
      code: 'CN'
    },
    {
      viewValue: 'Christmas Island',
      PhoneCode: '+61',
      code: 'CX'
    },
    {
      viewValue: 'Cocos(Keeling) Islands',
      PhoneCode: '+61',
      code: 'CC'
    },
    {
      viewValue: 'Colombia',
      PhoneCode: '+57',
      code: 'CO'
    },
    {
      viewValue: 'Comoros',
      PhoneCode: '+269',
      code: 'KM'
    },
    {
      viewValue: 'Congo',
      PhoneCode: '+242',
      code: 'CG'
    },
    {
      viewValue: 'Congo" The Democratic Republic of the Congo',
      PhoneCode: '+243',
      code: 'CD'
    },
    {
      viewValue: 'Cook Islands',
      PhoneCode: '+682',
      code: 'CK'
    },
    {
      viewValue: 'Costa Rica',
      PhoneCode: '+506',
      code: 'CR'
    },
    {
      viewValue: 'Cote d"Ivoire',
      PhoneCode: '+225',
      code: 'CI'
    },
    {
      viewValue: 'Croatia',
      PhoneCode: '+385',
      code: 'HR'
    },
    {
      viewValue: 'Cuba',
      PhoneCode: '+53',
      code: 'CU'
    },
    {
      viewValue: 'Cyprus',
      PhoneCode: '+357',
      code: 'CY'
    },
    {
      viewValue: 'Czech Republic',
      PhoneCode: '+420',
      code: 'CZ'
    },
    {
      viewValue: 'Denmark',
      PhoneCode: '+45',
      code: 'DK'
    },
    {
      viewValue: 'Djibouti',
      PhoneCode: '+253',
      code: 'DJ'
    },
    {
      viewValue: 'Dominica',
      PhoneCode: '+1 767',
      code: 'DM'
    },
    {
      viewValue: 'Dominican Republic',
      PhoneCode: '+1 849',
      code: 'DO'
    },
    {
      viewValue: 'Ecuador',
      PhoneCode: '+593',
      code: 'EC'
    },
    {
      viewValue: 'Egypt',
      PhoneCode: '+20',
      code: 'EG'
    },
    {
      viewValue: 'El Salvador',
      PhoneCode: '+503',
      code: 'SV'
    },
    {
      viewValue: 'Equatorial Guinea',
      PhoneCode: '+240',
      code: 'GQ'
    },
    {
      viewValue: 'Eritrea',
      PhoneCode: '+291',
      code: 'ER'
    },
    {
      viewValue: 'Estonia',
      PhoneCode: '+372',
      code: 'EE'
    },
    {
      viewValue: 'Ethiopia',
      PhoneCode: '+251',
      code: 'ET'
    },
    {
      viewValue: 'Falkland Islands(Malvinas) ',
      PhoneCode: '+500',
      code: 'FK'
    },
    {
      viewValue: 'Faroe Islands',
      PhoneCode: '+298',
      code: 'FO'
    },
    {
      viewValue: 'Fiji',
      PhoneCode: '+679',
      code: 'FJ'
    },
    {
      viewValue: 'Finland',
      PhoneCode: '+358',
      code: 'FI'
    },
    {
      viewValue: 'France',
      PhoneCode: '+33',
      code: 'FR'
    },
    {
      viewValue: 'French Guiana',
      PhoneCode: '+594',
      code: 'GF'
    },
    {
      viewValue: 'French Polynesia',
      PhoneCode: '+689',
      code: 'PF'
    },
    {
      viewValue: 'Gabon',
      PhoneCode: '+241',
      code: 'GA'
    },
    {
      viewValue: 'Gambia',
      PhoneCode: '+220',
      code: 'GM'
    },
    {
      viewValue: 'Georgia',
      PhoneCode: '+995',
      code: 'GE'
    },
    {
      viewValue: 'Germany',
      PhoneCode: '+49',
      code: 'DE'
    },
    {
      viewValue: 'Ghana',
      PhoneCode: '+233',
      code: 'GH'
    },
    {
      viewValue: 'Gibraltar',
      PhoneCode: '+350',
      code: 'GI'
    },
    {
      viewValue: 'Greece',
      PhoneCode: '+30',
      code: 'GR'
    },
    {
      viewValue: 'Greenland',
      PhoneCode: '+299',
      code: 'GL'
    },
    {
      viewValue: 'Grenada',
      PhoneCode: '+1 473',
      code: 'GD'
    },
    {
      viewValue: 'Guadeloupe',
      PhoneCode: '+590',
      code: 'GP'
    },
    {
      viewValue: 'Guam',
      PhoneCode: '+1 671',
      code: 'GU'
    },
    {
      viewValue: 'Guatemala',
      PhoneCode: '+502',
      code: 'GT'
    },
    {
      viewValue: 'Guernsey',
      PhoneCode: '+44',
      code: 'GG'
    },
    {
      viewValue: 'Guinea',
      PhoneCode: '+224',
      code: 'GN'
    },
    {
      viewValue: 'Guinea - Bissau',
      PhoneCode: '+245',
      code: 'GW'
    },
    {
      viewValue: 'Guyana',
      PhoneCode: '+595',
      code: 'GY'
    },
    {
      viewValue: 'Haiti',
      PhoneCode: '+509',
      code: 'HT'
    },
    {
      viewValue: 'Holy See(Vatican City State) ',
      PhoneCode: '+379',
      code: 'VA'
    },
    {
      viewValue: 'Honduras',
      PhoneCode: '+504',
      code: 'HN'
    },
    {
      viewValue: 'Hong Kong',
      PhoneCode: '+852',
      code: 'HK'
    },
    {
      viewValue: 'Hungary',
      PhoneCode: '+36',
      code: 'HU'
    },
    {
      viewValue: 'Iceland',
      PhoneCode: '+354',
      code: 'IS'
    },
    {
      viewValue: 'India',
      PhoneCode: '+91',
      code: 'IN'
    },
    {
      viewValue: 'Indonesia',
      PhoneCode: '+62',
      code: 'ID'
    },
    {
      viewValue: 'Iran, Islamic Republic of Persian Gulf',
      PhoneCode: '+98',
      code: 'IR'
    },
    {
      viewValue: 'Iraq',
      PhoneCode: '+964',
      code: 'IQ'
    },
    {
      viewValue: 'Ireland',
      PhoneCode: '+353',
      code: 'IE'
    },
    {
      viewValue: 'Isle of Man',
      PhoneCode: '+44',
      code: 'IM'
    },
    {
      viewValue: 'Israel',
      PhoneCode: '+972',
      code: 'IL'
    },
    {
      viewValue: 'Italy',
      PhoneCode: '+39',
      code: 'IT'
    },
    {
      viewValue: 'Jamaica',
      PhoneCode: '+1 876',
      code: 'JM'
    },
    {
      viewValue: 'Japan',
      PhoneCode: '+81',
      code: 'JP'
    },
    {
      viewValue: 'Jersey',
      PhoneCode: '+44',
      code: 'JE'
    },
    {
      viewValue: 'Jordan',
      PhoneCode: '+962',
      code: 'JO'
    },
    {
      viewValue: 'Kazakhstan',
      PhoneCode: '+7 7',
      code: 'KZ'
    },
    {
      viewValue: 'Kenya',
      PhoneCode: '+254',
      code: 'KE'
    },
    {
      viewValue: 'Kiribati',
      PhoneCode: '+686',
      code: 'KI'
    },
    {
      viewValue: 'Korea, Democratic People"s Republic of Korea',
      PhoneCode: '+850',
      code: 'KP'
    },
    {
      viewValue: 'Korea, Republic of South Korea',
      PhoneCode: '+82',
      code: 'KR'
    },
    {
      viewValue: 'Kuwait',
      PhoneCode: '+965',
      code: 'KW'
    },
    {
      viewValue: 'Kyrgyzstan',
      PhoneCode: '+996',
      code: 'KG'
    },
    {
      viewValue: 'Laos',
      PhoneCode: '+856',
      code: 'LA'
    },
    {
      viewValue: 'Latvia',
      PhoneCode: '+371',
      code: 'LV'
    },
    {
      viewValue: 'Lebanon',
      PhoneCode: '+961',
      code: 'LB'
    },
    {
      viewValue: 'Lesotho',
      PhoneCode: '+266',
      code: 'LS'
    },
    {
      viewValue: 'Liberia',
      PhoneCode: '+231',
      code: 'LR'
    },
    {
      viewValue: 'Libyan Arab Jamahiriya',
      PhoneCode: '+218',
      code: 'LY'
    },
    {
      viewValue: 'Liechtenstein',
      PhoneCode: '+423',
      code: 'LI'
    },
    {
      viewValue: 'Lithuania',
      PhoneCode: '+370',
      code: 'LT'
    },
    {
      viewValue: 'Luxembourg',
      PhoneCode: '+352',
      code: 'LU'
    },
    {
      viewValue: 'Macao',
      PhoneCode: '+853',
      code: 'MO'
    },
    {
      viewValue: 'Macedonia',
      PhoneCode: '+389',
      code: 'MK'
    },
    {
      viewValue: 'Madagascar',
      PhoneCode: '+261',
      code: 'MG'
    },
    {
      viewValue: 'Malawi',
      PhoneCode: '+265',
      code: 'MW'
    },
    {
      viewValue: 'Malaysia',
      PhoneCode: '+60',
      code: 'MY'
    },
    {
      viewValue: 'Maldives',
      PhoneCode: '+960',
      code: 'MV'
    },
    {
      viewValue: 'Mali',
      PhoneCode: '+223',
      code: 'ML'
    },
    {
      viewValue: 'Malta',
      PhoneCode: '+356',
      code: 'MT'
    },
    {
      viewValue: 'Marshall Islands',
      PhoneCode: '+692',
      code: 'MH'
    },
    {
      viewValue: 'Martinique',
      PhoneCode: '+596',
      code: 'MQ'
    },
    {
      viewValue: 'Mauritania',
      PhoneCode: '+222',
      code: 'MR'
    },
    {
      viewValue: 'Mauritius',
      PhoneCode: '+230',
      code: 'MU'
    },
    {
      viewValue: 'Mayotte',
      PhoneCode: '+262',
      code: 'YT'
    },
    {
      viewValue: 'Mexico',
      PhoneCode: '+52',
      code: 'MX'
    },
    {
      viewValue: 'Micronesia, Federated States of Micronesia',
      PhoneCode: '+691',
      code: 'FM'
    },
    {
      viewValue: 'Moldova',
      PhoneCode: '+373',
      code: 'MD'
    },
    {
      viewValue: 'Monaco',
      PhoneCode: '+377',
      code: 'MC'
    },
    {
      viewValue: 'Mongolia',
      PhoneCode: '+976',
      code: 'MN'
    },
    {
      viewValue: 'Montenegro',
      PhoneCode: '+382',
      code: 'ME'
    },
    {
      viewValue: 'Montserrat',
      PhoneCode: '+1664',
      code: 'MS'
    },
    {
      viewValue: 'Morocco',
      PhoneCode: '+212',
      code: 'MA'
    },
    {
      viewValue: 'Mozambique',
      PhoneCode: '+258',
      code: 'MZ'
    },
    {
      viewValue: 'Myanmar',
      PhoneCode: '+95',
      code: 'MM'
    },
    {
      viewValue: 'Namibia',
      PhoneCode: '+264',
      code: 'NA'
    },
    {
      viewValue: 'Nauru',
      PhoneCode: '+674',
      code: 'NR'
    },
    {
      viewValue: 'Nepal',
      PhoneCode: '+977',
      code: 'NP'
    },
    {
      viewValue: 'Netherlands',
      PhoneCode: '+31',
      code: 'NL'
    },
    {
      viewValue: 'Netherlands Antilles',
      PhoneCode: '+599',
      code: 'AN'
    },
    {
      viewValue: 'New Caledonia',
      PhoneCode: '+687',
      code: 'NC'
    },
    {
      viewValue: 'New Zealand',
      PhoneCode: '+64',
      code: 'NZ'
    },
    {
      viewValue: 'Nicaragua',
      PhoneCode: '+505',
      code: 'NI'
    },
    {
      viewValue: 'Niger',
      PhoneCode: '+227',
      code: 'NE'
    },
    {
      viewValue: 'Nigeria',
      PhoneCode: '+234',
      code: 'NG'
    },
    {
      viewValue: 'Niue',
      PhoneCode: '+683',
      code: 'NU'
    },
    {
      viewValue: 'Norfolk Island',
      PhoneCode: '+672',
      code: 'NF'
    },
    {
      viewValue: 'Northern Mariana Islands',
      PhoneCode: '+1 670',
      code: 'MP'
    },
    {
      viewValue: 'Norway',
      PhoneCode: '+47',
      code: 'NO'
    },
    {
      viewValue: 'Oman',
      PhoneCode: '+968',
      code: 'OM'
    },
    {
      viewValue: 'Pakistan',
      PhoneCode: '+92',
      code: 'PK'
    },
    {
      viewValue: 'Palau',
      PhoneCode: '+680',
      code: 'PW'
    },
    {
      viewValue: 'Palestinian Territory, Occupied',
      PhoneCode: '+970',
      code: 'PS'
    },
    {
      viewValue: 'Panama',
      PhoneCode: '+507',
      code: 'PA'
    },
    {
      viewValue: 'Papua New Guinea',
      PhoneCode: '+675',
      code: 'PG'
    },
    {
      viewValue: 'Paraguay',
      PhoneCode: '+595',
      code: 'PY'
    },
    {
      viewValue: 'Peru',
      PhoneCode: '+51',
      code: 'PE'
    },
    {
      viewValue: 'Philippines',
      PhoneCode: '+63',
      code: 'PH'
    },
    {
      viewValue: 'Pitcairn',
      PhoneCode: '+872',
      code: 'PN'
    },
    {
      viewValue: 'Poland',
      PhoneCode: '+48',
      code: 'PL'
    },
    {
      viewValue: 'Portugal',
      PhoneCode: '+351',
      code: 'PT'
    },
    {
      viewValue: 'Puerto Rico',
      PhoneCode: '+1 939',
      code: 'PR'
    },
    {
      viewValue: 'Qatar',
      PhoneCode: '+974',
      code: 'QA'
    },
    {
      viewValue: 'Romania',
      PhoneCode: '+40',
      code: 'RO'
    },
    {
      viewValue: 'Russia',
      PhoneCode: '+7',
      code: 'RU'
    },
    {
      viewValue: 'Rwanda',
      PhoneCode: '+250',
      code: 'RW'
    },
    {
      viewValue: 'Reunion',
      PhoneCode: '+262',
      code: 'RE'
    },
    {
      viewValue: 'Saint Barthelemy',
      PhoneCode: '+590',
      code: 'BL'
    },
    {
      viewValue: 'Saint Helena, Ascension and Tristan Da Cunha',
      PhoneCode: '+290',
      code: 'SH'
    },
    {
      viewValue: 'Saint Kitts and Nevis',
      PhoneCode: '+1 869',
      code: 'KN'
    },
    {
      viewValue: 'Saint Lucia',
      PhoneCode: '+1 758',
      code: 'LC'
    },
    {
      viewValue: 'Saint Martin',
      PhoneCode: '+590',
      code: 'MF'
    },
    {
      viewValue: 'Saint Pierre and Miquelon',
      PhoneCode: '+508',
      code: 'PM'
    },
    {
      viewValue: 'Saint Vincent and the Grenadines',
      PhoneCode: '+1 784',
      code: 'VC'
    },
    {
      viewValue: 'Samoa',
      PhoneCode: '+685',
      code: 'WS'
    },
    {
      viewValue: 'San Marino',
      PhoneCode: '+378',
      code: 'SM'
    },
    {
      viewValue: 'Sao Tome and Principe',
      PhoneCode: '+239',
      code: 'ST'
    },
    {
      viewValue: 'Saudi Arabia',
      PhoneCode: '+966',
      code: 'SA'
    },
    {
      viewValue: 'Senegal',
      PhoneCode: '+221',
      code: 'SN'
    },
    {
      viewValue: 'Serbia',
      PhoneCode: '+381',
      code: 'RS'
    },
    {
      viewValue: 'Seychelles',
      PhoneCode: '+248',
      code: 'SC'
    },
    {
      viewValue: 'Sierra Leone',
      PhoneCode: '+232',
      code: 'SL'
    },
    {
      viewValue: 'Singapore',
      PhoneCode: '+65',
      code: 'SG'
    },
    {
      viewValue: 'Slovakia',
      PhoneCode: '+421',
      code: 'SK'
    },
    {
      viewValue: 'Slovenia',
      PhoneCode: '+386',
      code: 'SI'
    },
    {
      viewValue: 'Solomon Islands',
      PhoneCode: '+677',
      code: 'SB'
    },
    {
      viewValue: 'Somalia',
      PhoneCode: '+252',
      code: 'SO'
    },
    {
      viewValue: 'South Africa',
      PhoneCode: '+27',
      code: 'ZA'
    },
    {
      viewValue: 'South Georgia and the South Sandwich Islands',
      PhoneCode: '+500',
      code: 'GS'
    },
    {
      viewValue: 'Spain',
      PhoneCode: '+34',
      code: 'ES'
    },
    {
      viewValue: 'Sri Lanka',
      PhoneCode: '+94',
      code: 'LK'
    },
    {
      viewValue: 'Sudan',
      PhoneCode: '+249',
      code: 'SD'
    },
    {
      viewValue: 'Suriname',
      PhoneCode: '+597',
      code: 'SR'
    },
    {
      viewValue: 'Svalbard and Jan Mayen',
      PhoneCode: '+47',
      code: 'SJ'
    },
    {
      viewValue: 'Swaziland',
      PhoneCode: '+268',
      code: 'SZ'
    },
    {
      viewValue: 'Sweden',
      PhoneCode: '+46',
      code: 'SE'
    },
    {
      viewValue: 'Switzerland',
      PhoneCode: '+41',
      code: 'CH'
    },
    {
      viewValue: 'Syrian Arab Republic',
      PhoneCode: '+963',
      code: 'SY'
    },
    {
      viewValue: 'Taiwan',
      PhoneCode: '+886',
      code: 'TW'
    },
    {
      viewValue: 'Tajikistan',
      PhoneCode: '+992',
      code: 'TJ'
    },
    {
      viewValue: 'Tanzania, United Republic of Tanzania',
      PhoneCode: '+255',
      code: 'TZ'
    },
    {
      viewValue: 'Thailand',
      PhoneCode: '+66',
      code: 'TH'
    },
    {
      viewValue: 'Timor - Leste',
      PhoneCode: '+670',
      code: 'TL'
    },
    {
      viewValue: 'Togo',
      PhoneCode: '+228',
      code: 'TG'
    },
    {
      viewValue: 'Tokelau',
      PhoneCode: '+690',
      code: 'TK'
    },
    {
      viewValue: 'Tonga',
      PhoneCode: '+676',
      code: 'TO'
    },
    {
      viewValue: 'Trinidad and Tobago',
      PhoneCode: '+1 868',
      code: 'TT'
    },
    {
      viewValue: 'Tunisia',
      PhoneCode: '+216',
      code: 'TN'
    },
    {
      viewValue: 'Turkey',
      PhoneCode: '+90',
      code: 'TR'
    },
    {
      viewValue: 'Turkmenistan',
      PhoneCode: '+993',
      code: 'TM'
    },
    {
      viewValue: 'Turks and Caicos Islands',
      PhoneCode: '+1 649',
      code: 'TC'
    },
    {
      viewValue: 'Tuvalu',
      PhoneCode: '+688',
      code: 'TV'
    },
    {
      viewValue: 'Uganda',
      PhoneCode: '+256',
      code: 'UG'
    },
    {
      viewValue: 'Ukraine',
      PhoneCode: '+380',
      code: 'UA'
    },
    {
      viewValue: 'United Arab Emirates',
      PhoneCode: '+971',
      code: 'AE'
    },
    {
      viewValue: 'United Kingdom',
      PhoneCode: '+44',
      code: 'GB'
    },
    {
      viewValue: 'United States',
      PhoneCode: '+1',
      code: 'US'
    },
    {
      viewValue: 'Uruguay',
      PhoneCode: '+598',
      code: 'UY'
    },
    {
      viewValue: 'Uzbekistan',
      PhoneCode: '+998',
      code: 'UZ'
    },
    {
      viewValue: 'Vanuatu',
      PhoneCode: '+678',
      code: 'VU'
    },
    {
      viewValue: 'Venezuela, Bolivarian Republic of Venezuela',
      PhoneCode: '+58',
      code: 'VE'
    },
    {
      viewValue: 'Vietnam',
      PhoneCode: '+84',
      code: 'VN'
    },
    {
      viewValue: 'Virgin Islands, British',
      PhoneCode: '+1 284',
      code: 'VG'
    },
    {
      viewValue: 'Virgin Islands, U.S.',
      PhoneCode: '+1 340',
      code: 'VI'
    },
    {
      viewValue: 'Wallis and Futuna',
      PhoneCode: '+681',
      code: 'WF'
    },
    {
      viewValue: 'Yemen',
      PhoneCode: '+967',
      code: 'YE'
    },
    {
      viewValue: 'Zambia',
      PhoneCode: '+260',
      code: 'ZM'
    },
    {
      viewValue: 'Zimbabwe',
      PhoneCode: '+263',
      code: 'ZW'
    }
  ];
  filterItemsOfType(viewvalue) {

    for (let item of this.countries) {
      if (item.viewValue == viewvalue) {
        return item.PhoneCode;
      }
    } 

   
  }
  pass = this.password.value;
  passValidator(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('rePass').value; // to get value in input tag
    if (password != confirmPassword)
    {
      
      AC.get('rePass').setErrors({
        "MatchPassword": true
      });
      
    } else {
      
      return null
    }
  
  }

  
}



