import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import { User, Userr } from 'app/_models/user';
import { UserService } from 'app/_services/user.service';
import { environment } from 'environments/environment';
import { tap } from 'rxjs/operators';

@Injectable()
export class ChatService implements Resolve<any>
{
    contacts: any[];
    chats: any[];
    user: any;
    user1: any;
    onChatSelected: BehaviorSubject<any>;
    onContactSelected: BehaviorSubject<any>;
    onChatsUpdated: Subject<any>;
    onUserUpdated: Subject<any>;
    onLeftSidenavViewChanged: Subject<any>;
    onRightSidenavViewChanged: Subject<any>;
    
    contactsLikers: User[];
    contactsLikees: User[];

    contactss: any[];
    chatss: any[];
    userr: Userr = JSON.parse(localStorage.getItem('user'));

    unreadSource = new BehaviorSubject<number>(0);
    unread$ = this.unreadSource.asObservable();
    unReadCount = 0;

    baseUrl = environment.apiUrl;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private route: ActivatedRoute, 
        private userService: UserService,
        private _httpClient: HttpClient
    )
    {
        // Set the defaults
        this.onChatSelected = new BehaviorSubject(null);
        this.onContactSelected = new BehaviorSubject(null);
        this.onChatsUpdated = new Subject();
        this.onUserUpdated = new Subject();
        this.onLeftSidenavViewChanged = new Subject();
        this.onRightSidenavViewChanged = new Subject();
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any
    {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.getContacts(),
                this.getChats(),
                this.getUser(),
                this.getContactss(),
                this.getChatss(),
                this.getUserr(),
                this.getUser1()
            ]).then(
                ([contacts, chats, user, contactss, chatss, userr]) => {
                    this.contacts = contacts;
                    this.chats = chats;
                    this.user = user;
                    this.contactss = contactss;
                    this.chatss = chatss;
                    this.userr = userr;
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    getChat(contactId): Promise<any>
    {
        const chatItem = this.user.chatList.find((item) => {
            return item.contactId === contactId;
        });

        // Create new chat, if it's not created yet.
        if ( !chatItem )
        {
            this.createNewChat(contactId).then((newChats) => {
                this.getChat(contactId);
            });
            return;
        }

        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-chats/' + chatItem.id)
                .subscribe((response: any) => {
                    const chat = response;

                    const chatContact = this.contacts.find((contact) => {
                        return contact.id === contactId;
                    });

                    const chatData = {
                        chatId : chat.id,
                        dialog : chat.dialog,
                        contact: chatContact
                    };

                    this.onChatSelected.next({...chatData});

                }, reject);

        });

    }

       /**
     * Get chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    getChatt(contactId): Promise<any>
    {
        const chatItem = this.userr.chatList.find((item) => {
            return item.contactId === contactId;
        });

        // Create new chat, if it's not created yet.
        if ( !chatItem )
        {
            const newDialog =
            [{
                who: this.userr.id,
                message: '',
                time: "2020-04-17T19:10:08.3727735",
                whose: contactId
            }];
            const chatContact = this.contactss.find((contact) => {
                return contact.id === contactId;
            });
            const chatData = {
                chatId : ''+this.userr.id +'' +contactId,
                dialog: newDialog,
                contact: chatContact
            };

            this.onChatSelected.next({...chatData});
            return;
        }else{
            return new Promise((resolve, reject) => {
                this._httpClient.get<any[]>(this.baseUrl + 'users/' + this.userr.id + '/messages/thread/group/' +contactId)
                    .subscribe((response: any) => {
                        const chat = response;
                        for (let i = 0; i < chat.length; i++) {
                            if (
                                chat[i].isRead === false &&
                                chat[i].recipientId === this.userr.id
                            ) {
                              this.markAsRead(this.userr.id, chat[i].id);
                            }
                        }
                        
                        const chatContact = this.contactss.find((contact) => {
                            return contact.id === contactId;
                        });
    
                        const chatData = {
                            chatId : chat.id,
                            dialog : chat.dialog,
                            contact: chatContact
                        };
    
                        this.onChatSelected.next({...chatData});
    
                    }, reject);
            });
        }

        

    }

    markAsRead(userId: number, senderId: number) {
        this._httpClient
          .post(
            this.baseUrl + 'users/' + userId + '/messages/' + senderId + '/reads',
            {}
          )
          .subscribe();
    }

    /**
     * Create new chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    createNewChat(contactId): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const contact = this.contacts.find((item) => {
                return item.id === contactId;
            });

            const chatId = FuseUtils.generateGUID();

            const chat = {
                id    : chatId,
                dialog: []
            };

            const chatListItem = {
                contactId      : contactId,
                id             : chatId,
                lastMessageTime: '2017-02-18T10:30:18.931Z',
                name           : contact.name,
                unread         : null
            };

            // Add new chat list item to the user's chat list
            this.user.chatList.push(chatListItem);

            // Post the created chat
            this._httpClient.post('api/chat-chats', {...chat})
                .subscribe((response: any) => {

                    // Post the new the user data
                    this._httpClient.post('api/chat-user/' + this.user.id, this.user)
                        .subscribe(newUserData => {

                            // Update the user data from server
                            this.getUser().then(updatedUser => {
                                this.onUserUpdated.next(updatedUser);
                                resolve(updatedUser);
                            });
                        });
                }, reject);
        });
    }

    /**
     * Create new chat
     *
     * @param contactId
     * @returns {Promise<any>}
     */
    createNewChatt(contactId): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const contact = this.contactss.find((item) => {
                return item.id === contactId;
            });

            // const chatId = FuseUtils.generateGUID();
            const chatId = ''+this.userr.id +'' +contactId;

            // const chat = {
            //     id    : chatId,
            //     dialog: []
            // };
            const chat = {
                recipientId: contactId,
                content: ''
            };

            const chatListItem = {
                contactId      : contactId,
                id             : chatId,
                lastMessageTime: '2017-02-18T10:30:18.931Z',
                lastMessage: '',
                name           : contact.name,
                unread         : null
            };

            // Add new chat list item to the user's chat list
            this.userr.chatList.push(chatListItem);
            console.log('New Chat List');
            console.log(this.userr.chatList);

            // Post the created chat
            this._httpClient.post(this.baseUrl + 'users/' + this.userr.id + '/messages', {...chat})
                .subscribe((response: any) => {

                    // Post the new the user data
                    // this._httpClient.post('api/chat-user/' + this.user.id, this.user)
                    //     .subscribe(newUserData => {

                    //         // Update the user data from server
                    //         this.getUserr().then(updatedUser => {
                    //             this.onUserUpdated.next(updatedUser);
                    //             resolve(updatedUser);
                    //         });
                    //     });
                }, reject);
        });
    }

    /**
     * Select contact
     *
     * @param contact
     */
    selectContact(contact): void
    {
        this.onContactSelected.next(contact);
    }

    /**
     * Set user status
     *
     * @param status
     */
    setUserStatus(status): void
    {
        this.user.status = status;
    }

    /**
     * Update user data
     *
     * @param userData
     */
    updateUserData(currUser): void
    {
        console.log('User Modify: ');
        console.log(currUser);
        this._httpClient.put(this.baseUrl + 'users/' + this.userr.id, currUser)
            .subscribe((response: any) => {
                    this.userr.mood = currUser.mood;
                    this.userr.status = currUser.status;
                }
            );
    }

    updateUser(id: number, user: User){
        return this._httpClient.put(this.baseUrl + 'users/' + id, user);
      }

    /**
     * Update the chat dialog
     *
     * @param chatId
     * @param dialog
     * @returns {Promise<any>}
     */
    updateDialog(chatId, dialog): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const newData = {
                id    : chatId,
                dialog: dialog
            };

            this._httpClient.post('api/chat-chats/' + chatId, newData)
                .subscribe(updatedChat => {
                    resolve(updatedChat);
                }, reject);
        });
    }

    /**
     * Update the chat dialog
     *
     * @param chatId
     * @param dialog
     * @returns {Promise<any>}
     */
    updateDialogg(chatId, dialog): Promise<any>
    {
        return new Promise((resolve, reject) => {

            const newData = {
                recipientId: dialog.whose,
	            content: dialog.message
            };

            this._httpClient.post(this.baseUrl + 'users/' + this.userr.id + '/messages', newData)
            // this._httpClient.post('api/chat-chats/' + chatId, newData)
                .subscribe(updatedChat => {
                    resolve(updatedChat);
                }, reject);
        });
    }

    sendMessage(id: number, dialog) {
        const newData = {
            recipientId: dialog.whose,
            content: dialog.message
        };
        return this._httpClient.post(this.baseUrl + 'users/' + id + '/messages', newData);
      }

    /**
     * Get contacts
     *
     * @returns {Promise<any>}
     */
    getContacts(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-contacts')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    getContactss(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get<User[]>(this.baseUrl + 'users/contacts')
                .subscribe((response: any) => {
                    // console.log('Contactss: ');
                    // console.log(response);
                    resolve(response);
                }, reject);
        });
    }

    getContactsLikers(): Promise<any>
    {  
        return new Promise((resolve, reject) => {
            this._httpClient.get<User[]>(this.baseUrl + 'users?' + 'Likers=true')
                .subscribe((response: any) => {
                    // console.log('Contactss: ');
                    // console.log(response);
                    resolve(response);
                }, reject);
        });
    }
    getContactsLikees(): Promise<any>
    {  
        return new Promise((resolve, reject) => {
            this._httpClient.get<User[]>(this.baseUrl + 'users?' + 'Likees=true')
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get chats
     *
     * @returns {Promise<any>}
     */
    getChatss(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get<User[]>(this.baseUrl + 'users/thread/' + this.userr.id)
                .subscribe((response: any) => {
                    // console.log('Chatss: ');
                    // console.log(response);
                    resolve(response);
                }, reject);
        });
    }

    getChats(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-chats')
                .subscribe((response: any) => {
                    // console.log('Chats: ');
                    // console.log(response);
                    resolve(response);
                }, reject);
        });
    }

    /**
     * Get user
     *
     * @returns {Promise<any>}
     */
    getUser(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get<User[]>(this.baseUrl + 'users/userinfo/' + this.userr.id)
                .subscribe((response: any) => {
                    resolve(response[0]);
                }, reject);
        });
    }

    getUserr(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get<User[]>(this.baseUrl + 'users/thread/userinfo/' + this.userr.id)
                .subscribe((response: any) => {
                    response[0].chatList.forEach(chat =>{
                        if(chat.unread !== 0){
                            this.unReadCount++;
                        }
                    });                  
                    this.unreadSource.next(this.unReadCount);
                    resolve(response[0]);
                }, reject);
        });
    }

    getUpdateUserr() {
        console.log('I am here');
        return  this._httpClient.get<any>(this.baseUrl + 'users/thread/userinfo/' + this.userr.id)
            .subscribe((response) => {
                this.userr = response[0];
                console.log(this.userr);
            });
    }

    getUser1(): Promise<any>
    {
        return new Promise((resolve, reject) => {
            this._httpClient.get('api/chat-user')
                .subscribe((response: any) => {
                    resolve(response[0]);
                }, reject);
        });
    }
}
