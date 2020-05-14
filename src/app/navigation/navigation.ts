import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        icon     : 'apps',
        children : [
            {
                id       : 'dashboards',
                title    : 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type     : 'collapsable',
                icon     : 'dashboard',
                children : [
                    {
                        id   : 'profile',
                        title: 'Profile',
                        type : 'item',
                        icon : 'person',
                        url  : '/pages/profile'
                    },
                    {
                        id       : 'chat',
                        title    : 'Chat',
                        translate: 'NAV.CHAT',
                        type     : 'item',
                        icon     : 'chat',
                        url      : '/apps/chat',
                        badge    : {
                            title: '13',
                            bg   : '#09d261',
                            fg   : '#FFFFFF'
                        }
                    },
                    {
                        id       : 'academy',
                        title    : 'Academy',
                        translate: 'NAV.ACADEMY',
                        type     : 'item',
                        icon     : 'school',
                        url      : '/apps/academy'
                    },
                    {
                        id   : 'forms',
                        title: 'Forms',
                        type : 'item',
                        icon : 'web_asset',
                        url  : '/ui/forms'
                    }
                ]
            }
        ]
    },
   {
        id      : 'pages',
        title   : 'Pages',
        type    : 'group',
        icon    : 'pages',
        children: [
            {
                id      : 'pricing',
                title   : 'Upgrade Membership',
                type    : 'collapsable',
                icon    : 'attach_money',
                url  : '/pages/pricing/style-3'
            },
            {
                id   : 'knowledge-base',
                title: 'Faq',
                type : 'item',
                icon : 'import_contacts',
                url  : '/pages/knowledge-base'
            }
        ]
    }
];
