import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseMatSidenavHelperService } from '@fuse/directives/fuse-mat-sidenav/fuse-mat-sidenav.service';

import { ChatService } from 'app/main/apps/chat/chat.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Component({
    selector     : 'chat-chats-sidenav',
    templateUrl  : './chats.component.html',
    styleUrls    : ['./chats.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class ChatChatsSidenavComponent implements OnInit, OnDestroy
{
    chats: any[];
    chatSearch: any;
    contacts: any[];
    searchText: string;
    user: any;

    chatss: any[];
    contactss: any[];
    userr: any;

    userTest: any;

    unread: number;
    navigation: any;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ChatService} _chatService
     * @param {FuseMatSidenavHelperService} _fuseMatSidenavHelperService
     * @param {MediaObserver} _mediaObserver
     */
    constructor(
        private _chatService: ChatService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseMatSidenavHelperService: FuseMatSidenavHelperService,
        public _mediaObserver: MediaObserver
    )
    {
        // Set the defaults
        this.chatSearch = {
            name: ''
        };
        this.searchText = '';

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.user = this._chatService.userr;

        this.user.chatList.sort((c1, c2) => (c2.lastMessageTime > c1.lastMessageTime ? 1 : -1));

        // console.log('User');
        // console.log(this.userTest);
        this.userr = this._chatService.userr;
        // console.log('Userr');
        // console.log(this.userr);

        this.chats = this._chatService.chatss;

        // this.chatss = this._chatService.chatss;

        this.contacts = this._chatService.contactss;
        // console.log('Contacts');
        // console.log(this.contacts);
        // this.contactss = this._chatService.contacts;
        // console.log('Contactss');
        // console.log(this.contactss);

        this._chatService.onChatsUpdated
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(updatedChats => {
                this.chats = updatedChats;
            });

        this._chatService.onUserUpdated
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(updatedUser => {
                this.user = updatedUser;
        });

        this._chatService.unread$.subscribe(unread => this.unread = unread);
        // console.log(this.unread);

        this._fuseNavigationService.navigation$.subscribe(navigation => this.navigation = navigation);
        // console.log('current navigation in Chat');
        // console.log(this.navigation);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get chat
     *
     * @param contact
     */
    getChat(contact): void
    {
        this._chatService.getChat(contact);

        if ( !this._mediaObserver.isActive('gt-md') )
        {
            this._fuseMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
        }
    }

    /**
     * Get chat
     *
     * @param contact
     */
    getChatt(contact): void
    {
        this._chatService.markAsRead(this.user.id, contact);
        this.user.chatList.forEach(chat => {
            if(chat.contactId === contact){
                chat.unread = 0;
            }
        });
        this._chatService.getChatt(contact); 

        if ( !this._mediaObserver.isActive('gt-md') )
        {
            this._fuseMatSidenavHelperService.getSidenav('chat-left-sidenav').toggle();
        }
    }

    

    /**
     * Set user status
     *
     * @param status
     */
    setUserStatus(status): void
    {
        this._chatService.setUserStatus(status);
    }

    /**
     * Change left sidenav view
     *
     * @param view
     */
    changeLeftSidenavView(view): void
    {
        this._chatService.onLeftSidenavViewChanged.next(view);
    }

    /**
     * Logout
     */
    logout(): void
    {
        console.log('logout triggered');
    }
}
