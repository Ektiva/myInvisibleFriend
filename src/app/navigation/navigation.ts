import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'dashboards',
        title    : 'Dashboards',
        translate: 'NAV.DASHBOARDS',
        type     : 'group',
        icon     : 'dashboard',
        children : [
            {
                id       : 'ifriends',
                title    : 'iFriends',
                translate: 'NAV.ACADEMY',
                type     : 'item',
                icon     : 'people',
                url      : '/apps/members/ifriends'
            },
            {
                id       : 'likes',
                title    : 'myLikes',
                translate: 'NAV.MYLIKES',
                type     : 'item',
                icon     : 'thumb_up',
                url      : '/apps/members/likes'
            },
            {
                id       : 'chat',
                title    : 'Chat',
                translate: 'NAV.CHAT',
                type     : 'item',
                icon     : 'chat',
                url      : '/apps/chat'
                // badge    : {
                //     title: '13',
                //     bg   : '#09d261',
                //     fg   : '#FFFFFF'
                // }
            },
            {
                id   : 'profile',
                title: 'Edit Profile',                       
                translate: 'NAV.EDITPROFILE',
                type : 'item',
                icon : 'person',
                url  : '/pages/profile'
            }
     
        ]
    },
   {
        id      : 'pages',
        title   : 'Learn More',
        translate: 'NAV.LEARNMORE',
        type    : 'group',
        icon    : 'pages',
        children: [
            {
                id      : 'pricing',
                title   : 'Upgrade Membership',
                translate: 'NAV.UPGRADEMEMBERSHIP',
                type    : 'item',
                icon    : 'attach_money',
                url  : '/pages/pricing'
            },
            {
                id   : 'knowledge-base',
                title: 'Blog',
                type : 'item',
                icon : 'import_contacts',
                url  : '/pages/knowledge-base'
            }
        ]
    }
];


// import { FuseNavigation } from '@fuse/types';

// export const navigation: FuseNavigation[] = [
//     {
//         id       : 'applications',
//         title    : 'Features',
//         translate: 'NAV.APPLICATIONS',
//         type     : 'group',
//         icon     : 'apps',
//         children : [
//             {
//                 id       : 'dashboards',
//                 title    : 'Dashboards',
//                 translate: 'NAV.DASHBOARDS',
//                 type     : 'collapsable',
//                 icon     : 'dashboard',
//                 children : [
//                     {
//                         id   : 'profile',
//                         title: 'NewsFeed',                       
//                         translate: 'NAV.NEWSFEED',
//                         type : 'item',
//                         icon : 'collections',
//                         url  : '/pages/profile'
//                     },
//                     {
//                         id       : 'chat',
//                         title    : 'Chat',
//                         translate: 'NAV.CHAT',
//                         type     : 'item',
//                         icon     : 'chat',
//                         url      : '/apps/chat',
//                         badge    : {
//                             title: '13',
//                             bg   : '#09d261',
//                             fg   : '#FFFFFF'
//                         }
//                     },
//                     {
//                         id       : 'ifriends',
//                         title    : 'iFriends',
//                         translate: 'NAV.ACADEMY',
//                         type     : 'item',
//                         icon     : 'people',
//                         url      : '/apps/members/ifriends'
//                     },
//                     {
//                         id       : 'likes',
//                         title    : 'myLikes',
//                         translate: 'NAV.MYLIKES',
//                         type     : 'item',
//                         icon     : 'thumb_up',
//                         url      : '/apps/members/likes'
//                     },
//                     {
//                         id   : 'forms',
//                         title: 'Edit Profile',                      
//                         translate: 'NAV.EDITPROFILE',
//                         type : 'item',
//                         icon : 'person',
//                         url  : '/ui/forms'
//                     }
//                 ]
//             }
//         ]
//     },
//    {
//         id      : 'pages',
//         title   : 'Learn More',
//         translate: 'NAV.LEARNMORE',
//         type    : 'group',
//         icon    : 'pages',
//         children: [
//             {
//                 id      : 'pricing',
//                 title   : 'Upgrade Membership',
//                 translate: 'NAV.UPGRADEMEMBERSHIP',
//                 type    : 'item',
//                 icon    : 'attach_money',
//                 url  : '/pages/pricing'
//             },
//             {
//                 id   : 'knowledge-base',
//                 title: 'Faq',
//                 type : 'item',
//                 icon : 'import_contacts',
//                 url  : '/pages/knowledge-base'
//             }
//         ]
//     }
// ];


