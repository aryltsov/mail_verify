import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [

    {
      title: 'Email Verification',
      expanded: true,
      children: [
        {
          title: 'Verification Request',
          link: '/pages/verify_mail'
        },
        {
          title: 'Review Verifications',
          link: '/pages/verification'
        },
        {
          title: 'Outing Emails',
          link: '/pages/sent_mail',
        },
      ]
    },
    {
      title: 'Phone Verification',
      expanded: true,
      children: [
        {
          title: 'Method 1: Verification',
          link: '/pages/verify-method1'
        },
        {
          title: 'Method 2: Verification',
          link: '/pages/verify-method2'
        }
      ]
    },
    {
      title: 'Config',
      expanded: true,
      children: [
        {
          title: 'Users',
          link: '/pages/users'
        }
      ]
    }
];
